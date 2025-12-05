# Render Deployment Troubleshooting Guide

## Problem Diagnosis

**Current Issue:** Local system works ✅ but deployed system on Render doesn't work ❌

### Possible Causes:

#### 1. ⏱️ Service in Sleep Mode (Most Likely)
- Render's free tier puts services to sleep after 15 minutes of inactivity
- First request takes 50-60 seconds to wake up the service
- **Solution:** Wait a full minute after opening the page

#### 2. 🗄️ Database Not Connected
- Backend requires SQL Server database
- Database may not be configured on Render
- **Solution:** Check database settings in Render

#### 3. 🔐 Missing Environment Variables
- JWT Secret Key
- Connection String
- **Solution:** Verify Environment Variables in Render

---

## ✅ Proposed Solutions

### Solution 1: Check Service Status on Render

1. **Open Render Dashboard:**
   - Go to: https://dashboard.render.com
   - Check status of `book-quote-api`
   - Check Logs for any errors

2. **Check the Logs:**
   ```
   Dashboard → book-quote-api → Logs
   ```
   - Look for errors such as:
     - Database connection errors
     - Missing environment variables
     - JWT configuration errors

### Solution 2: Database Setup

**Problem:** Backend uses SQL Server but Render doesn't support SQL Server for free.

**Solution:** Use PostgreSQL instead of SQL Server

#### Steps to Convert to PostgreSQL:

1. **Create PostgreSQL database on Render:**
   - Dashboard → New → PostgreSQL
   - Choose Free plan
   - Save Connection String

2. **Update code to use PostgreSQL:**

**File:** `BookQuoteApi.csproj`
```xml
<!-- Replace -->
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />

<!-- With -->
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />
```

**File:** `Program.cs`
```csharp
// Replace
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))

// With
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
```

3. **Add Connection String in Render:**
   - Dashboard → book-quote-api → Environment
   - Add: `ConnectionStrings__DefaultConnection` = [PostgreSQL Connection String]

### Solution 3: Verify Environment Variables

Make sure these variables exist in Render:

```
JwtSettings__SecretKey = [your-secret-key-here]
JwtSettings__Issuer = BookQuoteApi
JwtSettings__Audience = BookQuoteApp
JwtSettings__ExpirationInMinutes = 1440
ConnectionStrings__DefaultConnection = [your-database-connection-string]
```

### Solution 4: Test Backend Directly

Open browser and go to:
```
https://book-quote-api.onrender.com/api/Auth/login
```

- If you see a blank page or 404 error: Service is running but needs POST request
- If page doesn't open: Service is asleep or disabled

---

## 🚀 Quick Solution (Temporary)

If you want a quick solution without modifying the database:

### Use SQLite Instead of SQL Server

1. **Update `BookQuoteApi.csproj`:**
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="8.0.0" />
```

2. **Update `Program.cs`:**
```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=bookquote.db"));
```

3. **Redeploy the code:**
```bash
git add .
git commit -m "Switch to SQLite for Render deployment"
git push origin main
```

**Note:** SQLite is suitable for development only, not for production.

---

## 📝 Verification Steps

1. ✅ **Verify code is updated on GitHub**
   ```bash
   git status
   git log -1
   ```

2. ✅ **Verify Render deployed latest update**
   - Dashboard → book-quote-ui → Events
   - Make sure there's a recent "Deploy live"

3. ✅ **Check the Logs**
   - Dashboard → book-quote-api → Logs
   - Look for errors

4. ✅ **Test Backend directly**
   - Use Postman or curl
   - Send POST request to `/api/Auth/register`

---

## 🆘 If Problem Persists

Send me:
1. Screenshot from Render Logs for backend
2. Screenshot from Network tab in browser when trying to register
3. Complete error message

---

## 💡 Tip

For development and testing, use the local system (localhost) as it's faster and more reliable.
Use Render only for final demo/production.
