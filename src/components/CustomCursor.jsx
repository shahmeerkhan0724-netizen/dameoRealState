import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import siteConfig from '../config/siteConfig'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMotion'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const finePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = usePrefersReducedMotion()
  const enabled = siteConfig.customCursor && finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.body.classList.add('has-custom-cursor')
    gsap.set([dot, ring], { autoAlpha: 0, xPercent: -50, yPercent: -50 })
    gsap.set(dot, { width: 7, height: 7 })
    gsap.set(ring, { width: 34, height: 34 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    let visible = false

    const move = (event) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 })
      }
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }

    const hide = () => {
      visible = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 })
    }

    const handleOver = (event) => {
      const target = event.target.closest('a, button, [data-cursor="hover"]')
      if (!target) return
      gsap.to(ring, { scale: 1.75, borderColor: 'rgba(201, 162, 75, 0.9)', duration: 0.3 })
      gsap.to(dot, { scale: 0.35, duration: 0.3 })
    }

    const handleOut = (event) => {
      const target = event.target.closest('a, button, [data-cursor="hover"]')
      if (!target) return
      gsap.to(ring, { scale: 1, borderColor: 'rgba(201, 162, 75, 0.55)', duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerout', handleOut)
    document.documentElement.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerout', handleOut)
      document.documentElement.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor-ring" ref={ringRef} />
      <span className="custom-cursor-dot" ref={dotRef} />
    </div>
  )
}
