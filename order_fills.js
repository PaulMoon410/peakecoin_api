// Helper to fetch order fills from Hive Engine API, fallback to static JSON if needed
// Usage: fetchOrderFills({ symbol, baseSymbol, user, limit })

const STATIC_FILLS_JSON = './order_fills.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch order fills from Hive Engine API (live)
 * @param {object} opts - { symbol, baseSymbol, user, limit }
 * @returns {Promise<Array>} Array of fills or []
 */
async function fetchLiveOrderFills({ symbol, baseSymbol, user, limit = 20 }) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'trades',
      query: Object.assign(
        { symbol, baseSymbol },
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
    if (data && data.result) {
      return data.result.map((t, i) => ({
        fill_id: t._id || `fill_${i}`,
        order_id: t.orderId,
        user: t.account,
        amount: Number(t.quantity),
        price: Number(t.price),
        timestamp: t.timestamp
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch order fills from static JSON file
 * @returns {Promise<Array>} Array of fills or []
 */
async function fetchStaticOrderFills() {
  try {
    const res = await fetch(STATIC_FILLS_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.fills || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch order fills, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { symbol, baseSymbol, user, limit, live }
 * @returns {Promise<Array>} Array of fills or []
 */
async function fetchOrderFills(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const fills = await fetchLiveOrderFills(opts);
    if (fills && fills.length) return fills;
  }
  return await fetchStaticOrderFills();
}

// Export for browser/Node
if (typeof window !== 'undefined') {
  window.fetchOrderFills = fetchOrderFills;
}
if (typeof module !== 'undefined') {
  module.exports = { fetchOrderFills, fetchLiveOrderFills, fetchStaticOrderFills };
}
