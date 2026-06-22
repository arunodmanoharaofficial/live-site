import { useEffect, useRef } from 'react'
import styles from './CursorGlow.module.css'

export default function CursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef      = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced    = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduced || !hasPointer) return

    const container = containerRef.current
    const dot  = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!container || !dot || !ring) return

    // Hide the system cursor globally
    document.documentElement.classList.add('no-cursor')

    // Current & lerped positions
    let cx = -999, cy = -999   // cursor (instant)
    let rx = -999, ry = -999   // ring   (lerped)
    let raf: number | null = null
    let lastParticleTs = 0
    let isMoving = false
    let moveTimer: ReturnType<typeof setTimeout> | null = null

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    /* ── Particle factory ──────────────────────────────── */
    const spawnParticles = (x: number, y: number, count = 1) => {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div')
        p.className = styles.particle
        container.appendChild(p)

        const angle  = Math.random() * Math.PI * 2
        const dist   = Math.random() * 36 + 8
        const dur    = Math.random() * 450 + 350
        const size   = Math.random() * 3.5 + 1
        const rand   = Math.random()
        const color  = rand > 0.78 ? '#00d4ff'
                     : rand > 0.93 ? '#ffffff'
                     : '#00ff9f'
        const tx = Math.cos(angle) * dist
        const ty = Math.sin(angle) * dist

        p.style.cssText = `
          width:${size}px;height:${size}px;
          background:${color};
          box-shadow:0 0 ${size * 2}px ${color};
        `
        // Start at cursor
        p.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`

        p.animate([
          {
            opacity: 0.9,
            transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(1)`
          },
          {
            opacity: 0,
            transform: `translate(calc(${x + tx}px - 50%), calc(${y + ty}px - 50%)) scale(0.15)`
          }
        ], { duration: dur, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' })
          .onfinish = () => p.remove()
      }
    }

    /* ── Main animation loop ───────────────────────────── */
    const frame = (ts: number) => {
      // Dot: instant follow
      dot.style.transform  = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`

      // Ring: smooth lerp lag
      rx = lerp(rx, cx, 0.095)
      ry = lerp(ry, cy, 0.095)
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`

      // Glow: instant
      if (glow) glow.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`

      // Trail particles while moving
      if (isMoving && ts - lastParticleTs > 48) {
        spawnParticles(cx, cy, 1)
        lastParticleTs = ts
      }

      raf = requestAnimationFrame(frame)
    }

    /* ── Event handlers ────────────────────────────────── */
    const onMove = (e: PointerEvent) => {
      cx = e.clientX; cy = e.clientY
      isMoving = true
      if (moveTimer) clearTimeout(moveTimer)
      moveTimer = setTimeout(() => { isMoving = false }, 90)
    }

    const setHover = (on: boolean) => {
      dot.classList.toggle(styles.dotHover, on)
      ring.classList.toggle(styles.ringHover, on)
    }

    const onClick = (e: MouseEvent) => {
      // Click burst: shrink ring + spray 10 particles
      ring.classList.add(styles.ringClick)
      spawnParticles(e.clientX, e.clientY, 10)
      setTimeout(() => ring.classList.remove(styles.ringClick), 320)
    }

    /* ── Attach hover listeners to interactive elements ── */
    const attachInteractive = () => {
      document.querySelectorAll('a, button, [role="button"], .btn, input, label, select').forEach(el => {
        // Use a safe cast or property assignment in TS
        if ((el as any)._hasCustomCursor) return
        ;(el as any)._hasCustomCursor = true
        el.addEventListener('mouseenter', () => setHover(true))
        el.addEventListener('mouseleave', () => setHover(false))
      })
    }

    window.addEventListener('pointermove', onMove as EventListener, { passive: true })
    window.addEventListener('click', onClick as EventListener)
    attachInteractive()

    // Watch for dynamically-added elements — debounced to avoid thrashing during load
    let moTimer: ReturnType<typeof setTimeout> | null = null
    const mo = new MutationObserver(() => {
      if (moTimer) clearTimeout(moTimer)
      moTimer = setTimeout(attachInteractive, 120)
    })
    mo.observe(document.body, { childList: true, subtree: true })

    raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (moveTimer) clearTimeout(moveTimer)
      if (moTimer) clearTimeout(moTimer)
      document.documentElement.classList.remove('no-cursor')
      window.removeEventListener('pointermove', onMove as EventListener)
      window.removeEventListener('click', onClick as EventListener)
      mo.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      {/* Ambient glow */}
      <div ref={glowRef} className={styles.glow} />

      {/* Targeting ring with crosshair ticks */}
      <div ref={ringRef} className={styles.ring}>
        <span className={styles.tickH} />
        <span className={styles.tickV} />
      </div>

      {/* Inner dot */}
      <div ref={dotRef} className={styles.dot} />
    </div>
  )
}
