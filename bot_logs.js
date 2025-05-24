// JS helper for bot_logs.json
async function fetchBotLogs() {
    const res = await fetch('bot_logs.json');
    return await res.json();
}
