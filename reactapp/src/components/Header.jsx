import React from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, Globe, Zap } from 'lucide-react'
import { useGlobalStats } from '../hooks/useCrypto'
import { useTopCoins } from '../hooks/useCrypto'
import { formatLargeUSD, formatPercent } from '../utils/formatters'

const Header = () => {
  const { data: global } = useGlobalStats()
  const { data: coins } = useTopCoins()

  const marketCap = global?.total_market_cap?.usd
  const btcDom = global?.market_cap_percentage?.btc
  const volume = global?.total_volume?.usd

  // Build ticker items from top coins
  const tickerItems = coins
    ? [...coins, ...coins] // duplicate for seamless loop
    : []

  return (
    <header className="border-b border-border">
      {/* ── Ticker tape ─────────────────────────── */}
      {tickerItems.length > 0 && (
        <div
          className="ticker-wrap bg-surface border-b border-border py-1.5"
          style={{ fontSize: '11px' }}
        >
          <div className="ticker-content font-mono">
            {tickerItems.map((coin, i) => {
              const up = coin.price_change_percentage_24h >= 0
              return (
                <span key={`${coin.id}-${i}`} className="inline-flex items-center gap-1.5 mr-8">
                  <span className="text-soft uppercase">{coin.symbol}</span>
                  <span className="text-white font-medium">
                    ${coin.current_price.toLocaleString()}
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: up ? 'var(--neon)' : 'var(--danger)' }}
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                  <span className="text-muted mr-4">·</span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Main header ─────────────────────────── */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--bg)' }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,255,136,0.05) 100%)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: 'var(--neon)',
            }}
          >
            ₿
          </div>
          <div>
            <div
              className="font-display font-black text-xl tracking-widest uppercase neon-text"
              style={{ letterSpacing: '0.12em', color: 'var(--neon)' }}
            >
              CryptoTrack
            </div>
            <div className="font-mono text-[9px] text-muted tracking-[0.2em] uppercase">
              Portfolio Dashboard
            </div>
          </div>
        </motion.div>

        {/* Global stats pills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-3"
        >
          {[
            {
              icon: Globe,
              label: 'Market Cap',
              value: marketCap ? formatLargeUSD(marketCap) : '—',
            },
            {
              icon: Activity,
              label: '24h Volume',
              value: volume ? formatLargeUSD(volume) : '—',
            },
            {
              icon: TrendingUp,
              label: 'BTC Dom.',
              value: btcDom ? `${btcDom.toFixed(1)}%` : '—',
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: 'var(--panel)',
                border: '1px solid var(--border)',
              }}
            >
              <Icon size={12} style={{ color: 'var(--soft)' }} />
              <div>
                <div className="font-mono text-[9px] text-muted uppercase tracking-wider">{label}</div>
                <div className="font-mono text-xs font-semibold text-white">{value}</div>
              </div>
            </div>
          ))}

          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'var(--neon)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: 'var(--neon)' }} />
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider"
              style={{ color: 'var(--neon)' }}>
              Live
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default Header
