import siteConfig from '../config/siteConfig'

const WHATSAPP_BASE = `https://wa.me/${siteConfig.whatsappNumber}`

/**
 * Build a WhatsApp conversation link using the official number.
 * Every WhatsApp action on the site goes through this helper.
 */
export function whatsappLink(message = siteConfig.whatsappMessage) {
  const text = typeof message === 'string' && message.trim() ? message : siteConfig.whatsappMessage
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`
}

export function propertyWhatsAppMessage(property) {
  return `Hello Karachi Estate Property Advisor, I am interested in ${property.title} (Ref. ${property.reference}) in ${property.location}, Karachi. Please share more details and availability.`
}

export function propertyWhatsAppLink(property) {
  return whatsappLink(propertyWhatsAppMessage(property))
}

export function serviceWhatsAppMessage(serviceTitle) {
  return `Hello Karachi Estate Property Advisor, I would like more information about your ${serviceTitle} service.`
}

export function serviceWhatsAppLink(serviceTitle) {
  return whatsappLink(serviceWhatsAppMessage(serviceTitle))
}

export const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.mapQuery,
)}`

export function mapEmbedFor(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query || siteConfig.mapQuery)}&output=embed`
}

export const mapEmbedUrl = mapEmbedFor()

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  siteConfig.mapQuery,
)}`

export const plusCodeSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.plusCode,
)}`
