"use client";
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import styles from './not-found.module.css'

/* ── Fake traceroute hops ─────────────────────────── */
const TRACE_HOPS = [
  { hop: 1,  host: 'gateway.local',         ip: '192.168.1.1',    ms: '1.2'  },
  { hop: 2,  host: 'isp-router.local',      ip: '10.0.0.1',       ms: '8.4'  },
  { hop: 3,  host: 'core-router-01.net',    ip: '72.14.219.1',    ms: '14.7' },
  { hop: 4,  host: '*',                     ip: null,              ms: null   },
  { hop: 5,  host: '*',                     ip: null,              ms: null   },
  { hop: 6,  host: 'DESTINATION HOST UNREACHABLE', ip: null,       ms: null   },
]

const REDIRECT_SECS = 8

export default function NotFound() {
  const router    = useRouter()
  const pathname  = usePathname()
  const [hops,    setHops]    = useState<any[]>([])      // visible traceroute lines
  const [counter, setCounter] = useState(REDIRECT_SECS)
  const [phase,   setPhase]   = useState('boot')  // boot | trace | countdown | redirect

  /* ── Phase 1: boot message ───────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setPhase('trace'), 900)
    return () => clearTimeout(t)
  }, [])

  /* ── Phase 2: stream traceroute hops ─────────────── */
  useEffect(() => {
    if (phase !== 'trace') return

    let i = 0
    const interval = setInterval(() => {
      if (i >= TRACE_HOPS.length) { clearInterval(interval); return }
      setHops(prev => [...prev, TRACE_HOPS[i]])
      i++
      if (i >= TRACE_HOPS.length) {
        clearInterval(interval)
        setTimeout(() => setPhase('countdown'), 600)
      }
    }, 480)

    return () => clearInterval(interval)
  }, [phase])

  /* ── Phase 3: countdown → redirect ──────────────── */
  useEffect(() => {
    if (phase !== 'countdown') return

    const tick = setInterval(() => {
      setCounter(c => {
        if (c <= 1) {
          clearInterval(tick)
          setPhase('redirect')
          return 0
        }
        return c - 1
      })
    }, 1000)

    return () => clearInterval(tick)
  }, [phase])

  /* ── Auto-navigate home ──────────────────────────── */
  useEffect(() => {
    if (phase === 'redirect') {
      const t = setTimeout(() => router.push('/'), 500)
      return () => clearTimeout(t)
    }
  }, [phase, router])

  return (
    <div className={styles.page}>
      {/* Scanlines */}
      <div className={styles.scanlines} aria-hidden="true" />

      {/* Red glitch overlay */}
      <div className={styles.glitch} aria-hidden="true" />

      <m.div
        className={styles.terminal}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* ── Title bar ── */}
        <div className={styles.titleBar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
          <span className={styles.barTitle}>KERNEL PANIC — arunod.us</span>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>

          {/* BSOD-style header */}
          <m.div
            className={styles.panicHeader}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className={styles.errorCode}>ERROR 0x00000404</p>
            <p className={styles.errorTitle}>HOST_NOT_FOUND</p>
          </m.div>

          <div className={styles.divider} />

          {/* Error details */}
          <m.div
            className={styles.details}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className={styles.detailLine}>
              <span className={styles.key}>Module    </span>
              <span className={styles.val}>http.resolver</span>
            </p>
            <p className={styles.detailLine}>
              <span className={styles.key}>Function  </span>
              <span className={styles.val}>resolveRoute()</span>
            </p>
            <p className={styles.detailLine}>
              <span className={styles.key}>Address   </span>
              <span className={styles.val}>{pathname}</span>
            </p>
            <p className={styles.detailLine}>
              <span className={styles.key}>Status    </span>
              <span className={styles.err}>UNREACHABLE</span>
            </p>
          </m.div>

          <div className={styles.divider} />

          {/* Traceroute */}
          <AnimatePresence>
            {phase !== 'boot' && (
              <m.div
                className={styles.trace}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className={styles.traceTitle}>
                  traceroute to {typeof window !== 'undefined' ? window.location.hostname : 'localhost'}, 6 hops max
                </p>
                {hops.map((hop, i) => (
                  <m.p
                    key={i}
                    className={styles.hop}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className={styles.hopNum}>{String(hop.hop).padStart(2, ' ')}</span>
                    {hop.host === '*' ? (
                      <span className={styles.hopTimeout}>
                        {'  *        *        *    Request timeout'}
                      </span>
                    ) : hop.ip ? (
                      <>
                        <span className={styles.hopHost}> {hop.host}</span>
                        <span className={styles.hopIp}> ({hop.ip})</span>
                        <span className={styles.hopMs}> {hop.ms} ms</span>
                      </>
                    ) : (
                      <span className={styles.hopErr}> {hop.host}</span>
                    )}
                  </m.p>
                ))}
              </m.div>
            )}
          </AnimatePresence>

          {/* Countdown & reconnect */}
          <AnimatePresence>
            {(phase === 'countdown' || phase === 'redirect') && (
              <m.div
                className={styles.reconnect}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.divider} />

                <p className={styles.reconnectLine}>
                  <span className={styles.spinner}>◈</span>
                  {' '}Attempting to reconnect to arunod.us...
                </p>
                <p className={styles.reconnectLine}>
                  <span className={styles.ok}>✓</span>
                  {' '}Gateway reachable
                </p>
                <p className={styles.reconnectLine}>
                  <span className={styles.ok}>✓</span>
                  {' '}DNS resolved → 104.21.47.220
                </p>
                <p className={styles.redirectLine}>
                  {'> '}Redirecting to <span className={styles.url}>arunod.us/</span>
                  {phase === 'countdown' && (
                    <span className={styles.countdown}> in {counter}s</span>
                  )}
                  {phase === 'redirect' && (
                    <span className={styles.ok}> ✓</span>
                  )}
                </p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Manual home button */}
          <div className={styles.actions}>
            <button className={styles.homeBtn} onClick={() => router.push('/')}>
              <span>&lt;/&gt;</span> Return to arunod.us
            </button>
          </div>
        </div>
      </m.div>

      {/* Page number label */}
      <p className={styles.pageLabel}>404 // PAGE_NOT_FOUND</p>
    </div>
  )
}
