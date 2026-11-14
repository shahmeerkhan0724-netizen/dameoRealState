import { useRef, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { propertyWhatsAppLink, whatsappLink } from '../lib/contact'
import WhatsAppIcon from './WhatsAppIcon'

const initialForm = {
  name: '',
  phone: '',
  message: '',
}

export default function EnquiryCard({ property }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [preparedLink, setPreparedLink] = useState('')
  const formRef = useRef(null)
  const directLink = propertyWhatsAppLink(property)

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!/^[+()\d\s-]{7,}$/.test(form.phone.trim())) {
      next.phone = 'Please enter a phone number with at least 7 digits.'
    }
    if (form.message.trim().length < 5) {
      next.message = 'Please add a short message so we can help.'
    }
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    const message = [
      'Hello Karachi Estate Property Advisor,',
      `I am interested in ${property.title} (Ref. ${property.reference}) in ${property.location}, Karachi.`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.message.trim() ? `Message: ${form.message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const href = whatsappLink(message)
    setPreparedLink(href)
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors({})
    setPreparedLink('')
  }

  return (
    <aside className="enquiry-card" aria-labelledby="enquiry-title">
      <div className="enquiry-advisor">
        <span className="enquiry-advisor-logo">
          <img src={siteConfig.logo} alt={siteConfig.logoAlt} width="1536" height="1024" />
        </span>
        <div>
          <p className="enquiry-advisor-name">{siteConfig.brandName}</p>
          <p className="enquiry-advisor-role">Property advisor · Karachi</p>
        </div>
        <span className="enquiry-reference">{property.reference}</span>
      </div>

      <div className="enquiry-heading">
        <p className="eyebrow">Property enquiry</p>
        <h2 id="enquiry-title">Ask about this property</h2>
        <p>Share a few details and send your enquiry directly through WhatsApp.</p>
      </div>

      <form className="enquiry-form" onSubmit={handleSubmit} ref={formRef} noValidate>
        <div className="form-field">
          <label htmlFor="enquiry-name">Your name</label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
          />
          {errors.name ? (
            <p className="form-error" id="enquiry-name-error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="enquiry-phone">Phone number</label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={siteConfig.phone}
            value={form.phone}
            onChange={(event) => setField('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
          />
          {errors.phone ? (
            <p className="form-error" id="enquiry-phone-error" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="enquiry-message">Message</label>
          <textarea
            id="enquiry-message"
            name="message"
            rows="3"
            placeholder="I would like to know more about this property..."
            value={form.message}
            onChange={(event) => setField('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
          />
          {errors.message ? (
            <p className="form-error" id="enquiry-message-error" role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>

        <button type="submit" className="btn btn-gold btn-block">
          <MessageCircle size={17} aria-hidden="true" />
          Send enquiry on WhatsApp
        </button>
      </form>

      {preparedLink ? (
        <div className="enquiry-prepared" role="status" aria-live="polite">
          <p>Your enquiry has been prepared in WhatsApp.</p>
          <a href={preparedLink} target="_blank" rel="noreferrer">
            WhatsApp did not open? Tap here
          </a>
          <button type="button" onClick={resetForm}>
            Edit enquiry
          </button>
        </div>
      ) : null}

      <p className="enquiry-privacy">
        This form opens WhatsApp with your message pre-filled. Your details are not stored on this
        website.
      </p>

      <div className="enquiry-divider">
        <span>or</span>
      </div>

      <a href={directLink} className="btn btn-whatsapp btn-block" target="_blank" rel="noreferrer">
        <WhatsAppIcon size={18} />
        Chat on WhatsApp
      </a>
      <a href={siteConfig.phoneHref} className="enquiry-call-link">
        <Phone size={15} aria-hidden="true" />
        Call {siteConfig.phone}
      </a>
    </aside>
  )
}
