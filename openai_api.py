import openai
from config import OPENAI_API_KEY

# Ensure the API key is set correctly
openai.api_key = OPENAI_API_KEY

def get_response(prompt):
    response = openai.Completion.create(
        model="gpt-4o-mini",  # Use the gpt-4o-mini model
        prompt=prompt,
        max_tokens=150
    )
    return response.choices[0].text.strip()

# ...existing code...
