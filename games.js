// JS helper for games.json
async function fetchGames() {
    const res = await fetch('games.json');
    return await res.json();
}
