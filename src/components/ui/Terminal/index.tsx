"use client";
import { useState, useEffect, useRef, useCallback } from 'react'
import { m } from 'framer-motion'
import styles from './Terminal.module.css'

const PROMPT = 'root@arunod.us:~$'

/* ── Helpers ──────────────────────────────────────────────── */
const line  = (text, color = 'default') => ({ text, color })
const blank = () => line('')

/* ── Command definitions ──────────────────────────────────── */
const COMMANDS = {
  help: () => ({
    lines: [
      line('╔══════════════════════════════════════════════╗', 'primary'),
      line('║        ARUNOD.US  TERMINAL  v3.0.0          ║', 'primary'),
      line('╚══════════════════════════════════════════════╝', 'primary'),
      blank(),
      line('PROFILE', 'accent'),
      line('  whoami              User profile & identity', 'muted'),
      line('  cat about.txt       Bio & background', 'muted'),
      line('  skills              Tech stack & proficiency', 'muted'),
      line('  contact             Contact information', 'muted'),
      blank(),
      line('FILESYSTEM', 'accent'),
      line('  ls                  List root directory', 'muted'),
      line('  ls projects         List all projects', 'muted'),
      line('  cat <file>          Read a file', 'muted'),
      blank(),
      line('NETWORK TOOLS', 'accent'),
      line('  ssh arunod.us       Open SSH session', 'muted'),
      line('  nmap arunod.us      Port scan the server', 'muted'),
      line('  ping arunod.us      ICMP echo request', 'muted'),
      blank(),
      line('UTILITIES', 'accent'),
      line('  github              Open GitHub profile', 'muted'),
      line('  linkedin            Open LinkedIn', 'muted'),
      line('  date                Current timestamp', 'muted'),
      line('  uname -a            System information', 'muted'),
      line('  matrix              Enter the Matrix 🟢', 'muted'),
      line('  clear               Clear the screen', 'muted'),
      line('  exit                Close terminal', 'muted'),
      blank(),
      line('TIP  ↑ / ↓ history  •  Tab autocomplete  •  ESC close', 'dim'),
    ],
  }),

  whoami: () => ({
    lines: [
      line('  _   _   ___   _   _   _  _   ___   ___  ', 'primary'),
      line(' / \\ | \\ | __| | | | \\ | |/ | |_ _| | _ \\ ', 'primary'),
      line('| O ||   \\| _|  | | |  \\| | \\ |  | |  |   / ', 'primary'),
      line(' \\_/ |_|\\_|___| |_| |_|\\__|_|\\_||___| |_|_\\ ', 'primary'),
      blank(),
      line('NAME        Arunod Manohara', 'default'),
      line('HANDLE      @arunodmanoharaofficial', 'accent'),
      line('ROLE        Web Developer & Cybersecurity Student', 'default'),
      line('UNIVERSITY  SLIIT University, Sri Lanka 🇱🇰', 'default'),
      line('EMAIL       contact@arunod.us', 'primary'),
      line('STATUS      ● AVAILABLE for freelance work', 'success'),
      blank(),
      line('SPECIALIZATIONS', 'accent'),
      line('  → WireGuard VPN orchestration with Docker', 'muted'),
      line('  → Network security hardening & threat modeling', 'muted'),
      line('  → Full-stack secure web applications', 'muted'),
      line('  → Automated penetration testing scripts', 'muted'),
      blank(),
      line('Type "contact" to get in touch.', 'dim'),
    ],
  }),

  ls: (args) => {
    if (args[0] === 'projects') {
      return {
        lines: [
          line('total 5 projects', 'muted'),
          blank(),
          line('drwxr-xr-x  secure-vpn-orchestrator/', 'accent'),
          line('            Automated WireGuard VPN provisioning with Docker', 'muted'),
          blank(),
          line('drwxr-xr-x  threat-shield/', 'accent'),
          line('            Real-time network anomaly & threat detection daemon', 'muted'),
          blank(),
          line('drwxr-xr-x  cryptowall/', 'accent'),
          line('            AES-256-GCM encrypted file storage with FUSE mount', 'muted'),
          blank(),
          line('drwxr-xr-x  port-warden/', 'accent'),
          line('            Custom port-knocking daemon written in Rust', 'muted'),
          blank(),
          line('drwxr-xr-x  arunod.us/', 'primary'),
          line('            This portfolio (React + Vite + Framer Motion)', 'muted'),
        ],
      }
    }
    return {
      lines: [
        line('drwxr-xr-x   projects/    .ssh/    .config/', 'default'),
        line('-rw-r--r--   about.txt    skills.txt    contact.txt', 'default'),
        blank(),
        line('Use "ls projects" to list all projects.', 'dim'),
      ],
    }
  },

  cat: (args) => {
    const file = (args[0] || '').toLowerCase()
    if (file === 'about.txt') {
      return {
        lines: [
          line('# about.txt', 'accent'),
          blank(),
          line("Hi, I'm Arunod Manohara — a passionate Web Developer and", 'default'),
          line('Cybersecurity student at SLIIT University, Sri Lanka.', 'default'),
          blank(),
          line('I build secure, high-performance systems that bridge the gap', 'default'),
          line('between elegant front-end experiences and hardened network', 'default'),
          line('infrastructure.', 'default'),
          blank(),
          line('My philosophy: premium aesthetics + cryptographic integrity.', 'primary'),
          blank(),
          line('When I\'m not writing code, I\'m running CTF challenges,', 'default'),
          line('studying VPN architecture, or exploring new attack surfaces.', 'default'),
        ],
      }
    }
    if (file === 'skills.txt') return COMMANDS.skills()
    if (file === 'contact.txt') return COMMANDS.contact()
    if (!file) {
      return { lines: [line('usage: cat <filename>', 'error'), line('files: about.txt  skills.txt  contact.txt', 'dim')] }
    }
    return {
      lines: [
        line(`cat: ${args[0]}: No such file or directory`, 'error'),
        line('Available: about.txt, skills.txt, contact.txt', 'dim'),
      ],
    }
  },

  skills: () => ({
    lines: [
      line('# TECH STACK & PROFICIENCY', 'accent'),
      blank(),
      line('LANGUAGES', 'primary'),
      line('  Python    ████████████████████  95%', 'default'),
      line('  JS / TS   ████████████████████  90%', 'default'),
      line('  Java      ████████████████░░░░  80%', 'default'),
      line('  Rust      ████████████░░░░░░░░  60%', 'default'),
      line('  Bash      ██████████████████░░  88%', 'default'),
      blank(),
      line('SECURITY', 'primary'),
      line('  WireGuard   VPN tunnel design & key management', 'muted'),
      line('  Nmap        Network discovery & port scanning', 'muted'),
      line('  Wireshark   Packet analysis & forensics', 'muted'),
      line('  Metasploit  Pen testing & exploit dev', 'muted'),
      line('  Burp Suite  Web application security testing', 'muted'),
      blank(),
      line('DEVOPS & INFRA', 'primary'),
      line('  Docker  •  Kubernetes  •  Linux  •  Git  •  AWS', 'muted'),
      blank(),
      line('FRAMEWORKS', 'primary'),
      line('  React  •  Vite  •  Node.js  •  Express  •  FastAPI', 'muted'),
    ],
  }),

  contact: () => ({
    lines: [
      line('# CONTACT INFORMATION', 'accent'),
      blank(),
      line('Email      contact@arunod.us', 'primary'),
      line('Website    https://arunod.us', 'accent'),
      line('GitHub     github.com/arunodmanoharaofficial', 'accent'),
      line('LinkedIn   linkedin.com/in/arunod-manohara-7613b6230', 'accent'),
      line('Instagram  @arunodmanoharaofficial', 'muted'),
      line('Location   Sri Lanka 🇱🇰', 'default'),
      blank(),
      line('STATUS     ● Open to freelance & collaborations', 'success'),
      line('RESPONSE   Typically within 24 hours', 'muted'),
      blank(),
      line('Type "github" or "linkedin" to open the links.', 'dim'),
    ],
  }),

  ssh: () => ({
    stream: true,
    delay: 260,
    lines: [
      line('ssh root@arunod.us', 'primary'),
      line('Resolving host arunod.us...', 'muted'),
      line('Connecting to 104.21.47.220:22...', 'muted'),
      line('Exchanging Diffie-Hellman group keys...', 'muted'),
      line('TLS 1.3 — AES-256-GCM cipher negotiated ✓', 'success'),
      line('Host key fingerprint verified (ED25519) ✓', 'success'),
      line('MFA challenge passed ✓', 'success'),
      blank(),
      line('████████████████████ 100%  Connected.', 'primary'),
      blank(),
      line('Welcome to arunod.us — unauthorized access is prohibited.', 'accent'),
      line('Last login: Today, 127.0.0.1', 'dim'),
      blank(),
      line('(You are already connected — this IS the terminal.) 😄', 'muted'),
    ],
  }),

  nmap: () => ({
    stream: true,
    delay: 180,
    lines: [
      line('Starting Nmap 7.93 ( https://nmap.org )', 'muted'),
      line('Initiating SYN Stealth Scan at 20:00', 'muted'),
      line('Scanning arunod.us (104.21.47.220) [65535 ports]', 'muted'),
      blank(),
      line('PORT      STATE   SERVICE       VERSION', 'accent'),
      line('22/tcp    open    ssh           OpenSSH 8.9p1 Ubuntu', 'success'),
      line('80/tcp    open    http          nginx 1.23.4', 'success'),
      line('443/tcp   open    https         nginx 1.23.4 (TLS 1.3)', 'success'),
      line('51820/udp open    wireguard     WireGuard VPN', 'primary'),
      line('3306/tcp  closed  mysql         --', 'muted'),
      line('5432/tcp  closed  postgresql    --', 'muted'),
      blank(),
      line('OS Detection: Linux 5.15 (Ubuntu 22.04 LTS)', 'muted'),
      line('Uptime: 127 days  |  Firewall: ufw [ACTIVE] [STRICT]', 'muted'),
      blank(),
      line('Nmap done: 1 IP (1 host up) scanned in 2.87 seconds', 'dim'),
    ],
  }),

  ping: () => ({
    stream: true,
    delay: 700,
    lines: [
      line('PING arunod.us (104.21.47.220): 56 data bytes', 'muted'),
      line('64 bytes from 104.21.47.220: icmp_seq=0 ttl=56 time=23.1 ms', 'success'),
      line('64 bytes from 104.21.47.220: icmp_seq=1 ttl=56 time=21.8 ms', 'success'),
      line('64 bytes from 104.21.47.220: icmp_seq=2 ttl=56 time=24.5 ms', 'success'),
      line('64 bytes from 104.21.47.220: icmp_seq=3 ttl=56 time=22.7 ms', 'success'),
      blank(),
      line('--- arunod.us ping statistics ---', 'muted'),
      line('4 packets transmitted, 4 received, 0% packet loss', 'success'),
      line('rtt min/avg/max/stddev = 21.8/23.0/24.5/1.1 ms', 'muted'),
    ],
  }),

  github: () => ({
    action: 'open',
    url: 'https://github.com/arunodmanoharaofficial',
    lines: [
      line('Opening github.com/arunodmanoharaofficial...', 'primary'),
      line('Redirecting to GitHub profile ✓', 'success'),
    ],
  }),

  linkedin: () => ({
    action: 'open',
    url: 'https://www.linkedin.com/in/arunod-manohara-7613b6230/',
    lines: [
      line('Opening LinkedIn profile...', 'primary'),
      line('Redirected ✓', 'success'),
    ],
  }),

  date: () => ({
    lines: [line(new Date().toString(), 'primary')],
  }),

  uname: () => ({
    lines: [
      line(
        'Linux arunod.us 5.15.0-89-generic #99-Ubuntu SMP x86_64 GNU/Linux',
        'default'
      ),
    ],
  }),

  matrix: () => ({
    action: 'matrix',
    lines: [
      line('Initializing Matrix protocol...', 'primary'),
      line('Follow the white rabbit. 🐰', 'muted'),
    ],
  }),

  hack: () => ({
    stream: true,
    delay: 120,
    lines: [
      line('Initializing hack sequence...', 'primary'),
      line('Bypassing firewall layers...', 'muted'),
      line('Injecting payload...', 'muted'),
      line('ERROR 403: Cannot hack what is already yours.', 'error'),
      line('You ARE the hacker. 😎', 'success'),
    ],
  }),

  sudo: (args) => {
    const full = args.join(' ')
    if (full.includes('rm -rf')) {
      return {
        lines: [
          line('sudo: rm -rf /: Permission denied', 'error'),
          line('This system is hardened. Incident logged. 🔒', 'muted'),
          line('IP: 127.0.0.1 flagged.', 'error'),
        ],
      }
    }
    if (args[0] === 'su') {
      return {
        lines: [
          line('[sudo] password for root: ', 'muted'),
          line('sudo: 3 incorrect password attempts', 'error'),
          line('You are already root here. Calm down.', 'primary'),
        ],
      }
    }
    return { lines: [line(`sudo: ${full}: command not found`, 'error')] }
  },

  clear: () => ({ action: 'clear', lines: [] }),
  exit:  () => ({ action: 'exit',  lines: [] }),
}

/* Aliases ──────────────────────────────────────────────────── */
const ALIASES = {
  'ls projects':        () => COMMANDS.ls(['projects']),
  'ls -la':             () => COMMANDS.ls([]),
  'cat about.txt':      () => COMMANDS.cat(['about.txt']),
  'cat skills.txt':     () => COMMANDS.skills(),
  'cat contact.txt':    () => COMMANDS.contact(),
  'ssh arunod.us':      () => COMMANDS.ssh(),
  'ssh root@arunod.us': () => COMMANDS.ssh(),
  'nmap arunod.us':     () => COMMANDS.nmap(),
  'nmap -sV arunod.us': () => COMMANDS.nmap(),
  'ping arunod.us':     () => COMMANDS.ping(),
  'uname -a':           () => COMMANDS.uname(),
  'sudo rm -rf /':      () => COMMANDS.sudo(['rm', '-rf', '/']),
  'sudo rm -rf /*':     () => COMMANDS.sudo(['rm', '-rf', '/']),
  'sudo su':            () => COMMANDS.sudo(['su']),
}

const ALL = { ...ALIASES, ...COMMANDS }
const CMD_KEYS = Object.keys(ALL).sort((a, b) => b.length - a.length) // longest first

function findCommand(input) {
  const lower = input.toLowerCase()
  // Exact match first
  if (ALL[lower]) return { fn: ALL[lower], args: [] }
  // Longest prefix
  const key = CMD_KEYS.find(k => lower === k || lower.startsWith(k + ' '))
  if (key) {
    const args = input.slice(key.length).trim().split(/\s+/).filter(Boolean)
    return { fn: ALL[key], args }
  }
  return null
}

/* ── Welcome banner ─────────────────────────────────────────── */
const WELCOME = [
  line('╔═══════════════════════════════════════════════════╗', 'primary'),
  line('║       ARUNOD MANOHARA — SECURE SHELL v3.0        ║', 'primary'),
  line('║         Ctrl+`  to toggle  •  ESC  to close      ║', 'dim'),
  line('╚═══════════════════════════════════════════════════╝', 'primary'),
  blank(),
  line('System : arunod.us  [Linux 5.15 / Ubuntu 22.04]', 'muted'),
  line('Uptime : 127 days, 4 hours, 12 minutes', 'muted'),
  line('Access : AUTHORIZED', 'success'),
  blank(),
  line('Type "help" to list all commands.', 'accent'),
  blank(),
]

/* ── Terminal component ─────────────────────────────────────── */
export default function Terminal({ onClose, onMatrix }) {
  const [output,     setOutput]     = useState(() => WELCOME.map((l, i) => ({ ...l, id: i })))
  const [input,      setInput]      = useState('')
  const [cmdHistory, setCmdHistory] = useState<any[]>([])
  const [histIdx,    setHistIdx]    = useState(-1)
  const [streaming,  setStreaming]  = useState(false)

  const inputRef  = useRef<any>(null)
  const bodyRef   = useRef<any>(null)
  const idCounter = useRef(WELCOME.length)

  const nextId = () => ++idCounter.current

  /* Auto-scroll */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [output])

  /* Focus on open */
  useEffect(() => { inputRef.current?.focus() }, [])

  const addLines = useCallback((lines) => {
    setOutput(prev => [
      ...prev,
      ...lines.map(l => ({ ...l, id: nextId() })),
    ])
  }, [])

  const streamLines = useCallback(async (lines, delay = 200) => {
    setStreaming(true)
    for (const l of lines) {
      await new Promise(r => setTimeout(r, delay))
      setOutput(prev => [...prev, { ...l, id: nextId() }])
    }
    setStreaming(false)
  }, [])

  const run = useCallback(async (cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setCmdHistory(prev => [trimmed, ...prev])
    setHistIdx(-1)

    // Echo the typed command
    addLines([line(`${PROMPT} ${trimmed}`, 'cmd')])

    const found = findCommand(trimmed)
    let result

    if (found) {
      result = found.fn(found.args)
    } else {
      result = {
        lines: [
          line(`bash: ${trimmed}: command not found`, 'error'),
          line('Type "help" for a list of commands.', 'dim'),
        ],
      }
    }

    if (result.action === 'clear') { setOutput([]);  return }
    if (result.action === 'exit')  { onClose();       return }

    if (result.action === 'matrix') {
      addLines(result.lines)
      setTimeout(() => { onClose(); onMatrix() }, 900)
      return
    }

    if (result.action === 'open') {
      addLines(result.lines)
      setTimeout(() => window.open(result.url, '_blank', 'noopener'), 600)
      return
    }

    if (result.stream) {
      await streamLines(result.lines, result.delay ?? 200)
    } else {
      addLines(result.lines)
    }
  }, [addLines, streamLines, onClose, onMatrix])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !streaming) {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(idx)
      setInput(cmdHistory[idx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = CMD_KEYS.find(k => k.startsWith(input) && k !== input)
      if (match) setInput(match)
    }
  }

  return (
    <m.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <m.div
        className={styles.terminal}
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Title bar ── */}
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <button className={`${styles.tl} ${styles.tlRed}`}    onClick={onClose} title="Close" />
            <span   className={`${styles.tl} ${styles.tlYellow}`} />
            <span   className={`${styles.tl} ${styles.tlGreen}`}  />
          </div>
          <span className={styles.title}>root@arunod.us — bash — 120×36</span>
          <span className={styles.titleHint}>ESC · Ctrl+`</span>
        </div>

        {/* ── Body ── */}
        <div
          className={styles.body}
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
        >
          {output.map((l) => (
            <div key={l.id} className={`${styles.line} ${styles[l.color] ?? ''}`}>
              {l.text || '\u00A0'}
            </div>
          ))}

          {/* Input row */}
          <div className={styles.inputRow}>
            <span className={styles.ps1}>{PROMPT}</span>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={streaming}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <span className={`${styles.caret} ${streaming ? styles.caretBlink : ''}`}>▋</span>
          </div>
        </div>
      </m.div>
    </m.div>
  )
}
