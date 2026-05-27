import { m } from 'framer-motion'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <m.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Arunod Manohara</span>
          <span className={styles.brandTag}>@root:~$</span>
        </div>
        
        <div className={styles.founderText}>
           Founder of <strong>GODSOFDATA</strong> Dev Team 🔱💻🚀
        </div>
        <p className={styles.copy}>
          <span className={styles.green}>©</span> {year} — All systems operating nominally under{' '}
          <span className={styles.accent}>zero trust architecture.</span>
        </p>
        <div className={styles.links}>
          <a href="https://github.com/arunodmanoharaofficial" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/arunod-manohara-7613b6230/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:contact@arunod.us">Email</a>
        </div>
      </div>
    </m.footer>
  )
}
