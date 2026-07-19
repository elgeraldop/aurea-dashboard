import React, { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children, footer }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center px-4 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl w-[400px] max-w-full shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-[15px] font-semibold text-[var(--text)]">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded text-[var(--text3)] hover:bg-[var(--surface2)] text-lg">×</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-5 py-3 border-t border-[var(--border)]">{footer}</div>}
      </div>
    </div>
  )
}
