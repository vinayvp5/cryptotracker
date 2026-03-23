import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

const ErrorState = ({ error, onRetry }) => {
  const isRateLimit = error?.response?.status === 429
  const isNetwork = !error?.response

  const title = isRateLimit
    ? 'Rate Limit Reached'
    : isNetwork
    ? 'Network Error'
    : 'Failed to Load Data'

  const message = isRateLimit
    ? 'CoinGecko free API limit hit. Please wait a moment and try again.'
    : isNetwork
    ? 'Could not reach the API. Check your internet connection.'
    : error?.message ?? 'An unexpected error occurred.'

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(255,68,102,0.08)',
          border: '1px solid rgba(255,68,102,0.2)',
        }}
      >
        <AlertTriangle size={24} style={{ color: 'var(--danger)' }} />
      </motion.div>

      <div>
        <h3 className="font-display font-bold text-base text-white mb-1.5 tracking-wide">
          {title}
        </h3>
        <p className="font-mono text-xs max-w-xs leading-relaxed" style={{ color: 'var(--soft)' }}>
          {message}
        </p>
      </div>

      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
          style={{
            background: 'rgba(255,68,102,0.08)',
            border: '1px solid rgba(255,68,102,0.25)',
            color: 'var(--danger)',
          }}
        >
          <RefreshCw size={13} />
          Try Again
        </motion.button>
      )}
    </div>
  )
}

export default ErrorState
