// Helper for voting_bots.json: fetches voting bot status/config
async function fetchVotingBots() {
    const res = await fetch('voting_bots.json');
    return await res.json();
}

if (typeof window !== 'undefined') window.fetchVotingBots = fetchVotingBots;
if (typeof module !== 'undefined') module.exports = { fetchVotingBots };
