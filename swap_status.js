// Helper to fetch swap status from Hive Engine API, fallback to static JSON if needed
// Usage: fetchSwapStatus({ user, from_token, to_token, limit, live })

const STATIC_SWAP_STATUS_JSON = './swap_status.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch swap status from Hive Engine API (live)
 * @param {object} opts - { user, from_token, to_token, limit }
 * @returns {Promise<Array>} Array of swaps or []
 */
async function fetchLiveSwapStatus({ user, from_token, to_token, limit = 50 } = {}) {
  // There is no direct 'swaps' table, so this is a placeholder for custom contract logic
  // You may need to adjust contract/table/query for your swap logic
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'trades', // or your custom swap contract/table
      query: Object.assign(
        {},
        user ? { account: user } : {},
        from_token ? { symbol: from_token } : {},
        to_token ? { baseSymbol: to_token } : {}
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
 * Fetch swap status from static JSON file
 * @returns {Promise<Array>} Array of swaps or []
 */
async function fetchStaticSwapStatus() {
  try {
    const res = await fetch(STATIC_SWAP_STATUS_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.swaps || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch swap status, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { user, from_token, to_token, limit, live }
 * @returns {Promise<Array>} Array of swaps or []
 */
async function fetchSwapStatus(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const swaps = await fetchLiveSwapStatus(opts);
    if (swaps && swaps.length) return swaps;
  }
  return await fetchStaticSwapStatus();
}

if (typeof window !== 'undefined') window.fetchSwapStatus = fetchSwapStatus;
if (typeof module !== 'undefined') module.exports = { fetchSwapStatus, fetchLiveSwapStatus, fetchStaticSwapStatus };
