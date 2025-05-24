// JS helper for status.json
async function fetchStatus() {
    const res = await fetch('status.json');
    return await res.json();
}
