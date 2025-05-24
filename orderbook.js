// Helper to fetch orderbook from Hive Engine API, fallback to static JSON if needed
// Usage: fetchOrderbook({ symbol, baseSymbol, limit, live })

const STATIC_ORDERBOOK_JSON = './orderbook.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch orderbook from Hive Engine API (live)
 * @param {object} opts - { symbol, baseSymbol, limit }
 * @returns {Promise<object>} { bids: [], asks: [] }
 */
async function fetchLiveOrderbook({ symbol, baseSymbol, limit = 50 } = {}) {
  const bidsBody = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'buyBook',
      query: { symbol, baseSymbol },
      limit
    }
  };
  const asksBody = {
    ...bidsBody,
    params: { ...bidsBody.params, table: 'sellBook' }
  };
  try {
    const [bidsRes, asksRes] = await Promise.all([
      fetch(HIVE_ENGINE_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bidsBody) }),
      fetch(HIVE_ENGINE_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(asksBody) })
    ]);
    if (!bidsRes.ok || !asksRes.ok) throw new Error('API error');
    const bidsData = await bidsRes.json();
    const asksData = await asksRes.json();
    return {
      bids: bidsData.result || [],
      asks: asksData.result || []
    };
  } catch (e) {
    return { bids: [], asks: [] };
  }
}

/**
 * Fetch orderbook from static JSON file
 * @returns {Promise<object>} { bids: [], asks: [] }
 */
async function fetchStaticOrderbook() {
  try {
    const res = await fetch(STATIC_ORDERBOOK_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.orderbook || { bids: [], asks: [] };
  } catch (e) {
    return { bids: [], asks: [] };
  }
}

/**
 * Fetch orderbook, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { symbol, baseSymbol, limit, live }
 * @returns {Promise<object>} { bids: [], asks: [] }
 */
async function fetchOrderbook(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const ob = await fetchLiveOrderbook(opts);
    if ((ob.bids && ob.bids.length) || (ob.asks && ob.asks.length)) return ob;
  }
  return await fetchStaticOrderbook();
}

if (typeof window !== 'undefined') window.fetchOrderbook = fetchOrderbook;
if (typeof module !== 'undefined') module.exports = { fetchOrderbook, fetchLiveOrderbook, fetchStaticOrderbook };
