# Push Updates to GitHub - Step by Step

## What We Changed

### 1. Frontend (`environments.ts`)
**Changed from:**
```typescript
apiUrlAuth: 'https://bookquoteapp-8pxm.onrender.com/api/Auth'
```

**Changed to:**
```typescript
apiUrlAuth: 'https://book-quote-api.onrender.com/api/Auth'
```

### 2. Backend (`Program.cs`)
**Added auto-migration code:**
```csharp
// Auto-apply migrations in production (Render)
if (app.Environment.IsProduction())
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }
}
```

---

## Git Commands to Run

Open Terminal in Visual Studio Code and run these commands **one by one**:

### Step 1: Check what files changed
```bash
git status
```

### Step 2: Add all changes
```bash
git add .
```

### Step 3: Commit changes
```bash
git commit -m "Fix: Update frontend URLs to correct backend and add auto-migration for production"
```

### Step 4: Push to GitHub
```bash
git push origin main
```

---

## What Will Happen After Push

1. **GitHub receives the changes** (immediately)
2. **Render detects the update** (within 30 seconds)
3. **Backend redeploys** (2-3 minutes)
   - Applies migrations automatically
   - Creates database tables
4. **Frontend redeploys** (2-3 minutes)
   - Uses correct backend URL

---

## Expected Backend Logs After Redeploy

You should see:
```
Applying migration '20251203212748_InitialCreate'
Applied migration '20251203212748_InitialCreate'
Now listening on: http://[::]:80
Your service is live 🎉
```

---

## Next Steps After Push

1. Wait for both services to redeploy (5-6 minutes total)
2. Clear browser cache
3. Test the application at: `https://book-quote-ui.onrender.com/register`
4. Register a new user
5. Login and verify it works

---

## Ready to Push?

Run the commands above in the Terminal!
