import {
  BadgeDollarSign,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Compass,
  HeartHandshake,
  Home,
  KeyRound,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import siteConfig from '../config/siteConfig'

const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`

export const stats = siteConfig.stats

export const features = [
  {
    icon: ShieldCheck,
    title: 'Guided at every step',
    text: 'From first viewing to final signature, one dedicated advisor keeps the process clear and calm.',
  },
  {
    icon: Compass,
    title: 'Local, not generic',
    text: 'We know the streets, schools and quiet corners behind every listing we represent.',
  },
  {
    icon: Sparkles,
    title: 'Curated, not crowded',
    text: 'A considered collection of homes, chosen for quality, character and long-term value.',
  },
  {
    icon: HeartHandshake,
    title: 'People before paperwork',
    text: 'Honest advice and patient conversations, with no pressure and no unnecessary jargon.',
  },
]

export const propertyTypeTiles = [
  {
    name: 'House',
    title: 'Family houses',
    description: 'Space to grow, gardens to enjoy and streets that feel like home.',
    image: image('photo-1564013799919-ab600027ffc6'),
    alt: 'Traditional family house with a green lawn and welcoming porch',
  },
  {
    name: 'Villa',
    title: 'Private villas',
    description: 'Architectural homes with pools, terraces and a little more breathing room.',
    image: image('photo-1613490493576-7fde63acd811'),
    alt: 'Contemporary villa with a swimming pool and palm garden',
  },
  {
    name: 'Apartment',
    title: 'City apartments',
    description: 'Thoughtful city living, from quiet lofts to bright waterfront penthouses.',
    image: image('photo-1522708323590-d24dbb6b0267'),
    alt: 'Bright modern apartment living room with a city window',
  },
  {
    name: 'Plot',
    title: 'Plots & land',
    description: 'Cleared, consented plots for a home designed entirely around you.',
    image: image('photo-1500382017468-9049fed747ef'),
    alt: 'Open green building plot surrounded by mature trees',
  },
  {
    name: 'Commercial',
    title: 'Commercial spaces',
    description: 'Flexible premises for teams, studios and ambitious local businesses.',
    image: image('photo-1497366811353-6870744d04b2'),
    alt: 'Open-plan commercial studio with desks and natural light',
  },
]

export const howItWorks = [
  {
    icon: Search,
    step: '01',
    title: 'Search with intention',
    text: 'Tell us how you want to live. We narrow the market to a shortlist that genuinely fits.',
  },
  {
    icon: CalendarDays,
    step: '02',
    title: 'Visit in person',
    text: 'Walk the neighbourhood, ask the difficult questions and see each space at its best.',
  },
  {
    icon: KeyRound,
    step: '03',
    title: 'Move in with confidence',
    text: 'We coordinate the offer, paperwork and handover, so the final step feels effortless.',
  },
]

export const testimonials = [
  {
    quote:
      'They listened to what our family actually needed, not just what we said we wanted. The home we found is calmer, brighter and more us than anything on our original list.',
    name: 'Client One',
    role: 'Homeowner · Riverside Heights',
    avatar: image('photo-1494790108377-be9c29b29330'),
    alt: 'Portrait of a smiling client',
  },
  {
    quote:
      'My apartment search felt overwhelming until one thoughtful shortlist arrived. Every viewing was worth my time, and the handover was completely stress-free.',
    name: 'Client Two',
    role: 'Renter · Central Avenue',
    avatar: image('photo-1500648767791-00dcc994a43e'),
    alt: 'Portrait of a client in a light shirt',
  },
  {
    quote:
      'A measured, honest team. They told us when a property was not right for us, which is exactly why we trusted them when the right one appeared.',
    name: 'Client Three',
    role: 'Homeowner · Silver Lake',
    avatar: image('photo-1534528741775-53994a69daeb'),
    alt: 'Portrait of a client with a warm smile',
  },
  {
    quote:
      'From the first conversation to collecting the keys, we always knew what happened next. That clarity made a big decision feel wonderfully simple.',
    name: 'Client Four',
    role: 'Homeowner · Palm Grove',
    avatar: image('photo-1506794778202-cad84cf45f1d'),
    alt: 'Portrait of a client outdoors',
  },
]

export const team = [
  {
    name: 'Agent One',
    role: 'Founder & Principal Advisor',
    image: image('photo-1560250097-0b93528c311a'),
    alt: 'Portrait of Agent One in a dark blazer',
    socials: { LinkedIn: 'https://www.linkedin.com/', Instagram: 'https://www.instagram.com/' },
  },
  {
    name: 'Agent Two',
    role: 'Residential Sales Advisor',
    image: image('photo-1573496359142-b8d87734a5a2'),
    alt: 'Portrait of Agent Two in a neutral suit',
    socials: { LinkedIn: 'https://www.linkedin.com/', Instagram: 'https://www.instagram.com/' },
  },
  {
    name: 'Agent Three',
    role: 'Rentals & Relocation Lead',
    image: image('photo-1580489944761-15a19d654956'),
    alt: 'Portrait of Agent Three with a soft smile',
    socials: { LinkedIn: 'https://www.linkedin.com/', Instagram: 'https://www.instagram.com/' },
  },
  {
    name: 'Agent Four',
    role: 'Investment & Commercial Advisor',
    image: image('photo-1507003211169-0a1dd7228f2d'),
    alt: 'Portrait of Agent Four in a light shirt',
    socials: { LinkedIn: 'https://www.linkedin.com/', Instagram: 'https://www.instagram.com/' },
  },
]

export const services = [
  {
    icon: Home,
    title: 'Buy a home',
    description:
      'A thoughtful search, honest shortlists and steady guidance from first viewing through to completion.',
    points: ['Curated shortlists', 'Local market insight', 'Offer & negotiation support'],
  },
  {
    icon: BadgeDollarSign,
    title: 'Sell a property',
    description:
      'Beautiful presentation, intelligent pricing and a clear plan to bring the right buyers through the door.',
    points: ['Photography & styling', 'Targeted marketing', 'Viewing coordination'],
  },
  {
    icon: KeyRound,
    title: 'Rent a home',
    description:
      'Well-managed rentals and a straightforward lettings process for tenants and landlords alike.',
    points: ['Verified listings', 'Tenant screening', 'Digital agreements'],
  },
  {
    icon: Building2,
    title: 'Property management',
    description:
      'Quiet, dependable management that protects your investment and keeps tenants happy.',
    points: ['Maintenance coordination', 'Rent collection', 'Regular inspections'],
  },
  {
    icon: ClipboardCheck,
    title: 'Property valuation',
    description:
      'A considered, evidence-led valuation that reflects your property, street and timing.',
    points: ['In-person appraisal', 'Comparable analysis', 'Written report'],
  },
  {
    icon: TrendingUp,
    title: 'Investment advisory',
    description:
      'Clear-eyed guidance on yield, location and long-term potential for first-time and seasoned investors.',
    points: ['Opportunity sourcing', 'Yield modelling', 'Portfolio reviews'],
  },
]

export const faqs = [
  {
    question: 'Is this a real property website?',
    answer:
      'No. This is a fictional demonstration website created to showcase a modern real-estate experience. Every listing, agent, testimonial and location is a placeholder.',
  },
  {
    question: 'How do I arrange a viewing?',
    answer:
      'Use the enquiry form on any property page, call the number in the site header, or send a WhatsApp message. An advisor will confirm availability and a convenient time.',
  },
  {
    question: 'What should I bring to a viewing?',
    answer:
      'A few questions and a sense of how you want to live are enough. If you are serious about a property, a proof of funds or mortgage agreement in principle can help your offer stand out later.',
  },
  {
    question: 'Do you work with first-time buyers?',
    answer:
      'Yes. First-time buyers are a big part of what we do. We can explain the process from deposit to completion and connect you with independent mortgage advice where needed.',
  },
  {
    question: 'Can you help with rentals as well as sales?',
    answer:
      'Absolutely. We support tenants, landlords, buyers and sellers across residential and selected commercial properties, with the same calm, considered approach.',
  },
]

export const values = [
  {
    icon: Compass,
    title: 'Our mission',
    text: 'To make finding a home feel clearer, calmer and more human — one considered conversation at a time.',
  },
  {
    icon: Sparkles,
    title: 'Our vision',
    text: 'A property experience where quality guidance is the norm, not a luxury, and every client feels genuinely seen.',
  },
  {
    icon: HeartHandshake,
    title: 'Our values',
    text: 'Honesty over pressure, local knowledge over noise, and long-term relationships over quick wins.',
  },
]
