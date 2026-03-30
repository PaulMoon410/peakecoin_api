import os
import uuid
import requests

PAYPAL_MODE = os.getenv('PAYPAL_MODE', 'sandbox').lower()
PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET')

BASE_URLS = {
    'sandbox': 'https://api-m.sandbox.paypal.com',
    'live': 'https://api-m.paypal.com'
}


def get_paypal_base_url():
    return BASE_URLS['live'] if PAYPAL_MODE == 'live' else BASE_URLS['sandbox']


def get_paypal_access_token():
    if not PAYPAL_CLIENT_ID or not PAYPAL_CLIENT_SECRET:
        raise RuntimeError('Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET environment variables.')

    response = requests.post(
        f"{get_paypal_base_url()}/v1/oauth2/token",
        auth=(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET),
        data={'grant_type': 'client_credentials'},
        timeout=20,
    )
    response.raise_for_status()
    return response.json()['access_token']


def create_paypal_payout(receiver, amount, currency='USD', note='PeakeCoin payout', sender_batch_id=None):
    token = get_paypal_access_token()
    sender_batch_id = sender_batch_id or f"pek-{uuid.uuid4()}"

    payload = {
        'sender_batch_header': {
            'sender_batch_id': sender_batch_id,
            'email_subject': 'You have a payout from PeakeCoin'
        },
        'items': [
            {
                'recipient_type': 'EMAIL',
                'amount': {
                    'value': str(amount),
                    'currency': currency
                },
                'receiver': receiver,
                'note': note,
                'sender_item_id': f"item-{uuid.uuid4()}"
            }
        ]
    }

    response = requests.post(
        f"{get_paypal_base_url()}/v1/payments/payouts",
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        },
        json=payload,
        timeout=20,
    )
    response.raise_for_status()
    return response.json()


if __name__ == '__main__':
    print('paypal_payout.py loaded. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET before use.')
