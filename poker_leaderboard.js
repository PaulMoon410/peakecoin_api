// JS helper for poker_leaderboard.json
async function fetchPokerLeaderboard() {
    const res = await fetch('poker_leaderboard.json');
    return await res.json();
}

// Embedded poker leaderboard data as a JS object
const pokerLeaderboard = {
  leaderboard: []
};

if (typeof module !== 'undefined') module.exports = pokerLeaderboard;
if (typeof window !== 'undefined') window.pokerLeaderboard = pokerLeaderboard;
