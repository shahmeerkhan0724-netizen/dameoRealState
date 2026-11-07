import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import siteConfig from '../config/siteConfig'
import Logo from './Logo'

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
}

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About us', to: '/about' },
  { label: 'Our services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Buy a home', to: '/services' },
  { label: 'Sell a property', to: '/services' },
  { label: 'Rent a home', to: '/services' },
  { label: 'Property management', to: '/services' },
  { label: 'Investment advisory', to: '/services' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const year = new Date().getFullYear()

  const subscribe = (event) => {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setError('')
    setEmail('')
    setStatus('success')
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-newsletter">
          <div className="footer-newsletter-copy">
            <p className="eyebrow">From the neighbourhood</p>
            <h2>New homes, thoughtful notes.</h2>
            <p>
              A short, occasional edit of new listings and useful property guidance. No noise.
            </p>
          </div>

          <div className="footer-newsletter-form-wrap">
            {status === 'success' ? (
              <div className="newsletter-success" role="status" aria-live="polite">
                <CheckCircle2 size={22} aria-hidden="true" />
                <div>
                  <strong>You&apos;re on the list.</strong>
                  <p>We&apos;ll be in touch when there&apos;s something worth sharing.</p>
                </div>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={subscribe} noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="newsletter-input-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (status === 'error') {
                        setStatus('idle')
                        setError('')
                      }
                    }}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  />
                  <button type="submit" className="newsletter-submit" aria-label="Subscribe">
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </div>
                {status === 'error' ? (
                  <p className="form-error" id="newsletter-error" role="alert">
                    {error}
                  </p>
                ) : (
                  <p className="newsletter-hint">{siteConfig.responseTime}</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Logo light />
            <p className="footer-blurb">{siteConfig.footerBlurb}</p>
            <div className="footer-socials">
              {siteConfig.social.map((social) => {
                const Icon = socialIcons[social.label]
                if (!Icon) return null
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${siteConfig.brandName} on ${social.label}`}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav className="footer-column" aria-label="Explore">
            <h3>Explore</h3>
            {exploreLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="footer-column" aria-label="Services">
            <h3>Services</h3>
            {serviceLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer-column footer-contact">
            <h3>Visit or call</h3>
            <a href={siteConfig.phoneHref}>
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail size={16} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <p>
              <MapPin size={16} aria-hidden="true" />
              {siteConfig.address}
            </p>
            <p>
              <Clock3 size={16} aria-hidden="true" />
              {siteConfig.workingHours[0].days}: {siteConfig.workingHours[0].hours}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="footer-demo-note">
            Fictional demonstration website · {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
