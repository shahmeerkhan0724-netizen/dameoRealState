import siteConfig from '../config/siteConfig'

const numberFormatter = new Intl.NumberFormat(siteConfig.locale, {
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0
  return `${siteConfig.currency} ${numberFormatter.format(Math.round(amount))}`
}

export function formatCompactCurrency(value) {
  const amount = Number(value) || 0
  if (amount >= 10000000) {
    return `${siteConfig.currency} ${trimZeros(amount / 10000000)} Crore`
  }
  if (amount >= 100000) {
    return `${siteConfig.currency} ${trimZeros(amount / 100000)} Lakh`
  }
  if (amount >= 1000) {
    return `${siteConfig.currency} ${numberFormatter.format(Math.round(amount))}`
  }
  return formatCurrency(amount)
}

function trimZeros(value) {
  const rounded = Number(value.toFixed(2))
  return Number.isInteger(rounded) ? String(rounded) : String(rounded)
}

export function formatPrice(value, purpose = 'Sale') {
  const amount = Number(value) || 0
  if (purpose === 'Rent') {
    return `${formatCurrency(amount)}/mo`
  }
  if (amount >= 100000) {
    return formatCompactCurrency(amount)
  }
  return formatCurrency(amount)
}

export function formatArea(value, unit = 'sq ft') {
  return `${numberFormatter.format(value)} ${unit}`
}
