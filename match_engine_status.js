// Embedded match engine status data as a JS object
const matchEngineStatus = {
  status: "ok",
  last_run: null
};

if (typeof module !== 'undefined') module.exports = matchEngineStatus;
if (typeof window !== 'undefined') window.matchEngineStatus = matchEngineStatus;
