import { useEffect, useRef } from 'react'
import styles from './TerminalBg.module.css'
import { useParallax } from '../hooks/useParallax'

export default function TerminalBg() {
  const canvasRef   = useRef<any>(null)
  const parallaxRef = useParallax<HTMLCanvasElement>(-0.06) // slowest layer — deepest depth

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Detect touch/mobile — reduce particle workload significantly
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches

    const dpr = Math.min(isTouch ? 1 : 2, window.devicePixelRatio || 1)
    const ctx = canvas.getContext('2d')

    const COUNT   = isTouch ? 30 : 80   // half particles on mobile
    const MAX_D   = isTouch ? 80 : 130  // shorter connections on mobile
    const MAX_D_SQ = MAX_D * MAX_D
    const SPEED   = isTouch ? 0.2 : 0.3 // slower movement on mobile

    // On mobile cap to ~30fps to halve GPU work
    const FRAME_INTERVAL = isTouch ? 33 : 0
    let lastFrameTs = 0

    let W: number, H: number
    let pts: Array<{x:number,y:number,vx:number,vy:number,r:number}> = []
    let raf: number

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const init = () => {
      pts = Array.from({ length: COUNT }, () => ({
        x:  rand(0, W), y:  rand(0, H),
        vx: rand(-SPEED, SPEED), vy: rand(-SPEED, SPEED),
        r:  rand(1, 2.5)
      }))
    }

    const draw = (ts = 0) => {
      raf = requestAnimationFrame(draw)

      // Frame throttle for mobile
      if (FRAME_INTERVAL > 0 && ts - lastFrameTs < FRAME_INTERVAL) return
      lastFrameTs = ts

      ctx!.clearRect(0, 0, W, H)

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dSq = dx * dx + dy * dy
          if (dSq < MAX_D_SQ) {
            const alpha = (1 - Math.sqrt(dSq) / MAX_D) * 0.18
            ctx!.strokeStyle = `rgba(0,255,159,${alpha})`
            ctx!.lineWidth = 0.7
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // Draw dots
      for (const p of pts) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(0,255,159,0.55)'
        ctx!.fill()
      }

      // Update positions
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      }
    }

    resize()
    init()
    draw()

    const onResize = () => { resize() }
    window.addEventListener('resize', onResize)

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0 }
      else if (!raf) draw()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <>
      <canvas ref={(el) => { canvasRef.current = el; parallaxRef.current = el }} className={styles.canvas} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
    </>
  )
}
