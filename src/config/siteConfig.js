/**
 * Single source of truth for every brand and contact detail.
 * Update the phone/WhatsApp/address here and the change applies site-wide.
 */
const siteConfig = {
  brandName: 'Karachi Estate Property Advisor',
  brandShortName: 'Karachi Estate',
  brandInitials: 'KEPA',
  category: 'Real Estate Agency',
  tagline: 'Your Trusted Property Advisor in Karachi',
  title: 'Karachi Estate Property Advisor | Real Estate Agency in Karachi',
  metaDescription:
    'Find residential and commercial property opportunities in Karachi with Karachi Estate Property Advisor. Contact us for property assistance.',

  footerBlurb:
    'Residential and commercial property guidance in Karachi, with direct communication and a personal approach from first enquiry to final decision.',

  /* Official contact details — the only numbers used across the website. */
  phone: '+92 321 2883758',
  phoneHref: 'tel:+923212883758',
  whatsappNumber: '923212883758',
  whatsappDisplay: '+92 321 2883758',
  whatsappMessage:
    'Hello Karachi Estate Property Advisor, I am interested in your property services. Please provide more information.',

  address:
    'C-31 Jamia Millia Road, S4 Jamia Millia Road, Gulzar E Ibrahim, Gulshan e Rafi, Shah Faisal Town, Karachi, Sindh, Pakistan, 75210.',
  addressShort: 'Gulzar E Ibrahim, Shah Faisal Town, Karachi',
  plusCode: 'V5FH+WR Shah Faisal Town, Pakistan',

  /* Used for the Google Maps embed and directions link. */
  mapQuery:
    'Karachi Estate Property Advisor, C-31 Jamia Millia Road, Gulzar E Ibrahim, Shah Faisal Town, Karachi, Sindh, Pakistan 75210',

  /* Verified Google rating only. */
  rating: {
    value: '5.0',
    outOf: '5.0',
    count: 1,
    source: 'Google',
  },

  logo: '/logo.png',
  logoAlt: 'Karachi Estate Property Advisor logo',

  /* No verified social profiles have been supplied, so none are displayed. */
  social: [],

  currency: 'PKR',
  locale: 'en-PK',
  storageKey: 'kepa-favourites',
  customCursor: true,

  hero: {
    eyebrow: 'Karachi · Residential & Commercial Property',
    headline: 'Find Your Perfect Property in Karachi',
    headlineLines: ['Find Your Perfect', 'Property in', 'Karachi'],
    subtext:
      'Your trusted property advisor for residential and commercial real estate in Karachi.',
    backgroundImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    backgroundAlt: 'Contemporary home with landscaped gardens and warm exterior lighting',
  },

  seoKeywords: [
    'Karachi Estate Property Advisor',
    'Real Estate Agency in Karachi',
    'Property Advisor Karachi',
    'Property Dealer Karachi',
    'Houses for Sale in Karachi',
    'Apartments in Karachi',
    'Commercial Properties Karachi',
    'Residential Plots Karachi',
  ],
}

export default siteConfig
