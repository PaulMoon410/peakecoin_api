// Helper for tipping_bots.json: fetches tipping bot status/config
async function fetchTippingBots() {
    const res = await fetch('tipping_bots.json');
    return await res.json();
}

if (typeof window !== 'undefined') window.fetchTippingBots = fetchTippingBots;
if (typeof module !== 'undefined') module.exports = { fetchTippingBots };
