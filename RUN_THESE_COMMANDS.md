# Git Commands - Copy and Paste These

## Run these commands in your Terminal (one by one):

### Command 1: Add all changes
```
git add .
```

### Command 2: Commit changes
```
git commit -m "Fix: Update frontend URLs and add auto-migration for production"
```

### Command 3: Push to GitHub
```
git push origin main
```

---

## After Running Commands

### What to expect:

**After `git add .`:**
- No output (this is normal)
- Files are staged for commit

**After `git commit`:**
```
[main xxxxxxx] Fix: Update frontend URLs and add auto-migration for production
 X files changed, XX insertions(+), XX deletions(-)
```

**After `git push origin main`:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), X.XX KiB | X.XX MiB/s, done.
Total XX (delta XX), reused XX (delta XX), pack-reused 0
To https://github.com/odaydarweesh/BookQuoteApp.git
   xxxxxxx..xxxxxxx  main -> main
```

---

## Next Steps After Successful Push

1. **Go to Render Dashboard:** https://dashboard.render.com

2. **Check Backend (`book-quote-api`):**
   - Go to Events tab
   - You should see "Deploy started" within 30 seconds
   - Wait for "Deploy live" (2-3 minutes)
   - Check Logs - look for:
     ```
     Applying migration '20251203212748_InitialCreate'
     Applied migration '20251203212748_InitialCreate'
     Now listening on: http://[::]:80
     Your service is live 🎉
     ```

3. **Check Frontend (`book-quote-ui`):**
   - Go to Events tab
   - You should see "Deploy started" within 30 seconds
   - Wait for "Deploy live" (2-3 minutes)

4. **Test the Application:**
   - Clear browser cache: `Ctrl + Shift + Delete`
   - Open: `https://book-quote-ui.onrender.com/register`
   - Open DevTools: `F12` → Network tab
   - Register a new user
   - Verify request goes to: `https://book-quote-api.onrender.com/api/Auth/register`

---

## If You Get Errors

### Error: "nothing to commit, working tree clean"
**Meaning:** No changes detected
**Solution:** The files might already be committed. Run `git status` to check.

### Error: "Please tell me who you are"
**Solution:** Configure Git:
```
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### Error: "Permission denied (publickey)"
**Solution:** You may need to authenticate with GitHub. Use GitHub Desktop or configure SSH keys.

---

## Copy These Commands and Run Them Now!

```bash
git add .
git commit -m "Fix: Update frontend URLs and add auto-migration for production"
git push origin main
```
