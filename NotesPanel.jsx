import React, { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { X, Plus, Trash2 } from 'lucide-react'

export default function NotesPanel() {
  const { notesOpen, setNotesOpen, notes, addNote, removeNote } = useApp()
  const [newNote, setNewNote] = useState('')

  const handleAdd = () => {
    if (!newNote.trim()) return
    addNote(newNote.trim())
    setNewNote('')
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`fixed right-0 top-[52px] bottom-0 w-80 bg-[var(--surface)] border-l border-[var(--border)] z-[350] flex flex-col transition-transform duration-300 ${notesOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <span className="text-sm font-semibold text-[var(--text)]">Notas rápidas</span>
        <button onClick={() => setNotesOpen(false)} className="w-7 h-7 flex items-center justify-center rounded text-[var(--text3)] hover:bg-[var(--surface2)] hover:text-[var(--text)]">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {notes.map((note, i) => (
          <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-md p-3 text-xs text-[var(--text2)] leading-relaxed relative group cursor-pointer hover:border-[var(--accent)] transition-colors">
            <div>{note.text}</div>
            <div className="text-[10px] text-[var(--text3)] mt-1">{formatTime(note.time)}</div>
            <button
              onClick={() => removeNote(i)}
              className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full text-[var(--text3)] opacity-0 group-hover:opacity-100 hover:bg-[var(--red-bg)] hover:text-[var(--red)] transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        <div className="border border-dashed border-[var(--border)] rounded-md p-4 text-center">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Escribe una nota rápida..."
            className="w-full bg-transparent border-none outline-none text-xs text-[var(--text)] resize-none h-16 placeholder-[var(--text3)]"
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd() } }}
          />
          <button
            onClick={handleAdd}
            className="mt-2 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] flex items-center gap-1 mx-auto"
          >
            <Plus className="w-3 h-3" /> Agregar nota
          </button>
        </div>
      </div>
    </div>
  )
}
