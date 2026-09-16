import { lazy, Suspense } from 'react'
import AnimatedBackground from './components/AnimatedBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

const ScrollCanvas = lazy(() => import('./components/ScrollCanvas'))

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative h-svh overflow-hidden text-ink">
        <AnimatedBackground />
        <CustomCursor />
        <Navbar />
        <Suspense fallback={null}>
          <ScrollCanvas />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}
