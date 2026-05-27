import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? (scrollTop / docH) * 100 : 0
      bar.style.width = pct.toFixed(2) + '%'
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />
}
