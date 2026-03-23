import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Portfolio store.
 *
 * A "holding" is: { coinId, symbol, name, image, quantity, avgBuyPrice }
 *
 * RULE: Total value and gain/loss are NEVER stored in state.
 *       They are derived (calculated) from live prices at render time.
 */
export const usePortfolioStore = create(
  persist(
    (set, get) => ({
      // Map of coinId -> holding object
      holdings: {},

      /**
       * Add or update a holding.
       * Does NOT mutate state directly — creates a new object.
       */
      addHolding: (coin, quantity, avgBuyPrice) => {
        const existing = get().holdings[coin.id]
        set((state) => ({
          holdings: {
            ...state.holdings,
            [coin.id]: {
              coinId: coin.id,
              symbol: coin.symbol,
              name: coin.name,
              image: coin.image,
              quantity: existing
                ? existing.quantity + Number(quantity)
                : Number(quantity),
              avgBuyPrice: existing
                ? // weighted average buy price
                  (existing.avgBuyPrice * existing.quantity +
                    Number(avgBuyPrice) * Number(quantity)) /
                  (existing.quantity + Number(quantity))
                : Number(avgBuyPrice),
            },
          },
        }))
      },

      /**
       * Remove a coin from portfolio entirely.
       */
      removeHolding: (coinId) => {
        set((state) => {
          const next = { ...state.holdings }
          delete next[coinId]
          return { holdings: next }
        })
      },

      /**
       * Update quantity for a holding.
       */
      updateQuantity: (coinId, quantity) => {
        set((state) => {
          if (!state.holdings[coinId]) return state
          return {
            holdings: {
              ...state.holdings,
              [coinId]: {
                ...state.holdings[coinId],
                quantity: Number(quantity),
              },
            },
          }
        })
      },

      /**
       * Clear all holdings.
       */
      clearPortfolio: () => set({ holdings: {} }),

      /**
       * Returns all holdings as an array.
       * Total value and gain/loss are NOT included — derive them from live prices.
       */
      getHoldingsArray: () => Object.values(get().holdings),
    }),
    {
      name: 'crypto-portfolio-v1',
    }
  )
)
