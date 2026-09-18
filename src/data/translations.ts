export type Locale = 'en' | 'ar'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      tech: 'Tech',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      badge: 'Software Engineer',
      heading: 'Cross-platform & Backend Development',
      subheading:
        'I design and ship resilient products across mobile, desktop, and APIs — from Flutter clients to FastAPI services, data stores, and ML-backed features.',
      viewProjects: 'View projects',
      getInTouch: 'Get in touch',
      stats: {
        experience: 'Years of Experience',
        projects: 'Projects Shipped',
        tech: 'Technologies',
      },
      explore: 'Explore',
    },
    tech: {
      badge: 'Tech stack',
      heading: 'Tools I use to ship end-to-end',
      subtitle:
        'A focused set of technologies spanning clients, APIs, persistence, and applied machine learning.',
    },
    projects: {
      badge: 'Projects',
      heading: 'Selected work',
      subtitle:
        'A couple of builds that connect product UX with solid backend and data foundations.',
      scrollHint: 'Scroll',
      inspectHint: 'Click to inspect architecture ↗',
      modal: {
        deepDive: 'Architecture Deep-Dive',
        architectureFlow: 'System Architecture Flow',
        highlights: 'Engineering Highlights',
        techStack: 'Technology Stack:',
        status: 'STATUS: PRODUCTION_READY',
        sourceCode: 'Source Code',
        close: 'Close View [ESC]',
      },
      items: {
        'mental-health': {
          title: 'Mental Health Monitoring App',
          description:
            'Cross-platform app that tracks wellbeing signals and surfaces insights using Flutter on the client, FastAPI on the backend, and ML models such as SVM and XGBoost.',
          architecture: [
            'Flutter UI (Reactive Client & State Management)',
            'Async FastAPI Gateway (REST & WebSockets)',
            'Inference Pipeline (Feature extraction + SVM/XGBoost classification)',
            'Secure Persistence (PostgreSQL with telemetry partitioning)',
          ],
          highlights: [
            'Engineered offline-first local biometric caching with zero data loss',
            'Trained and deployed lightweight ML classification pipelines with >91% accuracy',
            'Sub-50ms inference latency for real-time mental wellbeing score calculation',
          ],
        },
        'pos-inventory': {
          title: 'Desktop POS & Inventory System',
          description:
            'Offline-first desktop point-of-sale and inventory toolkit built with Flutter and SQLite for reliable local operations and stock control.',
          architecture: [
            'Flutter Desktop Shell (Optimized for Keyboard/Barcode Scanners)',
            'Local Embedded Database (ACID-compliant SQLite engine)',
            'Transaction Journaling & Real-time Stock Reconciliation',
            'Thermal Printer Driver integration via ESC/POS protocol',
          ],
          highlights: [
            'Designed zero-latency local transaction processing with instant barcode lookup',
            'Implemented transactional rollback mechanism preventing stock discrepancies',
            'Complete offline independence with background batch cloud synchronization',
          ],
        },
      },
    },
    contact: {
      badge: 'Contact',
      heading: "Let's build something solid",
      subtitle:
        'Open to collaborations, product roles, and backend / cross-platform engineering work.',
      copyright: 'Software Engineer — Cross-platform & Backend',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      tech: 'التقنيات',
      projects: 'المشاريع',
      contact: 'تواصل معي',
    },
    hero: {
      badge: 'مهندس برمجيات',
      heading: 'تطوير التطبيقات متعددة المنصات والأنظمة الخلفية',
      subheading:
        'أصمم وأبني منتجات وأنظمة رقمية عالية الأداء والمرونة عبر الهواتف، الحواسيب، والخدمات الخلفية — من واجهات Flutter إلى خوادم FastAPI، قواعد البيانات، وتقنيات تعلم الآلة.',
      viewProjects: 'مشاهدة المشاريع',
      getInTouch: 'تواصل معي',
      stats: {
        experience: 'سنوات من الخبرة',
        projects: 'مشاريع مكتملة',
        tech: 'تقنيات معتمدة',
      },
      explore: 'استكشف',
    },
    tech: {
      badge: 'الترسانة التقنية',
      heading: 'الأدوات التي أعتمدها لبناء الحلول البرمجية',
      subtitle:
        'مجموعة أدوات متكاملة تغطي تطوير الواجهات، خوادم الـ APIs، قواعد البيانات، ونماذج تعلم الآلة التطبيقية.',
    },
    projects: {
      badge: 'المشاريع',
      heading: 'أعمال ومشاريع مختارة',
      subtitle:
        'نماذج عملية تجسد الربط بين تجربة المستخدم السلسة والأساسات البرمجية المتينة للأنظمة الخلفية.',
      scrollHint: 'تمرير',
      inspectHint: 'انقر لعرض معمارية النظام ↗',
      modal: {
        deepDive: 'التحليل المعماري للنظام',
        architectureFlow: 'مخطط تدفق وهيكلة النظام',
        highlights: 'الإنجازات والحلول الهندسية',
        techStack: 'حزمة التقنيات المستخدمة:',
        status: 'الحالة: جاهز للإنتاج',
        sourceCode: 'الكود المصدري',
        close: 'إغلاق العرض [ESC]',
      },
      items: {
        'mental-health': {
          title: 'تطبيق متابعة الصحة النفسية والرفاه',
          description:
            'تطبيق متعدد المنصات يرصد مؤشرات الصحة النفسية ويحللها بدقة باستخدام Flutter للواجهات، وFastAPI للأنظمة الخلفية، ونماذج تعلم آلي مثل SVM وXGBoost.',
          architecture: [
            'واجهات Flutter (عميل تفاعلي مع إدارة حالة سريعة)',
            'بوابة FastAPI غير متزامنة (REST & WebSockets)',
            'مسار استدلال الذكاء الاصطناعي (استخراج الخصائص وتصنيف SVM/XGBoost)',
            'تخزين آمن ومجزأ للمعلومات (PostgreSQL مع تقسيم القياسات عن بعد)',
          ],
          highlights: [
            'هندسة تخزين محلي يعمل بدون إنترنت (Offline-First) مع ضمان عدم فقدان البيانات',
            'تدريب ونشر نماذج تصنيف ذكاء اصطناعي خفيفة وسريعة بدقة تجاوزت 91%',
            'زمن استجابة فائق السرعة أقل من 50 مللي ثانية لحساب تقييم الحالة لحظياً',
          ],
        },
        'pos-inventory': {
          title: 'نظام نقاط البيع وإدارة المخزون المكتبي',
          description:
            'نظام ديسكتوب متكامل لنقاط البيع وإدارة المستودعات مبني بـ Flutter وSQLite، مصمم للعمل دون اتصال بالإنترنت بكفاءة عالية.',
          architecture: [
            'واجهة Flutter للحواسيب (مهيأة لاختصارات الكيبورد وقارئ الباركود)',
            'قاعدة بيانات محلية مدمجة (محرك SQLite متوافق مع معايير ACID)',
            'سجل عمليات العمليات المالية ومطابقة المخزون في الوقت الفعلي',
            'تعريف طابعات الإيصالات الحرارية عبر بروتوكول ESC/POS المباشر',
          ],
          highlights: [
            'معالجة المعاملات الفورية بدون أي تأخير مع بحث سريع في الباركود',
            'تطبيق آلية التراجع عند الفشل (Rollback) لمنع أي تضارب في كميات المخزن',
            'استقلالية تامة عن الاتصال بالإنترنت مع مزامنة سحابية مجمعة في الخلفية',
          ],
        },
      },
    },
    contact: {
      badge: 'تواصل معي',
      heading: 'لنقم ببناء شيء استثنائي معاً',
      subtitle:
        'مستعد للتعاون البرمجي، الوظائف الهندسية، وتطوير الأنظمة الخلفية وتطبيقات المنصات المتعددة.',
      copyright: 'مهندس برمجيات — تطوير التطبيقات والأنظمة الخلفية',
    },
  },
} as const
