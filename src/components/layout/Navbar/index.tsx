"use client";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#stack',    label: 'Stack' },
  { href: '#playlist', label: 'Playlist' },
  { href: '#social',   label: 'Social' },
  { href: '#contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      let cur = 'home'
      const y = window.scrollY + 100
      sections.forEach(s => { if ((s as HTMLElement).offsetTop <= y) cur = s.id })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <m.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.nav}>
        {/* Brand */}
        <a href="#home" className={styles.brand}>
          <div className={styles.brandAvatar}>
            <Image src="/profile.jpg" alt="Arunod Manohara" width={34} height={34} />
          </div>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Arunod</span>
            <span className={styles.brandTag}>@root</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav id="primary-menu" className={styles.menu} aria-label="Primary navigation">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`${styles.link} ${active === l.href.slice(1) ? styles.active : ''}`}
              aria-current={active === l.href.slice(1) ? 'page' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            className={styles.mobile}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <m.a
                key={l.href}
                href={l.href}
                className={styles.mobileLink}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setOpen(false)}
              >
                <span className={styles.mobileIdx}>{String(i + 1).padStart(2,'0')}.</span>
                {l.label}
              </m.a>
            ))}
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  )
}
