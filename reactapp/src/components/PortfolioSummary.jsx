import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react'
import { calcPortfolioTotals, formatPortfolioValue, formatPercent } from '../utils/formatters'

/**
 * PortfolioSummary — displays total value, cost, gain/loss.
 *
 * RULE: All totals are calculated here from props (not stored in Zustand).
 */
const PortfolioSummary = ({ holdings, liveCoins }) => {
  // Pure calculation — totals derived at render time
  const { totalValue, totalCost, totalGainLoss, totalGainLossPct } =
    calcPortfolioTotals(holdings, liveCoins)

  const isProfit = totalGainLoss >= 0
  const GainIcon = isProfit ? TrendingUp : TrendingDown
  const gainColor = isProfit ? 'var(--neon)' : 'var(--danger)'

  const stats = [
    {
      label: 'Total Value',
      value: formatPortfolioValue(totalValue),
      icon: DollarSign,
      color: 'var(--neon)',
      bg: 'rgba(0,255,136,0.06)',
      border: 'rgba(0,255,136,0.15)',
    },
    {
      label: 'Total Cost',
      value: formatPortfolioValue(totalCost),
      icon: DollarSign,
      color: 'var(--soft)',
      bg: 'rgba(255,255,255,0.03)',
      border: 'var(--border)',
    },
    {
      label: 'Gain / Loss',
      value: `${isProfit ? '+' : ''}${formatPortfolioValue(totalGainLoss)}`,
      icon: GainIcon,
      color: gainColor,
      bg: isProfit ? 'rgba(0,255,136,0.06)' : 'rgba(255,68,102,0.06)',
      border: isProfit ? 'rgba(0,255,136,0.15)' : 'rgba(255,68,102,0.15)',
    },
    {
      label: 'ROI',
      value: formatPercent(totalGainLossPct),
      icon: Percent,
      color: gainColor,
      bg: isProfit ? 'rgba(0,255,136,0.06)' : 'rgba(255,68,102,0.06)',
      border: isProfit ? 'rgba(0,255,136,0.15)' : 'rgba(255,68,102,0.15)',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2.5 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
      {stats.map(({ label, value, icon: Icon, color, bg, border }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl p-3 relative overflow-hidden"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Icon size={10} style={{ color, flexShrink: 0 }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
              {label}
            </span>
          </div>
          <div
            className="font-mono font-bold text-sm leading-tight"
            style={{ color }}
          >
            {value}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PortfolioSummary
