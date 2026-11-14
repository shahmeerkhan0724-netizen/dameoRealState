import { mapEmbedFor } from '../lib/contact'
import siteConfig from '../config/siteConfig'

export default function MapEmbed({ className = '', title = 'Map location', query = '', label }) {
  return (
    <div className={`map-embed ${className}`}>
      <iframe
        title={title}
        src={mapEmbedFor(query)}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <span className="map-embed-label">{label || siteConfig.addressShort}</span>
    </div>
  )
}
