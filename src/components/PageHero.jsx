import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import SmartImage from './SmartImage'
import { useAppReady } from '../context/AppReadyContext'

export default function PageHero({ eyebrow, title, description, image, imageAlt, children }) {
  const rootRef = useRef(null)
  const headingRef = useRef(null)
  const ready = useAppReady()

  useGSAP(
    () => {
      if (!ready || !rootRef.current) return undefined
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

      const split = splitWords(headingRef.current)
      const eyebrow = rootRef.current.querySelector('.page-hero-eyebrow')
      const description = rootRef.current.querySelector('.page-hero-description')
      const actions = rootRef.current.querySelector('.page-hero-actions')
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (eyebrow) timeline.from(eyebrow, { y: 18, autoAlpha: 0, duration: 0.6 })

      if (split.words.length) {
        timeline.from(
          split.words,
          {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.045,
            ease: 'power4.out',
          },
          eyebrow ? '-=0.35' : 0,
        )
      }

      if (description) {
        timeline.from(description, { y: 20, autoAlpha: 0, duration: 0.65 }, '-=0.45')
      }

      if (actions) {
        timeline.from(actions, { y: 16, autoAlpha: 0, duration: 0.55 }, '-=0.4')
      }

      if (rootRef.current.querySelector('.page-hero-image img')) {
        gsap.to('.page-hero-image img', {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      return () => split.revert()
    },
    { scope: rootRef, dependencies: [ready, title] },
  )

  return (
    <section className="page-hero" ref={rootRef}>
      <div className="page-hero-media">
        <SmartImage
          src={image}
          alt={imageAlt}
          className="page-hero-image"
          sizes="100vw"
        />
        <div className="page-hero-overlay" aria-hidden="true" />
      </div>
      <div className="container page-hero-content">
        <p className="eyebrow page-hero-eyebrow">{eyebrow}</p>
        <h1 ref={headingRef}>
          <span data-split-line>{title}</span>
        </h1>
        {description ? <p className="page-hero-description">{description}</p> : null}
        {children ? <div className="page-hero-actions">{children}</div> : null}
      </div>
    </section>
  )
}
