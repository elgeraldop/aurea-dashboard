export function getToday() {
  const now = new Date()
  return { m: now.getMonth(), d: now.getDate() }
}

export function isToday(m, d) {
  const t = getToday()
  return t.m === m && t.d === d
}

export function getWeekStart() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(now.setDate(diff))
  return { m: start.getMonth(), d: start.getDate() }
}

export function getMonthStart() {
  const now = new Date()
  return { m: now.getMonth(), d: 1 }
}

export function getDaysUntil(targetDate) {
  const now = new Date()
  const target = new Date(targetDate)
  const diff = target - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, passed: false }
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
