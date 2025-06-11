// keychain.js
// PeakeCoin API: Hive Keychain Signage Helpers
// Description: Modular helpers for Hive Keychain signature requests (signBuffer, customJson, transfer, etc.)
// Usage: import or include via CDN, then use keychainHelpers.<method>

export const keychainHelpers = {
  requestSignBuffer: function(account, message, callback) {
    if (window.hive_keychain) {
      window.hive_keychain.requestSignBuffer(account, message, "Posting", callback);
    } else {
      callback({success: false, message: "Hive Keychain not installed"});
    }
  },
  requestCustomJson: function(account, json, id, displayMsg, callback) {
    if (window.hive_keychain) {
      window.hive_keychain.requestCustomJson(account, id, displayMsg, JSON.stringify(json), "Posting", callback);
    } else {
      callback({success: false, message: "Hive Keychain not installed"});
    }
  },
  requestTransfer: function(account, to, amount, memo, currency, callback) {
    if (window.hive_keychain) {
      window.hive_keychain.requestTransfer(account, to, amount, currency, memo, callback);
    } else {
      callback({success: false, message: "Hive Keychain not installed"});
    }
  }
  // Add more methods as needed
};

// For CDN/global usage:
if (typeof window !== 'undefined') {
  window.keychainHelpers = keychainHelpers;
}
