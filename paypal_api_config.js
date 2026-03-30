// Static PayPal API config template for PeakeCoin payout integrations.

const paypalApiConfig = {
  updated_at: "2026-03-30T00:00:00Z",
  provider: "paypal",
  recommended: true,
  mode: "sandbox",
  base_urls: {
    sandbox: "https://api-m.sandbox.paypal.com",
    live: "https://api-m.paypal.com"
  },
  oauth: {
    token_path: "/v1/oauth2/token"
  },
  payouts: {
    create_path: "/v1/payments/payouts",
    get_path: "/v1/payments/payouts/{payout_batch_id}"
  },
  credential_fields: [
    { name: "PAYPAL_CLIENT_ID", required: true, source: "environment" },
    { name: "PAYPAL_CLIENT_SECRET", required: true, source: "environment" },
    { name: "PAYPAL_MODE", required: false, source: "environment", default: "sandbox" }
  ],
  recipient_fields: ["recipient_type", "receiver", "amount", "currency", "note", "sender_item_id"]
};

function getPaypalBaseUrl(mode = paypalApiConfig.mode) {
  return mode === 'live' ? paypalApiConfig.base_urls.live : paypalApiConfig.base_urls.sandbox;
}

function getPaypalTokenUrl(mode) {
  return getPaypalBaseUrl(mode) + paypalApiConfig.oauth.token_path;
}

function getPaypalPayoutCreateUrl(mode) {
  return getPaypalBaseUrl(mode) + paypalApiConfig.payouts.create_path;
}

function buildPaypalPayoutItem(payload = {}) {
  return {
    recipient_type: payload.recipient_type || 'EMAIL',
    amount: {
      value: String(payload.amount ?? '0.00'),
      currency: payload.currency || 'USD'
    },
    receiver: payload.receiver || '',
    note: payload.note || 'PeakeCoin payout',
    sender_item_id: payload.sender_item_id || `pek-${Date.now()}`
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    paypalApiConfig,
    getPaypalBaseUrl,
    getPaypalTokenUrl,
    getPaypalPayoutCreateUrl,
    buildPaypalPayoutItem
  };
}

if (typeof window !== 'undefined') {
  window.paypalApiConfig = paypalApiConfig;
  window.getPaypalBaseUrl = getPaypalBaseUrl;
  window.getPaypalTokenUrl = getPaypalTokenUrl;
  window.getPaypalPayoutCreateUrl = getPaypalPayoutCreateUrl;
  window.buildPaypalPayoutItem = buildPaypalPayoutItem;
}
