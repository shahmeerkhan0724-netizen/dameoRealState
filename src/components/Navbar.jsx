import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Heart, MapPin, Menu, Phone, X } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import siteConfig from '../config/siteConfig'
import { whatsappLink } from '../lib/contact'
import Logo from './Logo'
import Magnetic from './Magnetic'
import WhatsAppIcon from './WhatsAppIcon'
import { useFavourites } from '../context/FavouritesContext'
import { usePrefersReducedMotion, useScrollLock } from '../hooks/useMotion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Properties', to: '/properties' },
  { label: 'Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { count } = useFavourites()
  const isHome = pathname === '/'
  const [solid, setSolid] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const navRef = useRef(null)
  const drawerRef = useRef(null)
  const panelRef = useRef(null)
  const backdropRef = useRef(null)
  const toggleRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useScrollLock(menuMounted)

  useEffect(() => {
    setSolid(!isHome)
    if (navRef.current) gsap.set(navRef.current, { y: 0 })
  }, [pathname, isHome])

  useGSAP(
    () => {
      const nav = navRef.current
      if (!nav) return undefined

      const showNav = gsap.quickTo(nav, 'y', { duration: 0.4, ease: 'power3.out' })
      const hideNav = gsap.quickTo(nav, 'y', { duration: 0.45, ease: 'power3.inOut' })

      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          const shouldBeSolid = !isHome || y > 44 || menuOpen
          setSolid((current) => (current === shouldBeSolid ? current : shouldBeSolid))

          if (menuOpen || reducedMotion) {
            showNav(0)
            return
          }

          if (self.direction === 1 && y > 170) {
            hideNav(-(nav.offsetHeight + 24))
          } else {
            showNav(0)
          }
        },
      })

      const revealOnFocus = () => showNav(0)
      nav.addEventListener('focusin', revealOnFocus)

      return () => {
        nav.removeEventListener('focusin', revealOnFocus)
        trigger.kill()
        gsap.killTweensOf(nav)
      }
    },
    { scope: navRef, dependencies: [isHome, menuOpen, reducedMotion] },
  )

  const openMenu = useCallback(() => {
    previousFocusRef.current = document.activeElement
    setMenuMounted(true)
    setMenuOpen(true)
    if (navRef.current) gsap.to(navRef.current, { y: 0, duration: 0.35, ease: 'power3.out' })
    setSolid(true)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    const target =
      previousFocusRef.current instanceof HTMLElement ? previousFocusRef.current : toggleRef.current
    window.requestAnimationFrame(() => target?.focus())
  }, [])

  useGSAP(
    () => {
      if (!menuMounted || !drawerRef.current) return undefined
      const panel = panelRef.current
      const backdrop = backdropRef.current
      if (!panel || !backdrop) return undefined

      if (menuOpen) {
        gsap.set(panel, { xPercent: 100 })
        gsap.set(backdrop, { autoAlpha: 0 })
        const timeline = gsap.timeline()
        timeline
          .to(backdrop, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
          .to(panel, { xPercent: 0, duration: 0.68, ease: 'power4.out' }, 0)
          .from(
            '.drawer-stagger',
            { autoAlpha: 0, x: 34, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
            0.22,
          )
        return undefined
      }

      gsap.to(panel, { xPercent: 100, duration: 0.42, ease: 'power3.in' })
      gsap.to(backdrop, {
        autoAlpha: 0,
        duration: 0.32,
        onComplete: () => setMenuMounted(false),
      })
      return undefined
    },
    { scope: drawerRef, dependencies: [menuMounted, menuOpen] },
  )

  useEffect(() => {
    if (!menuOpen) return undefined
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

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
  }, [menuOpen, closeMenu])

  const handleDrawerLink = () => {
    if (menuOpen) closeMenu()
  }

  return (
    <>
      <header
        ref={navRef}
        className={`site-nav ${solid ? 'is-solid' : 'is-transparent'} ${
          menuOpen ? 'is-menu-open' : ''
        }`}
      >
        <div className="container nav-inner">
          <Logo onClick={handleDrawerLink} />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <Link
              to="/properties?favorites=1"
              className="nav-favourite"
              aria-label={`View saved properties (${count})`}
            >
              <Heart size={19} aria-hidden="true" />
              <span className="nav-favourite-count" aria-hidden="true">
                {count}
              </span>
            </Link>

            <Magnetic className="nav-cta-wrap" strength={0.16}>
              <a
                href={whatsappLink()}
                className="btn btn-gold btn-sm nav-cta"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </Magnetic>

            <button
              type="button"
              ref={toggleRef}
              className="nav-menu-toggle"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={menuOpen ? closeMenu : openMenu}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuMounted ? (
        <div
          className={`mobile-menu ${menuOpen ? 'is-open' : 'is-closing'}`}
          ref={drawerRef}
        >
          <button
            type="button"
            className="drawer-backdrop"
            ref={backdropRef}
            onClick={closeMenu}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />
          <aside
            id="mobile-navigation"
            className="drawer-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="drawer-head">
              <Logo onClick={handleDrawerLink} plate={false} />
              <button
                type="button"
                ref={closeRef}
                className="drawer-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>

            <nav className="drawer-nav" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `drawer-link drawer-stagger ${isActive ? 'is-active' : ''}`
                  }
                  onClick={handleDrawerLink}
                >
                  <span className="drawer-link-index">0{index + 1}</span>
                  {link.label}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            <div className="drawer-contact drawer-stagger">
              <a href={siteConfig.phoneHref} className="drawer-contact-line">
                <Phone size={16} aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a
                href={whatsappLink()}
                className="drawer-contact-line"
                target="_blank"
                rel="noreferrer"
                onClick={handleDrawerLink}
              >
                <WhatsAppIcon size={16} />
                {siteConfig.whatsappDisplay}
              </a>
              <p className="drawer-contact-line">
                <MapPin size={16} aria-hidden="true" />
                {siteConfig.address}
              </p>
            </div>

            <div className="drawer-footer drawer-stagger">
              <div className="drawer-actions">
                <a
                  href={whatsappLink()}
                  className="btn btn-gold btn-block"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleDrawerLink}
                >
                  <WhatsAppIcon size={16} />
                  Chat on WhatsApp
                </a>
                <Link
                  to="/properties"
                  className="btn btn-outline-navy btn-block"
                  onClick={handleDrawerLink}
                >
                  Explore properties
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
