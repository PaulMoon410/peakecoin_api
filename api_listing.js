// api_listing.js
// PeakeCoin API: Importable listing of all API JS modules
// Usage: import { apiModules } from './api_listing.js' or use window.apiModules in browser

export const apiModules = [
  {
    name: "announcements",
    js: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/announcements.js",
    json: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/announcements.json",
    description: "Site-wide announcements and news.",
    usage: "announcements.announcements"
  },
  {
    name: "audit_log",
    js: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/audit_log.js",
    json: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/audit_log.json",
    description: "Audit log entries for admin or compliance review.",
    usage: "auditLog.logs"
  },
  {
    name: "blockLog",
    js: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/blockLog.js",
    json: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/blockLog.json",
    description: "Static/fallback log of blockchain blocks processed by the PeakeCoin system.",
    usage: "blockLog.blocks"
  },
  {
    name: "bot_config",
    js: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/bot_config.js",
    json: "https://cdn.jsdelivr.net/gh/PaulMoon410/peakecoin_api/bot_config.json",
    description: "Configuration for trading and automation bots.",
    usage: "botConfig.config"
  },
  // ...add all other modules here in the same format...
];

// For CDN/global usage:
if (typeof window !== 'undefined') {
  window.apiModules = apiModules;
}
