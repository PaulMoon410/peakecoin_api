// Helper to fetch pending withdrawals from Hive Engine API, fallback to static JSON if needed
// Usage: fetchPendingWithdrawals({ account, symbol, live })

const STATIC_PENDING_WITHDRAWALS_JSON = './pending_withdrawals.json';
const HIVE_ENGINE_API = 'https://api.hive-engine.com/rpc/contracts';

/**
 * Fetch pending withdrawals from Hive Engine API (live)
 * @param {object} opts - { account, symbol, limit }
 * @returns {Promise<Array>} Array of withdrawals or []
 */
async function fetchLivePendingWithdrawals({ account, symbol, limit = 50 } = {}) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'find',
    params: {
      contract: 'tokens',
      table: 'pendingUnstakes',
      query: Object.assign(
        {},
        account ? { account: account.toLowerCase() } : {},
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
 * Fetch pending withdrawals from static JSON file
 * @returns {Promise<Array>} Array of withdrawals or []
 */
async function fetchStaticPendingWithdrawals() {
  try {
    const res = await fetch(STATIC_PENDING_WITHDRAWALS_JSON);
    if (!res.ok) throw new Error('Static file error');
    const data = await res.json();
    return data.withdrawals || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch pending withdrawals, live from Hive Engine if possible, else fallback to static JSON
 * @param {object} opts - { account, symbol, limit, live }
 * @returns {Promise<Array>} Array of withdrawals or []
 */
async function fetchPendingWithdrawals(opts = {}) {
  const { live = true } = opts;
  if (live) {
    const withdrawals = await fetchLivePendingWithdrawals(opts);
    if (withdrawals && withdrawals.length) return withdrawals;
  }
  return await fetchStaticPendingWithdrawals();
}

if (typeof window !== 'undefined') window.fetchPendingWithdrawals = fetchPendingWithdrawals;
if (typeof module !== 'undefined') module.exports = { fetchPendingWithdrawals, fetchLivePendingWithdrawals, fetchStaticPendingWithdrawals };
