import { Star } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { whatsappLink } from '../lib/contact'
import SectionHeading from './SectionHeading'
import WhatsAppIcon from './WhatsAppIcon'

/**
 * Displays only the verified Google rating supplied by the client.
 * No customer names, quotes or invented testimonials are shown.
 */
export default function ReviewsSection({ compact = false }) {
  return (
    <section
      className={`section reviews-section ${compact ? 'reviews-section--compact' : ''}`}
      aria-labelledby="reviews-title"
    >
      <div className="container reviews-inner">
        <div className="reviews-copy">
          <SectionHeading
            eyebrow="Google rating"
            title="A 5.0 rating on Google"
            text="Our public Google rating is shown exactly as it appears on the platform. We do not publish invented testimonials or customer stories."
            className="reviews-heading"
          />
          <a
            href={whatsappLink()}
            className="btn btn-gold reviews-cta"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={17} />
            Talk to our team
          </a>
        </div>

        <div className="review-card" aria-label="Google rating summary">
          <span className="review-google" aria-hidden="true">
            G
          </span>
          <div className="review-score-row">
            <strong className="review-score">{siteConfig.rating.value}</strong>
            <span className="review-outof">/ {siteConfig.rating.outOf}</span>
          </div>
          <div className="review-stars" aria-label="Rated five out of five">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} size={20} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <p className="review-count">
            Based on {siteConfig.rating.count}{' '}
            {siteConfig.rating.count === 1 ? 'Google Review' : 'Google Reviews'}
          </p>
          <p className="review-source">Rating as displayed on {siteConfig.rating.source}</p>
        </div>
      </div>
    </section>
  )
}
