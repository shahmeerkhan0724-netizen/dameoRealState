/**
 * Every brand-specific value lives here.
 * Change this file to rebrand the entire demo.
 */
const siteConfig = {
  brandName: 'YourBrand Estates',
  brandShortName: 'YourBrand',
  brandInitials: 'YB',
  tagline: 'Find Your Perfect Place',
  metaDescription:
    'Explore a curated collection of fictional homes for sale and rent, with local guidance from a modern real-estate team.',
  footerBlurb:
    'A modern property experience built around thoughtful guidance, beautiful homes and local expertise.',

  phone: '+00 000 0000000',
  phoneHref: 'tel:+000000000000',
  email: 'hello@yourbrand.example',
  address: '124 Central Avenue, Meridian, Example City',
  addressShort: '124 Central Avenue, Meridian',
  workingHours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 4:00 PM' },
    { days: 'Sunday', hours: 'By appointment' },
  ],
  responseTime: 'We usually reply within one business day.',

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],

  currency: '$',
  currencyCode: 'USD',
  locale: 'en-US',
  whatsappNumber: '00000000000',
  whatsappMessage: 'Hello YourBrand Estates, I would like to learn more about a property.',
  storageKey: 'yourbrand-estates-favourites',
  customCursor: true,

  foundedYear: 2014,
  hero: {
    eyebrow: 'A considered way to find home',
    headlineLines: ['Discover a place', 'that feels', 'like home.'],
    subtext:
      'Explore handpicked homes, quiet neighbourhoods and spaces that fit the life you want to live.',
    backgroundImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70',
    backgroundAlt: 'Contemporary house with landscaped gardens and warm exterior lighting',
  },

  stats: [
    { value: 12, suffix: '+', label: 'Years of local experience' },
    { value: 850, suffix: '+', label: 'Homes thoughtfully matched' },
    { value: 98, suffix: '%', label: 'Client satisfaction' },
    { value: 24, suffix: '', label: 'Neighbourhoods covered' },
  ],
}

export default siteConfig
