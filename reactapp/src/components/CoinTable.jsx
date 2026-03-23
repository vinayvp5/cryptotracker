import React, { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BarChart2 } from 'lucide-react'
import { useTopCoins } from '../hooks/useCrypto'
import { usePortfolioStore } from '../store/portfolioStore'
import CoinRow from './CoinRow'
import SearchBar from './SearchBar'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import AddToPortfolioModal from './AddToPortfolioModal'

const CoinTable = () => {
  const [search, setSearch] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)

  const { data: coins, isLoading, isError, error, refetch } = useTopCoins()
  const holdings = usePortfolioStore((s) => s.holdings)

  // Filter coins by search query — pure derived value, not stored in state
  const filteredCoins = useMemo(() => {
    if (!coins) return []
    if (!search.trim()) return coins
    const q = search.toLowerCase()
    return coins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    )
  }, [coins, search])

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <BarChart2 size={15} style={{ color: 'var(--neon)' }} />
          <span className="font-display font-bold text-base tracking-wider uppercase text-white">
            Live Market
          </span>
          {coins && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md ml-1"
              style={{ background: 'var(--surface)', color: 'var(--soft)', border: '1px solid var(--border)' }}
            >
              Top {coins.length}
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search coins by name or symbol..."
          coinCount={search ? filteredCoins.length : undefined}
        />
      </div>

      {/* Table body */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && <LoadingState message="Fetching live market data…" />}
        {isError && <ErrorState error={error} onRetry={refetch} />}

        {!isLoading && !isError && coins && (
          <>
            {/* Column headers */}
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                  {['#', 'Coin', 'Price', '24h Change', 'Market Cap', ''].map((h, i) => (
                    <th
                      key={h + i}
                      className={`py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted font-semibold
                        ${i === 0 ? 'pl-5 text-left w-10' : ''}
                        ${i === 1 ? 'text-left pr-4' : ''}
                        ${[2, 3, 4, 5].includes(i) ? 'text-right pr-5' : ''}
                        ${i === 4 ? 'hidden sm:table-cell' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <AnimatePresence>
                <tbody>
                  {filteredCoins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <p className="font-mono text-sm text-muted">No coins match "{search}"</p>
                      </td>
                    </tr>
                  ) : (
                    filteredCoins.map((coin, i) => (
                      <CoinRow
                        key={coin.id}
                        coin={coin}
                        rank={i + 1}
                        index={i}
                        isInPortfolio={Boolean(holdings[coin.id])}
                        onAdd={() => setSelectedCoin(coin)}
                      />
                    ))
                  )}
                </tbody>
              </AnimatePresence>
            </table>
          </>
        )}
      </div>

      {/* Add to portfolio modal */}
      <AnimatePresence>
        {selectedCoin && (
          <AddToPortfolioModal
            coin={selectedCoin}
            onClose={() => setSelectedCoin(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default CoinTable
