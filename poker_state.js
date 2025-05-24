// JS helper for poker_state.json
async function fetchPokerState() {
    const res = await fetch('poker_state.json');
    return await res.json();
}
