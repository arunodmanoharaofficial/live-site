"use client";
import { useEffect, useRef } from 'react'

/**
 * Animated browser-tab title — cycles through phrases with a typewriter effect.
 * Pauses when the tab is hidden to save CPU.
 */
const PHRASES = [
  'Arunod Manohara',
  'Web Developer',
  'Cybersecurity Student',
  'SLIIT University',
  'Founder of GODSOFDATA',
]

const BASE = 'Arunod Manohara'
const TYPE_SPEED   = 90   // ms per character when typing
const DELETE_SPEED = 45   // ms per character when deleting
const PAUSE_AFTER  = 2200 // ms to hold the full phrase
const PAUSE_BEFORE = 400  // ms pause before typing next phrase

export function useAnimatedTitle() {
  const rafId = useRef<number>(0)

  useEffect(() => {
    let phraseIdx = 0
    let charIdx   = 0
    let deleting  = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const phrase = PHRASES[phraseIdx]

      if (!deleting) {
        // Typing forward
        charIdx++
        document.title = phrase.slice(0, charIdx)

        if (charIdx === phrase.length) {
          // Finished typing — hold, then start deleting
          timer = setTimeout(() => { deleting = true; tick() }, PAUSE_AFTER)
          return
        }
        timer = setTimeout(tick, TYPE_SPEED)
      } else {
        // Deleting
        charIdx--
        document.title = phrase.slice(0, charIdx) + '▌'

        if (charIdx === 0) {
          // Finished deleting — move to next phrase
          deleting = false
          phraseIdx = (phraseIdx + 1) % PHRASES.length
          timer = setTimeout(tick, PAUSE_BEFORE)
          return
        }
        timer = setTimeout(tick, DELETE_SPEED)
      }
    }

    // Start after LCP window passes (~4s) to avoid competing with initial render
    timer = setTimeout(tick, 4000)

    // Pause animation when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        clearTimeout(timer)
      } else {
        // Resume — reset to base title then restart
        document.title = BASE
        phraseIdx = 0
        charIdx = 0
        deleting = false
        timer = setTimeout(tick, 800)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('visibilitychange', onVisibility)
      document.title = BASE // restore clean title on unmount
    }
  }, [])
}
