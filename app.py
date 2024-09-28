from flask import Flask, request, jsonify
from chatbot.main import chat  # Import your chat function from main.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route("/chat", methods=["POST"])
def chat_endpoint():
    data = request.json
    print("Received data:", data)  # Log the entire received data
    prompt = data.get("prompt")
    size = data.get("size")
    if not prompt or not size:
        return jsonify({"error": "Invalid input"}), 400

    response = chat(prompt, size)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
