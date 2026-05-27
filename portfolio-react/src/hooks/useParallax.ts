import { useEffect, useRef, useCallback } from 'react'

/**
 * Shared scroll bus — all parallax instances share a single scroll listener
 * instead of each attaching their own. This eliminates redundant
 * addEventListener/removeEventListener + rAF churn.
 */
type ScrollCallback = (scrollY: number) => void

const listeners = new Set<ScrollCallback>()
let ticking = false
let registered = false

function ensureGlobalListener() {
  if (registered) return
  registered = true

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY
        listeners.forEach(cb => cb(y))
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  // No removal — lives for the lifetime of the app (singleton)
}

/**
 * useParallax(speed)
 * Returns a ref to attach to a DOM element.
 * The element will translateY by (scrollY * speed).
 * Negative speed moves UP (classic parallax background effect).
 *
 * All instances share a SINGLE global scroll listener + rAF loop.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.3) {
  const ref = useRef<T | null>(null)

  const handler = useCallback((scrollY: number) => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${scrollY * speed}px)`
    }
  }, [speed])

  useEffect(() => {
    if (!ref.current) return

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ensureGlobalListener()
    listeners.add(handler)

    return () => {
      listeners.delete(handler)
    }
  }, [handler])

  return ref
}
