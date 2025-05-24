// JS helper for dex_accounts.json
async function fetchDexAccounts() {
    const res = await fetch('dex_accounts.json');
    return await res.json();
}
