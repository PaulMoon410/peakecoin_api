// JS helper for leaderboard.json
async function fetchLeaderboard() {
    const res = await fetch('leaderboard.json');
    return await res.json();
}

// Embedded leaderboard data as a JS object
const leaderboard = {
  leaderboard: []
};

if (typeof module !== 'undefined') module.exports = leaderboard;
if (typeof window !== 'undefined') window.leaderboard = leaderboard;
