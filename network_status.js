// Embedded network status data as a JS object
const networkStatus = {
  hive_engine: "ok",
  scala: "ok",
  nectarengine: "ok",
  beem: "ok",
  nectar_hive: "ok"
};

if (typeof module !== 'undefined') module.exports = networkStatus;
if (typeof window !== 'undefined') window.networkStatus = networkStatus;
