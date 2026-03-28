// Embedded backend endpoint reference as a JS object
const hiveApiEndpoints = {
  service: "hive-backend",
  version: "1.0.0",
  base_url: "http://localhost:3000/api",
  endpoints: [
    { method: "GET", path: "/health", description: "Health check for backend status" },
    { method: "GET", path: "/hive/account/:name", description: "Get one Hive account" },
    { method: "GET", path: "/hive/accounts?names=account1,account2", description: "Get multiple Hive accounts" },
    { method: "GET", path: "/hive/account/:name/history?limit=20", description: "Get account history" },
    { method: "GET", path: "/hive/chain/properties", description: "Get dynamic global chain properties" },
    { method: "GET", path: "/engine/balances/:account?limit=100", description: "Get Hive-Engine balances" },
    { method: "GET", path: "/engine/trades?symbol=PEK&limit=50", description: "Get Hive-Engine trades" }
  ],
  notes: [
    "All responses follow { ok, data } shape on success.",
    "Run the backend from /hive-backend before calling local endpoints."
  ]
};

if (typeof module !== 'undefined') module.exports = hiveApiEndpoints;
if (typeof window !== 'undefined') window.hiveApiEndpoints = hiveApiEndpoints;
