// beem_transaction.js
// PeakeCoin API: Beem Transaction Helper (documentation only)
// Description: This file documents how to use Beem in Python to broadcast Hive Engine transactions. For actual transactions, use the Python version.

export const beemTransaction = {
  description: "Helper for building and broadcasting Hive Engine custom_json transactions using Beem (Python).",
  usage: `from beem_transaction import send_hive_engine_tx\nsend_hive_engine_tx(\n    username='youraccount',\n    posting_key='your_posting_key',\n    contract_name='tokens',\n    contract_action='transfer',\n    contract_payload={\n        'symbol': 'PEK',\n        'to': 'recipient',\n        'quantity': '1.000',\n        'memo': 'Test'\n    }\n)`
};

// For CDN/global usage:
if (typeof window !== 'undefined') {
  window.beemTransaction = beemTransaction;
}
