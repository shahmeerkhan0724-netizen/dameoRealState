import siteConfig from '../config/siteConfig'

const numberFormatter = new Intl.NumberFormat(siteConfig.locale, {
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0
  return `${siteConfig.currency}${numberFormatter.format(Math.round(amount))}`
}

export function formatPrice(value, purpose = 'Sale') {
  const suffix = purpose === 'Rent' ? '/mo' : ''
  return `${formatCurrency(value)}${suffix}`
}

export function formatCompactCurrency(value) {
  const amount = Number(value) || 0
  if (amount >= 1000000) {
    return `${siteConfig.currency}${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}m`
  }
  if (amount >= 1000) {
    return `${siteConfig.currency}${Math.round(amount / 1000)}k`
  }
  return formatCurrency(amount)
}

export function formatArea(value, unit = 'sq ft') {
  return `${numberFormatter.format(value)} ${unit}`
}

export function formatReference(reference) {
  return reference || '—'
}
