from flask import Flask, request, jsonify
from pek_payout import send_pek_payout

app = Flask(__name__)

@app.route('/api/payout', methods=['POST'])
def payout():
    data = request.json
    to = data.get('to')
    amount = data.get('amount')
    memo = data.get('memo', 'Casino payout')
    # TODO: Add authentication and validation here!
    try:
        send_pek_payout(to, amount, memo)
        return jsonify({'success': True, 'message': f'Sent {amount} PEK to {to}.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)
