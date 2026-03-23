import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const LoadingState = ({ message = 'Loading…' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 size={28} style={{ color: 'var(--neon)' }} />
      </motion.div>

      <div className="text-center">
        <p className="font-mono text-sm font-medium" style={{ color: 'var(--soft)' }}>
          {message}
        </p>
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--neon)' }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingState
