from nectar import Nectar
from nectarengine import Engine
from nectar.transactionbuilder import TransactionBuilder
import requests
import time
import json
import os

# Set up Nectar with your active key (keep this safe!)
nectar = Nectar(keys=['5Jjp6U8jJBu82xnPteQa5M42Zd5nRCrD3PkyPwWmGBGu3yQubTa'])  # peake.matic active key
engine = Engine(nectar)

QUEUE_FILE = 'payment_queue.json'

def send_pek_payout(to, amount, memo='Casino payout', delay_seconds=0):
    """
    Sends a PEK payout, optionally after a delay (in seconds).
    """
    if delay_seconds > 0:
        print(f"Delaying payout of {amount} PEK to {to} for {delay_seconds} seconds...")
        time.sleep(delay_seconds)
    tx = engine.transfer(
        symbol='PEK',
        to=to,
        quantity=str(amount),
        memo=memo,
        account='peakecoin.matic'  # Use correct casino account
    )
    print(f"Sent {amount} PEK to {to}. TXID: {tx['id']}")

def queue_pek_payout(to, amount, memo='Casino payout'):
    """Add a payout to the queue file."""
    payout = {'to': to, 'amount': float(amount), 'memo': memo}
    queue = []
    if os.path.exists(QUEUE_FILE):
        with open(QUEUE_FILE, 'r') as f:
            try:
                queue = json.load(f)
            except Exception:
                queue = []
    queue.append(payout)
    with open(QUEUE_FILE, 'w') as f:
        json.dump(queue, f)
    print(f"Queued payout: {payout}")

def process_ek_payout_queue(delay_seconds=15):
    """Process queued payouts one at a time, with a delay between each."""
    while True:
        if not os.path.exists(QUEUE_FILE):
            time.sleep(delay_seconds)
            continue
        with open(QUEUE_FILE, 'r') as f:
            try:
                queue = json.load(f)
            except Exception:
                queue = []
        if not queue:
            time.sleep(delay_seconds)
            continue
        payout = queue.pop(0)
        try:
            send_pek_payout(payout['to'], payout['amount'], payout.get('memo', 'Casino payout'))
        except Exception as e:
            print(f"Error sending payout, re-queuing: {e}")
            queue.insert(0, payout)
            time.sleep(delay_seconds)
            continue
        with open(QUEUE_FILE, 'w') as f:
            json.dump(queue, f)
        time.sleep(delay_seconds)

def watch_pek_deposits(process_deposit_fn, poll_interval=30):
    """
    Polls Hive Engine for new PEK deposits to the casino account and calls process_deposit_fn(tx) for each new deposit.
    """
    HIVE_ENGINE_API = "https://api.hive-engine.com/rpc/contracts"
    CASINO_ACCOUNT = "peakecoin.matic"
    last_processed_id = None
    print("Watching for PEK deposits to", CASINO_ACCOUNT)
    while True:
        req_body = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "find",
            "params": {
                "contract": "tokens",
                "table": "transfers",
                "query": {"to": CASINO_ACCOUNT, "symbol": "PEK"},
                "limit": 100,
                "sort": "desc"
            }
        }
        try:
            resp = requests.post(HIVE_ENGINE_API, json=req_body, timeout=10)
            data = resp.json()
            txs = data.get("result", [])
            if last_processed_id:
                txs = [tx for tx in txs if tx["_id"] > last_processed_id]
            for tx in reversed(txs):  # process oldest first
                process_deposit_fn(tx)
                last_processed_id = tx["_id"]
        except Exception as e:
            print("Error polling Hive Engine:", e)
        time.sleep(poll_interval)

def watch_pek_payout_requests(process_payout_fn, poll_interval=30):
    """
    Polls Hive Engine for custom_json operations or PEK transfers with a special memo to trigger payouts.
    Calls process_payout_fn(tx) for each new payout request found.
    """
    HIVE_ENGINE_API = "https://api.hive-engine.com/rpc/contracts"
    CASINO_ACCOUNT = "peakecoin.matic"
    last_processed_id = None
    print("Watching for PEK payout requests to", CASINO_ACCOUNT)
    while True:
        req_body = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "find",
            "params": {
                "contract": "tokens",
                "table": "transfers",
                "query": {"from": CASINO_ACCOUNT, "symbol": "PEK"},
                "limit": 100,
                "sort": "desc"
            }
        }
        try:
            resp = requests.post(HIVE_ENGINE_API, json=req_body, timeout=10)
            data = resp.json()
            txs = data.get("result", [])
            if last_processed_id:
                txs = [tx for tx in txs if tx["_id"] > last_processed_id]
            for tx in reversed(txs):  # process oldest first
                # Example: look for a memo like 'casino_payout:username:amount'
                memo = tx.get('memo', '')
                if memo.startswith('casino_payout:'):
                    # Parse payout request
                    try:
                        _, username, amount = memo.split(':')
                        payout_info = {
                            'to': username,
                            'amount': float(amount),
                            'tx': tx
                        }
                        process_payout_fn(payout_info)
                    except Exception as e:
                        print('Invalid payout memo format:', memo, e)
                last_processed_id = tx["_id"]
        except Exception as e:
            print("Error polling Hive Engine for payout requests:", e)
        time.sleep(poll_interval)

# Example usage:
# send_pek_payout('winneraccount', 10.0, "Congrats! You won at PeakeCoin'sino")

# Example process_deposit_fn
# def process_deposit(tx):
#     print(f"New deposit: {tx['from']} sent {tx['quantity']} PEK. Memo: {tx['memo']}")
#     # Game logic and payout here
#     # send_pek_payout(tx['from'], win_amount, "Congrats!")

# To start watching for deposits:
# watch_pek_deposits(process_deposit)

# Example process_payout_fn
# def process_payout(payout_info):
#     print(f"Payout request: {payout_info}")
#     send_pek_payout(payout_info['to'], payout_info['amount'], "Casino payout", delay_seconds=15)

# To start watching for payout requests:
# watch_pek_payout_requests(process_payout)

# To queue a payout: queue_pek_payout('winner', 10, 'Congrats!')
# To start processing the queue: process_pek_payout_queue(delay_seconds=15)
