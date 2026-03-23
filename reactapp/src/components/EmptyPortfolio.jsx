import React from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, TrendingUp, BarChart2, Layers } from 'lucide-react'

const EmptyPortfolio = () => {
  const features = [
    { icon: TrendingUp, text: 'Track gains & losses' },
    { icon: BarChart2, text: 'Live price updates' },
    { icon: Layers, text: 'Multiple holdings' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-5 text-center">
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative mb-6"
      >
        {/* Outer ring pulse */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(0,255,136,0.2)' }}
        />
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(0,255,136,0.08)',
            border: '1px solid rgba(0,255,136,0.25)',
          }}
        >
          <PlusCircle size={28} style={{ color: 'var(--neon)' }} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3
          className="font-display font-black text-xl tracking-wide uppercase mb-2"
          style={{ color: 'white' }}
        >
          Your Portfolio
          <br />
          <span style={{ color: 'var(--neon)' }}>is Empty</span>
        </h3>
        <p className="font-body text-xs leading-relaxed mb-5" style={{ color: 'var(--soft)' }}>
          Search for a coin on the left and click{' '}
          <span style={{ color: 'var(--neon)' }}>+ Add</span> to start
          building your portfolio.
        </p>
      </motion.div>

      {/* Feature list */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full space-y-2"
      >
        {features.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{
              background: 'rgba(0,255,136,0.04)',
              border: '1px solid rgba(0,255,136,0.08)',
            }}
          >
            <Icon size={13} style={{ color: 'var(--neon)', flexShrink: 0 }} />
            <span className="font-body text-xs" style={{ color: 'var(--soft)' }}>
              {text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1"
      >
        {[0.2, 0.5, 1, 0.5, 0.2].map((o, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ background: 'var(--muted)', opacity: o }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default EmptyPortfolio
