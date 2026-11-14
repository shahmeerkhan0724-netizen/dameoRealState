import { whatsappLink } from '../lib/contact'
import WhatsAppIcon from './WhatsAppIcon'

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Karachi Estate Property Advisor on WhatsApp"
    >
      <span className="floating-whatsapp-pulse" aria-hidden="true" />
      <WhatsAppIcon size={27} />
      <span className="floating-whatsapp-tooltip">Chat on WhatsApp</span>
    </a>
  )
}
