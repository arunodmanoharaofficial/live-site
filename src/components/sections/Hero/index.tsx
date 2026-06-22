import { useState, useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import styles from './Hero.module.css'
import { useParallax } from '../../../hooks/useParallax'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*'

function useDecodeText(finalText: string, delay = 200) {
  const [display, setDisplay] = useState(finalText) // SSR-friendly default
  const rafRef = useRef<any>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setDisplay(finalText); return }

    // Start with empty, then animate in
    setDisplay('')
    let lastUpdate = 0
    const THROTTLE = 50 // update at most every 50ms (~20fps) instead of 60fps

    const timeout = setTimeout(() => {
      const duration = 1000 // reduced from 1800ms
      let start: number | null = null

      const step = (ts: number) => {
        if (!start) start = ts
        const t = Math.min((ts - start) / duration, 1)

        // Throttle updates to reduce main-thread work
        if (ts - lastUpdate > THROTTLE || t >= 1) {
          lastUpdate = ts
          const progress = Math.floor(t * finalText.length)
          const out = Array.from(finalText).map((ch, i) =>
            i < progress ? ch : (ch === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0])
          ).join('')
          setDisplay(out)
        }

        if (t < 1) rafRef.current = requestAnimationFrame(step)
        else setDisplay(finalText)
      }

      rafRef.current = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [finalText, delay])

  return display
}

function Typewriter({ lines, className }) {
  const [displayed, setDisplayed] = useState<any[]>([])
  const [charIdx, setCharIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setDisplayed(lines); return }

    if (lineIdx >= lines.length) return

    const cur = lines[lineIdx]
    if (charIdx <= cur.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev]
          next[lineIdx] = cur.slice(0, charIdx)
          return next
        })
        setCharIdx(c => c + 1)
      }, 35)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, 120)
      return () => clearTimeout(t)
    }
  }, [charIdx, lineIdx, lines])

  return (
    <div className={className}>
      {lines.map((_, i) => (
        <div key={i} className={styles.typeLine}>
          <span className={styles.prompt}>&gt;</span>
          <span>{displayed[i] ?? ''}</span>
          {lineIdx === i && charIdx <= lines[i].length && (
            <span className={styles.cursor}>▋</span>
          )}
        </div>
      ))}
    </div>
  )
}

const TERMINAL_LINES = [
  "sys.init() — Booting portfolio v3.0",
  "user: Arunod Manohara",
  "role: Web Developer & Cybersecurity Student",
  "base: SLIIT University, Sri Lanka",
  "stack: Python | Java | Docker | WireGuard",
  "status: OPEN_FOR_FREELANCE",
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.16,1,0.3,1] as any } }
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

export default function Hero() {
  const name = useDecodeText('Arunod Manohara', 800)
  const [ghRepo, setGhRepo] = useState({ name: 'Loading…', href: '#', updated: '' })

  // Parallax refs — each layer drifts at a different speed
  const orb1Ref = useParallax<HTMLDivElement>(-0.18)  // slow upward drift
  const orb2Ref = useParallax<HTMLDivElement>(-0.28)  // slightly faster

  useEffect(() => {
    const CACHE_KEY = 'gh_repo_cache'
    const CACHE_TTL = 60 * 60 * 1000 // 1 hour in ms

    // Try serving from cache first (synchronous, no network)
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { ts, data } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL) {
          setGhRepo(data)
          return // skip network request
        }
      }
    } catch { /* ignore corrupt cache */ }

    // Defer network fetch until browser is idle — don't block LCP
    const doFetch = () => {
      fetch('https://api.github.com/users/arunodmanoharaofficial/repos?sort=updated&per_page=1')
        .then(r => r.json())
        .then(([repo]) => {
          if (!repo) return
          const diff = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / 1000)
          const units: [string, number][] = [['yr',31536000],['mo',2592000],['d',86400],['h',3600],['m',60],['s',1]]
          let ago = 'just now'
          for (const [l,s] of units) { const v = Math.floor(diff/s); if (v>=1){ago=`${v}${l} ago`;break} }
          const result = { name: repo.full_name, href: repo.html_url, updated: `Updated ${ago}` }
          setGhRepo(result)
          try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: result })) }
          catch { /* storage full — ignore */ }
        })
        .catch(() => setGhRepo({ name: 'arunodmanoharaofficial', href: 'https://github.com/arunodmanoharaofficial', updated: '' }))
    }

    // Use requestIdleCallback if available, else defer 2s
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(doFetch, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    } else {
      const t = setTimeout(doFetch, 2000)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>

        {/* ── Left Column ── */}
        <m.div
          className={styles.left}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* System badge */}
          <m.div variants={fadeUp} className={styles.sysBadge}>
            <span className="chip active">System Online</span>
            <span className="chip">v3.0.0</span>
          </m.div>

          {/* Name */}
          <m.p variants={fadeUp} className={styles.hi} aria-hidden="true">
            Hello, I&apos;m
            <span className={styles.waveEmoji} aria-label="wave">👋</span>
          </m.p>
          <m.h1 variants={fadeUp} className={styles.title}>
            <m.span
              className={styles.name}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              title="Arunod Manohara"
            >
              {name || 'Arunod Manohara'}
            </m.span>
            <span className={styles.titleRole}>Web Developer &amp; Cybersecurity Student</span>
          </m.h1>

          {/* Hashtag & Founder */}
          <m.div variants={fadeUp} className={styles.hashtagBox}>
            <p className={styles.hashtag}>#arunodmanoharaofficial</p>
            <p className={styles.founder}>
              Founder of <span className={styles.godsofdata}>GODSOFDATA</span> Dev Team 🔱👑🚀
            </p>
          </m.div>

          {/* Terminal typewriter */}
          <m.div variants={fadeUp} className={styles.terminal}>
            <div className={styles.termHeader}>
              <span className={styles.dot} style={{ background:'#ff5f57' }} />
              <span className={styles.dot} style={{ background:'#febc2e' }} />
              <span className={styles.dot} style={{ background:'#28c840' }} />
              <span className={styles.termTitle}>terminal — zsh</span>
            </div>
            <Typewriter lines={TERMINAL_LINES} className={styles.termBody} />
          </m.div>

          {/* CTAs */}
          <m.div variants={fadeUp} className={styles.ctas}>
            <a href="#social" className="btn btn-primary">🔗 Establish Connection</a>
            <a href="#about" className="btn btn-ghost">📁 Access Dossier</a>
            <a
              href="https://arunod.us/resume.pdf"
              target="_blank" rel="noreferrer noopener"
              className="btn btn-ghost"
            >📄 View Resume</a>
          </m.div>
        </m.div>

        {/* ── Right Column ── */}
        <m.div
          className={styles.right}
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1], delay:0.4 }}
        >
          {/* Featured Project Card */}
          <div className={`${styles.projectCard} glass-card`}>
            <div className={styles.cardGlow} />
            <div className={styles.cardHeader}>
              <span className="chip active">Active Deployment</span>
              <h2 className={styles.cardTitle}>Secure VPN Orchestrator</h2>
              <p className={styles.cardTagline}>Automated VPN provisioning with Docker + WireGuard</p>
            </div>

            <div className={styles.cardMedia}>
              <div className={styles.mediaTerminal}>
                <div className={styles.mediaTermHeader}>
                  <span />
                  <span className={styles.mediaTermLabel}>system.log</span>
                </div>
                <div className={styles.mediaTermBody}>
                  <p><span className={styles.green}>✓</span> WireGuard tunnel established</p>
                  <p><span className={styles.green}>✓</span> Docker containers healthy</p>
                  <p><span className={styles.cyan}>●</span> Monitoring: ACTIVE</p>
                  <p><span className={styles.green}>✓</span> Encryption: AES-256</p>
                  <p className={styles.typing}><span className={styles.green}>$</span> awaiting input<span className={styles.cursor}>▋</span></p>
                </div>
              </div>
            </div>

            <div className={styles.stackBadges}>
              {['Python', 'Docker', 'WireGuard', 'Linux'].map(t => (
                <span key={t} className="terminal-tag">{t}</span>
              ))}
            </div>

            <div className={styles.cardActions}>
              <a href="https://arunod.us/" target="_blank" rel="noopener" className="btn btn-primary">Launch Live</a>
              <a href="https://github.com/arunodmanoharaofficial" target="_blank" rel="noopener" className="btn btn-ghost">Source Code</a>
            </div>
          </div>

          {/* Status Panel */}
          <div className={`${styles.statusPanel} glass-card`}>
            <div className={styles.statusRow}>
              <span className="status-dot" />
              <span className={styles.statusText}>Open for freelance</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statusRow}>
              <span className={styles.ghIcon}>⬡</span>
              <div>
                <a href={ghRepo.href} className={styles.ghLink} target="_blank" rel="noopener">{ghRepo.name}</a>
                <small className="muted">{ghRepo.updated}</small>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.pillRow}>
              <span className="muted" style={{fontSize:'0.72rem'}}>Active research:</span>
              <span className="pill">Kubernetes</span>
              <span className="pill">Threat Modeling</span>
              <span className="pill">Rust</span>
            </div>
          </div>
        </m.div>
      </div>

      {/* Decorative floating orbs — parallax depth layers */}
      <div ref={orb1Ref} className={styles.orb1} aria-hidden="true" />
      <div ref={orb2Ref} className={styles.orb2} aria-hidden="true" />
    </section>
  )
}
