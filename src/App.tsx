import { lazy, Suspense } from 'react'
import AnimatedBackground from './components/AnimatedBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import ScrollCanvas from './components/ScrollCanvas'
import { ThemeProvider } from './context/ThemeContext'

const PageContent = lazy(() => import('./components/PageContent'))

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-ink">
        <ScrollCanvas />
        <AnimatedBackground />
        <Navbar />
        <Suspense fallback={null}>
          <PageContent />
        </Suspense>
        <CustomCursor />
      </div>
    </ThemeProvider>
  )
}
