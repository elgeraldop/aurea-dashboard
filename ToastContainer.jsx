import React from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function ToastContainer() {
  const { toast } = useApp()
  if (!toast) return null

  const icons = {
    success: <CheckCircle className="w-4 h-4 text-green-600" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
    info: <Info className="w-4 h-4 text-blue-500" />
  }

  const borders = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    info: 'border-l-blue-500'
  }

  return (
    <div className="fixed top-16 right-4 z-[2000] flex flex-col gap-2 pointer-events-none">
      <div className={`pointer-events-auto bg-[var(--surface)] border border-[var(--border)] ${borders[toast.type]} border-l-[3px] rounded-lg px-4 py-3 shadow-lg min-w-[280px] max-w-[360px] flex items-center gap-3 animate-toast-in`}>
        {icons[toast.type]}
        <span className="text-sm text-[var(--text)] flex-1">{toast.text}</span>
      </div>
    </div>
  )
}
