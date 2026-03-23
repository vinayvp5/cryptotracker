import { useQuery } from '@tanstack/react-query'
import { fetchTopCoins, fetchGlobalStats, fetchCoinsByIds } from '../api/cryptoApi'
import { usePortfolioStore } from '../store/portfolioStore'

/**
 * Hook: fetch top 50 coins by market cap.
 * Refreshes every 60 seconds automatically.
 */
export const useTopCoins = () =>
  useQuery({
    queryKey: ['coins', 'markets'],
    queryFn: () => fetchTopCoins(50),
    refetchInterval: 60 * 1000,
  })

/**
 * Hook: fetch live prices for all coins currently in the portfolio.
 * Refreshes every 30 seconds when portfolio is non-empty.
 */
export const usePortfolioCoins = () => {
  const holdings = usePortfolioStore((s) => s.holdings)
  const ids = Object.keys(holdings)

  return useQuery({
    queryKey: ['coins', 'portfolio', ids],
    queryFn: () => fetchCoinsByIds(ids),
    enabled: ids.length > 0,
    refetchInterval: 30 * 1000,
  })
}

/**
 * Hook: global crypto market stats (market cap, BTC dominance, etc.)
 * Refreshes every 5 minutes.
 */
export const useGlobalStats = () =>
  useQuery({
    queryKey: ['global'],
    queryFn: fetchGlobalStats,
    refetchInterval: 5 * 60 * 1000,
  })
