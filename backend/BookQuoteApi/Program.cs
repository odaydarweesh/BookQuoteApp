using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BookQuoteApi.Data;
using BookQuoteApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Add Database Context
var isProduction = builder.Environment.IsProduction();

string? connectionString = null;

if (isProduction)
{
    // Try multiple possible environment variable names
    connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                    ?? Environment.GetEnvironmentVariable("PGDATABASE_URL")
                    ?? Environment.GetEnvironmentVariable("POSTGRES_URL")
                    ?? "";
    
    // If we got a connection string, ensure it has the full hostname
    if (!string.IsNullOrEmpty(connectionString) && !connectionString.Contains(".render.com"))
    {
        // Render might be giving us a shortened hostname, rebuild it
        var parts = connectionString.Split('@');
        if (parts.Length == 2)
        {
            var afterAt = parts[1];
            var hostAndDb = afterAt.Split('/');
            if (hostAndDb.Length == 2 && !hostAndDb[0].Contains("."))
            {
                // Rebuild with full hostname
                connectionString = $"{parts[0]}@{hostAndDb[0]}.frankfurt-postgres.render.com:5432/{hostAndDb[1]}";
            }
        }
    }
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// Debug logging
Console.WriteLine($"Environment: {(isProduction ? "Production" : "Development")}");
Console.WriteLine($"Connection String Length: {connectionString?.Length ?? 0}");
Console.WriteLine($"Connection String (first 20 chars): {(connectionString?.Length > 20 ? connectionString.Substring(0, 20) : connectionString)}");
Console.WriteLine($"Full Connection String: {connectionString}");

if (isProduction && string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("DATABASE_URL environment variable is not set or is empty!");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    if (isProduction)
    {
        // Use PostgreSQL for Render (production)
        options.UseNpgsql(connectionString);
    }
    else
    {
        // Use SQL Server for local development
        options.UseSqlServer(connectionString);
    }
});

// Add Authentication Service
builder.Services.AddScoped<IAuthService, AuthService>();

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"]!;

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme   = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer           = true,
        ValidateAudience         = true,
        ValidateLifetime         = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer              = jwtSettings["Issuer"],
        ValidAudience            = jwtSettings["Audience"],
        IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

// Add CORS
var allowedOrigins = "AllowAngularApp";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins,
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:4200",
                    "https://bookquoteapp-ko6a.onrender.com"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Auto-apply migrations in production (Render)
if (app.Environment.IsProduction())
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }
}

// Use CORS
app.UseCors(allowedOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
