import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Trash2, RefreshCw } from 'lucide-react'
import { usePortfolioStore } from '../store/portfolioStore'
import { usePortfolioCoins } from '../hooks/useCrypto'
import PortfolioSummary from './PortfolioSummary'
import PortfolioItem from './PortfolioItem'
import EmptyPortfolio from './EmptyPortfolio'
import LoadingState from './LoadingState'

const PortfolioPanel = () => {
  const holdings = usePortfolioStore((s) => s.holdings)
  const removeHolding = usePortfolioStore((s) => s.removeHolding)
  const clearPortfolio = usePortfolioStore((s) => s.clearPortfolio)

  const holdingsArray = Object.values(holdings)
  const isEmpty = holdingsArray.length === 0

  // Live prices for portfolio coins only
  const { data: liveCoins, isLoading, refetch } = usePortfolioCoins()

  // Build a priceMap for quick lookup: coinId → currentPrice
  const priceMap = {}
  if (liveCoins) {
    liveCoins.forEach((c) => { priceMap[c.id] = c.current_price })
  }

  // Expose removeHolding globally for PortfolioItem (avoids prop drilling)
  window.__portfolioRemove = removeHolding

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--panel)' }}>
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <Briefcase size={15} style={{ color: 'var(--neon)' }} />
          <span className="font-display font-bold text-base tracking-wider uppercase text-white">
            My Portfolio
          </span>
          {!isEmpty && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded-md ml-1"
              style={{
                background: 'rgba(0,255,136,0.1)',
                color: 'var(--neon)',
                border: '1px solid rgba(0,255,136,0.2)',
              }}
            >
              {holdingsArray.length}
            </motion.span>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {!isEmpty && (
            <>
              {/* Refresh prices */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 180 }}
                onClick={() => refetch()}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'var(--soft)' }}
                title="Refresh prices"
              >
                <RefreshCw size={13} />
              </motion.button>

              {/* Clear all */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (window.confirm('Clear entire portfolio?')) clearPortfolio()
                }}
                className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                style={{ color: 'var(--danger)' }}
                title="Clear portfolio"
              >
                <Trash2 size={13} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Summary stats — only shown when non-empty */}
      <AnimatePresence>
        {!isEmpty && (
          <motion.div
            key="summary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 overflow-hidden"
          >
            <PortfolioSummary
              holdings={holdings}
              liveCoins={liveCoins ?? []}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holdings list */}
      <div className="flex-1 overflow-y-auto relative">
        {isEmpty ? (
          <EmptyPortfolio />
        ) : isLoading ? (
          <LoadingState message="Refreshing prices…" />
        ) : (
          <AnimatePresence>
            <div>
              {holdingsArray.map((holding, i) => (
                <PortfolioItem
                  key={holding.coinId}
                  holding={holding}
                  livePrice={priceMap[holding.coinId] ?? null}
                  index={i}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer — last updated */}
      {!isEmpty && (
        <div
          className="px-5 py-3 border-t flex-shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="font-mono text-[9px] text-muted text-center uppercase tracking-widest">
            Prices refresh every 30s
          </p>
        </div>
      )}
    </div>
  )
}

export default PortfolioPanel
