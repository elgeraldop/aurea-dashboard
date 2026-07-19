import { useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext.jsx'

export function useKeyboardShortcuts() {
  const { setSearchOpen, setNotesOpen, saveState, exportData, importData } = useApp()

  const handleKeyDown = useCallback((e) => {
    // Ctrl/Cmd + K = Search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
    // Ctrl/Cmd + S = Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      saveState()
    }
    // Ctrl/Cmd + Shift + N = Notes
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'N') {
      e.preventDefault()
      setNotesOpen(prev => !prev)
    }
    // Esc = Close overlays
    if (e.key === 'Escape') {
      setSearchOpen(false)
    }
  }, [setSearchOpen, setNotesOpen, saveState])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
