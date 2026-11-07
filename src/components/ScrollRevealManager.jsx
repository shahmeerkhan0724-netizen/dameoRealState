import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../hooks/useMotion'
import { useAppReady } from '../context/AppReadyContext'

const variants = {
  'fade-up': { y: 38, x: 0, scale: 1 },
  'fade-left': { y: 0, x: -42, scale: 1 },
  'fade-right': { y: 0, x: 42, scale: 1 },
  zoom: { y: 0, x: 0, scale: 0.94 },
}

/**
 * Powers the lightweight data-animate / data-stagger attribute system.
 * Everything is scoped to the current route and cleaned up automatically.
 */
export default function ScrollRevealManager({ containerRef, pathname }) {
  const ready = useAppReady()

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container || !ready || prefersReducedMotion()) return undefined

      const triggers = []
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const claimed = new Set()

        container.querySelectorAll('[data-stagger]').forEach((parent) => {
          const children = Array.from(parent.children)
          if (!children.length) return

          children.forEach((child) => claimed.add(child))
          gsap.set(children, { autoAlpha: 0, y: 34 })

          const batch = ScrollTrigger.batch(children, {
            start: 'top 90%',
            once: true,
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power3.out',
                overwrite: true,
              })
            },
          })

          if (Array.isArray(batch)) triggers.push(...batch)
        })

        container.querySelectorAll('[data-animate]').forEach((element) => {
          if (claimed.has(element)) return

          const variant = variants[element.dataset.animate] || variants['fade-up']
          const delay = Number(element.dataset.animateDelay || 0)
          const tween = gsap.from(element, {
            ...variant,
            autoAlpha: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 89%',
              once: true,
            },
          })

          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
      })

      return () => {
        triggers.forEach((trigger) => trigger.kill())
        mm.revert()
      }
    },
    { scope: containerRef, dependencies: [pathname, ready] },
  )

  return null
}
