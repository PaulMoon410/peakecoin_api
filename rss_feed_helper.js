// RSS helper for PeakeCoin websites.
// Provides resilient multi-source feed loading with proxy fallbacks.

const defaultSources = {
  localapi: {
    type: 'local-api',
    name: 'PeakeCoin Local API',
    link: 'https://github.com/PaulMoon410/peakecoin_api'
  },
  marylandmatters: {
    urls: ['https://www.marylandmatters.org/feed/'],
    name: 'Maryland Matters',
    link: 'https://www.marylandmatters.org'
  },
  marylandreporter: {
    urls: ['https://marylandreporter.com/feed/'],
    name: 'Maryland Reporter',
    link: 'https://marylandreporter.com'
  },
  cnsmaryland: {
    urls: [
      'https://cnsmaryland.org/feed/',
      'https://cnsmaryland.org/category/maryland/feed/',
      'https://cnsmaryland.org/category/news/feed/'
    ],
    name: 'CNS Maryland',
    link: 'https://cnsmaryland.org'
  },
  cointelegraph: {
    urls: ['https://cointelegraph.com/rss'],
    name: 'Cointelegraph',
    link: 'https://cointelegraph.com'
  },
  coindesk: {
    urls: ['https://www.coindesk.com/arc/outboundfeeds/rss/'],
    name: 'CoinDesk',
    link: 'https://www.coindesk.com'
  },
  decrypt: {
    urls: ['https://decrypt.co/feed'],
    name: 'Decrypt',
    link: 'https://decrypt.co'
  }
};

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeItem(item, fallbackLink) {
  const published = item.pubDate || item.isoDate || item.published || item.date;
  const date = new Date(published || Date.now());

  return {
    title: item.title || 'Untitled',
    link: item.link || fallbackLink || '',
    pubDate: Number.isNaN(date.getTime()) ? new Date() : date,
    description: stripHtml(item.description || item.content || item.summary || ''),
    categories: Array.isArray(item.categories)
      ? item.categories
      : (Array.isArray(item.category) ? item.category : [])
  };
}

async function fetchViaRss2Json(url) {
  const endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('rss2json status ' + response.status);
  }

  const payload = await response.json();
  if (payload.status !== 'ok' || !Array.isArray(payload.items) || !payload.items.length) {
    throw new Error('rss2json empty');
  }

  return payload.items.map((item) => normalizeItem(item, url));
}

function xmlText(node, tagName) {
  const nodeValue = node.querySelector(tagName);
  return nodeValue ? nodeValue.textContent.trim() : '';
}

async function fetchViaAllOrigins(url) {
  const endpoint = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('allorigins status ' + response.status);
  }

  const payload = await response.json();
  if (!payload || !payload.contents) {
    throw new Error('allorigins empty');
  }

  const xml = new DOMParser().parseFromString(payload.contents, 'text/xml');
  const itemNodes = Array.from(xml.querySelectorAll('item'));
  if (!itemNodes.length) {
    throw new Error('allorigins no items');
  }

  return itemNodes.map((node) => normalizeItem({
    title: xmlText(node, 'title'),
    link: xmlText(node, 'link'),
    pubDate: xmlText(node, 'pubDate'),
    description: xmlText(node, 'description'),
    categories: Array.from(node.querySelectorAll('category')).map((c) => c.textContent.trim())
  }, url));
}

async function fetchUrl(url) {
  try {
    return await fetchViaRss2Json(url);
  } catch (rssErr) {
    try {
      return await fetchViaAllOrigins(url);
    } catch (originErr) {
      throw new Error('Failed URL ' + url + ' :: ' + rssErr.message + ' | ' + originErr.message);
    }
  }
}

async function fetchSource(source, options = {}) {
  const {
    localApiLoader,
    limit = 20
  } = options;

  if (!source) throw new Error('Missing source');

  if (source.type === 'local-api') {
    if (typeof localApiLoader === 'function') {
      const localItems = await Promise.resolve(localApiLoader());
      if (!Array.isArray(localItems)) return [];
      return localItems.slice(0, limit);
    }
    throw new Error('local-api source requires options.localApiLoader');
  }

  const urls = Array.isArray(source.urls)
    ? source.urls
    : (source.url ? [source.url] : []);

  if (!urls.length) {
    throw new Error('Source has no URLs');
  }

  let lastError;
  for (const url of urls) {
    try {
      const items = await fetchUrl(url);
      return items.slice(0, limit);
    } catch (error) {
      lastError = error;
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[rss_feed_helper] source URL failed:', url, error.message || error);
      }
    }
  }

  throw lastError || new Error('All source URLs failed');
}

function getSources() {
  return JSON.parse(JSON.stringify(defaultSources));
}

async function fetchSourceById(sourceId, options = {}) {
  const sources = options.sources || defaultSources;
  const source = sources[sourceId];
  if (!source) {
    throw new Error('Unknown source: ' + sourceId);
  }

  const items = await fetchSource(source, options);

  return {
    sourceId,
    source,
    items
  };
}

const RssFeedHelper = {
  defaultSources,
  getSources,
  fetchSource,
  fetchSourceById
};

if (typeof module !== 'undefined') {
  module.exports = RssFeedHelper;
}

if (typeof window !== 'undefined') {
  window.RssFeedHelper = RssFeedHelper;
}
