import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Check } from 'lucide-react'
import { formatPrice, formatLargeUSD, formatPercent } from '../utils/formatters'

const CoinRow = ({ coin, rank, index, isInPortfolio, onAdd }) => {
  const up = coin.price_change_percentage_24h >= 0
  const changeColor = up ? 'var(--neon)' : 'var(--danger)'

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.025 }}
      className="group border-b transition-colors duration-150 cursor-default"
      style={{ borderColor: 'var(--border)' }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
    >
      {/* Rank */}
      <td className="pl-5 py-3.5 w-10">
        <span className="font-mono text-xs text-muted">{rank}</span>
      </td>

      {/* Coin info */}
      <td className="py-3.5 pr-4">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="font-body font-semibold text-sm text-white truncate leading-tight">
              {coin.name}
            </div>
            <div className="font-mono text-[10px] text-muted uppercase mt-0.5">
              {coin.symbol}
            </div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-3.5 pr-6 text-right">
        <span className="font-mono text-sm font-semibold text-white">
          {formatPrice(coin.current_price)}
        </span>
      </td>

      {/* 24h change */}
      <td className="py-3.5 pr-6 text-right">
        <span
          className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md"
          style={{
            color: changeColor,
            background: up ? 'rgba(0,255,136,0.08)' : 'rgba(255,68,102,0.08)',
          }}
        >
          {formatPercent(coin.price_change_percentage_24h)}
        </span>
      </td>

      {/* Market cap */}
      <td className="py-3.5 pr-5 text-right hidden sm:table-cell">
        <span className="font-mono text-xs text-soft">
          {formatLargeUSD(coin.market_cap)}
        </span>
      </td>

      {/* Add button */}
      <td className="py-3.5 pr-5 text-right">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => !isInPortfolio && onAdd(coin)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-display font-bold tracking-wide transition-all"
          style={
            isInPortfolio
              ? {
                  background: 'rgba(0,255,136,0.08)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  color: 'var(--neon)',
                  cursor: 'default',
                }
              : {
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--soft)',
                }
          }
        >
          {isInPortfolio ? (
            <>
              <Check size={11} />
              Added
            </>
          ) : (
            <>
              <Plus size={11} />
              Add
            </>
          )}
        </motion.button>
      </td>
    </motion.tr>
  )
}

export default CoinRow
