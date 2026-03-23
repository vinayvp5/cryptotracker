import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react'
import { formatPrice, formatPortfolioValue, formatPercent, formatQuantity } from '../utils/formatters'

const PortfolioItem = ({ holding, livePrice, index }) => {
  const [expanded, setExpanded] = useState(false)
  const removeHolding = window.__portfolioRemove // set by PortfolioPanel for simplicity

  const currentValue = (livePrice ?? 0) * holding.quantity
  const costBasis = holding.avgBuyPrice * holding.quantity
  const gainLoss = currentValue - costBasis
  const gainLossPct = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0
  const isProfit = gainLoss >= 0
  const gainColor = isProfit ? 'var(--neon)' : 'var(--danger)'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b last:border-b-0"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Main row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Coin identity */}
        <img
          src={holding.image}
          alt={holding.name}
          className="w-7 h-7 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-body font-semibold text-sm text-white truncate">
              {holding.name}
            </span>
            <span className="font-mono text-sm font-bold ml-2 flex-shrink-0" style={{ color: 'var(--neon)' }}>
              {formatPortfolioValue(currentValue)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="font-mono text-[10px] text-muted">
              {formatQuantity(holding.quantity)} {holding.symbol.toUpperCase()}
            </span>
            <div className="flex items-center gap-1">
              {isProfit ? (
                <TrendingUp size={9} style={{ color: gainColor }} />
              ) : (
                <TrendingDown size={9} style={{ color: gainColor }} />
              )}
              <span className="font-mono text-[10px] font-semibold" style={{ color: gainColor }}>
                {formatPercent(gainLossPct)}
              </span>
            </div>
          </div>
        </div>

        {/* Expand chevron */}
        <div style={{ color: 'var(--muted)', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="mx-4 mb-3 rounded-xl p-3 grid grid-cols-2 gap-y-2.5 gap-x-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {[
                ['Current Price', formatPrice(livePrice)],
                ['Avg Buy Price', formatPrice(holding.avgBuyPrice)],
                ['Cost Basis', formatPortfolioValue(costBasis)],
                ['Gain / Loss', `${isProfit ? '+' : ''}${formatPortfolioValue(gainLoss)}`],
              ].map(([label, val], i) => (
                <div key={label}>
                  <div className="font-mono text-[9px] text-muted uppercase tracking-wider mb-0.5">{label}</div>
                  <div
                    className="font-mono text-xs font-semibold"
                    style={{
                      color: label.includes('Gain') ? gainColor : 'white',
                    }}
                  >
                    {val}
                  </div>
                </div>
              ))}

              {/* Remove button */}
              <div className="col-span-2 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.__portfolioRemove?.(holding.coinId)
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono font-medium py-1.5 px-3 rounded-lg transition-colors hover:bg-red-500/10"
                  style={{ color: 'var(--danger)' }}
                >
                  <Trash2 size={11} />
                  Remove from portfolio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default PortfolioItem
