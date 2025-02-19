document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('prompt-input').value;

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    document.getElementById('response-output').innerText = data.response;
});
