"use client";
import styles from './FloatingEmojis.module.css'

/**
 * Floating decorative emojis — cybersecurity/dev themed
 * All pointer-events: none so they never block clicks
 * Animations are pure CSS for zero JS overhead
 * Respects prefers-reduced-motion via CSS
 */
const EMOJIS = [
  // [emoji, top%, left%, size-rem, animClass, duration, delay]
  { e: '🔒', top:  8,  left:  5,  s: 1.9, a: 'float1', dur: 12, del: 0    },
  { e: '💻', top: 14,  left: 88,  s: 2.2, a: 'float2', dur: 15, del: -3   },
  { e: '⚡', top: 28,  left:  2,  s: 1.6, a: 'float3', dur: 10, del: -7   },
  { e: '🛡️', top: 35,  left: 92,  s: 2.0, a: 'float1', dur: 14, del: -2   },
  { e: '🔑', top: 52,  left:  7,  s: 1.7, a: 'float2', dur: 11, del: -5   },
  { e: '🐧', top: 55,  left: 90,  s: 2.1, a: 'float3', dur: 13, del: -9   },
  { e: '🌐', top: 70,  left:  3,  s: 1.8, a: 'float1', dur: 16, del: -1   },
  { e: '🚀', top: 72,  left: 93,  s: 1.9, a: 'float2', dur: 12, del: -4   },
  { e: '🔍', top: 82,  left: 10,  s: 1.5, a: 'float3', dur: 14, del: -6   },
  { e: '📡', top: 85,  left: 85,  s: 1.7, a: 'float1', dur: 11, del: -8   },
  { e: '💾', top: 43,  left: 50,  s: 1.4, a: 'float2', dur: 18, del: -11  },
  { e: '🎯', top: 62,  left: 48,  s: 1.5, a: 'float3', dur:  9, del: -3.5 },
]

export default function FloatingEmojis() {
  return (
    <div className={styles.root} aria-hidden="true">
      {EMOJIS.map(({ e, top, left, s, a, dur, del }, i) => (
        <span
          key={i}
          className={`${styles.emoji} ${styles[a]}`}
          style={{
            top:               `${top}%`,
            left:              `${left}%`,
            fontSize:          `${s}rem`,
            animationDuration: `${dur}s`,
            animationDelay:    `${del}s`,
          }}
        >
          {e}
        </span>
      ))}
    </div>
  )
}
