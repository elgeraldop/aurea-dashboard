import { useCallback } from 'react'

const STORAGE_KEY = 'aurea_state'
const NOTES_KEY = 'aurea_notes'
const HISTORY_KEY = 'aurea_history'

export function useStorage() {
  const load = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  }, [])

  const save = useCallback((state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [])

  const loadNotes = useCallback(() => {
    try {
      const raw = localStorage.getItem(NOTES_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  }, [])

  const saveNotes = useCallback((notes) => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    } catch {}
  }, [])

  const pushHistory = useCallback((action) => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      const history = raw ? JSON.parse(raw) : []
      history.push({ ...action, timestamp: Date.now() })
      if (history.length > 20) history.shift()
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    } catch {}
  }, [])

  const popHistory = useCallback(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      const history = raw ? JSON.parse(raw) : []
      return history.pop() || null
    } catch { return null }
  }, [])

  const exportData = useCallback(() => {
    const state = load()
    const notes = loadNotes()
    const data = { state, notes, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aurea-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [load, loadNotes])

  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.state) save(data.state)
          if (data.notes) saveNotes(data.notes)
          resolve(data)
        } catch (err) { reject(err) }
      }
      reader.readAsText(file)
    })
  }, [save, saveNotes])

  return { load, save, loadNotes, saveNotes, pushHistory, popHistory, exportData, importData }
}
