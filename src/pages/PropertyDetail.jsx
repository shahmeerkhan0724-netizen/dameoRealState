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
} from 'lucide-react'
import properties from '../data/properties'
import { formatArea, formatPrice } from '../lib/format'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useFavourites } from '../context/FavouritesContext'
import PropertyGallery from '../components/PropertyGallery'
import EnquiryCard from '../components/EnquiryCard'
import MortgageCalculator from '../components/MortgageCalculator'
import MapPlaceholder from '../components/MapPlaceholder'
import PropertyCard from '../components/PropertyCard'
import SectionHeading from '../components/SectionHeading'
import NotFound from './NotFound'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)
  const { isFavourite, toggleFavourite } = useFavourites()

  useDocumentTitle(property ? property.title : 'Property not found')

  const similarProperties = useMemo(() => {
    if (!property) return []
    const primary = properties.filter(
      (item) =>
        item.id !== property.id && (item.type === property.type || item.city === property.city),
    )
    const fallback = properties.filter(
      (item) => item.id !== property.id && !primary.some((match) => match.id === item.id),
    )
    return [...primary, ...fallback].slice(0, 3)
  }, [property])

  if (!property) return <NotFound />

  const favourite = isFavourite(property.id)

  const featureRows = [
    ['Property type', property.type],
    ['Purpose', property.purpose === 'Sale' ? 'For sale' : 'For rent'],
    ['Bedrooms', property.beds > 0 ? property.beds : '—'],
    ['Bathrooms', property.baths > 0 ? property.baths : '—'],
    ['Area', formatArea(property.area, property.areaUnit)],
    ['Parking', property.parking > 0 ? `${property.parking} spaces` : 'None'],
    ['Year built', property.yearBuilt],
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
          <header className="property-detail-header" data-animate="fade-up">
            <div className="property-detail-badges">
              <span className={`badge ${property.purpose === 'Rent' ? 'badge-gold' : 'badge-navy'}`}>
                {property.status}
              </span>
              <span className="badge badge-muted">{property.type}</span>
              {property.featured ? <span className="badge badge-outline">Featured home</span> : null}
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
              {property.beds > 0 ? (
                <span>
                  <BedDouble size={19} aria-hidden="true" />
                  <strong>{property.beds}</strong> Bedrooms
                </span>
              ) : null}
              {property.baths > 0 ? (
                <span>
                  <Bath size={19} aria-hidden="true" />
                  <strong>{property.baths}</strong> Bathrooms
                </span>
              ) : null}
              <span>
                <Maximize size={19} aria-hidden="true" />
                <strong>{property.area.toLocaleString('en-US')}</strong> {property.areaUnit}
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
          </header>

          <section className="property-section" data-animate="fade-up">
            <h2>About this home</h2>
            <p className="property-description">{property.description}</p>
          </section>

          <section className="property-section" data-animate="fade-up">
            <h2>Amenities</h2>
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

          <section className="property-section" data-animate="fade-up">
            <h2>Property details</h2>
            <div className="features-table-wrap">
              <table className="features-table">
                <caption className="sr-only">Details for {property.title}</caption>
                <tbody>
                  {featureRows.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="property-section property-location-section" data-animate="fade-up">
            <div className="property-location-copy">
              <p className="eyebrow">The neighbourhood</p>
              <h2>{property.location}, {property.city}</h2>
              <p>
                A well-connected pocket of {property.city}, with everyday essentials, green spaces
                and a strong sense of community close to home. Ask us for our longer neighbourhood
                guide when you visit.
              </p>
              <Link to={`/properties?location=${encodeURIComponent(property.location)}`} className="text-link">
                More homes in {property.location}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <MapPlaceholder label={`${property.location}, ${property.city}`} />
          </section>

          <MortgageCalculator initialPrice={property.price} />
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
              title="Similar places to consider"
              text="A few more homes that share the same sense of space and place."
            />
            <Link to="/properties" className="text-link">
              View all properties
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="property-grid" data-stagger>
            {similarProperties.map((item, index) => (
              <PropertyCard key={item.id} property={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
