// Embedded bot config data as a JS object
const botConfig = {
  config: {}
};

if (typeof module !== 'undefined') module.exports = botConfig;
if (typeof window !== 'undefined') window.botConfig = botConfig;
