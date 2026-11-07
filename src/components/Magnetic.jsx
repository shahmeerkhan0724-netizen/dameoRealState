import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function Magnetic({ children, className = '', strength = 0.22 }) {
  const rootRef = useRef(null)
  const innerRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const root = rootRef.current
        const inner = innerRef.current
        if (!root || !inner) return undefined

        const xTo = gsap.quickTo(inner, 'x', { duration: 0.45, ease: 'power3.out' })
        const yTo = gsap.quickTo(inner, 'y', { duration: 0.45, ease: 'power3.out' })

        const handleMove = (event) => {
          const bounds = root.getBoundingClientRect()
          xTo((event.clientX - (bounds.left + bounds.width / 2)) * strength)
          yTo((event.clientY - (bounds.top + bounds.height / 2)) * strength)
        }

        const handleLeave = () => {
          xTo(0)
          yTo(0)
        }

        root.addEventListener('pointermove', handleMove)
        root.addEventListener('pointerleave', handleLeave)

        return () => {
          root.removeEventListener('pointermove', handleMove)
          root.removeEventListener('pointerleave', handleLeave)
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <span ref={rootRef} className={`magnetic ${className}`}>
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </span>
  )
}
