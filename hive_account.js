// hive_account.js
//
// Lightweight static Hive account API for apps/games.
// No blockchain node, API, or browser extension required.
//
// Usage:
//   const { account, loginWithHive } = require('./hive_account.js');
//   const result = loginWithHive('demo_user');
//   if (result.success) { /* access result.account */ }



// This simulates login and account data for universal, resource-light Hive development.

const account = require('./hive_account.json');

// Simulate login with Hive Keychain or Hivesigner (static, no real auth)
function loginWithHive(username) {
  if (username === account.username) {
    return {
      success: true,
      method: 'keychain/hivesigner',
      account
    };
  } else {
    return {
      success: false,
      message: 'Invalid username'
    };
  }
}

module.exports = {
  account,
  loginWithHive
};
