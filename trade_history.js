// Helper to fetch trade history from Hive Engine API, fallback to static JSON if needed
// Usage: fetchTradeHistory({ symbol, baseSymbol, user, limit, live })

const STATIC_TRADE_HISTORY_JSON = './trade_history.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch trade history from Hive Engine API (live)
 * @param {object} opts - { symbol, baseSymbol, user, limit }
 * @returns {Promise<Array>} Array of trades or []
 */
async function fetchLiveTradeHistory({ symbol, baseSymbol, user, limit = 50 } = {}) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'trades',
      query: Object.assign(
        {},
        symbol ? { symbol } : {},
        baseSymbol ? { baseSymbol } : {},
        user ? { account: user } : {}
      ),
      limit
    }
  };
  try {
    const res = await fetch(HIVE_ENGINE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.result || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch trade history from static JSON file
 * @returns {Promise<Array>} Array of trades or []
 */
async function fetchStaticTradeHistory() {
  try {
    const res = await fetch(STATIC_TRADE_HISTORY_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.trades || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch trade history, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { symbol, baseSymbol, user, limit, live }
 * @returns {Promise<Array>} Array of trades or []
 */
async function fetchTradeHistory(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const trades = await fetchLiveTradeHistory(opts);
    if (trades && trades.length) return trades;
  }
  return await fetchStaticTradeHistory();
}

if (typeof window !== 'undefined') window.fetchTradeHistory = fetchTradeHistory;
if (typeof module !== 'undefined') module.exports = { fetchTradeHistory, fetchLiveTradeHistory, fetchStaticTradeHistory };
