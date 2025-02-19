import openai
from flask import Flask, request, jsonify
import config

app = Flask(__name__)
openai.api_key = config.openaiApiKey

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response = openai.ChatCompletion.create(
            model='gpt-4o-mini',
            messages=[{'role': 'user', 'content': message}],
            max_tokens=150,
            temperature=0.7,
            stop=['.', '!', '?']
        )
        chat_response = response.choices[0].message['content'].strip()
        return jsonify({'response': chat_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
