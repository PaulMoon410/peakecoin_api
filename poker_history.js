// Embedded poker history data as a JS object
const pokerHistory = {
  history: []
};

if (typeof module !== 'undefined') module.exports = pokerHistory;
if (typeof window !== 'undefined') window.pokerHistory = pokerHistory;
