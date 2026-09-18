import { lazy, Suspense, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import CustomCursor from './components/CustomCursor'
import CursorTrail from './components/CursorTrail'
import Navbar from './components/Navbar'
import ScrollCanvas from './components/ScrollCanvas'
import LoadingScreen from './components/LoadingScreen'
import SectionSidebar from './components/SectionSidebar'
import HudOverlay from './components/HudOverlay'
import LaserScrollLine from './components/LaserScrollLine'
import { ThemeProvider } from './context/ThemeContext'

const PageContent = lazy(() => import('./components/PageContent'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleDone = useCallback(() => setLoading(false), [])

  return (
    <ThemeProvider>
      {/* Boot loader — unmounts cleanly after exit animation */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={handleDone} />}
      </AnimatePresence>

      {/* Main site — rendered behind loader, shown after it exits */}
      <div
        className="relative min-h-screen text-ink"
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        <SectionSidebar />
        <HudOverlay />
        <ScrollCanvas />
        <AnimatedBackground />
        <LaserScrollLine />
        <Navbar />
        <Suspense fallback={null}>
          <PageContent />
        </Suspense>
        <CustomCursor />
        <CursorTrail />
      </div>
    </ThemeProvider>
  )
}
