# Cinematic Upgrade Plan — MyPortfolio

خطة تطوير الموقع لمستوى سينمائي متكامل، مرتبة حسب الأولوية والتأثير.

---

## [1] Loading Screen — Boot Sequence  STATUS: PENDING
الوصف: شاشة تحميل تظهر عند أول زيارة تشبه boot sequence لنظام سيبراني.
النص:
  Initializing system...
  Loading modules... [████████░░] 80%
  Establishing secure connection...
  Portfolio v1.0 — Ready.
ثم تختفي بـ animation وتكشف الـ Hero.
التقنية: React state في App.tsx + Framer Motion exit animation
التأثير: عالي جداً | الجهد: منخفض

---

## [2] Cursor Trail — Spark Particles  STATUS: PENDING
الوصف: الماوس يترك خلفه جسيمات صغيرة تتلاشى مثل الشرارات بلون Cyan/Emerald.
التقنية: Canvas 2D overlay فوق الصفحة، requestAnimationFrame خفيف
التأثير: عالي جداً | الجهد: متوسط

---

## [3] Glitch Text Effect  STATUS: PENDING
الوصف: العنوان الرئيسي يمر بـ glitch effect عشوائي كل 5-8 ثوانٍ.
التقنية: CSS animation + JS random char replacement
التأثير: عالي | الجهد: منخفض

---

## [4] Section Side Labels  STATUS: PENDING
الوصف: شريط رأسي ثابت على يسار الشاشة يعرض رقم ولقب القسم الحالي.
مثال: [ 01 — HERO ] / [ 02 — TECH ] / [ 03 — PROJECTS ]
يتغير تلقائياً مع الـ scroll.
التقنية: IntersectionObserver + Framer Motion
التأثير: عالي | الجهد: منخفض

---

## [5] Horizontal Scroll — Projects Section  STATUS: PENDING
الوصف: قسم المشاريع يتحرك أفقياً أثناء الـ scroll العمودي — cinematic reel.
التقنية: useScroll + useTransform من Framer Motion
التأثير: عالي جداً | الجهد: عالي

---

## ملاحظات
- كل مرحلة تختبر بـ: npx tsc -b && npm run build قبل الـ commit
- كل مرحلة ترفع على GitHub بـ commit منفرد وواضح
- الأداء أولوية — لا يضاف ثقل غير ضروري
