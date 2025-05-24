// Helper to fetch market stats from Hive Engine API, fallback to static JSON if needed
// Usage: fetchMarketStats(pair, { live })

const STATIC_MARKET_STATS_JSON = './market_stats.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch market stats for a given pair from Hive Engine API (live)
 * @param {string} pair - e.g. 'PEK/SWAP.HIVE'
 * @returns {Promise<object|null>} Market stats or null if not found
 */
async function fetchLiveMarketStats(pair) {
  const [symbol, baseSymbol] = pair.split('/');
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'market',
      table: 'metrics',
      query: { symbol, baseSymbol },
      limit: 1
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
    if (data && data.result && data.result.length > 0) {
      const m = data.result[0];
      return {
        last_price: Number(m.lastPrice),
        volume_24h: Number(m.volume),
        high_24h: Number(m.highestBid),
        low_24h: Number(m.lowestAsk),
        last_updated: new Date().toISOString()
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Fetch market stats for a given pair from the static JSON file
 * @param {string} pair - e.g. 'PEK/SWAP.HIVE'
 * @returns {Promise<object|null>} Market stats or null if not found
 */
async function fetchStaticMarketStats(pair) {
  try {
    const res = await fetch(STATIC_MARKET_STATS_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.stats && data.stats[pair] ? data.stats[pair] : null;
  } catch (e) {
    return null;
  }
}

/**
 * Fetch market stats for a given pair, live from Hive Engine if possible, else fallback to static JSON
 * @param {string} pair - e.g. 'PEK/SWAP.HIVE'
 * @param {object} opts - { live: true/false }
 * @returns {Promise<object|null>} Market stats or null if not found
 */
async function fetchMarketStats(pair, { live = true } = {}) {
  if (live) {
    const liveStats = await fetchLiveMarketStats(pair);
    if (liveStats) return liveStats;
  }
  return await fetchStaticMarketStats(pair);
}

if (typeof window !== 'undefined') window.fetchMarketStats = fetchMarketStats;
if (typeof module !== 'undefined') module.exports = { fetchMarketStats, fetchLiveMarketStats, fetchStaticMarketStats };
