// Static local news feed and helper functions for websites.
const localNews = {
  updated_at: "2026-03-27T00:00:00Z",
  featured: {
    id: "news-001",
    title: "PeakeCoin Local News Feed Added",
    summary: "A lightweight static news feed is now available for websites using the PeakeCoin API repo.",
    category: "update",
    location: "Harford County",
    author: "PeakeCoin",
    published_at: "2026-03-27T00:00:00Z",
    url: "https://github.com/PaulMoon410/peakecoin_api",
    tags: ["news", "website", "api"]
  },
  articles: [
    {
      id: "news-001",
      title: "PeakeCoin Local News Feed Added",
      summary: "A lightweight static news feed is now available for websites using the PeakeCoin API repo.",
      content: "Use local_news.js directly in a browser or fetch local_news.json from your frontend. You can show featured posts, render a news list, or filter by category.",
      category: "update",
      location: "Harford County",
      author: "PeakeCoin",
      published_at: "2026-03-27T00:00:00Z",
      url: "https://github.com/PaulMoon410/peakecoin_api",
      image: "",
      tags: ["news", "website", "api"]
    },
    {
      id: "news-002",
      title: "Community Events Can Be Added Easily",
      summary: "Add more articles to local_news.json to publish neighborhood updates, events, and announcements.",
      content: "This static format is meant to stay simple so anyone can update it. Add more articles with title, summary, location, and published_at fields to keep your site fresh.",
      category: "community",
      location: "Local",
      author: "PeakeCoin",
      published_at: "2026-03-26T18:00:00Z",
      url: "",
      image: "",
      tags: ["community", "events"]
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
