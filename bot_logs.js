// Embedded bot logs data as a JS object
const botLogs = {
  logs: []
};

if (typeof module !== 'undefined') module.exports = botLogs;
if (typeof window !== 'undefined') window.botLogs = botLogs;
