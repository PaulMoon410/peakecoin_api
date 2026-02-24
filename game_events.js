// Embedded game events data as a JS object
const gameEvents = {
  events: []
};

if (typeof module !== 'undefined') module.exports = gameEvents;
if (typeof window !== 'undefined') window.gameEvents = gameEvents;
