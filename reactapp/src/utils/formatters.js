/**
 * Format a USD price with appropriate decimal places.
 * < $0.01 → 6 decimal places
 * < $1    → 4 decimal places
 * < $100  → 2 decimal places
 * > $100  → 0 decimal places
 */
export const formatPrice = (price) => {
  if (price == null) return '—'
  if (price < 0.01)  return `$${price.toFixed(6)}`
  if (price < 1)     return `$${price.toFixed(4)}`
  if (price < 100)   return `$${price.toFixed(2)}`
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * Format a large USD number (market cap, total value) with suffix.
 * e.g. 1_400_000_000 → "$1.40B"
 */
export const formatLargeUSD = (value) => {
  if (value == null) return '—'
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9)  return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6)  return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3)  return `$${(value / 1e3).toFixed(2)}K`
  return formatPrice(value)
}

/**
 * Format a portfolio total value with full precision.
 */
export const formatPortfolioValue = (value) => {
  if (value == null) return '$0.00'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Format a percentage change.
 * Positive → "+2.34%", Negative → "-1.23%"
 */
export const formatPercent = (value) => {
  if (value == null) return '—'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * Format a coin quantity (trim trailing zeros).
 */
export const formatQuantity = (qty) => {
  if (qty == null) return '0'
  return parseFloat(qty.toFixed(8)).toString()
}

/**
 * Calculate total portfolio value from holdings + live prices.
 * RULE: This is a pure function — totals are NEVER stored in state.
 *
 * @param {Object} holdings  — { coinId: { quantity, avgBuyPrice, ... } }
 * @param {Coin[]} liveCoins — array of live coin data from API
 * @returns {{ totalValue, totalCost, totalGainLoss, totalGainLossPct }}
 */
export const calcPortfolioTotals = (holdings, liveCoins = []) => {
  const priceMap = {}
  liveCoins.forEach((c) => { priceMap[c.id] = c.current_price })

  let totalValue = 0
  let totalCost = 0

  Object.values(holdings).forEach((h) => {
    const price = priceMap[h.coinId] ?? 0
    totalValue += price * h.quantity
    totalCost  += h.avgBuyPrice * h.quantity
  })

  const totalGainLoss = totalValue - totalCost
  const totalGainLossPct = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  return { totalValue, totalCost, totalGainLoss, totalGainLossPct }
}
