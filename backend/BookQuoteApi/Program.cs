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
    // Get the DATABASE_URL
    var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL") ?? "";
    
    if (!string.IsNullOrEmpty(databaseUrl))
    {
        // Parse PostgreSQL URL format: postgresql://user:password@host:port/database
        // Convert to Npgsql format: Host=host;Port=port;Database=database;Username=user;Password=password
        
        try
        {
            var uri = new Uri(databaseUrl);
            var userInfo = uri.UserInfo.Split(':');
            
            connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error parsing DATABASE_URL: {ex.Message}");
            throw new InvalidOperationException($"Invalid DATABASE_URL format: {ex.Message}");
        }
    }
    else
    {
        throw new InvalidOperationException("DATABASE_URL environment variable is not set!");
    }
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// Log environment info
Console.WriteLine($"Environment: {(isProduction ? "Production" : "Development")}");

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
