// JS helper for leaderboard.json
async function fetchLeaderboard() {
    const res = await fetch('leaderboard.json');
    return await res.json();
}
