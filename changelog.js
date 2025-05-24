// JS helper for changelog.json
async function fetchChangelog() {
    const res = await fetch('changelog.json');
    return await res.json();
}
