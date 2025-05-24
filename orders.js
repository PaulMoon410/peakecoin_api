// Helper to fetch open orders from Hive Engine API, fallback to static JSON if needed
// Usage: fetchOrders({ account, symbol, live })

const STATIC_ORDERS_JSON = './orders.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch open orders from Hive Engine API (live)
 * @param {object} opts - { account, symbol, limit }
 * @returns {Promise<Array>} Array of orders or []
 */
async function fetchLiveOrders({ account, symbol, limit = 50 } = {}) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'openOrders',
      query: Object.assign(
        {},
        account ? { account } : {},
        symbol ? { symbol } : {}
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
 * Fetch open orders from static JSON file
 * @returns {Promise<Array>} Array of orders or []
 */
async function fetchStaticOrders() {
  try {
    const res = await fetch(STATIC_ORDERS_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.orders || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch open orders, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { account, symbol, limit, live }
 * @returns {Promise<Array>} Array of orders or []
 */
async function fetchOrders(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const orders = await fetchLiveOrders(opts);
    if (orders && orders.length) return orders;
  }
  return await fetchStaticOrders();
}

if (typeof window !== 'undefined') window.fetchOrders = fetchOrders;
if (typeof module !== 'undefined') module.exports = { fetchOrders, fetchLiveOrders, fetchStaticOrders };
