// Helper for trading_bots.json: fetches trading bot status/config
async function fetchTradingBots() {
    const res = await fetch('trading_bots.json');
    return await res.json();
}

if (typeof window !== 'undefined') window.fetchTradingBots = fetchTradingBots;
if (typeof module !== 'undefined') module.exports = { fetchTradingBots };
