// Embedded status data as a JS object
const status = {
  status: "ok"
};

if (typeof module !== 'undefined') module.exports = status;
if (typeof window !== 'undefined') window.status = status;
