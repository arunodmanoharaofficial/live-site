import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'

// Critical above-fold components — loaded eagerly
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import TerminalBg    from './components/TerminalBg'
import CursorGlow    from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import FloatingEmojis from './components/FloatingEmojis'

// Below-fold sections — lazy loaded for faster initial paint
const About        = lazy(() => import('./components/About'))
const TechStack    = lazy(() => import('./components/TechStack'))
const Playlist     = lazy(() => import('./components/Playlist'))
const Social       = lazy(() => import('./components/Social'))
const Contact      = lazy(() => import('./components/Contact'))
const Footer       = lazy(() => import('./components/Footer'))

// Overlay / feature components — only loaded when triggered
const Terminal     = lazy(() => import('./components/Terminal'))
const MatrixRain   = lazy(() => import('./components/MatrixRain'))

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [showMatrix,   setShowMatrix]   = useState(false)

  /* ── Keyboard shortcuts ──────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      // Ctrl+` → toggle terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setShowTerminal(prev => !prev)
        setShowMatrix(false)
      }
      // ESC → close whatever is open
      if (e.key === 'Escape') {
        setShowTerminal(false)
        setShowMatrix(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── Handlers ────────────────────────────────────── */
  const openMatrix  = () => { setShowMatrix(true);  setShowTerminal(false) }
  const closeMatrix = () =>   setShowMatrix(false)
  const openTerminal  = () => { setShowTerminal(true);  setShowMatrix(false) }
  const closeTerminal = () =>   setShowTerminal(false)

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Skip link */}
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Always-visible layers */}
      <TerminalBg />
      <FloatingEmojis />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      {/* Page content — below-fold sections are lazy loaded */}
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <TechStack />
          <Playlist />
          <Social />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>

      {/* ── Floating action buttons ───────────────── */}
      {/* Matrix toggle */}
      <m.button
        className="fab-matrix"
        onClick={openMatrix}
        title="Enter the Matrix (visual mode)"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle Matrix rain mode"
      >
        <span className="fab-icon">⬡</span>
        <span className="fab-label">MATRIX</span>
      </m.button>

      {/* Terminal shortcut hint */}
      <m.button
        className="fab-terminal"
        onClick={openTerminal}
        title="Open hidden terminal (Ctrl+`)"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open secret terminal"
      >
        <span className="fab-icon">&gt;_</span>
        <span className="fab-label">TERMINAL</span>
      </m.button>

      {/* ── Overlays ─────────────────────────────── */}
      <AnimatePresence>
        {showTerminal && (
          <Suspense fallback={null}>
            <Terminal
              key="terminal"
              onClose={closeTerminal}
              onMatrix={openMatrix}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMatrix && (
          <Suspense fallback={null}>
            <MatrixRain
              key="matrix"
              onExit={closeMatrix}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
