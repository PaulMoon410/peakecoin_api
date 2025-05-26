// Embedded audit log data as a JS object
const auditLog = {
  logs: []
};

if (typeof module !== 'undefined') module.exports = auditLog;
if (typeof window !== 'undefined') window.auditLog = auditLog;
