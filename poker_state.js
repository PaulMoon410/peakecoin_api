// Embedded poker state data as a JS object
const pokerState = {
  state: {}
};

if (typeof module !== 'undefined') module.exports = pokerState;
if (typeof window !== 'undefined') window.pokerState = pokerState;
