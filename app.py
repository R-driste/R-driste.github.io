from flask import Flask, request, jsonify
from openai_api import get_response

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    
    response = get_response(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
