# Deploying Updates to Render

## ✅ Changes Made

The code has been updated to fix the database issue on Render:

### 1. Added SQLite Support
- ✅ Added `Microsoft.EntityFrameworkCore.Sqlite` package
- ✅ Updated `Program.cs` to use SQLite in production
- ✅ Created `appsettings.Production.json` with SQLite settings

### 2. Automatic Configuration
- **Local (Development):** Uses SQL Server
- **Render (Production):** Uses SQLite

---

## 📋 Deployment Steps

### 1. Save All Files
```bash
# Make sure all files are saved in VS Code
```

### 2. Commit & Push to GitHub
```bash
git add .
git commit -m "Fix: Add SQLite support for Render deployment"
git push origin main
```

### 3. Wait for Automatic Deployment
- Go to Render Dashboard
- Open `book-quote-api`
- Watch the Logs to ensure successful deployment
- Wait until you see "Deploy live"

### 4. Test the Application
- Open: `https://book-quote-ui.onrender.com`
- Try registering a new user
- Try logging in

---

## ⚠️ Important Notes

### First Use After Deployment
1. **Service Will Be in Sleep Mode**
   - First request will take 50-60 seconds
   - This is completely normal

2. **Database is Empty**
   - No users exist
   - Must register a new user first

3. **Data is Temporary**
   - SQLite on Render may be deleted on redeployment
   - This is a temporary solution for development only

---

## 🔍 Verify Successful Deployment

### 1. Check Logs
```
Render Dashboard → book-quote-api → Logs
```

Look for:
- ✅ "Now listening on: http://[::]:10000"
- ✅ "Application started"
- ❌ Any errors in red

### 2. Test API Directly
Open in browser:
```
https://book-quote-api.onrender.com/
```

You should see a page (even if blank) - this means the service is running.

### 3. Test Registration
1. Open: `https://book-quote-ui.onrender.com/register`
2. Register a new user
3. If registration succeeds, problem is solved! ✅

---

## 🆘 If Problem Persists

### Check Logs in Render
```
Dashboard → book-quote-api → Logs
```

### Common Errors:

#### 1. "Unable to create database"
**Solution:** Make sure `appsettings.Production.json` exists

#### 2. "JWT Secret Key is missing"
**Solution:** Add Environment Variable in Render:
```
JwtSettings__SecretKey = YourSuperSecretKeyHere
```

#### 3. "CORS policy error"
**Solution:** Make sure `https://book-quote-ui.onrender.com` is in CORS settings

---

## 💡 For Long-Term Use

For actual production, it's recommended to use:
- **PostgreSQL** (supported for free in Render)
- **MySQL** (another option)

SQLite is suitable only for development and testing.

---

## 📞 Support

If you encounter any issues:
1. Send screenshot from Render Logs
2. Send screenshot from Network tab in browser
3. Mention the complete error message
