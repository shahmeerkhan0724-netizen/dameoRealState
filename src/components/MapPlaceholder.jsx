import { MapPin } from 'lucide-react'

export default function MapPlaceholder({ label = 'Central Avenue, Meridian', className = '' }) {
  return (
    <div
      className={`map-placeholder ${className}`}
      role="img"
      aria-label={`Stylised map placeholder centred on ${label}`}
    >
      <div className="map-grid" aria-hidden="true" />
      <div className="map-river" aria-hidden="true" />
      <div className="map-road map-road-one" aria-hidden="true" />
      <div className="map-road map-road-two" aria-hidden="true" />
      <div className="map-road map-road-three" aria-hidden="true" />
      <div className="map-pin" aria-hidden="true">
        <span className="map-pin-ring" />
        <MapPin size={22} />
      </div>
      <span className="map-label">{label}</span>
      <span className="map-caption">Map preview · demo location</span>
    </div>
  )
}
