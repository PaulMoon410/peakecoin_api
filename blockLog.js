// blockLog.js
// PeakeCoin API: Block Log Data (embedded JS module)
// Description: Contains a static/fallback log of blockchain blocks processed by the PeakeCoin system.
// Usage: import or include via CDN, then use blockLog.blocks

export const blockLog = {
  // Example block log data (replace with real or generated data as needed)
  blocks: [
    {
      block_num: 12345678,
      timestamp: "2025-06-07T12:00:00Z",
      producer: "peakebot",
      tx_count: 12,
      hash: "0xabc123...",
      notes: "Processed normally."
    },
    {
      block_num: 12345679,
      timestamp: "2025-06-07T12:03:00Z",
      producer: "peakebot",
      tx_count: 8,
      hash: "0xdef456...",
      notes: "Minor delay, all tx confirmed."
    },
    // ...more blocks...
  ]
};

// For CDN/global usage:
if (typeof window !== 'undefined') {
  window.blockLog = blockLog;
}
