// peakecoin_api/hive_wallet.js
// Hive Keychain wallet integration for PeakeCoin (classic script version)

let _walletUser = null;

function isWalletAvailable() {
    return typeof window !== 'undefined' && !!window.hive_keychain;
}

function connectWallet() {
    return new Promise((resolve, reject) => {
        if (!isWalletAvailable()) {
            reject(new Error('Hive Keychain extension is required! Please install it from https://hive-keychain.com and refresh this page.'));
            return;
        }
        // Prompt for Hive username
        const username = prompt('Enter your Hive username (the same as in your Hive Keychain extension):');
        if (!username) {
            reject(new Error('Username is required.'));
            return;
        }
        // Request a signature from Hive Keychain to prove ownership
        window.hive_keychain.requestSignBuffer(
            username,
            'Sign in to PeakeCoin',
            'Posting',
            function(response) {
                if (response.success) {
                    _walletUser = username;
                    resolve(username);
                } else {
                    reject(new Error('Hive Keychain sign-in failed or was rejected.'));
                }
            }
        );
    });
}

function getWalletAddress() {
    return _walletUser;
}

function getWalletBalance(username) {
    // Fetch PEK balance for the given Hive username from Hive Engine
    return fetch('https://api.hive-engine.com/rpc/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'find',
            params: {
                contract: 'tokens',
                table: 'balances',
                query: { account: username.toLowerCase(), symbol: 'PEK' }
            }
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data && data.result && data.result.length > 0) {
            return Number(data.result[0].balance);
        }
        return 0;
    })
    .catch(() => 0);
}

// Attach to window for global access
window.isWalletAvailable = isWalletAvailable;
window.connectWallet = connectWallet;
window.getWalletAddress = getWalletAddress;
window.getWalletBalance = getWalletBalance;

console.log('[DEBUG] hive_wallet.js loaded, connectWallet on window:', typeof window.connectWallet);
