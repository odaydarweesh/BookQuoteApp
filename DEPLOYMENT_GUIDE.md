# BookQuoteApp - Deployment Fix Guide

## Problem Analysis

The deployment fails with:
```
System.ArgumentException: Host can't be null
at Program.<Main>$(String[] args) in /app/Program.cs:line 82
```

**Root Cause**: The old code (commit `41e4d13`) doesn't read `DATABASE_URL` from environment variables correctly.

---

## Solution Summary

### Changes Already Made (Not Yet Pushed)

1. **Program.cs** - Fixed to read `DATABASE_URL` from environment variables
2. **HealthController.cs** - Added health check endpoint at `/healthz`
3. **environments.ts** - Updated frontend API URLs
4. **CORS Configuration** - Updated for new frontend URL

### Environment Variable Already Set in Render

```
DATABASE_URL=postgresql://bookquote_db_user:sjHm3QYSbIuISUOzeYLwr5kd6jaMS9Ul@dpg-d4pm7dje5dus73e8bq7g-a/bookquote_db
```

---

## Deploy Steps

### Step 1: Push Changes to GitHub

```bash
git add .
git commit -m "Fix DATABASE_URL configuration for Render deployment"
git push origin main
```

### Step 2: Wait for Auto-Deploy

- Time: 5-7 minutes
- Monitor: https://dashboard.render.com

### Step 3: Verify Deployment

**Check Health Endpoint**:
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

**Check Frontend**:
```
https://bookquoteapp-ko6a.onrender.com
```

---

## Technical Details

### What Was Fixed in Program.cs

**Before** (line 15-18):
```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var isProduction = builder.Environment.IsProduction();
```

**After** (line 15-18):
```csharp
var isProduction = builder.Environment.IsProduction();
var connectionString = isProduction 
    ? Environment.GetEnvironmentVariable("DATABASE_URL") 
    : builder.Configuration.GetConnectionString("DefaultConnection");
```

**Why**: In production (Render), the database connection string comes from the `DATABASE_URL` environment variable, not from `appsettings.json`.

### Health Check Endpoint

**File**: `backend/BookQuoteApi/Controllers/HealthController.cs`

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

**Purpose**: Render uses this endpoint to verify the service is running.

### Updated Service URLs

| Service | Old URL | New URL |
|---------|---------|---------|
| Backend | book-quote-api.onrender.com | bookquoteapi-m9gz.onrender.com |
| Frontend | book-quote-ui.onrender.com | bookquoteapp-ko6a.onrender.com |

---

## Render Configuration

### Backend (BookQuoteApi)

| Setting | Value |
|---------|-------|
| Service Type | Web Service (Docker) |
| URL | https://bookquoteapi-m9gz.onrender.com |
| Service ID | srv-d4q3p4be5dus73eggf3g |
| Dockerfile Path | backend/BookQuoteApi/Dockerfile |
| Docker Build Context | backend/BookQuoteApi |
| Health Check Path | /healthz |
| Auto-Deploy | ✅ Enabled |

**Environment Variable** (Already Set):
```
DATABASE_URL=postgresql://bookquote_db_user:sjHm3QYSbIuISUOzeYLwr5kd6jaMS9Ul@dpg-d4pm7dje5dus73e8bq7g-a/bookquote_db
```

### Frontend (BookQuoteApp)

| Setting | Value |
|---------|-------|
| Service Type | Static Site |
| URL | https://bookquoteapp-ko6a.onrender.com |
| Service ID | srv-d4q3nb0gjchc73b59b1g |
| Root Directory | frontend/book-quote-ui |
| Build Command | npm install && npm run build |
| Publish Directory | frontend/book-quote-ui/dist/book-quote-ui/browser |
| Auto-Deploy | ✅ Enabled |

---

## Expected Deploy Sequence

After pushing to GitHub:

1. **Render detects new commit** (10-30 seconds)
2. **Starts build process** (2-3 minutes)
   - Downloads code
   - Builds Docker image
   - Runs `dotnet restore`
   - Runs `dotnet publish`
3. **Deploys container** (1-2 minutes)
   - Reads `DATABASE_URL` from environment
   - Connects to PostgreSQL
   - Applies database migrations
   - Starts application
4. **Health check passes** (5-10 seconds)
5. **Service goes live** ✅

Total time: **5-7 minutes**

---

## Troubleshooting

### If Deploy Still Fails

1. **Check Render Logs**:
   - Go to https://dashboard.render.com
   - Open BookQuoteApi
   - Click "Logs"
   - Look for error messages

2. **Verify DATABASE_URL**:
   - Go to BookQuoteApi → Environment
   - Confirm `DATABASE_URL` exists
   - Value should start with `postgresql://`

3. **Trigger Manual Deploy**:
   - Go to BookQuoteApi
   - Click "Manual Deploy"
   - Select "Deploy latest commit"

### If Health Check Fails

```bash
# Test health endpoint
curl https://bookquoteapi-m9gz.onrender.com/healthz

# If it returns 404, the endpoint isn't registered
# If it times out, the service isn't running
# If it returns 500, there's an application error
```

### If Frontend Can't Connect

1. Check backend is running (health check)
2. Check browser console for CORS errors
3. Verify frontend is using correct API URL in `environments.ts`

---

## Testing After Deployment

### 1. Health Check
```bash
curl https://bookquoteapi-m9gz.onrender.com/healthz
```

### 2. Register User
```bash
curl -X POST https://bookquoteapi-m9gz.onrender.com/api/Auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### 3. Login
```bash
curl -X POST https://bookquoteapi-m9gz.onrender.com/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### 4. Frontend Testing
1. Open: https://bookquoteapp-ko6a.onrender.com
2. Register new account
3. Login
4. Add a book
5. Add a quote

---

## Files Modified

1. `backend/BookQuoteApi/Program.cs` - DATABASE_URL fix
2. `backend/BookQuoteApi/Controllers/HealthController.cs` - New file
3. `frontend/book-quote-ui/src/environments.ts` - Updated URLs

---

## Next Steps

1. **Push changes**: `git push origin main`
2. **Wait 5-7 minutes** for auto-deploy
3. **Test health check**: `curl https://bookquoteapi-m9gz.onrender.com/healthz`
4. **Test frontend**: Open https://bookquoteapp-ko6a.onrender.com

---

**Last Updated**: 2025-12-06  
**Status**: Ready to deploy  
**Expected Result**: Successful deployment with working database connection
