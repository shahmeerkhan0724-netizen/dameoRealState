import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import SmartImage from './SmartImage'
import { usePrefersReducedMotion, useScrollLock } from '../hooks/useMotion'

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const rootRef = useRef(null)
  const mainButtonRef = useRef(null)
  const lightboxRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocus = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const current = images[active]

  useScrollLock(mounted)

  const goTo = (nextIndex) => {
    setActive(((nextIndex % images.length) + images.length) % images.length)
  }

  const openLightbox = () => {
    previousFocus.current = document.activeElement
    setMounted(true)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    const target = previousFocus.current instanceof HTMLElement ? previousFocus.current : mainButtonRef.current
    window.requestAnimationFrame(() => target?.focus())
  }

  useEffect(() => {
    if (!lightboxOpen) return undefined
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(active + 1)
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(active - 1)
        return
      }
      if (event.key !== 'Tab' || !lightboxRef.current) return

      const focusable = Array.from(
        lightboxRef.current.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
    }
    // active is intentionally read inside the key handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, active, images.length])

  useGSAP(
    () => {
      if (!mounted || !lightboxRef.current) return undefined
      const root = lightboxRef.current
      const panel = root.querySelector('.lightbox-panel')

      if (lightboxOpen) {
        if (reducedMotion) {
          gsap.set(root, { autoAlpha: 1 })
          gsap.set(panel, { autoAlpha: 1, scale: 1 })
          return undefined
        }

        gsap.set(root, { autoAlpha: 0 })
        gsap.set(panel, { autoAlpha: 0, scale: 0.945, y: 20 })

        const timeline = gsap.timeline()
        timeline
          .to(root, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
          .to(panel, { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: 'power4.out' }, 0.05)
        return undefined
      }

      if (reducedMotion) {
        setMounted(false)
        return undefined
      }

      const timeline = gsap.timeline({ onComplete: () => setMounted(false) })
      timeline
        .to(panel, { autoAlpha: 0, scale: 0.96, y: 16, duration: 0.32, ease: 'power2.in' })
        .to(root, { autoAlpha: 0, duration: 0.25 }, '-=0.1')
      return undefined
    },
    { dependencies: [mounted, lightboxOpen, reducedMotion] },
  )

  useGSAP(
    () => {
      if (reducedMotion || !mounted || !lightboxOpen) return
      gsap.fromTo(
        '.lightbox-figure',
        { autoAlpha: 0, scale: 0.985 },
        { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
      )
    },
    { dependencies: [active, mounted, lightboxOpen, reducedMotion] },
  )

  useGSAP(
    () => {
      if (reducedMotion) return
      gsap.fromTo(
        '.gallery-main img',
        { autoAlpha: 0.55, scale: 1.03 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
      )
    },
    { scope: rootRef, dependencies: [active, reducedMotion] },
  )

  return (
    <>
      <div className="property-gallery" ref={rootRef}>
        <button
          type="button"
          className="gallery-main"
          ref={mainButtonRef}
          onClick={openLightbox}
          aria-label={`Open larger image: ${current.alt}`}
          aria-haspopup="dialog"
        >
          <SmartImage
            src={current.src}
            alt={current.alt}
            className="gallery-main-image"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <span className="gallery-expand" aria-hidden="true">
            <Expand size={18} />
            View gallery
          </span>
          <span className="gallery-counter" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </button>

        <div className="gallery-thumbs" role="group" aria-label={`${title} image gallery`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`gallery-thumb ${index === active ? 'is-active' : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              aria-pressed={index === active}
            >
              <SmartImage src={image.src} alt="" sizes="112px" />
            </button>
          ))}
        </div>
      </div>

      {mounted ? (
        <div
          className="lightbox"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery`}
        >
          <button
            type="button"
            className="lightbox-backdrop"
            onClick={closeLightbox}
            aria-label="Close image gallery"
            tabIndex={-1}
          />
          <div className="lightbox-panel">
            <button
              type="button"
              className="lightbox-close"
              ref={closeRef}
              onClick={closeLightbox}
              aria-label="Close image gallery"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={() => goTo(active - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <div className="lightbox-figure-wrap">
              <SmartImage
                src={current.src}
                alt={current.alt}
                className="lightbox-figure"
                sizes="92vw"
              />
            </div>
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={() => goTo(active + 1)}
              aria-label="Next image"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
            <div className="lightbox-caption">
              <p>{current.alt}</p>
              <span>
                {active + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
