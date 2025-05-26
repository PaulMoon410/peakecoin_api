// Embedded sessions data as a JS object
const sessions = {
  sessions: []
};

if (typeof module !== 'undefined') module.exports = sessions;
if (typeof window !== 'undefined') window.sessions = sessions;
