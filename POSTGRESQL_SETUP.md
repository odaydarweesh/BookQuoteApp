# PostgreSQL Setup Guide for Render

## Why PostgreSQL?

SQLite doesn't work properly on Render because:
- File system is ephemeral (temporary)
- Data is deleted on redeployment
- Cannot create persistent database

**Solution:** Use PostgreSQL - it's free on Render and keeps data permanently.

---

## Step 1: Create PostgreSQL Database on Render

### 1. Open Render Dashboard
```
https://dashboard.render.com
```

### 2. Create New PostgreSQL Database

1. Click **"New +"** (top right)
2. Select **"PostgreSQL"**
3. Fill in the details:
   - **Name:** `bookquote-db`
   - **Database:** `bookquote`
   - **User:** `bookquote_user`
   - **Region:** Same as your backend (e.g., Frankfurt)
   - **Plan:** **Free** ✅

4. Click **"Create Database"**

5. Wait 1-2 minutes for database creation

### 3. Get Connection String

After database is created:

1. Click on the database in Dashboard
2. Scroll down to **"Connections"**
3. Copy **"Internal Database URL"** (IMPORTANT!)
   - Starts with: `postgresql://...`
   - Example: `postgresql://bookquote_user:password@dpg-xxx.frankfurt-postgres.render.com/bookquote`

---

## Step 2: Add Connection String to Backend

### 1. Open Backend Service on Render

1. Go to Dashboard
2. Click on `BookQuoteApp` (your backend)

### 2. Add Environment Variable

1. Click **"Environment"** (left sidebar)
2. Click **"Add Environment Variable"**
3. Fill in:
   - **Key:** `ConnectionStrings__DefaultConnection`
   - **Value:** Paste the **Internal Database URL** you copied
   
   Example:
   ```
   Key: ConnectionStrings__DefaultConnection
   Value: postgresql://bookquote_user:xxxxx@dpg-xxx.frankfurt-postgres.render.com/bookquote
   ```

4. Click **"Save Changes"**

---

## Step 3: Redeploy Backend

### 1. Manual Deploy

1. In `BookQuoteApp` page
2. Click **"Manual Deploy"**
3. Select **"Clear build cache & deploy"**
4. Click **"Deploy"**

### 2. Monitor Logs

1. Click **"Logs"** (left sidebar)
2. Wait until you see:
   ```
   ✅ Build succeeded
   ✅ Starting service
   ✅ Now listening on: http://[::]:10000
   ```

3. If you see errors:
   - Look for "database" or "connection"
   - Check the error message

---

## Step 4: Run Migrations (Create Tables)

### Method 1: Using Render Shell (Easiest)

1. In `BookQuoteApp` page
2. Click **"Shell"** (left sidebar)
3. Type:
   ```bash
   dotnet ef database update
   ```
4. Press Enter
5. Wait for "Done"

### Method 2: From Your Local Machine

If Method 1 doesn't work:

1. Open Terminal in VS Code
2. Go to Backend folder:
   ```bash
   cd backend/BookQuoteApi
   ```
3. Run migration:
   ```bash
   dotnet ef database update --connection "postgresql://..."
   ```
   (Replace `...` with full Connection String)

---

## Step 5: Test the Application

### 1. Clear Browser Cache

- Press `Ctrl + Shift + Delete`
- Clear everything
- Close browser

### 2. Open in Incognito

- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

### 3. Go to Application

```
https://book-quote-ui.onrender.com/register
```

### 4. Register New User

- Username: `testuser`
- Email: `test@test.com`
- Password: `123456`

### 5. Check Result

**If successful:**
- ✅ You'll see success message
- ✅ Redirected to `/books` page

**If failed:**
- ❌ Check Network tab
- ❌ Check Console
- ❌ Send me screenshot

---

## Verify Database

### 1. Open Database on Render

1. Go to Dashboard
2. Click on `bookquote-db`
3. Click **"Connect"**
4. Choose **"External Connection"**

### 2. Use Render Shell

1. In `bookquote-db` page
2. Click **"Shell"**
3. Type:
   ```sql
   \dt
   ```
   (to list tables)

4. To check users:
   ```sql
   SELECT * FROM "Users";
   ```

---

## Common Errors and Solutions

### Error: "Connection string not found"

**Solution:**
- Make sure Environment Variable is added correctly
- Key must be: `ConnectionStrings__DefaultConnection` (double underscore)

### Error: "Could not connect to database"

**Solution:**
- Use **Internal Database URL**, not External
- Make sure Backend and Database are in same Region

### Error: "Table does not exist"

**Solution:**
- Run migrations:
  ```bash
  dotnet ef database update
  ```

### Error: "Password authentication failed"

**Solution:**
- Copy Connection String again from Render
- Make sure there are no extra spaces

---

## Important Notes

### About Free Tier:

- ✅ **PostgreSQL is free** on Render
- ✅ **1 GB storage** free
- ✅ **Data is persistent** (not deleted)
- ⚠️ **Deleted after 90 days** of inactivity

### About Performance:

- **First request:** 50-60 seconds (Sleep mode)
- **Subsequent requests:** Fast
- **Database:** Always active (doesn't sleep)

---

## Summary Checklist

| Step | Status |
|------|--------|
| Create PostgreSQL on Render | ⏳ TODO |
| Copy Connection String | ⏳ TODO |
| Add Environment Variable | ⏳ TODO |
| Redeploy Backend | ⏳ TODO |
| Run Migrations | ⏳ TODO |
| Test Application | ⏳ TODO |

---

## Need Help?

If you encounter any issues, send me:
1. Screenshot of Render Logs for Backend
2. Screenshot of Environment Variables
3. Screenshot of Network tab in browser
4. Complete error message

I'll help you immediately! 🚀
