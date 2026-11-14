import { Link } from 'react-router-dom'
import siteConfig from '../config/siteConfig'

export default function Logo({ className = '', onClick, plate = true }) {
  return (
    <Link
      to="/"
      className={`brand-logo ${plate ? 'has-plate' : ''} ${className}`}
      onClick={onClick}
      aria-label={`${siteConfig.brandName} — Home`}
    >
      <img
        src={siteConfig.logo}
        alt={siteConfig.logoAlt}
        width="1536"
        height="1024"
        decoding="async"
      />
    </Link>
  )
}
