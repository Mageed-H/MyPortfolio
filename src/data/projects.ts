export type Project = {
  id: string
  title: string
  description: string
  stack: string[]
  architecture: string[]
  highlights: string[]
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'mental-health',
    title: 'Mental Health Monitoring App',
    description:
      'Cross-platform app that tracks wellbeing signals and surfaces insights using Flutter on the client, FastAPI on the backend, and ML models such as SVM and XGBoost.',
    stack: ['Flutter', 'FastAPI', 'Python', 'SVM', 'XGBoost', 'PostgreSQL'],
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
    githubUrl: 'https://github.com/Mageed-H',
  },
  {
    id: 'pos-inventory',
    title: 'Desktop POS & Inventory System',
    description:
      'Offline-first desktop point-of-sale and inventory toolkit built with Flutter and SQLite for reliable local operations and stock control.',
    stack: ['Flutter Desktop', 'Dart', 'SQLite', 'Local Sync', 'Thermal Print'],
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
    githubUrl: 'https://github.com/Mageed-H',
  },
]
