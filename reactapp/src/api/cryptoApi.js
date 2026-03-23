import axios from 'axios'

// CoinGecko public API — no API key required
const BASE_URL = 'https://api.coingecko.com/api/v3'

const geckoClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})

/**
 * Fetch top coins by market cap.
 * @param {number} perPage - number of results (default 50)
 * @param {number} page - page number (default 1)
 * @returns {Promise<Coin[]>}
 */
export const fetchTopCoins = async (perPage = 50, page = 1) => {
  const { data } = await geckoClient.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
      price_change_percentage: '24h',
    },
  })
  return data
}

/**
 * Search coins by query string.
 * @param {string} query
 * @returns {Promise<SearchResult>}
 */
export const searchCoins = async (query) => {
  const { data } = await geckoClient.get('/search', {
    params: { query },
  })
  return data
}

/**
 * Fetch market data for specific coin IDs (used to refresh portfolio prices).
 * @param {string[]} ids - array of CoinGecko coin IDs
 * @returns {Promise<Coin[]>}
 */
export const fetchCoinsByIds = async (ids) => {
  if (!ids.length) return []
  const { data } = await geckoClient.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: ids.join(','),
      order: 'market_cap_desc',
      per_page: ids.length,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
    },
  })
  return data
}

/**
 * Fetch global market statistics (total market cap, BTC dominance, etc.)
 * @returns {Promise<GlobalData>}
 */
export const fetchGlobalStats = async () => {
  const { data } = await geckoClient.get('/global')
  return data.data
}
