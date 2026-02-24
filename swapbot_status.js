// Embedded swapbot status data as a JS object
const swapbotStatus = {
  swapbots: []
};

if (typeof module !== 'undefined') module.exports = swapbotStatus;
if (typeof window !== 'undefined') window.swapbotStatus = swapbotStatus;
