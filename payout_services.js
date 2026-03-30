// Static payout service reference for PeakeCoin.
// Describes payout methods available across the repo and browser integrations.

const payoutServices = {
  updated_at: "2026-03-30T00:00:00Z",
  default_token: "PEK",
  default_account: "peakecoin.matic",
  services: [
    {
      id: "hive_engine_transfer",
      name: "Hive-Engine Token Transfer",
      type: "onchain",
      network: "Hive-Engine",
      status: "available",
      token_support: ["PEK", "SWAP.HIVE", "BEE"],
      flow: "server-side",
      description: "Primary payout path for PEK token transfers using the casino account on Hive-Engine.",
      source_files: ["pek_payout.py", "payout_api.py"],
      fields: ["to", "amount", "memo", "token", "account"],
      endpoint: "/api/payout"
    },
    {
      id: "queued_pek_payout",
      name: "Queued PEK Payout",
      type: "queue",
      network: "Hive-Engine",
      status: "available",
      token_support: ["PEK"],
      flow: "server-side",
      description: "Queues payouts in a local file before processing them one at a time.",
      source_files: ["pek_payout.py"],
      fields: ["to", "amount", "memo"],
      queue_file: "payment_queue.json"
    },
    {
      id: "hivesigner_transfer",
      name: "HiveSigner Transfer",
      type: "redirect-signing",
      network: "Hive",
      status: "available",
      token_support: ["HIVE", "HBD"],
      flow: "browser",
      description: "Uses HiveSigner to create a browser-based signed payout redirect for HIVE or HBD transfers.",
      source_files: ["hive_signer.js"],
      fields: ["from", "to", "amount", "memo", "currency", "redirectUri"]
    },
    {
      id: "keychain_transfer",
      name: "Hive Keychain Transfer",
      type: "extension-signing",
      network: "Hive",
      status: "available",
      token_support: ["HIVE", "HBD"],
      flow: "browser",
      description: "Uses the Hive Keychain browser extension for direct transfer signing.",
      source_files: ["keychain.js"],
      fields: ["account", "to", "amount", "memo", "currency"]
    },
    {
      id: "manual_withdrawal_review",
      name: "Manual Withdrawal Review",
      type: "admin-review",
      network: "Internal",
      status: "available",
      token_support: ["PEK"],
      flow: "ops",
      description: "Tracks payout requests pending approval or operational review before sending.",
      source_files: ["pending_withdrawals.json"],
      fields: ["withdrawal_id", "user", "token", "amount", "status", "requested"]
    }
  ]
};

function getPayoutServices(activeOnly = true) {
  if (!activeOnly) return [...payoutServices.services];
  return payoutServices.services.filter((service) => service.status === 'available');
}

function getPayoutServiceById(serviceId) {
  return payoutServices.services.find((service) => service.id === serviceId) || null;
}

function getPayoutServicesByNetwork(network) {
  return payoutServices.services.filter((service) =>
    String(service.network || '').toLowerCase() === String(network || '').toLowerCase()
  );
}

function buildPayoutRequest(serviceId, payload = {}) {
  const service = getPayoutServiceById(serviceId);
  if (!service) {
    throw new Error(`Unknown payout service: ${serviceId}`);
  }

  const request = {
    service: service.id,
    network: service.network,
    token: payload.token || payoutServices.default_token,
    account: payload.account || payoutServices.default_account,
    to: payload.to || '',
    amount: payload.amount ?? 0,
    memo: payload.memo || 'PeakeCoin payout',
    created_at: new Date().toISOString()
  };

  return request;
}

const payoutServiceHelpers = {
  getPayoutServices,
  getPayoutServiceById,
  getPayoutServicesByNetwork,
  buildPayoutRequest
};

if (typeof module !== 'undefined') {
  module.exports = {
    payoutServices,
    getPayoutServices,
    getPayoutServiceById,
    getPayoutServicesByNetwork,
    buildPayoutRequest,
    payoutServiceHelpers
  };
}

if (typeof window !== 'undefined') {
  window.payoutServices = payoutServices;
  window.getPayoutServices = getPayoutServices;
  window.getPayoutServiceById = getPayoutServiceById;
  window.getPayoutServicesByNetwork = getPayoutServicesByNetwork;
  window.buildPayoutRequest = buildPayoutRequest;
  window.payoutServiceHelpers = payoutServiceHelpers;
}
