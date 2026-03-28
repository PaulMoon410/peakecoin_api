const dhive = require("@hiveio/dhive");
const { hiveApiUrl } = require("../config");

const client = new dhive.Client([hiveApiUrl]);

async function getAccount(name) {
  const accounts = await client.database.getAccounts([name]);
  return accounts[0] || null;
}

async function getAccounts(names = []) {
  if (!Array.isArray(names) || names.length === 0) return [];
  return client.database.getAccounts(names);
}

async function getAccountHistory(name, limit = 20) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 1000));
  return client.database.call("get_account_history", [name, -1, safeLimit]);
}

async function getDynamicGlobalProperties() {
  return client.database.getDynamicGlobalProperties();
}

module.exports = {
  client,
  getAccount,
  getAccounts,
  getAccountHistory,
  getDynamicGlobalProperties,
};
