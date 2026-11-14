import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Compass,
  HeartHandshake,
  Home,
  KeyRound,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import siteConfig from '../config/siteConfig'

const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=75`

/* Verified facts only — no invented experience numbers or awards. */
export const highlights = [
  {
    icon: Star,
    value: siteConfig.rating.value,
    suffix: `/${siteConfig.rating.outOf}`,
    label: `${siteConfig.rating.source} rating`,
  },
  {
    icon: Star,
    value: String(siteConfig.rating.count),
    suffix: '',
    label: `${siteConfig.rating.source} review`,
  },
  {
    icon: Building2,
    value: '6',
    suffix: '',
    label: 'Property categories',
  },
  {
    icon: MapPin,
    value: 'Karachi',
    suffix: '',
    label: 'City focus',
  },
]

export const features = [
  {
    icon: MapPin,
    title: 'Karachi-focused guidance',
    text: 'Advice shaped around Karachi neighbourhoods, property types and the questions local buyers and tenants ask.',
  },
  {
    icon: HeartHandshake,
    title: 'Personal property assistance',
    text: 'Share your requirements once and deal directly with a property advisor who understands your brief.',
  },
  {
    icon: Home,
    title: 'Residential property support',
    text: 'Help with houses, apartments and residential plots for buying, selling or renting in Karachi.',
  },
  {
    icon: Building2,
    title: 'Commercial property assistance',
    text: 'Guidance on commercial buildings, shops and office spaces for businesses and investors.',
  },
  {
    icon: MessageCircle,
    title: 'Direct customer communication',
    text: 'Speak to us by phone or WhatsApp. Clear answers, practical next steps and no automated runaround.',
  },
]

export const propertyTypeTiles = [
  {
    name: 'House',
    title: 'Houses',
    description: 'Family homes, bungalows and villas across Karachi residential areas.',
    image: image('photo-1600585154340-be6161a56a0c'),
    alt: 'Contemporary family house with a landscaped front garden',
  },
  {
    name: 'Apartment',
    title: 'Apartments',
    description: 'Apartments and flats for sale or rent in well-connected parts of Karachi.',
    image: image('photo-1522708323590-d24dbb6b0267'),
    alt: 'Bright modern apartment living room with a city window',
  },
  {
    name: 'Plot',
    title: 'Residential Plots',
    description: 'Residential plots for buyers planning a custom home or a long-term hold.',
    image: image('photo-1500382017468-9049fed747ef'),
    alt: 'Open residential plot bordered by mature trees',
  },
  {
    name: 'Commercial',
    title: 'Commercial Properties',
    description: 'Commercial buildings and spaces for business owners and investors.',
    image: image('photo-1497366811353-6870744d04b2'),
    alt: 'Open-plan commercial space with desks and natural light',
  },
  {
    name: 'Shop',
    title: 'Shops',
    description: 'Retail units and main-road shops in established commercial pockets.',
    image: image('photo-1441986300917-64674bd600d8'),
    alt: 'Modern retail shop interior with display shelving',
  },
  {
    name: 'Office',
    title: 'Offices',
    description: 'Office floors and workspace options for small teams and growing businesses.',
    image: image('photo-1497366216548-37526070297c'),
    alt: 'Minimal office reception with natural materials',
  },
]

export const howItWorks = [
  {
    icon: Search,
    step: '01',
    title: 'Share your requirement',
    text: 'Tell us your preferred area, budget and property type by phone or WhatsApp.',
  },
  {
    icon: ClipboardCheck,
    step: '02',
    title: 'Review suitable options',
    text: 'We discuss the options that fit your brief and share the details you need to compare them.',
  },
  {
    icon: KeyRound,
    step: '03',
    title: 'Visit and decide',
    text: 'Arrange a property visit, review the paperwork and move forward with confidence.',
  },
]

export const services = [
  {
    icon: Home,
    title: 'Property Buying Assistance',
    description:
      'Support for buyers who want to understand the Karachi market, compare suitable properties and make an informed decision.',
    points: ['Buyer requirement review', 'Property shortlisting', 'Negotiation support'],
  },
  {
    icon: BadgeDollarSign,
    title: 'Property Selling Assistance',
    description:
      'Practical help for property owners who want to present their property clearly and reach the right kind of buyer.',
    points: ['Property presentation advice', 'Buyer enquiries', 'Viewing coordination'],
  },
  {
    icon: Building2,
    title: 'Residential Properties',
    description:
      'Guidance across houses, apartments and residential plots for families, individuals and long-term occupiers.',
    points: ['Houses and bungalows', 'Apartments and flats', 'Residential plots'],
  },
  {
    icon: Briefcase,
    title: 'Commercial Properties',
    description:
      'Assistance with commercial buildings, shops and office space for business owners and commercial investors.',
    points: ['Commercial buildings', 'Shops and retail units', 'Office spaces'],
  },
  {
    icon: MessageCircle,
    title: 'Property Consultation',
    description:
      'A straightforward conversation about your requirements, the local market and the practical next steps.',
    points: ['Requirement discussion', 'Area and budget guidance', 'Next-step planning'],
  },
  {
    icon: TrendingUp,
    title: 'Property Investment Guidance',
    description:
      'General guidance for buyers considering property as a long-term investment, with a focus on location, use and due diligence.',
    points: ['Location considerations', 'Rental potential discussion', 'Due-diligence checklist'],
  },
]

export const faqs = [
  {
    question: 'How do I enquire about a property?',
    answer:
      'Call or message us on WhatsApp using the number shown on this website. Sharing the property title or reference number helps us respond with the right details.',
  },
  {
    question: 'Are the properties shown on this website verified?',
    answer:
      'The listings currently shown are clearly labelled sample listings used to demonstrate the website. Please contact us directly to confirm the availability, price and details of current properties.',
  },
  {
    question: 'Do you assist with both buying and renting?',
    answer:
      'Yes. We accept enquiries from buyers, sellers, tenants and landlords, and can discuss residential as well as commercial requirements.',
  },
  {
    question: 'Can you help with commercial property in Karachi?',
    answer:
      'Yes. We handle enquiries for commercial buildings, shops and office spaces. Share the intended use and preferred area so we can discuss suitable options.',
  },
  {
    question: 'Which areas of Karachi do you cover?',
    answer:
      'We accept property enquiries across Karachi. Tell us your preferred area and budget, and we will discuss what is available and how we can assist.',
  },
  {
    question: 'How can I arrange a property visit?',
    answer:
      'Contact us by phone or WhatsApp with the property you would like to see. We will confirm availability and arrange a convenient time where possible.',
  },
  {
    question: 'Do you provide legal or financial advice?',
    answer:
      'We provide general property guidance, not legal, tax or financial advice. We encourage buyers to verify title documents, approvals and payment terms independently with qualified professionals.',
  },
]

export const values = [
  {
    icon: Compass,
    title: 'Local focus',
    text: 'Karachi is our market. Our guidance is built around the city’s neighbourhoods, property types and practical realities.',
  },
  {
    icon: HeartHandshake,
    title: 'Straightforward communication',
    text: 'We keep conversations direct and useful, whether you are buying your first home or reviewing a commercial space.',
  },
  {
    icon: ShieldCheck,
    title: 'Careful guidance',
    text: 'We help you ask the right questions and encourage independent verification of title, approvals and legal documents.',
  },
]

export const aboutAssistance = [
  { icon: Home, title: 'Property buying assistance', text: 'Requirement discussions, property shortlisting and viewing coordination.' },
  { icon: BadgeDollarSign, title: 'Property selling assistance', text: 'Presentation advice, buyer enquiries and support through the sale process.' },
  { icon: Building2, title: 'Residential property services', text: 'Houses, apartments and residential plots across Karachi.' },
  { icon: Briefcase, title: 'Commercial property services', text: 'Commercial buildings, shops and offices for business use or investment.' },
]

export const approach = [
  {
    icon: CalendarDays,
    title: 'Understand the brief',
    text: 'We start with your preferred area, budget, property type and timeline.',
  },
  {
    icon: Sparkles,
    title: 'Keep it relevant',
    text: 'We focus the conversation on properties and next steps that match what you asked for.',
  },
  {
    icon: ClipboardCheck,
    title: 'Support the decision',
    text: 'We help you compare details and prepare the questions to ask before committing.',
  },
]
