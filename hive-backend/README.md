# Hive Backend

A simple JavaScript backend for reading Hive and Hive-Engine data.

## What this gives you

- Easy REST endpoints
- Ready for local dev and deployment
- No hardcoded secrets
- Friendly JSON responses (`{ ok, data }`)

## Setup

1. Open this folder in terminal:
   - `cd hive-backend`
2. Install deps:
   - `npm install`
3. Create env file:
   - copy `.env.example` to `.env`
4. Start server:
   - `npm run dev`

## Endpoints

- `GET /api/health`
- `GET /api/hive/account/:name`
- `GET /api/hive/accounts?names=account1,account2`
- `GET /api/hive/account/:name/history?limit=20`
- `GET /api/hive/chain/properties`
- `GET /api/engine/balances/:account?limit=100`
- `GET /api/engine/trades?symbol=PEK&limit=50`

## Example calls

- `http://localhost:3000/api/hive/account/blocktrades`
- `http://localhost:3000/api/engine/trades?symbol=PEK&limit=25`

## Next files to add later

- `src/routes/transactions.js` for custom tx lookups
- `src/routes/payouts.js` for signed payout actions
- `src/middleware/auth.js` for API key protection
