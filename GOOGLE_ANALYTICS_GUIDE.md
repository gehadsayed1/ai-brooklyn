# دليل استخدام Google Analytics في الموقع

## ما تم إضافته:

### 1. إضافة Google Analytics في `index.html`
تم إضافة كود Google Analytics مباشرة في ملف `index.html` لضمان التحميل السريع.

### 2. إنشاء Composable للتحكم في Google Analytics
تم إنشاء ملف `src/composables/useGoogleAnalytics.js` يحتوي على:

#### الوظائف المتاحة:
- `trackPageView(pagePath)` - تتبع زيارة الصفحات
- `trackEvent(eventName, parameters)` - تتبع الأحداث المخصصة
- `trackButtonClick(buttonName, location)` - تتبع النقر على الأزرار
- `trackFormSubmission(formName)` - تتبع إرسال النماذج
- `trackDownload(fileName)` - تتبع تحميل الملفات
- `trackScrollDepth(depth)` - تتبع عمق التمرير
- `trackTimeOnPage(timeInSeconds)` - تتبع الوقت على الصفحة

### 3. تتبع الصفحات تلقائياً
تم إضافة تتبع الصفحات في `src/router/index.js` ليتتبع كل انتقال بين الصفحات تلقائياً.

## كيفية الاستخدام:

### في أي مكون Vue:

```javascript
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics'

export default {
  setup() {
    const { trackEvent, trackButtonClick } = useGoogleAnalytics()
    
    const handleButtonClick = () => {
      // تتبع النقر على زر
      trackButtonClick('contact_button', 'header')
    }
    
    const handleFormSubmit = () => {
      // تتبع إرسال نموذج
      trackEvent('form_submit', {
        form_name: 'contact_form',
        page: 'home'
      })
    }
    
    return {
      handleButtonClick,
      handleFormSubmit
    }
  }
}
```

### أمثلة على التتبع:

#### 1. تتبع النقر على الأزرار:
```javascript
trackButtonClick('get_started', 'hero_section')
```

#### 2. تتبع تحميل الملفات:
```javascript
trackDownload('brochure.pdf')
```

#### 3. تتبع الأحداث المخصصة:
```javascript
trackEvent('video_play', {
  video_title: 'product_demo',
  video_duration: 120
})
```

#### 4. تتبع عمق التمرير:
```javascript
// في onMounted أو عند التمرير
trackScrollDepth(75) // 75% من الصفحة
```

## ما يفعله Google Analytics:

1. **تتبع الزوار**: عدد الزوار، مصادر الزيارات، الأجهزة المستخدمة
2. **تتبع الصفحات**: أكثر الصفحات زيارة، وقت البقاء على الصفحة
3. **تتبع الأحداث**: النقرات، التحميلات، إرسال النماذج
4. **تتبع التحويلات**: الأهداف المحققة، مسار المستخدم
5. **تحليل السلوك**: كيف يتفاعل المستخدمون مع الموقع

## البيانات المتاحة في Google Analytics:

- **الزوار**: العدد، المصادر، الأجهزة، المتصفحات
- **الصفحات**: الأكثر زيارة، وقت البقاء، معدل الارتداد
- **الأحداث**: النقرات، التحميلات، التفاعلات
- **التحويلات**: الأهداف، مسارات التحويل
- **الجمهور**: العمر، الجنس، الموقع الجغرافي

## نصائح مهمة:

1. **الخصوصية**: تأكد من إضافة سياسة الخصوصية للموقع
2. **GDPR**: إذا كان لديك زوار من أوروبا، أضف موافقة على ملفات تعريف الارتباط
3. **الأداء**: Google Analytics محسن ولا يؤثر على سرعة الموقع
4. **البيانات**: البيانات تظهر في Google Analytics بعد 24-48 ساعة

## مراقبة النتائج:

1. اذهب إلى [Google Analytics](https://analytics.google.com)
2. اختر الموقع الخاص بك
3. استخدم التقارير المختلفة لمراقبة الأداء
4. اضبط الأهداف والتحويلات حسب احتياجاتك
