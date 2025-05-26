// Embedded login status data as a JS object
const loginStatus = {
  status: "logged_out"
};

if (typeof module !== 'undefined') module.exports = loginStatus;
if (typeof window !== 'undefined') window.loginStatus = loginStatus;
