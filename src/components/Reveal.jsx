import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../hooks/useMotion'

const variants = {
  'fade-up': { y: 38, x: 0, scale: 1 },
  'fade-left': { y: 0, x: -42, scale: 1 },
  'fade-right': { y: 0, x: 42, scale: 1 },
  zoom: { y: 0, x: 0, scale: 0.94 },
}

export default function Reveal({
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  stagger = false,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return

      const from = variants[variant] || variants['fade-up']
      const targets = stagger ? Array.from(ref.current.children) : ref.current

      gsap.from(targets, {
        ...from,
        autoAlpha: 0,
        duration: 0.9,
        delay,
        stagger: stagger ? 0.11 : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          once: true,
        },
      })
    },
    { scope: ref, dependencies: [variant, delay, stagger] },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
