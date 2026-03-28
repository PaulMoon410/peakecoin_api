# peakecoin_api
'Poor Man's API' using .json files to mimic an API as closely as I can.

## Hive backend (JavaScript)

This repo now includes a starter backend at [hive-backend/README.md](hive-backend/README.md).

It gives you clean endpoints for Hive + Hive-Engine lookups so you and others can build on top of it quickly.

Quick start:

1. Go to [hive-backend](hive-backend)
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Run `npm run dev`

Then open:

- `http://localhost:3000/api/health`
- `http://localhost:3000/api/hive/account/blocktrades`

## Static local news feed

You can use [local_news.js](local_news.js) and [local_news.json](local_news.json) to display local news posts on your website.

Helpers included:

- `localNews.articles`
- `getLatestLocalNews(5)`
- `renderLocalNews('#news-feed')`
