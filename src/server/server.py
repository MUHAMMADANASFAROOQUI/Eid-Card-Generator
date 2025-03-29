# server/server.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/generate_card', methods=['POST'])
def generate_card():
    data = request.get_json()
    name = data.get("name")
    recipient = data.get("recipient")
    message = data.get("message")

    greeting_card = {
        "greeting": f"Eid Mubarak! {name} sends warm wishes to {recipient}. Message: {message}"
    }
    
    return jsonify(greeting_card)

if __name__ == "__main__":
    app.run(debug=True)
