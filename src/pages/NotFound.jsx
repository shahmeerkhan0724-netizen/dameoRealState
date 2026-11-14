import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Home } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <section className="not-found">
      <div className="not-found-art" aria-hidden="true">
        <span className="not-found-orbit orbit-one" />
        <span className="not-found-orbit orbit-two" />
        <span className="not-found-mark">
          <Compass size={32} />
        </span>
      </div>
      <div className="container not-found-content">
        <p className="eyebrow">404 · A wrong turn</p>
        <h1>This address doesn&apos;t lead home.</h1>
        <p>
          The page you&apos;re looking for may have moved, or perhaps it was never here. Let&apos;s
          get you back to somewhere useful.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-gold">
            <Home size={17} aria-hidden="true" />
            Back to home
          </Link>
          <Link to="/properties" className="btn btn-outline-light">
            Browse properties
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <p className="not-found-brand">{siteConfig.brandName}</p>
      </div>
    </section>
  )
}
