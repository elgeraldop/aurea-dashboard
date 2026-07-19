import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Dashboard/Home.jsx'
import EmpresaPanel from './components/Empresa/EmpresaPanel.jsx'
import ViajePanel from './components/Viaje/ViajePanel.jsx'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js'
import { useOfflineStatus } from './hooks/useOfflineStatus.js'
import ToastContainer from './components/Common/ToastContainer.jsx'
import SearchOverlay from './components/Common/SearchOverlay.jsx'
import NotesPanel from './components/Common/NotesPanel.jsx'

function App() {
  const { loadState, theme } = useApp()

  useKeyboardShortcuts()
  useOfflineStatus()

  useEffect(() => {
    loadState()
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresa/:id" element={<EmpresaPanel />} />
          <Route path="/viaje" element={<ViajePanel />} />
        </Routes>
      </Layout>
      <ToastContainer />
      <SearchOverlay />
      <NotesPanel />
    </>
  )
}

export default App
