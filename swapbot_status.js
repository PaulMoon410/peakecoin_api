// JS helper for swapbot_status.json
async function fetchSwapbotStatus() {
    const res = await fetch('swapbot_status.json');
    return await res.json();
}
