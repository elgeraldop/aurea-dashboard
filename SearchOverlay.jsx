import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, empresas, toggleTask } = useApp()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Flatten all tasks for search
  const allTasks = useMemo(() => {
    const tasks = []
    empresas.forEach(emp => {
      emp.fases.forEach(fase => {
        fase.tareas.forEach(tarea => {
          tasks.push({
            id: tarea.id,
            text: tarea.t,
            empresa: emp.nombre,
            color: emp.color,
            empresaId: emp.id,
            fase: fase.t
          })
        })
      })
    })
    return tasks
  }, [empresas])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allTasks.filter(t =>
      t.text.toLowerCase().includes(q) ||
      t.empresa.toLowerCase().includes(q) ||
      t.fase.toLowerCase().includes(q)
    ).slice(0, 10)
  }, [query, allTasks])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setSelected(0)
    }
  }, [searchOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!searchOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected(s => Math.min(s + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected(s => Math.max(s - 1, 0))
      }
      if (e.key === 'Enter' && results[selected]) {
        navigate(`/empresa/${results[selected].empresaId}`)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, results, selected, navigate, setSearchOpen])

  if (!searchOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[1500] flex justify-center pt-20 backdrop-blur-sm animate-fade-in"
      onClick={() => setSearchOpen(false)}>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl w-[560px] max-w-[90vw] shadow-lg overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
          <Search className="w-5 h-5 text-[var(--text3)]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar tareas, empresas, fases..."
            className="flex-1 bg-transparent border-none outline-none text-base text-[var(--text)] placeholder-[var(--text3)]"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
          />
          <kbd className="text-xs text-[var(--text3)] bg-[var(--surface2)] px-2 py-1 rounded border border-[var(--border)]">ESC</kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <div className="py-8 text-center text-sm text-[var(--text3)]">No se encontraron resultados</div>
          )}
          {results.map((r, i) => (
            <div
              key={r.id}
              className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${i === selected ? 'bg-[var(--accent-light)]' : 'hover:bg-[var(--surface2)]'}`}
              onClick={() => { navigate(`/empresa/${r.empresaId}`); setSearchOpen(false) }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[var(--text)] truncate">{r.text}</div>
                <div className="text-xs text-[var(--text3)]">{r.empresa} · {r.fase}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
