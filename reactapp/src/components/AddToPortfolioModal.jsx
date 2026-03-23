import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, DollarSign, Hash } from 'lucide-react'
import { usePortfolioStore } from '../store/portfolioStore'
import { formatPrice } from '../utils/formatters'

const AddToPortfolioModal = ({ coin, onClose }) => {
  const [quantity, setQuantity] = useState('')
  const [buyPrice, setBuyPrice] = useState(coin?.current_price?.toFixed(2) ?? '')
  const [error, setError] = useState('')

  const addHolding = usePortfolioStore((s) => s.addHolding)

  const handleAdd = () => {
    const qty = parseFloat(quantity)
    const price = parseFloat(buyPrice)

    if (!qty || qty <= 0) {
      setError('Enter a valid quantity')
      return
    }
    if (!price || price <= 0) {
      setError('Enter a valid buy price')
      return
    }

    addHolding(coin, qty, price)
    onClose()
  }

  const totalCost = (parseFloat(quantity) || 0) * (parseFloat(buyPrice) || 0)

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl relative overflow-hidden"
          style={{
            background: 'var(--panel)',
            border: '1px solid rgba(0,255,136,0.2)',
            boxShadow: '0 0 40px rgba(0,255,136,0.08), 0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
            style={{ borderTop: '1.5px solid var(--neon)', borderLeft: '1.5px solid var(--neon)', borderRadius: '14px 0 0 0' }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
            style={{ borderBottom: '1.5px solid var(--neon)', borderRight: '1.5px solid var(--neon)', borderRadius: '0 0 14px 0' }} />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-display font-bold text-lg text-white tracking-wide">
                    {coin.name}
                  </div>
                  <div className="font-mono text-xs text-muted uppercase">{coin.symbol}</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'var(--soft)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Current price badge */}
            <div className="mb-5 px-4 py-3 rounded-xl flex items-center justify-between"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <span className="font-mono text-xs text-muted uppercase tracking-wider">Current Price</span>
              <span className="font-mono font-semibold text-white">{formatPrice(coin.current_price)}</span>
            </div>

            {/* Fields */}
            <div className="space-y-3 mb-5">
              {/* Quantity */}
              <div>
                <label className="block font-mono text-[10px] text-muted uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <div className="relative">
                  <Hash size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--soft)' }} />
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={quantity}
                    onChange={(e) => { setQuantity(e.target.value); setError('') }}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface border border-border text-white text-sm font-mono outline-none transition-all"
                    style={{
                      caretColor: 'var(--neon)',
                      borderColor: quantity ? 'rgba(0,255,136,0.3)' : 'var(--border)',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,255,136,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = quantity ? 'rgba(0,255,136,0.3)' : 'var(--border)'}
                  />
                </div>
              </div>

              {/* Buy Price */}
              <div>
                <label className="block font-mono text-[10px] text-muted uppercase tracking-wider mb-1.5">
                  Avg. Buy Price (USD)
                </label>
                <div className="relative">
                  <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--soft)' }} />
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={buyPrice}
                    onChange={(e) => { setBuyPrice(e.target.value); setError('') }}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface border border-border text-white text-sm font-mono outline-none transition-all"
                    style={{ caretColor: 'var(--neon)', background: 'var(--surface)' }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,255,136,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>
            </div>

            {/* Cost preview */}
            {totalCost > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 px-4 py-2.5 rounded-xl flex justify-between items-center"
                style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)' }}
              >
                <span className="font-mono text-xs text-soft">Total Cost</span>
                <span className="font-mono text-sm font-semibold" style={{ color: 'var(--neon)' }}>
                  ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </motion.div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-mono mb-3 text-center"
                  style={{ color: 'var(--danger)' }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm font-display font-semibold tracking-wide transition-all"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--soft)',
                }}
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="flex-1 py-3 rounded-xl text-sm font-display font-bold tracking-wide flex items-center justify-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.25), rgba(0,255,136,0.12))',
                  border: '1px solid rgba(0,255,136,0.4)',
                  color: 'var(--neon)',
                  boxShadow: '0 0 16px rgba(0,255,136,0.12)',
                }}
              >
                <Plus size={15} />
                Add to Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AddToPortfolioModal
