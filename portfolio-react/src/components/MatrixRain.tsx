import { useEffect, useRef, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import styles from './MatrixRain.module.css'

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  '0123456789ABCDEF<>/{}[]|\\!@#$%^&*ARUNODMANOHARA'

export default function MatrixRain({ onExit }) {
  const canvasRef = useRef<any>(null)
  const dropsRef  = useRef([])
  const rafRef    = useRef<any>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const fontSize = 15

    // Fade trail
    ctx.fillStyle = 'rgba(6, 10, 6, 0.055)'
    ctx.fillRect(0, 0, width, height)

    ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`

    dropsRef.current.forEach((y, i) => {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)]
      const x    = i * fontSize
      const r    = Math.random()

      // White tip → bright green → dark green trail
      if      (r > 0.98) ctx.fillStyle = '#ffffff'
      else if (r > 0.88) ctx.fillStyle = '#00ff9f'
      else if (r > 0.65) ctx.fillStyle = '#00cc7d'
      else if (r > 0.40) ctx.fillStyle = '#006b3a'
      else                ctx.fillStyle = '#003d1f'

      ctx.fillText(char, x, y * fontSize)

      // Reset drop at bottom with randomness
      if (y * fontSize > height && Math.random() > 0.975) {
        dropsRef.current[i] = 0
      }
      dropsRef.current[i] += 0.55
    })

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const cols = Math.floor(canvas.width / 15)
      dropsRef.current = Array.from({ length: cols }, () =>
        Math.random() * -(canvas.height / 15)
      )
    }

    init()

    // Black flash entrance
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Start slightly delayed for dramatic effect
    const startTimer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(draw)
    }, 120)

    const onResize = () => { init() }
    const onKey    = (e) => { if (e.key === 'Escape') onExit() }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [draw, onExit])

  return (
    <m.div
      className={styles.wrap}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Vignette overlay */}
      <div className={styles.vignette} />

      {/* "You are now in the Matrix" centered message */}
      <m.div
        className={styles.enterMsg}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className={styles.msgLine1}>WELCOME TO THE MATRIX</p>
        <p className={styles.msgLine2}>Follow the white rabbit.</p>
      </m.div>

      {/* Exit controls */}
      <m.div
        className={styles.controls}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span className={styles.hint}>
          Press <kbd className={styles.kbd}>ESC</kbd> to exit the Matrix
        </span>
        <button className={styles.exitBtn} onClick={onExit}>
          [ EXIT MATRIX ]
        </button>
      </m.div>
    </m.div>
  )
}
