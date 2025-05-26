// Embedded changelog data as a JS object
const changelog = {
  changes: []
};

if (typeof module !== 'undefined') module.exports = changelog;
if (typeof window !== 'undefined') window.changelog = changelog;
