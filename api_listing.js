// api_listing.js
// Importable listing of key static API modules and backend endpoint reference.

const CDN_BASE = "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api";

const apiModules = [
  {
    name: "hive_api_endpoints",
    js: `${CDN_BASE}/hive_api_endpoints.js`,
    json: `${CDN_BASE}/hive_api_endpoints.json`,
    description: "Reference for local Hive backend REST endpoints.",
    usage: "hiveApiEndpoints.endpoints"
  },
  {
    name: "hive_account",
    js: `${CDN_BASE}/hive_account.js`,
    json: `${CDN_BASE}/hive_account.json`,
    description: "Hive account information and details.",
    usage: "hiveAccount.info"
  },
  {
    name: "hive_transactions",
    js: `${CDN_BASE}/hive_transactions.js`,
    json: `${CDN_BASE}/hive_transactions.json`,
    description: "Transaction history for a Hive account.",
    usage: "hiveTransactions.history"
  },
  {
    name: "hive_wallet",
    js: `${CDN_BASE}/hive_wallet.js`,
    json: `${CDN_BASE}/hive_wallet.json`,
    description: "Wallet balances and helper signing functions.",
    usage: "hiveWallet.balances"
  },
  {
    name: "hive_signer",
    js: `${CDN_BASE}/hive_signer.js`,
    json: `${CDN_BASE}/hive_signer.json`,
    description: "HiveSigner URL helpers for auth and signing.",
    usage: "hiveSigner.getLoginUrl(app, redirectUri)"
  },
  {
    name: "keychain",
    js: `${CDN_BASE}/keychain.js`,
    json: `${CDN_BASE}/keychain.json`,
    description: "Hive Keychain helper wrappers.",
    usage: "KeychainAPI.requestSignBuffer(account, message, cb)"
  },
  {
    name: "local_news",
    js: `${CDN_BASE}/local_news.js`,
    json: `${CDN_BASE}/local_news.json`,
    description: "Static local news feed. Call renderLocalNews() or fetch JSON directly.",
    usage: "await renderLocalNews('#news-feed', { jsonUrl: 'local_news.json' })"
  },
  {
    name: "crypto_rss_sources",
    js: `${CDN_BASE}/crypto_rss_sources.js`,
    json: `${CDN_BASE}/crypto_rss_sources.json`,
    description: "Curated crypto RSS feed endpoints for external news integration.",
    usage: "getCryptoRssSources()"
  },
  {
    name: "rss_feed_helper",
    js: `${CDN_BASE}/rss_feed_helper.js`,
    json: `${CDN_BASE}/rss_feed_helper.json`,
    description: "Resilient RSS feed loader with multi-URL fallback (including CNS Maryland alternates).",
    usage: "RssFeedHelper.fetchSourceById('cnsmaryland', { limit: 5 })"
  },
  {
    name: "peake_ui",
    js: `${CDN_BASE}/peake_ui.js`,
    json: `${CDN_BASE}/peake_ui.json`,
    description: "UI toolkit for animation, theme toggles, and faster page setup.",
    usage: "PeakeUI.init({ backgroundEffects: true })"
  },
  {
    name: "fetch_market",
    js: `${CDN_BASE}/fetch_market.js`,
    json: `${CDN_BASE}/fetch_market.json`,
    description: "Live and fallback market stats for token pairs.",
    usage: "fetchMarketStats('PEK/SWAP.HIVE')"
  },
  {
    name: "market_stats",
    js: `${CDN_BASE}/market_stats.js`,
    json: `${CDN_BASE}/market_stats.json`,
    description: "Market statistics for PeakeCoin and other tokens.",
    usage: "marketStats.stats"
  },
  {
    name: "pairs",
    js: `${CDN_BASE}/pairs.js`,
    json: `${CDN_BASE}/pairs.json`,
    description: "Trading pairs available on the exchange.",
    usage: "fetchPairs()"
  },
  {
    name: "orderbook",
    js: `${CDN_BASE}/orderbook.js`,
    json: `${CDN_BASE}/orderbook.json`,
    description: "Order book data for market pairs.",
    usage: "fetchOrderbook({symbol:'PEK', baseSymbol:'SWAP.HIVE'})"
  },
  {
    name: "trade_history",
    js: `${CDN_BASE}/trade_history.js`,
    json: `${CDN_BASE}/trade_history.json`,
    description: "Historical trade data for analysis.",
    usage: "fetchTradeHistory({symbol:'PEK', baseSymbol:'SWAP.HIVE'})"
  },
  {
    name: "wallet_balances",
    js: `${CDN_BASE}/wallet_balances.js`,
    json: `${CDN_BASE}/wallet_balances.json`,
    description: "Wallet balances for user accounts.",
    usage: "fetchWalletBalances({account:'peakecoin'})"
  },
  {
    name: "token_metadata",
    js: `${CDN_BASE}/token_metadata.js`,
    json: `${CDN_BASE}/token_metadata.json`,
    description: "Metadata for available tokens.",
    usage: "tokenMetadata.tokens"
  }
];

if (typeof module !== 'undefined') module.exports = { apiModules };
if (typeof window !== 'undefined') window.apiModules = apiModules;
