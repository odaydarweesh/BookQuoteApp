# تحديثات Render - الخدمات الجديدة

تم تحديث الكود ليتوافق مع الخدمات الجديدة على Render.

## معلومات الخدمات الجديدة

### Backend API
- **الاسم**: BookQuoteApi
- **النوع**: Web Service (Docker)
- **URL**: https://bookquoteapi-m9gz.onrender.com
- **Service ID**: srv-d4q3p4be5dus73eggf3g
- **Repository**: https://github.com/odaydarweesh/BookQuoteApp
- **Branch**: main
- **Dockerfile Path**: backend/BookQuoteApi/Dockerfile
- **Docker Build Context**: backend/BookQuoteApi
- **Health Check**: /healthz

### Frontend
- **الاسم**: BookQuoteApp
- **النوع**: Static Site
- **URL**: https://bookquoteapp-ko6a.onrender.com
- **Service ID**: srv-d4q3nb0gjchc73b59b1g
- **Repository**: https://github.com/odaydarweesh/BookQuoteApp
- **Branch**: main
- **Root Directory**: frontend/book-quote-ui
- **Build Command**: npm install && npm run build
- **Publish Directory**: frontend/book-quote-ui/dist/book-quote-ui/browser

## التحديثات التي تم إجراؤها

### 1. Frontend - environments.ts ✅
تم تحديث جميع URLs من:
- `https://book-quote-api.onrender.com` 

إلى:
- `https://bookquoteapi-m9gz.onrender.com`

### 2. Backend - Program.cs ✅
تم تحديث CORS policy لإضافة:
- `https://bookquoteapp-ko6a.onrender.com`

وإزالة URLs القديمة:
- `https://book-quote-ui.onrender.com`
- `https://bookquoteapp-1.onrender.com`

### 3. Backend - HealthController.cs ✅
تم إضافة Health Check endpoint جديد على `/healthz` كما هو مطلوب في إعدادات Render.

## الخطوات التالية

### 1. Push التحديثات إلى GitHub

```bash
git add .
git commit -m "Update Render service URLs and add health check endpoint"
git push origin main
```

### 2. انتظر Auto-Deploy
بما أن Auto-Deploy مفعّل على كلا الخدمتين، سيتم:
- تحديث Frontend تلقائياً عند push
- تحديث Backend تلقائياً عند push

### 3. التحقق من الخدمات

#### Backend Health Check
```bash
curl https://bookquoteapi-m9gz.onrender.com/healthz
```

يجب أن ترى:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-06T...",
  "service": "BookQuoteApi"
}
```

#### Frontend
افتح: https://bookquoteapp-ko6a.onrender.com

### 4. اختبار الوظائف
- تسجيل الدخول
- التسجيل
- إضافة كتاب
- إضافة اقتباس

## ملاحظات مهمة

### متغيرات البيئة في Render
تأكد من إضافة متغير البيئة التالي في Backend (BookQuoteApi):

**Environment Variable**:
```
DATABASE_URL=<PostgreSQL connection string>
```

يجب أن يكون في الشكل:
```
postgresql://user:password@host:port/database
```

### إعدادات CORS
إذا واجهت مشاكل CORS، تأكد من:
1. أن URL Frontend صحيح في Program.cs
2. أن الـ Frontend يستخدم HTTPS (وليس HTTP)

### Database Migration
عند أول deploy للـ Backend، سيتم تطبيق migrations تلقائياً بفضل الكود في Program.cs:

```csharp
if (app.Environment.IsProduction())
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }
}
```

## استكشاف الأخطاء

### إذا فشل Backend Build
1. تحقق من Logs في Render Dashboard
2. تأكد من أن Dockerfile path صحيح: `backend/BookQuoteApi/Dockerfile`
3. تأكد من Docker Build Context: `backend/BookQuoteApi`

### إذا فشل Frontend Build
1. تحقق من أن Root Directory صحيح: `frontend/book-quote-ui`
2. تأكد من Build Command: `npm install && npm run build`
3. تأكد من Publish Directory: `frontend/book-quote-ui/dist/book-quote-ui/browser`

### إذا كان Health Check يفشل
1. تحقق من أن HealthController.cs موجود
2. تحقق من أن الـ endpoint على `/healthz` (وليس `/health`)
3. تحقق من Logs في Render

## الدعم
إذا واجهت أي مشاكل، تحقق من:
- Render Dashboard Logs
- Browser Console (للـ Frontend)
- Network Tab في Developer Tools
