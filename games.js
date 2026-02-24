// Embedded games data as a JS object
const games = {
  games: []
};

if (typeof module !== 'undefined') module.exports = games;
if (typeof window !== 'undefined') window.games = games;

// JS helper for games.json
async function fetchGames() {
    const res = await fetch('games.json');
    return await res.json();
}
