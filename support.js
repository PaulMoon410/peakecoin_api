// JS helper for support.json
async function fetchSupport() {
    const res = await fetch('support.json');
    return await res.json();
}
