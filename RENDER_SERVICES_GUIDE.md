# Render Services Guide - BookQuoteApp

## Service Summary

Based on your Render dashboard, you have **4 services** deployed:

### 🔵 Recommended Services (Latest):

#### 1. **Backend API** 
- **Name:** `book-quote-api`
- **Type:** Docker (Web Service)
- **URL:** `https://book-quote-api.onrender.com`
- **Last Update:** December 5, 2025 at 10:40 PM
- **Status:** ✅ Deployed

#### 2. **Frontend UI**
- **Name:** `book-quote-ui`
- **Type:** Static Site
- **URL:** `https://book-quote-ui.onrender.com`
- **Last Update:** December 5, 2025 at 10:34 PM
- **Status:** ✅ Deployed

---

### 🔴 Old Services (Can be deleted):

#### 3. **BookQuoteApp** (Old Backend)
- **URL:** `https://bookquoteapp-8pxm.onrender.com`
- **Last Update:** December 5, 2025 at 10:06 PM
- **Status:** Can be deleted or stopped

#### 4. **BookQuoteApp-1** (Old Frontend)
- **URL:** `https://bookquoteapp-1.onrender.com`
- **Last Update:** December 5, 2025 at 10:34 PM
- **Status:** Can be deleted or stopped

---

## ⚙️ Correct Configuration

### ✅ Code has been updated to use:

**Frontend (`environments.ts`):**
```typescript
const baseUrlProd = 'https://book-quote-api.onrender.com/api';
const baseUrlDev = 'http://localhost:5010/api';
```

**Backend (`Program.cs` - CORS):**
```csharp
policy.WithOrigins(
    "http://localhost:4200",
    "https://book-quote-ui.onrender.com"
)
```

---

## 🚀 Next Steps

### 1. **Deploy Updates:**
After saving changes, push code to GitHub:
```bash
git add .
git commit -m "Update production URLs to use latest Render services"
git push origin main
```

### 2. **Verify Deployment:**
- Wait for automatic deployment to complete on Render
- Open `https://book-quote-ui.onrender.com`
- Try logging in

### 3. **Delete Old Services (Optional):**
To save resources and avoid confusion:
- Delete `BookQuoteApp` (Old Backend)
- Delete `BookQuoteApp-1` (Old Frontend)

---

## 📝 Important Notes

### ⚠️ Render Free Tier:
- Services go to sleep after 15 minutes of inactivity
- First request after sleep may take 50 seconds or more
- This is completely normal for the free tier

### 🔄 Automatic Updates:
- Both services (`book-quote-api` and `book-quote-ui`) are linked to GitHub
- Any push to `main` branch will trigger automatic deployment

---

## ✅ Summary

**Correct Services to Use:**
- **Frontend:** `https://book-quote-ui.onrender.com`
- **Backend:** `https://book-quote-api.onrender.com`

**Code has been updated to use these services automatically.**
