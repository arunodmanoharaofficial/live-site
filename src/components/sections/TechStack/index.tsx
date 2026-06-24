"use client";
import { m } from 'framer-motion'
import styles from './TechStack.module.css'

const skills = [
  {
    name: 'HTML5', level: 'Expert', pct: 92, color: '#E44D26',
    icon: (
      <svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19 114L9 2h110l-10 112-45 12z"/><path fill="#F16529" d="M64 117l36-10 9-96H64z"/><path fill="#EBEBEB" d="M64 52H46l-1-14h19V24H29l4 42h31zm0 36l-15-4-1-11H34l2 22 28 8z"/><path fill="#fff" d="M64 52v14h17l-2 18-15 4v14l28-8 3-42zm0-28v14h33l1-14z"/></svg>
    )
  },
  {
    name: 'CSS3', level: 'Expert', pct: 90, color: '#1572B6',
    icon: (
      <svg viewBox="0 0 128 128"><path fill="#1572B6" d="M19 114L9 1h110l-10 113-45 13z"/><path fill="#33A9DC" d="M64 117l37-10 9-96H64z"/><path fill="#fff" d="M64 51h18l1-14H64V23h35l-4 42H64zm0 36l-15-4-1-11H34l2 22 28 8z"/><path fill="#EBEBEB" d="M64 23v14H31l-1-14zm-.1 28H49l-1 14h16z"/><path fill="#fff" d="M81 65l-2 18-15 4v14l28-8 3-28z"/></svg>
    )
  },
  {
    name: 'JavaScript', level: 'Advanced', pct: 85, color: '#F0DB4F',
    icon: (
      <svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1 1h126v126H1z"/><path fill="#323330" d="M116 97c-1-6-5-11-16-15-4-2-8-3-9-6l-.2-3.7c.8-3.3 4.8-4.4 7.9-3.4 2 .68 3.9 2.2 5.1 4.7 5.4-3.5 5.4-3.5 9.2-5.9-1.4-2.1-2.1-3.1-3-4-3.2-3.6-7.7-5.5-14.8-5.4l-3.7.5c-3.5.9-6.9 2.7-8.9 5.2-5.9 6.7-4.2 18.5 3 23.3 7.1 5.3 17.5 6.5 18.9 11.5 1.3 6.1-4.5 8.1-10.2 7.4-4.2-.9-6.6-3-9.1-6.9-4.7 2.7-4.7 2.7-9.5 5.5 1.1 2.5 2.3 3.6 4.3 5.8 9 9.2 31.8 8.7 35.8-5.2.2-.5 1.3-3.7.4-8.6zM69 59H57v30c0 6.4.3 12.3-.7 14.1-1.7 3.6-6.2 3.1-8.2 2.4-2.1-1-3.1-2.5-4.3-4.5l-.7-1.1-9.5 5.8c1.6 3.2 3.9 6.1 6.9 7.9 4.5 2.7 10.5 3.5 16.7 2.1 4.1-1.2 7.6-3.7 9.4-7.4 2.7-4.9 2.1-10.9 2.1-17.4l.1-32.2z"/></svg>
    )
  },
  {
    name: 'Python', level: 'Advanced', pct: 90, color: '#3776AB',
    icon: (
      <svg viewBox="0 0 128 128"><linearGradient id="pa" x1="70" y1="1237" x2="170" y2="1151" gradientTransform="matrix(.56 0 0 -.57 -29 708)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient><linearGradient id="pb" x1="209" y1="1099" x2="173" y2="1150" gradientTransform="matrix(.56 0 0 -.57 -29 708)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient><path fill="url(#pa)" d="M63 12c-4.2.02-8.3.38-11.8 1-10.5 1.85-12.3 5.7-12.3 12.8v9.4h24.7v3.1H30c-7.2 0-13.5 4.3-15.4 12.5-2.3 9.4-2.4 15.3 0 25.1 1.8 7.3 5.9 12.5 13.1 12.5h8.5V77.2c0-8.2 7-15.3 15.4-15.3h24.7c6.9 0 12.3-5.7 12.3-12.5V25.8c0-6.7-5.6-11.7-12.3-12.8-4.2-.7-8.6-1-12.9-1zm-13.4 7.6c2.6 0 4.6 2.1 4.6 4.7 0 2.6-2.1 4.7-4.6 4.7-2.6 0-4.6-2.1-4.6-4.7 0-2.6 2.1-4.7 4.6-4.7z" transform="translate(0 10)"/><path fill="url(#pb)" d="M91.7 38.4V49.4c0 8.5-7.2 15.7-15.4 15.7H51.6C44.9 65.1 39.3 71 39.3 77.6v23.5c0 6.7 5.8 10.6 12.3 12.5 7.8 2.3 15.3 2.7 24.7 0 6.2-1.8 12.3-5.4 12.3-12.5v-9.4H63.9V89h37c7.2 0 9.9-5 12.3-12.5 2.6-7.7 2.5-15.2 0-25.1-1.8-7.1-5.2-12.5-12.3-12.5H91.7zm-14 49.6c2.6 0 4.6 2.1 4.6 4.7 0 2.6-2.1 4.7-4.6 4.7-2.6 0-4.6-2.1-4.6-4.7 0-2.6 2.1-4.7 4.6-4.7z" transform="translate(0 10)"/></svg>
    )
  },
  {
    name: 'Java', level: 'Proficient', pct: 80, color: '#EA2D2E',
    icon: (
      <svg viewBox="0 0 128 128"><path fill="#0074BD" d="M47.6 98s-4.8 2.8 3.4 3.7c9.9 1.1 14.9 1 25.8-1.1 0 0 2.9 1.8 6.9 3.4-24.4 10.5-55.3-.6-36.1-6zm-3-13.7s-5.3 4 2.8 4.8c10.6 1.1 18.9 1.2 33.4-1.6 0 0 2 2 5.1 3.1-29.5 8.6-62.4.7-41.3-6.3z"/><path fill="#EA2D2E" d="M69.8 61.3c6 6.9-1.6 13.2-1.6 13.2s15.3-7.9 8.3-17.8c-6.6-9.2-11.6-13.8 15.6-29.6 0 .001-42.7 10.7-22.3 34.2z"/><path fill="#0074BD" d="M102.1 108.2s3.5 2.9-3.9 5.2c-14.1 4.3-58.7 5.6-71.1.2-4.5-1.9 3.9-4.6 6.5-5.2 2.7-.6 4.3-.5 4.3-.5-5-3.5-32 6.9-13.7 9.8 49.8 8.1 90.8-3.6 77.9-9.5zM49.9 70.3s-22.7 5.4-8 7.3c6.2.8 18.5.6 30-.3 9.4-.8 18.8-2.5 18.8-2.5s-3.3 1.4-5.7 3.1c-23 6.1-67.5 3.2-54.7-3 10.8-5.2 19.6-4.6 19.6-4.6zm40.7 22.7c23.4-12.2 12.6-23.9 5-22.3-1.8.4-2.7.7-2.7.7s.7-1.1 2-1.5c14.9-5.3 26.5 15.5-4.8 23.7 0-.003.4-.3.5-.6z"/><path fill="#EA2D2E" d="M76.5 1.6S89.5 14.6 64.2 34.5c-20.3 16-4.6 25.1 0 35.6C52.4 59.4 43.7 50 49.5 41.3 58 28.4 81.7 22.2 76.5 1.6z"/><path fill="#0074BD" d="M52.2 126c22.5 1.4 57-.8 57.8-11.4 0 0-1.6 4-18.6 7.2-19.2 3.6-42.8 3.2-56.9.9 0 .001 2.9 2.4 17.7 3.3z"/></svg>
    )
  },
  {
    name: 'Docker', level: 'Proficient', pct: 78, color: '#00AADA',
    icon: (
      <svg viewBox="0 0 128 128"><path fill="#3A4D54" d="M73.8 50.8h11.3v11.5h5.7c2.6 0 5.3-.5 7.8-1.3 1.2-.4 2.6-1 3.8-1.7-1.6-2.1-2.4-4.7-2.6-7.3-.3-3.5.4-8.1 2.8-10.8l1.2-1.4 1.4 1.1c3.6 2.9 6.5 6.8 7.1 11.4 4.3-1.3 9.3-1 13.1 1.2l1.5.9-.8 1.6c-3.2 6.2-9.9 8.2-16.4 7.8-9.8 24.3-31 35.8-56.8 35.8-13.3 0-25.5-5-32.5-16.8l-.1-.2-1-2.1c-2.4-5.2-3.1-10.9-2.6-16.6l.2-1.7h9.6V50.8h11.3V39.6h22.5V28.3h13.5v22.5z"/><path fill="#00AADA" d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c6 6.8 15.4 10.8 27.2 10.8 25 0 46.2-11.1 55.5-35.9 6.7.7 13.1-1 16-6.7-4.5-2.7-10.5-1.8-13.9-.1z"/></svg>
    )
  },
  {
    name: 'Linux', level: 'Advanced', pct: 88, color: '#FCC624',
    icon: (
      <svg viewBox="0 0 128 128">
        {/* Tux body */}
        <ellipse cx="64" cy="90" rx="28" ry="32" fill="#1a1a1a"/>
        {/* White belly */}
        <ellipse cx="64" cy="95" rx="18" ry="22" fill="#f5f5f5"/>
        {/* Head */}
        <ellipse cx="64" cy="44" rx="24" ry="26" fill="#1a1a1a"/>
        {/* Face / beak area */}
        <ellipse cx="64" cy="52" rx="14" ry="10" fill="#FCC624"/>
        {/* Eyes */}
        <circle cx="57" cy="42" r="4" fill="#fff"/>
        <circle cx="71" cy="42" r="4" fill="#fff"/>
        <circle cx="58" cy="43" r="2" fill="#1a1a1a"/>
        <circle cx="72" cy="43" r="2" fill="#1a1a1a"/>
        {/* Eye shine */}
        <circle cx="59" cy="42" r="0.8" fill="#fff"/>
        <circle cx="73" cy="42" r="0.8" fill="#fff"/>
        {/* Beak */}
        <ellipse cx="64" cy="55" rx="7" ry="4" fill="#e8a000"/>
        {/* Feet */}
        <ellipse cx="52" cy="120" rx="9" ry="5" fill="#FCC624"/>
        <ellipse cx="76" cy="120" rx="9" ry="5" fill="#FCC624"/>
        {/* Wings */}
        <ellipse cx="36" cy="88" rx="10" ry="22" fill="#1a1a1a" transform="rotate(-10 36 88)"/>
        <ellipse cx="92" cy="88" rx="10" ry="22" fill="#1a1a1a" transform="rotate(10 92 88)"/>
      </svg>
    )
  },
  {
    name: 'WireGuard', level: 'Proficient', pct: 75, color: '#88171A',
    icon: (
      <svg viewBox="0 0 128 128"><path fill="#88171A" d="M64 8 L120 38 L120 90 L64 120 L8 90 L8 38 Z"/><path fill="#fff" d="M64 22L108 44v40L64 106 20 84V44z" fillOpacity=".15"/><text x="64" y="74" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700" fontFamily="monospace">WG</text></svg>
    )
  },
]

export default function TechStack() {
  return (
    <section id="stack">
      <div className="container">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }}
        >
          <m.div
            className={styles.head}
            variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }}
          >
            <span className="section-label">02. Stack</span>
            <h2 className="section-heading">Technical <span className="hl">Skills &amp; Tools</span></h2>
            <p className="section-subtitle" aria-hidden="true">Technical Architecture ⚙️</p>
            <p className="muted">Core tools deployed in production workflows.</p>
          </m.div>

          <div className={styles.grid}>
            {skills.map((s, i) => (
              <m.div
                key={s.name}
                className={`${styles.card} glass-card`}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show:   { opacity: 1, y: 0,  scale: 1, transition: { delay: i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] } }
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className={styles.iconWrap} style={{ '--skill-color': s.color } as any}>
                  {s.icon}
                </div>
                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span className={styles.skillLevel}>{s.level}</span>
                  </div>
                  <div className={styles.meterTrack} role="img" aria-label={`${s.name} proficiency ${s.pct}%`}>
                    <m.div
                      className={styles.meterFill}
                      style={{ '--skill-color': s.color } as any}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
                    />
                    <span className={styles.meterPct}>{s.pct}%</span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  )
}
