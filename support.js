// Embedded support data as a JS object
const support = {
  contact: {},
  faq: []
};

if (typeof module !== 'undefined') module.exports = support;
if (typeof window !== 'undefined') window.support = support;
