"use client";
import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import styles from './Globe.module.css'

/* Marker locations: [latitude, longitude] */
const MARKERS = [
  { location: [6.93, 79.84]   as [number, number], size: 0.12 },  // Colombo, Sri Lanka (home — larger)
  { location: [37.78, -122.41] as [number, number], size: 0.06 },  // San Francisco
  { location: [51.51, -0.13]  as [number, number], size: 0.06 },  // London
  { location: [35.68, 139.69] as [number, number], size: 0.06 },  // Tokyo
  { location: [50.11, 8.68]   as [number, number], size: 0.06 },  // Frankfurt
  { location: [1.35, 103.82]  as [number, number], size: 0.06 },  // Singapore
]

/* Animated arcs connecting Colombo to global nodes */
const ARCS = [
  { from: [6.93, 79.84] as [number, number], to: [37.78, -122.41] as [number, number] },  // Colombo → SF
  { from: [6.93, 79.84] as [number, number], to: [51.51, -0.13]   as [number, number] },  // Colombo → London
  { from: [6.93, 79.84] as [number, number], to: [35.68, 139.69]  as [number, number] },  // Colombo → Tokyo
  { from: [6.93, 79.84] as [number, number], to: [50.11, 8.68]    as [number, number] },  // Colombo → Frankfurt
  { from: [6.93, 79.84] as [number, number], to: [1.35, 103.82]   as [number, number] },  // Colombo → Singapore
  { from: [51.51, -0.13] as [number, number], to: [37.78, -122.41] as [number, number] }, // London → SF
]

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Respect reduced-motion preference
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let phi = 0
    let width = container.offsetWidth
    let rafId: number

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.25, 0.18],
      markerColor: [0, 1, 0.62],
      glowColor: [0, 0.5, 0.3],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0, 0.9, 0.6],
      arcWidth: 0.4,
      arcHeight: 0.3,
    })

    /* Animation loop — v2 uses globe.update() instead of onRender */
    const animate = () => {
      if (!pointerInteracting.current) phi += reduced ? 0.002 : 0.005
      globe.update({
        phi: phi + pointerMovement.current,
        width: width * 2,
        height: width * 2,
      })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    /* Responsive resize via ResizeObserver */
    const ro = new ResizeObserver(([entry]) => {
      if (entry) width = entry.contentRect.width
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
      ro.disconnect()
    }
  }, [])

  /* Pointer handlers for drag-to-rotate */
  const onPointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerMovement.current * 200
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }

  const onPointerUp = () => {
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (pointerInteracting.current !== null) {
      pointerMovement.current = (e.clientX - pointerInteracting.current) / 200
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      pointerMovement.current = (e.touches[0].clientX - pointerInteracting.current) / 100
    }
  }

  return (
    <div ref={containerRef} className={styles.globeWrap}>
      <canvas
        ref={canvasRef}
        className={styles.globe}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        style={{ cursor: 'grab' }}
      />
      <div className={styles.globeGlow} aria-hidden="true" />
    </div>
  )
}
