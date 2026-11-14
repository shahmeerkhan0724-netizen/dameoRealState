import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Compass,
  ExternalLink,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { faqs, services } from '../data/siteData'
import { directionsUrl, plusCodeSearchUrl, whatsappLink } from '../lib/contact'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import MapEmbed from '../components/MapEmbed'
import FaqAccordion from '../components/FaqAccordion'
import SectionHeading from '../components/SectionHeading'
import WhatsAppIcon from '../components/WhatsAppIcon'

const pageImage =
  'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=70'

const subjectOptions = ['General enquiry', ...services.map((service) => service.title)]

const initialForm = {
  name: '',
  phone: '',
  email: '',
  subject: 'General enquiry',
  message: '',
}

export default function Contact() {
  useDocumentTitle(
    'Contact Us',
    'Contact Karachi Estate Property Advisor by phone or WhatsApp for property assistance in Karachi. Find our office address and directions.',
  )
  const [searchParams] = useSearchParams()
  const requestedSubject = searchParams.get('subject')
  const initialSubject = subjectOptions.includes(requestedSubject)
    ? requestedSubject
    : 'General enquiry'
  const [form, setForm] = useState({ ...initialForm, subject: initialSubject })
  const [errors, setErrors] = useState({})
  const [preparedLink, setPreparedLink] = useState('')
  const formRef = useRef(null)

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
    if (preparedLink) setPreparedLink('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.'
    if (!/^[+()\d\s-]{7,}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.subject) nextErrors.subject = 'Please choose a subject.'
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please share a little more detail (at least 10 characters).'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    const message = [
      'Hello Karachi Estate Property Advisor,',
      `Full name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Email: ${form.email.trim()}`,
      `Subject: ${form.subject}`,
      `Message: ${form.message.trim()}`,
    ].join('\n')

    const href = whatsappLink(message)
    setPreparedLink(href)
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const resetForm = () => {
    setForm({ ...initialForm, subject: initialSubject })
    setErrors({})
    setPreparedLink('')
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk about property in Karachi"
        description="Call or message us with your requirement. We will discuss the details and the next practical step."
        image={pageImage}
        imageAlt="Leafy city street with townhouses in soft afternoon light"
      />

      <section className="section contact-section">
        <div className="container">
          <div className="contact-info-grid" data-stagger>
            <a href={siteConfig.phoneHref} className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <Phone size={20} />
              </span>
              <span>
                <span className="contact-info-label">Call us</span>
                <strong>{siteConfig.phone}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href={whatsappLink()}
              className="contact-info-card"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-info-icon contact-info-icon--whatsapp" aria-hidden="true">
                <WhatsAppIcon size={20} />
              </span>
              <span>
                <span className="contact-info-label">WhatsApp</span>
                <strong>{siteConfig.whatsappDisplay}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href={directionsUrl}
              className="contact-info-card"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-info-icon" aria-hidden="true">
                <MapPin size={20} />
              </span>
              <span>
                <span className="contact-info-label">Visit us</span>
                <strong>{siteConfig.addressShort}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href={plusCodeSearchUrl}
              className="contact-info-card"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-info-icon" aria-hidden="true">
                <Compass size={20} />
              </span>
              <span>
                <span className="contact-info-label">Plus Code</span>
                <strong>{siteConfig.plusCode}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="contact-main-grid">
            <div className="contact-form-card" data-animate="fade-right">
              <div className="contact-form-heading">
                <p className="eyebrow">Send an enquiry</p>
                <h2>How can we help?</h2>
                <p>
                  Complete the fields below and send the prepared message through WhatsApp. We
                  will reply from the official number.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className="contact-form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Full name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name ? (
                      <p className="form-error" id="contact-name-error" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-phone">Phone</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="03xx xxxxxxx"
                      value={form.phone}
                      onChange={(event) => setField('phone', event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    />
                    {errors.phone ? (
                      <p className="form-error" id="contact-phone-error" role="alert">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="form-field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email ? (
                      <p className="form-error" id="contact-email-error" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={(event) => setField('subject', event.target.value)}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    >
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.subject ? (
                      <p className="form-error" id="contact-subject-error" role="alert">
                        {errors.subject}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="6"
                    placeholder="Tell us the property type, preferred area and budget you have in mind..."
                    value={form.message}
                    onChange={(event) => setField('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message ? (
                    <p className="form-error" id="contact-message-error" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-whatsapp">
                  <Send size={16} aria-hidden="true" />
                  Send on WhatsApp
                </button>
                <p className="form-note">
                  This form opens WhatsApp with your message pre-filled. Your details are not
                  stored on this website.
                </p>
              </form>

              {preparedLink ? (
                <div className="contact-prepared" role="status" aria-live="polite">
                  <MessageSquare size={19} aria-hidden="true" />
                  <div>
                    <p>Your enquiry is ready in WhatsApp.</p>
                    <a href={preparedLink} target="_blank" rel="noreferrer">
                      WhatsApp did not open? Tap here
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                    <button type="button" onClick={resetForm}>
                      Start another enquiry
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="contact-side" data-animate="fade-left">
              <MapEmbed title="Office location map" className="contact-map" />

              <div className="contact-details">
                <p className="eyebrow">Business details</p>
                <h2>{siteConfig.brandName}</h2>
                <p className="contact-details-category">{siteConfig.category}</p>

                <dl className="contact-details-list">
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>WhatsApp</dt>
                    <dd>
                      <a href={whatsappLink()} target="_blank" rel="noreferrer">
                        {siteConfig.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd>{siteConfig.address}</dd>
                  </div>
                  <div>
                    <dt>Plus Code</dt>
                    <dd>
                      <a href={plusCodeSearchUrl} target="_blank" rel="noreferrer">
                        {siteConfig.plusCode}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Google rating</dt>
                    <dd>
                      {siteConfig.rating.value}/{siteConfig.rating.outOf} ·{' '}
                      {siteConfig.rating.count} review
                    </dd>
                  </div>
                </dl>

                <div className="contact-details-actions">
                  <a
                    href={directionsUrl}
                    className="btn btn-gold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin size={16} aria-hidden="true" />
                    Get Directions
                  </a>
                  <a
                    href={whatsappLink()}
                    className="btn btn-outline-navy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-faq-section">
        <div className="container contact-faq-grid">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered"
            text="A few things people ask before their first conversation. If yours is not here, just call or message us."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  )
}
