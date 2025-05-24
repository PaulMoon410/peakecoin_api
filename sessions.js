// JS helper for sessions.json
async function fetchSessions() {
    const res = await fetch('sessions.json');
    return await res.json();
}
