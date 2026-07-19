export function formatNumber(n) {
  return new Intl.NumberFormat('es-ES').format(n)
}

export function formatCurrency(n, currency = 'EUR') {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(n)
}

export function formatPercent(n, total) {
  if (!total) return '0%'
  return Math.round((n / total) * 100) + '%'
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max)
}
