import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../hooks/useMotion'
import siteConfig from '../config/siteConfig'

export default function Counter({ value, suffix = '', label, className = '' }) {
  const rootRef = useRef(null)
  const numberRef = useRef(null)
  const formatter = new Intl.NumberFormat(siteConfig.locale, { maximumFractionDigits: 0 })

  useGSAP(
    () => {
      if (!numberRef.current) return

      if (prefersReducedMotion()) {
        numberRef.current.textContent = formatter.format(value)
        return
      }

      const state = { current: 0 }
      numberRef.current.textContent = '0'

      gsap.to(state, {
        current: value,
        duration: 1.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = formatter.format(Math.round(state.current))
          }
        },
      })
    },
    { scope: rootRef, dependencies: [value] },
  )

  return (
    <div ref={rootRef} className={`stat-item ${className}`}>
      <p className="stat-value">
        <span ref={numberRef}>{formatter.format(value)}</span>
        {suffix ? <span className="stat-suffix">{suffix}</span> : null}
      </p>
      <p className="stat-label">{label}</p>
    </div>
  )
}
