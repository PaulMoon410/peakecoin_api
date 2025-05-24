// JS helper for mud_state.json
async function fetchMudState() {
    const res = await fetch('mud_state.json');
    return await res.json();
}
