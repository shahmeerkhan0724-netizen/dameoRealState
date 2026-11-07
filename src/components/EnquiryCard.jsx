import { useRef, useState } from 'react'
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { team } from '../data/siteData'
import SmartImage from './SmartImage'

const initialForm = {
  name: '',
  phone: '',
  message: '',
}

export default function EnquiryCard({ property }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)
  const advisor = team[0]

  const whatsappText = encodeURIComponent(
    `Hello ${siteConfig.brandName}, I'm interested in ${property.title} (${property.reference}) in ${property.location}. Could we arrange a viewing?`,
  )
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappText}`

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

    setSubmitted(true)
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <aside className="enquiry-card" aria-labelledby="enquiry-title">
      <div className="enquiry-advisor">
        <SmartImage
          src={advisor.image}
          alt={advisor.alt}
          className="enquiry-advisor-avatar"
          sizes="52px"
        />
        <div>
          <p className="enquiry-advisor-name">{advisor.name}</p>
          <p className="enquiry-advisor-role">Your property advisor</p>
        </div>
        <span className="enquiry-reference">{property.reference}</span>
      </div>

      {submitted ? (
        <div className="enquiry-success" role="status" aria-live="polite">
          <span className="enquiry-success-icon" aria-hidden="true">
            <CheckCircle2 size={28} />
          </span>
          <h2 id="enquiry-title">Enquiry received</h2>
          <p>
            Thank you, {form.name.split(' ')[0] || 'there'}. An advisor will be in touch about{' '}
            {property.title} shortly.
          </p>
          <button type="button" className="btn btn-outline-navy btn-block" onClick={resetForm}>
            Send another enquiry
          </button>
          <a href={siteConfig.phoneHref} className="enquiry-call-link">
            <Phone size={15} aria-hidden="true" />
            Prefer to talk? {siteConfig.phone}
          </a>
        </div>
      ) : (
        <>
          <div className="enquiry-heading">
            <p className="eyebrow">Private viewing</p>
            <h2 id="enquiry-title">Enquire about this home</h2>
            <p>Share a few details and we&apos;ll arrange a time that suits you.</p>
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
                placeholder="I'd like to arrange a viewing..."
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
              Request a viewing
            </button>
          </form>

          <div className="enquiry-divider">
            <span>or</span>
          </div>

          <a
            href={whatsappHref}
            className="btn btn-whatsapp btn-block"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <a href={siteConfig.phoneHref} className="enquiry-call-link">
            <Phone size={15} aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <p className="enquiry-privacy">
            By enquiring you agree to be contacted about this property. This demo does not store or
            send your details.
          </p>
        </>
      )}
    </aside>
  )
}
