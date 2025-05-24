// Helper to fetch wallet balances from Hive Engine API, fallback to static JSON if needed
// Usage: fetchWalletBalances({ account, symbol, live })

const STATIC_WALLET_JSON = './wallet_balances.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch wallet balances from Hive Engine API (live)
 * @param {object} opts - { account, symbol }
 * @returns {Promise<object>} Balances object or {}
 */
async function fetchLiveWalletBalances({ account, symbol } = {}) {
  if (!account) return {};
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'tokens',
      table: 'balances',
      query: Object.assign(
        { account: account.toLowerCase() },
        symbol ? { symbol } : {}
      )
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
      // Return as { SYMBOL: balance, ... }
      const balances = {};
      for (const b of data.result) {
        balances[b.symbol] = Number(b.balance);
      }
      return balances;
    }
    return {};
  } catch (e) {
    return {};
  }
}

/**
 * Fetch wallet balances from static JSON file
 * @param {object} opts - { account }
 * @returns {Promise<object>} Balances object or {}
 */
async function fetchStaticWalletBalances({ account } = {}) {
  try {
    const res = await fetch(STATIC_WALLET_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.balances && data.balances[account] ? data.balances[account] : {};
  } catch (e) {
    return {};
  }
}

/**
 * Fetch wallet balances, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { account, symbol, live }
 * @returns {Promise<object>} Balances object or {}
 */
async function fetchWalletBalances(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const balances = await fetchLiveWalletBalances(opts);
    if (Object.keys(balances).length) return balances;
  }
  return await fetchStaticWalletBalances(opts);
}

if (typeof window !== 'undefined') window.fetchWalletBalances = fetchWalletBalances;
if (typeof module !== 'undefined') module.exports = { fetchWalletBalances, fetchLiveWalletBalances, fetchStaticWalletBalances };
