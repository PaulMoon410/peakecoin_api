// Helper to fetch pairs from Hive Engine API, fallback to static JSON if needed
// Usage: fetchPairs({ live })

const STATIC_PAIRS_JSON = './pairs.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch trading pairs from Hive Engine API (live)
 * @returns {Promise<Array>} Array of pairs or []
 */
async function fetchLivePairs() {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'metrics',
      query: {},
      limit: 1000
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
      return data.result.map(m => ({ base: m.symbol, quote: m.baseSymbol }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch trading pairs from static JSON file
 * @returns {Promise<Array>} Array of pairs or []
 */
async function fetchStaticPairs() {
  try {
    const res = await fetch(STATIC_PAIRS_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.pairs || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch trading pairs, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { live }
 * @returns {Promise<Array>} Array of pairs or []
 */
async function fetchPairs(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const pairs = await fetchLivePairs();
    if (pairs && pairs.length) return pairs;
  }
  return await fetchStaticPairs();
}

if (typeof window !== 'undefined') window.fetchPairs = fetchPairs;
if (typeof module !== 'undefined') module.exports = { fetchPairs, fetchLivePairs, fetchStaticPairs };
