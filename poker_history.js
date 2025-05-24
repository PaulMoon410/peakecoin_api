// JS helper for poker_history.json
async function fetchPokerHistory() {
    const res = await fetch('poker_history.json');
    return await res.json();
}
