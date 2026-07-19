import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const fire = useCallback((options = {}) => {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C49A1A', '#0052CC', '#36B37E', '#DC2626', '#0891B2']
    }
    confetti({ ...defaults, ...options })
  }, [])

  const fireMilestone = useCallback(() => {
    const end = Date.now() + 2000
    const colors = ['#C49A1A', '#FFD700', '#0052CC']
    ;(function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }, [])

  return { fire, fireMilestone }
}
