import { MessageCircle } from 'lucide-react'
import siteConfig from '../config/siteConfig'

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(siteConfig.whatsappMessage)
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`

  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="floating-whatsapp-pulse" aria-hidden="true" />
      <MessageCircle size={24} aria-hidden="true" />
      <span className="floating-whatsapp-tooltip">Chat with us</span>
    </a>
  )
}
