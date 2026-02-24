// Embedded mud state data as a JS object
const mudState = {
  state: {}
};

if (typeof module !== 'undefined') module.exports = mudState;
if (typeof window !== 'undefined') window.mudState = mudState;
