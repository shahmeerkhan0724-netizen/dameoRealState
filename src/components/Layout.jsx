import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useLenis } from '../context/SmoothScrollContext'
import { useAppReady } from '../context/AppReadyContext'
import { usePrefersReducedMotion } from '../hooks/useMotion'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'
import ScrollToTopButton from './ScrollToTopButton'
import ScrollRevealManager from './ScrollRevealManager'

export default function Layout() {
  const location = useLocation()
  const lenis = useLenis()
  const ready = useAppReady()
  const reducedMotion = usePrefersReducedMotion()
  const routeRef = useRef(null)
  const overlayRef = useRef(null)
  const isFirstRoute = useRef(true)
  const isFirstNavigation = useRef(true)

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, lenis])

  useEffect(() => {
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false
      return
    }
    const main = document.getElementById('main-content')
    main?.focus({ preventScroll: true })
  }, [location.pathname])

  useGSAP(
    () => {
      const overlay = overlayRef.current
      if (!overlay) return undefined

      if (isFirstRoute.current) {
        isFirstRoute.current = false
        return undefined
      }

      if (reducedMotion) {
        gsap.set(overlay, { autoAlpha: 0 })
        return undefined
      }

      const timeline = gsap.timeline()
      timeline
        .set(overlay, { autoAlpha: 1, clipPath: 'inset(0 0 0 100%)' })
        .to(overlay, {
          clipPath: 'inset(0 0 0 0%)',
          duration: 0.45,
          ease: 'power4.inOut',
        })
        .fromTo(
          routeRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.38,
        )
        .to(
          overlay,
          {
            clipPath: 'inset(100% 0 0 0)',
            duration: 0.62,
            ease: 'power4.inOut',
          },
          0.68,
        )
        .set(overlay, { autoAlpha: 0, clipPath: 'inset(0 0 0 0)' })

      return () => {
        timeline.kill()
        gsap.set(overlay, { autoAlpha: 0 })
      }
    },
    { dependencies: [location.pathname, reducedMotion] },
  )

  useEffect(() => {
    let cancelled = false
    let refreshTimer

    const scheduleRefresh = () => {
      if (cancelled) return
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => {
        if (!cancelled) ScrollTrigger.refresh()
      }, 120)
    }

    scheduleRefresh()

    const images = routeRef.current
      ? Array.from(routeRef.current.querySelectorAll('img'))
      : []

    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', scheduleRefresh, { once: true })
    })

    window.addEventListener('load', scheduleRefresh)

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleRefresh).catch(() => {})
    }

    return () => {
      cancelled = true
      window.clearTimeout(refreshTimer)
      images.forEach((image) => image.removeEventListener('load', scheduleRefresh))
      window.removeEventListener('load', scheduleRefresh)
    }
  }, [location.pathname, ready])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <div className="route-view" ref={routeRef} key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTopButton />
      <div className="page-transition-overlay" ref={overlayRef} aria-hidden="true" />
      <ScrollRevealManager containerRef={routeRef} pathname={location.pathname} />
    </div>
  )
}
