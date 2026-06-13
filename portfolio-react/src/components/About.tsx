import { m } from 'framer-motion'
import styles from './About.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } }
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } }
}

const stats = [
  { label: 'University',   value: 'SLIIT', sub: 'Sri Lanka',     emoji: '🎓' },
  { label: 'Focus',        value: '∞',     sub: 'Secure Systems', emoji: '🛡️' },
  { label: 'Availability', value: 'OPEN',  sub: 'For Freelance',  emoji: '✅' },
  { label: 'Status',       value: 'ACTIVE',sub: 'Building 24/7',  emoji: '⚡' },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <m.div
          className={styles.wrap}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
        >
          {/* Avatar */}
          <m.div variants={fadeUp} className={styles.avatarWrap}>
            <div className={styles.avatarRing}>
              <div className={styles.avatarRing2}>
                <img
                  src="/profile.jpg"
                  alt="Arunod Manohara"
                  className={styles.avatar}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width={280}
                  height={280}
                />
              </div>
            </div>
            <div className={styles.avatarBadge}>
              <span className="status-dot" style={{ width:'8px', height:'8px' }} />
              <span>Available</span>
            </div>
            {/* Floating decorations */}
            <div className={styles.floatTag} style={{ top:'8%', right:'-5%' }}>
              <span className="terminal-tag">🛡️ Cyber</span>
            </div>
            <div className={styles.floatTag} style={{ bottom:'15%', left:'-10%' }}>
              <span className="terminal-tag">🌐 Dev</span>
            </div>
          </m.div>

          {/* Text */}
          <m.div variants={stagger} className={styles.content}>
            <m.span variants={fadeUp} className="section-label">01. About</m.span>
            <m.h2 variants={fadeUp} className="section-heading">
              About <span className="hl">Arunod Manohara</span>
            </m.h2>
            <m.p variants={fadeUp} className="section-subtitle" aria-hidden="true">
              Operational Dossier 🗂️
            </m.p>

            <m.p variants={fadeUp} className={styles.para}>
              Greetings — I&apos;m <strong>Arunod Manohara</strong>, a dedicated{' '}
              <strong>Web Developer</strong> and advanced{' '}
              <strong>Cybersecurity Student</strong> completing my higher education at{' '}
              <strong>SLIIT University</strong>, Sri Lanka.
            </m.p>

            <m.p variants={fadeUp} className={styles.para}>
              My core engineering capabilities bridge robust back-end/front-end web
              infrastructures with hardened network security implementations. I actively
              construct customized VPN servers, engineer automated threat protection models,
              and audit modern software applications. My operational mission: fuse premium
              aesthetic design with absolute cryptographic integrity.
            </m.p>

            {/* Stats grid */}
            <m.div variants={stagger} className={styles.stats}>
              {stats.map(s => (
                <m.div key={s.label} variants={fadeUp} className={`${styles.statBox} glass-card`}>
                  <span className={styles.statEmoji}>{s.emoji}</span>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statSub}>{s.sub}</span>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
