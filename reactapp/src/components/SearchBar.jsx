import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

/**
 * Controlled search bar.
 * Parent owns `value` and `onChange` — this component is pure UI.
 */
const SearchBar = ({ value, onChange, placeholder = 'Search coins...', coinCount }) => {
  const inputRef = useRef(null)

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200"
        style={{
          background: 'var(--panel)',
          border: `1px solid ${value ? 'rgba(0,255,136,0.35)' : 'var(--border)'}`,
          boxShadow: value ? '0 0 0 3px rgba(0,255,136,0.06)' : 'none',
        }}
      >
        <Search size={15} style={{ color: value ? 'var(--neon)' : 'var(--muted)', flexShrink: 0 }} />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm font-body text-white placeholder:text-muted"
          style={{ caretColor: 'var(--neon)' }}
        />

        {/* Result count */}
        <AnimatePresence>
          {value && coinCount != null && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md flex-shrink-0"
              style={{
                background: 'rgba(0,255,136,0.08)',
                color: 'var(--neon)',
                border: '1px solid rgba(0,255,136,0.15)',
              }}
            >
              {coinCount}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Clear button */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => {
                onChange('')
                inputRef.current?.focus()
              }}
              className="flex-shrink-0 p-0.5 rounded-md hover:bg-white/10 transition-colors"
              style={{ color: 'var(--soft)' }}
            >
              <X size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchBar
