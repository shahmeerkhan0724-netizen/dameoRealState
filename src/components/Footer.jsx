import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Star } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { directionsUrl, whatsappLink } from '../lib/contact'
import { propertyTypeTiles } from '../data/siteData'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Properties', to: '/properties' },
  { label: 'Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
]

const categoryLinks = propertyTypeTiles.map((tile) => ({
  label: tile.title,
  to: `/properties?type=${encodeURIComponent(tile.name)}`,
}))

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>Looking for a property in Karachi?</h2>
            <p>
              Call or message us with your requirements. We will discuss the next step and help you
              move forward.
            </p>
          </div>
          <div className="footer-cta-actions">
            <a
              href={whatsappLink()}
              className="btn btn-gold"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={17} />
              Chat on WhatsApp
            </a>
            <a href={siteConfig.phoneHref} className="btn btn-outline-light">
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-blurb">{siteConfig.footerBlurb}</p>
            <p className="footer-rating">
              <span className="footer-rating-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={13} fill="currentColor" />
                ))}
              </span>
              <span>
                <strong>{siteConfig.rating.value}</strong> on {siteConfig.rating.source} ·{' '}
                {siteConfig.rating.count} review
              </span>
            </p>
          </div>

          <nav className="footer-column" aria-label="Explore">
            <h3>Explore</h3>
            {exploreLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="footer-column" aria-label="Property categories">
            <h3>Property categories</h3>
            {categoryLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer-column footer-contact">
            <h3>Contact us</h3>
            <a href={siteConfig.phoneHref}>
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} />
              {siteConfig.whatsappDisplay}
            </a>
            <p>
              <MapPin size={16} aria-hidden="true" />
              {siteConfig.address}
            </p>
            <a
              href={directionsUrl}
              className="footer-directions"
              target="_blank"
              rel="noreferrer"
            >
              Get directions
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="footer-demo-note">
            {siteConfig.category} · Karachi, Sindh, Pakistan
          </p>
        </div>
        <p className="footer-sample-note">
          Property listings marked as samples are illustrative and not verified client inventory.
        </p>
      </div>
    </footer>
  )
}
