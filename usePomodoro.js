import { useState, useEffect, useCallback, useRef } from 'react'

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

export function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const intervalRef = useRef(null)

  const toggle = useCallback(() => {
    setIsActive(prev => !prev)
  }, [])

  const reset = useCallback(() => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(WORK_TIME)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsBreak(b => !b)
            return !isBreak ? BREAK_TIME : WORK_TIME
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, isBreak])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return { timeLeft, isActive, isBreak, toggle, reset, formattedTime: formatTime(timeLeft) }
}
