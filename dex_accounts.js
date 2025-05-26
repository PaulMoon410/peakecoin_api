// Embedded dex accounts data as a JS object
const dexAccounts = {
  accounts: []
};

if (typeof module !== 'undefined') module.exports = dexAccounts;
if (typeof window !== 'undefined') window.dexAccounts = dexAccounts;
