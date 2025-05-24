// JS helper for bot_config.json
async function fetchBotConfig() {
    const res = await fetch('bot_config.json');
    return await res.json();
}
