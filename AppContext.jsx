import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react'
import { useStorage } from '../hooks/useStorage.js'
import empresasData from '../data/empresas.json'
import viajeData from '../data/viaje.json'
import kpiDefsData from '../data/kpi_defs.json'

const AppContext = createContext(null)

const initialState = {
  tasksDone: {},
  kpiValues: { ag: 0, mae: 0, efic: 0, mady: 0 },
  viajeDone: {},
  cuadernos: {},
  notes: [],
  theme: 'light',
  sidebarOpen: false,
  searchOpen: false,
  notesOpen: false,
  activeView: 'kanban',
  activeFilter: 'all',
  toast: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS_DONE':
      return { ...state, tasksDone: action.payload }
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasksDone: {
          ...state.tasksDone,
          [action.payload]: !state.tasksDone[action.payload]
        }
      }
    case 'SET_KPI':
      return {
        ...state,
        kpiValues: { ...state.kpiValues, [action.key]: action.value }
      }
    case 'SET_VIAJE_DONE':
      return { ...state, viajeDone: action.payload }
    case 'TOGGLE_VIAJE':
      return {
        ...state,
        viajeDone: {
          ...state.viajeDone,
          [action.payload]: !state.viajeDone[action.payload]
        }
      }
    case 'SET_CUADERNO':
      return {
        ...state,
        cuadernos: { ...state.cuadernos, [action.key]: action.value }
      }
    case 'SET_NOTES':
      return { ...state, notes: action.payload }
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] }
    case 'REMOVE_NOTE':
      return { ...state, notes: state.notes.filter((_, i) => i !== action.payload) }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload }
    case 'SET_SEARCH_OPEN':
      return { ...state, searchOpen: action.payload }
    case 'SET_NOTES_OPEN':
      return { ...state, notesOpen: action.payload }
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload }
    case 'SET_ACTIVE_FILTER':
      return { ...state, activeFilter: action.payload }
    case 'SHOW_TOAST':
      return { ...state, toast: action.payload }
    case 'HIDE_TOAST':
      return { ...state, toast: null }
    case 'LOAD_STATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { load, save, loadNotes, saveNotes, exportData, importData } = useStorage()
  const saveTimeoutRef = useRef(null)

  const loadState = useCallback(() => {
    const saved = load()
    const notes = loadNotes()
    if (saved) {
      dispatch({ type: 'LOAD_STATE', payload: { ...saved, notes } })
    }
  }, [load, loadNotes])

  const saveState = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      const { sidebarOpen, searchOpen, notesOpen, toast, ...toSave } = state
      save(toSave)
      saveNotes(state.notes)
      dispatch({ type: 'SHOW_TOAST', payload: { text: 'Guardado correctamente', type: 'success' } })
      setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000)
    }, 500)
  }, [state, save, saveNotes])

  const toggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id })
    setTimeout(saveState, 100)
  }, [saveState])

  const setKPI = useCallback((key, value) => {
    dispatch({ type: 'SET_KPI', key, value })
    setTimeout(saveState, 100)
  }, [saveState])

  const toggleViaje = useCallback((id) => {
    dispatch({ type: 'TOGGLE_VIAJE', payload: id })
    setTimeout(saveState, 100)
  }, [saveState])

  const setCuaderno = useCallback((key, value) => {
    dispatch({ type: 'SET_CUADERNO', key, value })
    setTimeout(saveState, 100)
  }, [saveState])

  const addNote = useCallback((text) => {
    const note = { text, time: Date.now() }
    dispatch({ type: 'ADD_NOTE', payload: note })
    setTimeout(saveState, 100)
  }, [saveState])

  const removeNote = useCallback((index) => {
    dispatch({ type: 'REMOVE_NOTE', payload: index })
    setTimeout(saveState, 100)
  }, [saveState])

  const setTheme = useCallback((theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
    document.documentElement.classList.toggle('dark', theme === 'dark')
    setTimeout(saveState, 100)
  }, [saveState])

  const toggleTheme = useCallback(() => {
    const next = state.theme === 'light' ? 'dark' : 'light'
    setTheme(next)
  }, [state.theme, setTheme])

  const setSearchOpen = useCallback((open) => {
    dispatch({ type: 'SET_SEARCH_OPEN', payload: open })
  }, [])

  const setNotesOpen = useCallback((open) => {
    dispatch({ type: 'SET_NOTES_OPEN', payload: open })
  }, [])

  const setActiveView = useCallback((view) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view })
  }, [])

  const setActiveFilter = useCallback((filter) => {
    dispatch({ type: 'SET_ACTIVE_FILTER', payload: filter })
  }, [])

  const showToast = useCallback((text, type = 'info') => {
    dispatch({ type: 'SHOW_TOAST', payload: { text, type } })
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 4000)
  }, [])

  const value = {
    ...state,
    empresas: empresasData.empresas,
    viaje: viajeData,
    kpiDefs: kpiDefsData,
    loadState,
    saveState,
    toggleTask,
    setKPI,
    toggleViaje,
    setCuaderno,
    addNote,
    removeNote,
    setTheme,
    toggleTheme,
    setSearchOpen,
    setNotesOpen,
    setActiveView,
    setActiveFilter,
    showToast,
    exportData,
    importData
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
