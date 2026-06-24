"use client";
import { m } from 'framer-motion'
import styles from './Social.module.css'

const socials = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '/arunodmanoharaofficial',
    href: 'https://github.com/arunodmanoharaofficial',
    color: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.85.09-.67.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.47.11 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.69.95.69 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '@arunodmanohara',
    href: 'https://www.linkedin.com/in/arunod-manohara-7613b6230/',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 2H3.55A1.56 1.56 0 0 0 2 3.6v16.8A1.56 1.56 0 0 0 3.55 22h16.9A1.56 1.56 0 0 0 22 20.4V3.6A1.56 1.56 0 0 0 20.45 2zm-11 17H6.68V9.87h2.77Zm-1.39-9.54a1.61 1.61 0 1 1 1.61-1.61 1.61 1.61 0 0 1-1.61 1.61ZM19 19h-2.77v-4.47c0-1.07-.38-1.8-1.34-1.8a1.45 1.45 0 0 0-1.36 1 1.82 1.82 0 0 0-.09.65V19h-2.76s.04-7.27 0-8.13H13v1.15a2.74 2.74 0 0 1 2.49-1.37c1.82 0 3.18 1.19 3.18 3.74Z"/></svg>
    )
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    handle: '@arunodmanohara',
    href: 'https://twitter.com/arunodmanohara',
    color: '#1D9BF0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6.04c-.77.34-1.6.57-2.46.68a4.28 4.28 0 0 0 1.88-2.36 8.56 8.56 0 0 1-2.71 1.04 4.29 4.29 0 0 0-7.34 2.93c0 .34.04.67.1 1a12.16 12.16 0 0 1-8.83-4.48 4.29 4.29 0 0 0 1.32 5.72 4.23 4.23 0 0 1-1.94-.54v.06c0 2 1.4 3.77 3.33 4.16a4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97 8.6 8.6 0 0 1-5.34 1.84c-.35 0-.7-.02-1.04-.06a12.14 12.14 0 0 0 18.69-10.2c0-.18 0-.36-.01-.54a8.62 8.62 0 0 0 2.12-2.2Z"/></svg>
    )
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '/arunodmanoharaofficial',
    href: 'https://www.instagram.com/arunodmanoharaofficial',
    color: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm5 3.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2zm0 2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2zM17.85 6.6a1.15 1.15 0 1 0 1.15 1.15 1.15 1.15 0 0 0-1.15-1.15z"/></svg>
    )
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: '@arunodmanohara',
    href: 'https://www.facebook.com/share/1G4SKRrsj8/',
    color: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.15 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62.7 0 1.45.12 2.15.23v2.37h-1.21c-1.19 0-1.56.74-1.56 1.49v1.8h2.65l-.42 2.9h-2.23V22c4.78-.78 8.44-4.93 8.44-9.93Z"/></svg>
    )
  },
  {
    id: 'spotify',
    name: 'Spotify',
    handle: 'Arunod Manohara',
    href: 'https://open.spotify.com/user/31o6pgalotkdzvbczitx56mghigi',
    color: '#1DB954',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.371 0 0 5.371 0 12c0 6.629 5.371 12 12 12s12-5.371 12-12C24 5.371 18.629 0 12 0zm5.483 17.318a.747.747 0 0 1-1.027.247c-2.812-1.722-6.356-2.111-10.534-1.157a.746.746 0 0 1-.325-1.456c4.659-1.045 8.633-.602 11.73 1.312a.746.746 0 0 1 .256 1.054zm1.467-3.262a.93.93 0 0 1-1.28.309c-3.213-1.964-8.107-2.532-11.887-1.386a.93.93 0 0 1-.533-1.78c4.295-1.289 9.78-.645 13.437 1.566.432.264.569.83.263 1.29zm.124-3.389a1.115 1.115 0 0 1-1.536.37c-3.668-2.222-9.266-2.428-12.632-1.33a1.115 1.115 0 0 1-.647-2.133c3.932-1.195 10.199-.946 14.473 1.523a1.115 1.115 0 0 1 .342 1.57z"/></svg>
    )
  },
]

export default function Social() {
  return (
    <section id="social">
      <div className="container">
        <m.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6 }}
          style={{ marginBottom:'2.5rem' }}
        >
          <span className="section-label">04. Social</span>
          <h2 className="section-heading">Connect &amp; <span className="hl">Social Links</span></h2>
          <p className="section-subtitle" aria-hidden="true">🛰️ Telemetry Vectors</p>
          <p className="muted">Establish contact across all channels.</p>
        </m.div>

        <div className={styles.grid}>
          {socials.map((s, i) => (
            <m.a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener me"
              aria-label={s.name}
              className={`${styles.card} glass-card`}
              style={{ '--social-color': s.color } as any}
              initial={{ opacity:0, y:30, scale:0.95 }}
              whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.07, duration:0.5, ease:[0.16,1,0.3,1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.iconBox}>
                {s.icon}
              </div>
              <div className={styles.text}>
                <strong className={styles.sName}>{s.name}</strong>
                <span className={styles.sHandle}>{s.handle}</span>
              </div>
              <div className={styles.arrow}>→</div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  )
}
