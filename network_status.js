// JS helper for network_status.json
async function fetchNetworkStatus() {
    const res = await fetch('network_status.json');
    return await res.json();
}
