// JS helper for match_engine_status.json
async function fetchMatchEngineStatus() {
    const res = await fetch('match_engine_status.json');
    return await res.json();
}
