import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, Briefcase, X } from 'lucide-react'
import Header from './components/Header'
import CoinTable from './components/CoinTable'
import PortfolioPanel from './components/PortfolioPanel'
import { usePortfolioStore } from './store/portfolioStore'

// ─── Mobile tab toggle ────────────────────────────────────────────────────────
const MobileTabBar = ({ activeTab, setActiveTab, holdingCount }) => (
  <div
    className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t"
    style={{
      background: 'var(--panel)',
      borderColor: 'var(--border)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}
  >
    {[
      { id: 'market', icon: BarChart2, label: 'Market' },
      { id: 'portfolio', icon: Briefcase, label: 'Portfolio', badge: holdingCount },
    ].map(({ id, icon: Icon, label, badge }) => {
      const active = activeTab === id
      return (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
          style={{ color: active ? 'var(--neon)' : 'var(--muted)' }}
        >
          <div className="relative">
            <Icon size={18} />
            {badge > 0 && (
              <span
                className="absolute -top-1.5 -right-2 font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: 'var(--neon)', color: 'var(--bg)' }}
              >
                {badge}
              </span>
            )}
          </div>
          <span className="font-display font-semibold text-[10px] uppercase tracking-wider">
            {label}
          </span>
          {active && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'var(--neon)' }}
            />
          )}
        </button>
      )
    })}
  </div>
)

// ─── Background grid decoration ───────────────────────────────────────────────
const GridBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
    }}
  />
)

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileTab, setMobileTab] = useState('market')
  const holdings = usePortfolioStore((s) => s.holdings)
  const holdingCount = Object.keys(holdings).length

  return (
    <div className="scanlines min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <GridBackground />

      {/* ── Ambient glow orbs ── */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: '-20vh', left: '-10vw', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="fixed pointer-events-none z-0"
        style={{
          bottom: '-20vh', right: '-10vw', width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(0,100,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 flex-shrink-0">
        <Header />
      </div>

      {/* ── Main two-column layout ── */}
      <div className="relative z-10 flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 108px)' }}>

        {/* LEFT — Market table (hidden on mobile when portfolio tab active) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`
            flex-1 flex flex-col overflow-hidden border-r
            ${mobileTab === 'portfolio' ? 'hidden md:flex' : 'flex'}
          `}
          style={{
            borderColor: 'var(--border)',
            background: 'var(--bg)',
          }}
        >
          <CoinTable />
        </motion.div>

        {/* RIGHT — Portfolio panel (fixed width on desktop, full on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`
            flex flex-col overflow-hidden
            w-full md:w-[340px] lg:w-[380px] flex-shrink-0
            ${mobileTab === 'market' ? 'hidden md:flex' : 'flex'}
          `}
          style={{ background: 'var(--panel)' }}
        >
          <PortfolioPanel />
        </motion.div>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <MobileTabBar
        activeTab={mobileTab}
        setActiveTab={setMobileTab}
        holdingCount={holdingCount}
      />

      {/* Spacer for mobile tab bar */}
      <div className="h-16 md:hidden flex-shrink-0" />
    </div>
  )
}
