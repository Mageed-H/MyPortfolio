export type Project = {
  id: string
  title: string
  description: string
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'mental-health',
    title: 'Mental Health Monitoring App',
    description:
      'Cross-platform app that tracks wellbeing signals and surfaces insights using Flutter on the client, FastAPI on the backend, and ML models such as SVM and XGBoost.',
    stack: ['Flutter', 'FastAPI', 'SVM', 'XGBoost'],
  },
  {
    id: 'pos-inventory',
    title: 'Desktop POS & Inventory System',
    description:
      'Offline-first desktop point-of-sale and inventory toolkit built with Flutter and SQLite for reliable local operations and stock control.',
    stack: ['Flutter', 'SQLite'],
  },
]
