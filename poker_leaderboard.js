// JS helper for poker_leaderboard.json
async function fetchPokerLeaderboard() {
    const res = await fetch('poker_leaderboard.json');
    return await res.json();
}
