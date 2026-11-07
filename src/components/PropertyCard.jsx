import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Maximize } from 'lucide-react'
import SmartImage from './SmartImage'
import { formatPrice } from '../lib/format'
import { useFavourites } from '../context/FavouritesContext'

export default function PropertyCard({ property, index = 0 }) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const favourite = isFavourite(property.id)
  const mediaRef = useRef(null)

  return (
    <article className="property-card" data-property-id={property.id}>
      <div className="property-card-media" ref={mediaRef}>
        <Link to={`/properties/${property.id}`} aria-label={`View ${property.title}`}>
          <SmartImage
            src={property.images[0].src}
            alt={property.images[0].alt}
            className="property-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <div className="property-card-badges">
          <span className={`badge ${property.purpose === 'Rent' ? 'badge-gold' : 'badge-navy'}`}>
            {property.status}
          </span>
          {property.featured ? <span className="badge badge-glass">Featured</span> : null}
        </div>
        <button
          type="button"
          className={`favourite-button ${favourite ? 'is-active' : ''}`}
          onClick={() => toggleFavourite(property.id)}
          aria-label={
            favourite
              ? `Remove ${property.title} from favourites`
              : `Save ${property.title} to favourites`
          }
          aria-pressed={favourite}
        >
          <Heart size={18} fill={favourite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
        <div className="property-card-media-overlay" aria-hidden="true">
          <span>
            View details <ArrowUpRight size={17} />
          </span>
        </div>
      </div>

      <div className="property-card-body">
        <div className="property-card-topline">
          <span className="property-price">{formatPrice(property.price, property.purpose)}</span>
          <span className="property-purpose">{property.type}</span>
        </div>

        <h3>
          <Link to={`/properties/${property.id}`}>{property.title}</Link>
        </h3>

        <p className="property-location">
          <MapPin size={15} aria-hidden="true" />
          {property.location}, {property.city}
        </p>

        <div className="property-meta">
          {property.beds > 0 ? (
            <span>
              <BedDouble size={16} aria-hidden="true" /> {property.beds} Beds
            </span>
          ) : null}
          {property.baths > 0 ? (
            <span>
              <Bath size={16} aria-hidden="true" /> {property.baths} Baths
            </span>
          ) : null}
          <span>
            <Maximize size={16} aria-hidden="true" /> {property.area.toLocaleString('en-US')}{' '}
            {property.areaUnit}
          </span>
        </div>
      </div>
      <span className="sr-only">Property {index + 1}</span>
    </article>
  )
}
