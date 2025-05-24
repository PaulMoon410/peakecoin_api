// JS helper for bot_status.json
async function fetchBotStatus() {
    const res = await fetch('bot_status.json');
    return await res.json();
}
