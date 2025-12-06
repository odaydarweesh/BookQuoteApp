# Deployment Instructions

## Step 1: Delete Arabic Files

Run this command in the project root:
```cmd
delete_arabic_files.bat
```

This will delete all 21 Arabic documentation files.

## Step 2: Push to GitHub

```bash
git add .
git commit -m "Fix DATABASE_URL and remove Arabic documentation"
git push origin main
```

## Step 3: Wait for Deploy

- Auto-deploy will start automatically (5-7 minutes)
- Monitor at: https://dashboard.render.com

## Step 4: Verify

**Health Check**:
```bash
curl https://bookquoteapi-m9gz.onrender.com/healthz
```

**Frontend**: https://bookquoteapp-ko6a.onrender.com

---

## What Was Fixed

1. ✅ `Program.cs` reads `DATABASE_URL` from environment variables
2. ✅ Frontend URLs updated to new Render service
3. ✅ CORS configured for new frontend URL
4. ✅ Health check endpoint added at `/healthz`
5. ✅ All Arabic documentation removed

## Files Kept

- `README.md` - Project overview (English)
- `DEPLOYMENT_FIX.md` - Technical documentation (English)
- `DEPLOYMENT_INSTRUCTIONS.md` - This file (English)

---

**Ready to deploy!**
