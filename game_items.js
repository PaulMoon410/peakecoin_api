// JS helper for game_items.json
async function fetchGameItems() {
    const res = await fetch('game_items.json');
    return await res.json();
}
