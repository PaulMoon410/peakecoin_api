// Crypto RSS feed source list for PeakeCoin news integrations.
const cryptoRssSources = {
  updated_at: "2026-03-30T00:00:00Z",
  sources: [
    {
      id: "cointelegraph",
      name: "Cointelegraph",
      url: "https://cointelegraph.com/rss",
      category: "crypto-news",
      active: true
    },
    {
      id: "coindesk",
      name: "CoinDesk",
      url: "https://www.coindesk.com/arc/outboundfeeds/rss/",
      category: "crypto-news",
      active: true
    },
    {
      id: "decrypt",
      name: "Decrypt",
      url: "https://decrypt.co/feed",
      category: "crypto-news",
      active: true
    },
    {
      id: "bitcoinmagazine",
      name: "Bitcoin Magazine",
      url: "https://bitcoinmagazine.com/.rss/full/",
      category: "crypto-news",
      active: true
    }
  ]
};

function getCryptoRssSources(activeOnly = true) {
  if (!activeOnly) return [...cryptoRssSources.sources];
  return cryptoRssSources.sources.filter((source) => source.active);
}

if (typeof module !== 'undefined') {
  module.exports = {
    cryptoRssSources,
    getCryptoRssSources
  };
}

if (typeof window !== 'undefined') {
  window.cryptoRssSources = cryptoRssSources;
  window.getCryptoRssSources = getCryptoRssSources;
}
