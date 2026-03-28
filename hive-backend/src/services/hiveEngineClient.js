const { hiveEngineApiUrl } = require("../config");

async function hiveEngineFind({ contract, table, query = {}, limit = 100, offset = 0, indexes = [] }) {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "find",
    params: {
      contract,
      table,
      query,
      limit: Math.max(1, Math.min(Number(limit) || 100, 1000)),
      offset: Math.max(0, Number(offset) || 0),
      indexes,
    },
  };

  const res = await fetch(hiveEngineApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Hive-Engine request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || "Hive-Engine RPC error");
  }

  return data.result || [];
}

module.exports = {
  hiveEngineFind,
};
