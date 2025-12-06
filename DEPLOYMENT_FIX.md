# BookQuoteApp - Render Deployment Fix

## Problem Identified

The deployment was failing with:
```
System.ArgumentException: Host can't be null
at Program.<Main>$(String[] args) in /app/Program.cs:line 82
```

**Root Cause**: The code was not properly reading the `DATABASE_URL` environment variable in production.

---

## Changes Made

### 1. Updated `Program.cs` to Read DATABASE_URL from Environment Variables

**File**: `backend/BookQuoteApi/Program.cs`

**Before**:
```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var isProduction = builder.Environment.IsProduction();
```

**After**:
```csharp
var isProduction = builder.Environment.IsProduction();
var connectionString = isProduction 
    ? Environment.GetEnvironmentVariable("DATABASE_URL") 
    : builder.Configuration.GetConnectionString("DefaultConnection");
```

**Why**: In production (Render), the database connection string is provided via the `DATABASE_URL` environment variable, not through `appsettings.json`.

### 2. Updated Frontend API URLs

**File**: `frontend/book-quote-ui/src/environments.ts`

**Changed**:
- Old: `https://book-quote-api.onrender.com`
- New: `https://bookquoteapi-m9gz.onrender.com`

**Reason**: New Render service URLs after recreating the services.

### 3. Updated Backend CORS Configuration

**File**: `backend/BookQuoteApi/Program.cs`

**Changed**:
- Old: `https://book-quote-ui.onrender.com`, `https://bookquoteapp-1.onrender.com`
- New: `https://bookquoteapp-ko6a.onrender.com`

**Reason**: New frontend URL after recreating the service.

### 4. Added Health Check Endpoint

**File**: `backend/BookQuoteApi/Controllers/HealthController.cs` (NEW)

```csharp
[HttpGet("/healthz")]
public IActionResult HealthCheck()
{
    return Ok(new
    {
        status = "healthy",
        timestamp = DateTime.UtcNow,
        service = "BookQuoteApi"
    });
}
```

**Reason**: Render requires a health check endpoint at `/healthz`.

### 5. Cleaned Up Documentation

**Removed**: All Arabic-language documentation files
**Added**: This single English documentation file

---

## Render Configuration

### Backend (BookQuoteApi)

| Setting | Value |
|---------|-------|
| **Service Type** | Web Service (Docker) |
| **URL** | https://bookquoteapi-m9gz.onrender.com |
| **Service ID** | srv-d4q3p4be5dus73eggf3g |
| **Repository** | https://github.com/odaydarweesh/BookQuoteApp |
| **Branch** | main |
| **Dockerfile Path** | backend/BookQuoteApi/Dockerfile |
| **Docker Build Context** | backend/BookQuoteApi |
| **Health Check Path** | /healthz |

**Environment Variable** (REQUIRED):
```
Key: DATABASE_URL
Value: postgresql://bookquote_db_user:sjHm3QYSbIuISUOzeYLwr5kd6jaMS9Ul@dpg-d4pm7dje5dus73e8bq7g-a/bookquote_db
```

### Frontend (BookQuoteApp)

| Setting | Value |
|---------|-------|
| **Service Type** | Static Site |
| **URL** | https://bookquoteapp-ko6a.onrender.com |
| **Service ID** | srv-d4q3nb0gjchc73b59b1g |
| **Repository** | https://github.com/odaydarweesh/BookQuoteApp |
| **Branch** | main |
| **Root Directory** | frontend/book-quote-ui |
| **Build Command** | npm install && npm run build |
| **Publish Directory** | frontend/book-quote-ui/dist/book-quote-ui/browser |

---

## Deployment Steps

### 1. Verify DATABASE_URL is Set

The `DATABASE_URL` environment variable is already configured in Render:
```
postgresql://bookquote_db_user:sjHm3QYSbIuISUOzeYLwr5kd6jaMS9Ul@dpg-d4pm7dje5dus73e8bq7g-a/bookquote_db
```

### 2. Push Changes to GitHub

```bash
git add .
git commit -m "Fix DATABASE_URL configuration and clean up documentation"
git push origin main
```

### 3. Auto-Deploy

Both services have auto-deploy enabled. After pushing:
- Backend will rebuild and deploy automatically
- Frontend will rebuild and deploy automatically

Expected time: 5-7 minutes

### 4. Verify Deployment

**Health Check**:
```bash
curl https://bookquoteapi-m9gz.onrender.com/healthz
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-06T...",
  "service": "BookQuoteApi"
}
```

**Frontend**:
```
https://bookquoteapp-ko6a.onrender.com
```

---

## Testing

### 1. Backend API

**Health Check**:
```bash
curl https://bookquoteapi-m9gz.onrender.com/healthz
```

**Register User**:
```bash
curl -X POST https://bookquoteapi-m9gz.onrender.com/api/Auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123!"}'
```

**Login**:
```bash
curl -X POST https://bookquoteapi-m9gz.onrender.com/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### 2. Frontend

1. Open: https://bookquoteapp-ko6a.onrender.com
2. Register a new account
3. Login
4. Add a book
5. Add a quote

---

## Troubleshooting

### Issue: Backend still fails with "Host can't be null"

**Solution**: 
1. Verify `DATABASE_URL` is set in Render Environment Variables
2. Check that the value starts with `postgresql://`
3. Trigger a manual deploy

### Issue: CORS errors in frontend

**Solution**:
1. Verify backend is running (check health check)
2. Verify CORS configuration in `Program.cs` includes the correct frontend URL
3. Check browser console for the exact error

### Issue: Database connection errors

**Solution**:
1. Verify the PostgreSQL database is running on Render
2. Verify `DATABASE_URL` is correct
3. Check that both database and backend are in the same region (Frankfurt)

---

## Architecture

### Backend
- **Framework**: ASP.NET Core 8.0
- **Database**: PostgreSQL (Production) / SQL Server (Development)
- **Authentication**: JWT
- **ORM**: Entity Framework Core
- **Hosting**: Render (Docker)

### Frontend
- **Framework**: Angular
- **Styling**: SCSS
- **HTTP Client**: Angular HttpClient
- **Hosting**: Render (Static Site)

---

## Files Modified

1. `backend/BookQuoteApi/Program.cs` - DATABASE_URL configuration
2. `backend/BookQuoteApi/Controllers/HealthController.cs` - New health check endpoint
3. `frontend/book-quote-ui/src/environments.ts` - Updated API URLs
4. Documentation cleanup - Removed Arabic files, created this single English file

---

## Next Steps

1. Push changes to GitHub
2. Wait for auto-deploy (5-7 minutes)
3. Verify health check endpoint
4. Test frontend functionality
5. Monitor logs in Render Dashboard

---

**Last Updated**: 2025-12-06  
**Status**: Ready for deployment  
**Expected Result**: Successful deployment with working health check and database connection
