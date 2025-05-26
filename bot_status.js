// Embedded bot status data as a JS object
const botStatus = {
  bots: [
    {
      bot_id: "swapbot1",
      type: "swapbot",
      status: "active",
      last_seen: "2025-05-20T00:00:00Z"
    }
  ]
};

if (typeof module !== 'undefined') module.exports = botStatus;
if (typeof window !== 'undefined') window.botStatus = botStatus;
