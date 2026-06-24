"use client";

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { useAnimatedTitle } from '../hooks/useAnimatedTitle'

// Critical above-fold components — loaded eagerly
import Navbar        from '../components/layout/Navbar'
import Hero          from '../components/sections/Hero'
import TerminalBg    from '../components/ui/TerminalBg'
import CursorGlow    from '../components/ui/CursorGlow'
import ScrollProgress from '../components/ui/ScrollProgress'
import FloatingEmojis from '../components/ui/FloatingEmojis'

// Below-fold sections — lazy loaded for faster initial paint
const About        = dynamic(() => import('../components/sections/About'), { ssr: true })
const TechStack    = dynamic(() => import('../components/sections/TechStack'), { ssr: true })
const Playlist     = dynamic(() => import('../components/sections/Playlist'), { ssr: true })
const Social       = dynamic(() => import('../components/sections/Social'), { ssr: true })
const Contact      = dynamic(() => import('../components/sections/Contact'), { ssr: true })
const Footer       = dynamic(() => import('../components/layout/Footer'), { ssr: true })

// Overlay / feature components — only loaded when triggered
const Terminal     = dynamic(() => import('../components/ui/Terminal'), { ssr: false })
const MatrixRain   = dynamic(() => import('../components/ui/MatrixRain'), { ssr: false })

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [showMatrix,   setShowMatrix]   = useState(false)

  /* ── Animated browser tab title ──────────────────── */
  useAnimatedTitle()

  /* ── Keyboard shortcuts ──────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
