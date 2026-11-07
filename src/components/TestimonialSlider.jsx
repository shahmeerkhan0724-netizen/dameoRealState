import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import SmartImage from './SmartImage'
import SectionHeading from './SectionHeading'
import { testimonials } from '../data/siteData'
import { usePrefersReducedMotion } from '../hooks/useMotion'

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const rootRef = useRef(null)
  const pointerStart = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const count = testimonials.length
  const current = testimonials[index]
  const paused = hoverPaused || focusPaused

  const goTo = useCallback(
    (nextIndex) => {
      setIndex(((nextIndex % count) + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (paused || reducedMotion) return undefined
    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % count)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, count])

  useGSAP(
    () => {
      if (reducedMotion) return
      gsap.fromTo(
        '.testimonial-quote-block',
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      )
      gsap.fromTo(
        '.testimonial-person',
        { autoAlpha: 0, x: -14 },
        { autoAlpha: 1, x: 0, duration: 0.55, delay: 0.12, ease: 'power2.out' },
      )
    },
    { scope: rootRef, dependencies: [index, reducedMotion] },
  )

  const handleTouchStart = (event) => {
    pointerStart.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (pointerStart.current === null) return
    const distance = event.changedTouches[0].clientX - pointerStart.current
    if (Math.abs(distance) > 48) {
      goTo(distance < 0 ? index + 1 : index - 1)
    }
    pointerStart.current = null
  }

  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          eyebrow="Client stories"
          title="The right move feels different"
          text="A few words from people who trusted the process."
          align="center"
          className="testimonial-heading"
        />
        <div
          className="testimonial-slider"
          ref={rootRef}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onFocus={() => setFocusPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false)
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="testimonial-visual" aria-hidden="true">
            <div className="testimonial-visual-pattern" />
            <span className="testimonial-visual-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="testimonial-visual-total">/ {String(count).padStart(2, '0')}</span>
          </div>

          <div className="testimonial-content">
            <div className="testimonial-stars" aria-label="Rated five out of five">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} size={16} fill="currentColor" aria-hidden="true" />
              ))}
            </div>

            <div key={index} className="testimonial-slide">
              <div className="testimonial-quote-block">
                <Quote className="testimonial-quote-icon" size={36} aria-hidden="true" />
                <blockquote>{current.quote}</blockquote>
              </div>
              <div className="testimonial-person">
                <SmartImage
                  src={current.avatar}
                  alt={current.alt}
                  className="testimonial-avatar"
                  sizes="56px"
                />
                <div>
                  <p className="testimonial-name">{current.name}</p>
                  <p className="testimonial-role">{current.role}</p>
                </div>
              </div>
            </div>

            <div className="testimonial-controls">
              <div className="testimonial-arrows">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              </div>
              <div className="testimonial-dots" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((testimonial, dotIndex) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    className={`testimonial-dot ${dotIndex === index ? 'is-active' : ''}`}
                    onClick={() => goTo(dotIndex)}
                    aria-label={`Show testimonial ${dotIndex + 1}`}
                    aria-current={dotIndex === index ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
