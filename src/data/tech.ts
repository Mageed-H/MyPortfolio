export type TechItem = {
  name: string
  category: 'Mobile' | 'Language' | 'Backend' | 'Database' | 'AI/ML'
}

export const techStack: TechItem[] = [
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Dart', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Machine Learning', category: 'AI/ML' },
]
