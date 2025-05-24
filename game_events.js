// JS helper for game_events.json
async function fetchGameEvents() {
    const res = await fetch('game_events.json');
    return await res.json();
}
