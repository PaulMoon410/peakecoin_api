// Static local news feed and helper functions for websites.
const localNews = {
  updated_at: "2026-03-30T00:00:00Z",
  featured: {
    id: "news-20260330-001",
    title: "PeakeCoin Site News Feed Is Live",
    summary: "The live PeakeCoin ecosystem page is now rendering local API news directly from local_news.js.",
    category: "update",
    location: "Maryland",
    author: "PeakeCoin",
    published_at: "2026-03-30T00:00:00Z",
    url: "https://www.peakecoin.info/",
    tags: ["news", "website", "api", "live"]
  },
  articles: [
    {
      id: "news-20260330-001",
      title: "PeakeCoin Site News Feed Is Live",
      summary: "The live PeakeCoin ecosystem page is now rendering local API news directly from local_news.js.",
      content: "PeakeCoin.info now shows Local & Maryland News entries from the local API module. This keeps updates fast and avoids backend dependency for basic news output.",
      category: "update",
      location: "Maryland",
      author: "PeakeCoin",
      published_at: "2026-03-30T00:00:00Z",
      url: "https://www.peakecoin.info/",
      image: "",
      tags: ["news", "website", "api", "live"]
    },
    {
      id: "news-20260330-002",
      title: "Repo Updated With JS-First API Modules",
      summary: "Recent updates focused on JavaScript modules for direct website integration.",
      content: "Recent repo work centered on JS-first delivery, including local_news.js, peake_ui.js, and hive_api_endpoints.js. This reduces integration friction for frontend pages pulling data from GitHub/Geocities mirrors.",
      category: "development",
      location: "GitHub",
      author: "PeakeCoin",
      published_at: "2026-03-30T00:00:00Z",
      url: "https://github.com/PaulMoon410/peakecoin_api",
      image: "",
      tags: ["github", "javascript", "modules", "frontend"]
    },
    {
      id: "news-20260330-003",
      title: "Hive Backend Starter Available",
      summary: "A Node.js Hive backend starter is available for account and market lookup endpoints.",
      content: "The new hive-backend starter includes health checks and Hive/Hive-Engine read endpoints so the project can grow from static feeds into richer live integrations.",
      category: "hive",
      location: "Ecosystem",
      author: "PeakeCoin",
      published_at: "2026-03-29T18:00:00Z",
      url: "https://github.com/PaulMoon410/peakecoin_api/tree/main/hive-backend",
      image: "",
      tags: ["hive", "backend", "nodejs", "api"]
    },
    {
      id: "news-20260330-004",
      title: "Crypto RSS Watchlist Added",
      summary: "Use the new crypto RSS source list to plug external crypto headlines into the PeakeCoin website.",
      content: "A crypto RSS source file has been added so your site can switch between local PeakeCoin updates and external crypto headlines. This supports a hybrid news model.",
      category: "crypto",
      location: "Web",
      author: "PeakeCoin",
      published_at: "2026-03-30T00:00:00Z",
      url: "https://github.com/PaulMoon410/peakecoin_api",
      image: "",
      tags: ["crypto", "rss", "news", "feeds"]
    }
  ]
};

async function fetchLocalNews(jsonUrl = 'local_news.json') {
  const res = await fetch(jsonUrl);
  if (!res.ok) throw new Error(`Failed to fetch local news: ${res.status}`);
  return res.json();
}

function getLatestLocalNews(limit = 10, category, newsData = null) {
  const source = newsData || localNews;
  const items = [...source.articles]
    .filter((item) => !category || item.category === category)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return items.slice(0, limit);
}

async function renderLocalNews(target, options = {}) {
  const {
    limit = 5,
    category,
    showCategory = true,
    showLocation = true,
    showSummary = true,
    emptyMessage = 'No local news available.',
    jsonUrl = null
  } = options;

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) {
    throw new Error('renderLocalNews target was not found.');
  }

  // Load external JSON if URL provided, otherwise use embedded data
  let newsData = localNews;
  if (jsonUrl) {
    try {
      newsData = await fetchLocalNews(jsonUrl);
    } catch (error) {
      console.error('Failed to load external news JSON, using embedded data:', error);
    }
  }

  const items = getLatestLocalNews(limit, category, newsData);
  if (!items.length) {
    element.innerHTML = `<p>${emptyMessage}</p>`;
    return [];
  }

  element.innerHTML = items.map((item) => {
    const meta = [
      item.published_at ? new Date(item.published_at).toLocaleDateString() : '',
      showCategory ? item.category : '',
      showLocation ? item.location : ''
    ].filter(Boolean).join(' • ');

    const title = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>`
      : item.title;

    return `
      <article class="local-news-item" data-news-id="${item.id}">
        <h3>${title}</h3>
        <div class="local-news-meta">${meta}</div>
        ${showSummary ? `<p>${item.summary || ''}</p>` : ''}
      </article>
    `;
  }).join('');

  return items;
}

if (typeof module !== 'undefined') {
  module.exports = {
    localNews,
    fetchLocalNews,
    getLatestLocalNews,
    renderLocalNews
  };
}

if (typeof window !== 'undefined') {
  window.localNews = localNews;
  window.fetchLocalNews = fetchLocalNews;
  window.getLatestLocalNews = getLatestLocalNews;
  window.renderLocalNews = renderLocalNews;
}
