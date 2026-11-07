import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import siteConfig from '../config/siteConfig'
import { BrandMark } from './Logo'

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onComplete()
        return
      }

      const percent = { value: 0 }
      const percentNode = rootRef.current.querySelector('.preloader-percent')

      const timeline = gsap.timeline({ onComplete })
      timeline
        .to(percent, {
          value: 100,
          duration: 1.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (percentNode) percentNode.textContent = String(Math.round(percent.value)).padStart(3, '0')
          },
        })
        .fromTo(
          '.preloader-progress-fill',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: 'power2.inOut' },
          0,
        )
        .to('.preloader-inner', { y: -18, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.18')
        .to(
          rootRef.current,
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.8,
            ease: 'power4.inOut',
          },
          '-=0.12',
        )
    },
    { scope: rootRef, dependencies: [onComplete] },
  )

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader-inner">
        <div className="preloader-brand">
          <BrandMark className="preloader-mark" />
          <div>
            <p className="preloader-name">{siteConfig.brandName}</p>
            <p className="preloader-tagline">{siteConfig.tagline}</p>
          </div>
        </div>
        <div className="preloader-progress" aria-hidden="true">
          <span className="preloader-progress-fill" />
        </div>
        <div className="preloader-meta">
          <span>Curating your next chapter</span>
          <span className="preloader-percent">000</span>
        </div>
      </div>
    </div>
  )
}
