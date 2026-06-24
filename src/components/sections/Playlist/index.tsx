"use client";
import { m } from 'framer-motion'
import styles from './Playlist.module.css'

export default function Playlist() {
  return (
    <section id="playlist">
      <div className="container">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        >
          <span className="section-label">03. Playlist</span>
          <h2 className="section-heading">
            <span className="animatedEmoji" aria-label="headphones">🎧</span> My <span className="hl">Playlist</span>
          </h2>
          <p className="section-subtitle" aria-hidden="true">Audio Frequency</p>
          <p className="muted" style={{ marginBottom: '2rem' }}>
            Ambient operational frequencies — Sri Lankan Sounds.
          </p>

          <div className={styles.embedWrap}>
            <div className={styles.embedGlow} aria-hidden="true" />
            <iframe
              src="https://open.spotify.com/embed/playlist/0JPOU2cabJD7ebgLceMKgL?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Sri Lankan Sounds Spotify playlist"
              className={styles.iframe}
            />
            <p className={styles.note}>
              🔒 Spotify integration — rendering via secure iframe sandbox.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  )
}
