# CRITICAL FIX: Frontend Connecting to Wrong Backend

## Problem

The deployed frontend on `book-quote-ui.onrender.com` is connecting to the **OLD** backend URL:
- ❌ `https://bookquoteapp-8pxm.onrender.com` (OLD - doesn't have SQLite support)

Instead of the **NEW** backend URL:
- ✅ `https://book-quote-api.onrender.com` (NEW - has SQLite support)

## Root Cause

The frontend deployment on Render hasn't picked up the latest `environments.ts` changes.

## Solution

### Step 1: Verify Local Code is Correct

Check `frontend/book-quote-ui/src/environments.ts`:

```typescript
const baseUrlProd = 'https://book-quote-api.onrender.com/api';  // ✅ CORRECT
const baseUrlDev = 'http://localhost:5010/api';
```

### Step 2: Force Redeploy Frontend on Render

#### Option A: Manual Deploy (Fastest)
1. Go to Render Dashboard: https://dashboard.render.com
2. Click on `book-quote-ui` service
3. Click **"Manual Deploy"** button
4. Select **"Clear build cache & deploy"**
5. Wait for deployment to complete (2-3 minutes)

#### Option B: Push to GitHub (Automatic)
```bash
git add .
git commit -m "Fix: Update frontend to use correct backend URL"
git push origin main
```

Then wait for automatic deployment on Render.

### Step 3: Verify the Fix

After deployment completes:

1. **Clear Browser Cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files
   - Close and reopen browser

2. **Test the Application:**
   - Open: `https://book-quote-ui.onrender.com/register`
   - Open Developer Tools (F12) → Network tab
   - Try to register a new user
   - Check the Network tab - the request should go to:
     - ✅ `https://book-quote-api.onrender.com/api/Auth/register`
     - ❌ NOT `https://bookquoteapp-8pxm.onrender.com/api/Auth/register`

### Step 4: Delete Old Services (Recommended)

To avoid confusion, delete the old services:

1. Go to Render Dashboard
2. Delete `BookQuoteApp` (old backend)
3. Delete `BookQuoteApp-1` (old frontend - if different from book-quote-ui)

**Note:** Only delete `bookquoteapp-8pxm` if you're sure `book-quote-api` is working.

---

## Quick Checklist

- [ ] Verified `environments.ts` has correct URL
- [ ] Committed and pushed changes to GitHub
- [ ] Triggered manual deploy on Render (or waited for auto-deploy)
- [ ] Cleared browser cache
- [ ] Tested registration/login
- [ ] Verified Network tab shows correct backend URL
- [ ] (Optional) Deleted old services

---

## Expected Behavior After Fix

### Registration Flow:
1. User opens: `https://book-quote-ui.onrender.com/register`
2. User fills form and clicks "Sign Up"
3. Request goes to: `https://book-quote-api.onrender.com/api/Auth/register`
4. Backend creates user in SQLite database
5. Returns success response with JWT token
6. User is redirected to `/books` page

### Login Flow:
1. User opens: `https://book-quote-ui.onrender.com/login`
2. User enters credentials and clicks "Login"
3. Request goes to: `https://book-quote-api.onrender.com/api/Auth/login`
4. Backend verifies credentials against SQLite database
5. Returns success response with JWT token
6. User is redirected to `/books` page

---

## If Still Not Working

### Check Render Deployment Logs

**Frontend Logs:**
```
Dashboard → book-quote-ui → Logs
```

Look for:
- Build errors
- Deployment status
- Any warnings

**Backend Logs:**
```
Dashboard → book-quote-api → Logs
```

Look for:
- Database initialization
- CORS errors
- JWT errors

### Common Issues:

#### 1. Frontend Still Using Old URL
**Symptom:** Network tab shows requests to `bookquoteapp-8pxm.onrender.com`

**Solution:**
- Clear browser cache completely
- Try in incognito/private window
- Force redeploy frontend with "Clear build cache"

#### 2. CORS Error
**Symptom:** Console shows "CORS policy" error

**Solution:**
Verify `Program.cs` has:
```csharp
policy.WithOrigins(
    "http://localhost:4200",
    "https://book-quote-ui.onrender.com"  // Must match exactly
)
```

#### 3. Database Error
**Symptom:** 500 error with "database" in logs

**Solution:**
- Check `appsettings.Production.json` exists
- Verify SQLite package is installed
- Check Render logs for specific error

---

## Contact Support

If problem persists after trying all solutions:

1. Take screenshot of Render Logs (both frontend and backend)
2. Take screenshot of browser Network tab showing the failed request
3. Take screenshot of browser Console showing any errors
4. Share all three screenshots for further diagnosis
