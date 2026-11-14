import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  Car,
  Check,
  Heart,
  MapPin,
  Maximize,
  Phone,
} from 'lucide-react'
import properties from '../data/properties'
import { formatArea, formatPrice } from '../lib/format'
import { propertyWhatsAppLink } from '../lib/contact'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useFavourites } from '../context/FavouritesContext'
import PropertyGallery from '../components/PropertyGallery'
import EnquiryCard from '../components/EnquiryCard'
import MapEmbed from '../components/MapEmbed'
import PropertyCard from '../components/PropertyCard'
import SectionHeading from '../components/SectionHeading'
import WhatsAppIcon from '../components/WhatsAppIcon'
import siteConfig from '../config/siteConfig'
import NotFound from './NotFound'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)

  if (!property) return <NotFound />

  return <PropertyDetailView property={property} />
}

function PropertyDetailView({ property }) {
  useDocumentTitle(
    property.title,
    `${property.title} in ${property.location}, ${property.city}. View property details and enquire with Karachi Estate Property Advisor.`,
  )
  const { isFavourite, toggleFavourite } = useFavourites()

  const similarProperties = useMemo(() => {
    const primary = properties.filter(
      (item) => item.id !== property.id && item.type === property.type,
    )
    const secondary = properties.filter(
      (item) =>
        item.id !== property.id &&
        item.type !== property.type &&
        item.purpose === property.purpose,
    )
    return [...primary, ...secondary].slice(0, 3)
  }, [property])

  const favourite = isFavourite(property.id)
  const whatsappHref = propertyWhatsAppLink(property)

  const overviewRows = [
    ['Property type', property.type],
    ['Purpose', property.purpose === 'Sale' ? 'For sale' : 'For rent'],
    ['Bedrooms', property.beds > 0 ? property.beds : 'Not applicable'],
    ['Bathrooms', property.baths > 0 ? property.baths : 'Not applicable'],
    ['Area', formatArea(property.area, property.areaUnit)],
    ['Parking', property.parking > 0 ? `${property.parking} spaces` : 'None'],
    ['Year built', property.yearBuilt],
    ['Location', `${property.location}, ${property.city}`],
    ['Reference', property.reference],
  ]

  return (
    <div className="property-detail-page">
      <div className="container property-topbar">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/properties">Properties</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{property.title}</span>
        </nav>

        <button
          type="button"
          className={`save-property ${favourite ? 'is-active' : ''}`}
          onClick={() => toggleFavourite(property.id)}
          aria-pressed={favourite}
        >
          <Heart size={17} fill={favourite ? 'currentColor' : 'none'} aria-hidden="true" />
          {favourite ? 'Saved' : 'Save property'}
        </button>
      </div>

      <div className="container">
        <PropertyGallery images={property.images} title={property.title} />
      </div>

      <div className="container property-detail-layout">
        <div className="property-main">
          {property.sample ? (
            <p className="listing-disclaimer listing-disclaimer--inline" role="note">
              Sample listing shown for illustration only. Contact us to confirm current
              availability, pricing and details for this property.
            </p>
          ) : null}

          <header className="property-detail-header" data-animate="fade-up">
            <div className="property-detail-badges">
              <span className={`badge ${property.purpose === 'Rent' ? 'badge-gold' : 'badge-navy'}`}>
                {property.status}
              </span>
              <span className="badge badge-muted">{property.type}</span>
              {property.sample ? <span className="badge badge-outline">Sample listing</span> : null}
            </div>

            <h1>{property.title}</h1>
            <p className="property-detail-location">
              <MapPin size={17} aria-hidden="true" />
              {property.location}, {property.city}
            </p>

            <div className="property-detail-price-row">
              <p className="property-detail-price">{formatPrice(property.price, property.purpose)}</p>
              <span className="property-reference">Ref. {property.reference}</span>
            </div>

            <div className="property-detail-stats">
              <span>
                <Maximize size={19} aria-hidden="true" />
                <strong>{property.area.toLocaleString('en-US')}</strong> {property.areaUnit}
              </span>
              <span>
                <BedDouble size={19} aria-hidden="true" />
                <strong>{property.beds > 0 ? property.beds : '—'}</strong> Bedrooms
              </span>
              <span>
                <Bath size={19} aria-hidden="true" />
                <strong>{property.baths > 0 ? property.baths : '—'}</strong> Bathrooms
              </span>
              {property.parking > 0 ? (
                <span>
                  <Car size={19} aria-hidden="true" />
                  <strong>{property.parking}</strong> Parking
                </span>
              ) : null}
              <span>
                <Calendar size={19} aria-hidden="true" />
                Built <strong>{property.yearBuilt}</strong>
              </span>
            </div>

            <div className="property-contact-actions">
              <a href={siteConfig.phoneHref} className="btn btn-outline-navy">
                <Phone size={17} aria-hidden="true" />
                Call Now
              </a>
              <a
                href={whatsappHref}
                className="btn btn-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={18} />
                WhatsApp Inquiry
              </a>
            </div>
          </header>

          <section className="property-section" data-animate="fade-up" aria-labelledby="property-overview">
            <h2 id="property-overview">Property overview</h2>
            <dl className="property-overview-grid">
              {overviewRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="property-section" data-animate="fade-up" aria-labelledby="property-description">
            <h2 id="property-description">Description</h2>
            <p className="property-description">{property.description}</p>
          </section>

          <section className="property-section" data-animate="fade-up" aria-labelledby="property-amenities">
            <h2 id="property-amenities">Amenities</h2>
            <ul className="amenities-grid">
              {property.amenities.map((amenity) => (
                <li key={amenity}>
                  <span className="amenity-icon" aria-hidden="true">
                    <Check size={14} />
                  </span>
                  {amenity}
                </li>
              ))}
            </ul>
          </section>

          <section className="property-section property-location-section" data-animate="fade-up">
            <div className="property-location-copy">
              <p className="eyebrow">Location</p>
              <h2>
                {property.location}, {property.city}
              </h2>
              <p>
                Ask us about the immediate neighbourhood, road access, nearby amenities and the
                practical questions to consider before arranging a visit.
              </p>
              <div className="property-location-actions">
                <a
                  href={whatsappHref}
                  className="btn btn-whatsapp btn-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={16} />
                  Ask about this area
                </a>
                <Link
                  to={`/properties?location=${encodeURIComponent(property.location)}`}
                  className="text-link"
                >
                  More in {property.location}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <MapEmbed
              title={`Map of ${property.location}, ${property.city}`}
              query={`${property.location}, ${property.city}, Pakistan`}
              label={`${property.location}, ${property.city}`}
            />
          </section>
        </div>

        <div className="property-aside">
          <EnquiryCard property={property} />
        </div>
      </div>

      <section className="section similar-section">
        <div className="container">
          <div className="section-heading-row" data-animate="fade-up">
            <SectionHeading
              eyebrow="You may also like"
              title="Similar properties to consider"
              text="A few more sample listings that match this property type or purpose."
            />
            <Link to="/properties" className="text-link">
              View all properties
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="property-grid" data-stagger>
            {similarProperties.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
