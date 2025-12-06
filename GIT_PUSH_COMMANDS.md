# أوامر Git لرفع التحديثات

## الخطوة 1: إضافة جميع التغييرات
```bash
git add .
```

## الخطوة 2: Commit التغييرات
```bash
git commit -m "Update Render URLs and add health check endpoint

- Updated frontend environments.ts with new API URL (bookquoteapi-m9gz.onrender.com)
- Updated backend CORS to allow new frontend URL (bookquoteapp-ko6a.onrender.com)
- Added HealthController with /healthz endpoint for Render health checks
- Removed old Render URLs from configuration"
```

## الخطوة 3: Push إلى GitHub
```bash
git push origin main
```

## بعد Push
سيتم تشغيل Auto-Deploy تلقائياً على:
1. **Frontend**: https://bookquoteapp-ko6a.onrender.com
2. **Backend**: https://bookquoteapi-m9gz.onrender.com

## التحقق من النجاح

### 1. تحقق من Build Status في Render Dashboard
- افتح: https://dashboard.render.com
- تحقق من أن كلا الخدمتين في حالة "Live"

### 2. اختبر Health Check
```bash
curl https://bookquoteapi-m9gz.onrender.com/healthz
```

### 3. افتح Frontend
```
https://bookquoteapp-ko6a.onrender.com
```

## ملاحظة مهمة
⚠️ **لا تنسى إضافة DATABASE_URL في Environment Variables للـ Backend على Render!**

الذهاب إلى:
1. Render Dashboard → BookQuoteApi
2. Environment → Add Environment Variable
3. Key: `DATABASE_URL`
4. Value: `postgresql://user:password@host:port/database`
