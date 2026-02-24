// hive_signer.js
// PeakeCoin API: HiveSigner.com URL Helper
// Description: Helper functions to generate HiveSigner.com URLs for authentication and transaction signing.
// Usage: import or include via CDN, then use hiveSigner.<method>

export const hiveSigner = {
  // Login/authenticate via HiveSigner
  getLoginUrl: function(app, callbackUrl, state) {
    const url = new URL('https://hivesigner.com/oauth2/authorize');
    url.searchParams.set('client_id', app);
    url.searchParams.set('redirect_uri', callbackUrl);
    url.searchParams.set('response_type', 'code');
    if (state) url.searchParams.set('state', state);
    return url.toString();
  },
  // Broadcast a custom_json operation via HiveSigner
  getCustomJsonUrl: function(account, id, json, authority = 'posting', redirectUri) {
    const url = new URL('https://hivesigner.com/sign/custom-json');
    url.searchParams.set('required_posting_auths', `[\"${account}\"]`);
    url.searchParams.set('id', id);
    url.searchParams.set('json', JSON.stringify(json));
    url.searchParams.set('authority', authority);
    if (redirectUri) url.searchParams.set('redirect_uri', redirectUri);
    return url.toString();
  },
  // Transfer HIVE/HBD via HiveSigner
  getTransferUrl: function(from, to, amount, memo = '', currency = 'HIVE', redirectUri) {
    const url = new URL('https://hivesigner.com/sign/transfer');
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    url.searchParams.set('amount', `${parseFloat(amount).toFixed(3)} ${currency}`);
    url.searchParams.set('memo', memo);
    if (redirectUri) url.searchParams.set('redirect_uri', redirectUri);
    return url.toString();
  }
  // Add more methods as needed
};

// For CDN/global usage:
if (typeof window !== 'undefined') {
  window.hiveSigner = hiveSigner;
}
