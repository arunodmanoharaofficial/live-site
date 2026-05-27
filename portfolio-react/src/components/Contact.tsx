import { m } from 'framer-motion'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <m.div
          className={`${styles.card} glass-card`}
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
        >
          <div className={styles.glow1} aria-hidden="true" />
          <div className={styles.glow2} aria-hidden="true" />

          {/* Terminal header */}
          <div className={styles.termHeader}>
            <span className={styles.dot} style={{background:'#ff5f57'}}/>
            <span className={styles.dot} style={{background:'#febc2e'}}/>
            <span className={styles.dot} style={{background:'#28c840'}}/>
            <span className={styles.termLabel}>handshake.init</span>
          </div>

          <div className={styles.body}>
            <div className={styles.left}>
              <span className="section-label">05. Contact</span>
              <h2 className="section-heading">
                Initiate Secure <span className="hl">Handshake</span>
              </h2>
              <p className={styles.desc}>
                Architecting security-first products or auditing infrastructure hardening?
                Transmit a request and obtain secure confirmation within 24 hours.
              </p>

              <div className={styles.infoRows}>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>email</span>
                  <a href="mailto:contact@arunod.us" className={styles.infoVal}>contact@arunod.us</a>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>university</span>
                  <span className={styles.infoVal}>SLIIT University, Sri Lanka</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>status</span>
                  <span className={styles.infoValGreen}>
                    <span className="status-dot" style={{width:'7px',height:'7px'}}/>
                    Open for Collaboration
                  </span>
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  href="mailto:contact@arunod.us?subject=Secure%20Handshake%20Initiated"
                  className="btn btn-primary"
                >📨 Transmit Encrypted Email</a>
                <a
                  href="https://www.linkedin.com/in/arunod-manohara-7613b6230/"
                  target="_blank" rel="noreferrer noopener"
                  className="btn btn-ghost"
                >🔗 Secure Protocol (LinkedIn)</a>
              </div>

              <small className={styles.note}>
                🔒 All transmissions validated via TLS endpoint encryption protocols.
              </small>
            </div>

            {/* Decorative terminal */}
            <div className={styles.right} aria-hidden="true">
              <div className={styles.miniTerm}>
                <div className={styles.miniTermH}>
                  <span className={styles.miniDot}/>
                  <span className={styles.miniLabel}>secure_channel.sh</span>
                </div>
                <div className={styles.miniTermBody}>
                  {[
                    '$ ./handshake --init',
                    '> Generating RSA-4096 keypair…',
                    '> TLS 1.3 session established',
                    '> Channel encrypted ✓',
                    '> Awaiting your message…',
                    '',
                    '$ _',
                  ].map((line, i) => (
                    <p key={i} className={line.startsWith('$') ? styles.cmd : line.startsWith('>') ? styles.info : styles.blank}>
                      {line || <span>&nbsp;</span>}
                    </p>
                  ))}
                  <p className={styles.cmd}>$ <span className={styles.termCursor}>▋</span></p>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
