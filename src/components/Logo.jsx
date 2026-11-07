import { Link } from 'react-router-dom'
import siteConfig from '../config/siteConfig'

export function BrandMark({ className = '' }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <span className="brand-mark-roof" />
      <span className="brand-mark-body" />
      <span className="brand-mark-door" />
    </span>
  )
}

export default function Logo({ className = '', onClick, light = false }) {
  return (
    <Link
      to="/"
      className={`brand-logo ${light ? 'is-light' : ''} ${className}`}
      aria-label={`${siteConfig.brandName} — home`}
      onClick={onClick}
    >
      <BrandMark />
      <span className="brand-logo-copy">
        <span className="brand-logo-name">{siteConfig.brandName}</span>
        <span className="brand-logo-tagline">{siteConfig.tagline}</span>
      </span>
    </Link>
  )
}
