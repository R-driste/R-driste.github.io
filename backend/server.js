const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const config = require('../config');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});

app.get('/cv', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/computer-vision.html'));
});

app.get('/ch', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/chatbot.html'));
});

app.get('/mission', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/mission.html'));
});

app.get('/tips', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/tips.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});

app.post('/run-python', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/detect', req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error running Python script');
    }
});

app.get('/start-independent', (req, res) => {
    const pythonProcess = spawn('python', ['computer_vision.py']);
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.send('Independent video processing started.');
        } else {
            res.status(500).send(`Python script exited with code ${code}`);
        }
    });
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const apiKey = config.openaiApiKey;
    const maxTokens = 150; // Increase the maximum tokens limit

    console.log('Received message:', message);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: message }],
            max_tokens: maxTokens,
            temperature: 0.7,
            stop: ['.', '!', '?'] // Stop at the end of the first sentence, exclamation, or question
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const chatResponse = response.data.choices[0].message.content.trim();
        console.log('ChatGPT response:', chatResponse);
        res.json({ response: chatResponse });
    } catch (error) {
        console.error('Error communicating with ChatGPT API:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        }
        res.json({ response: "Sorry, I'm not available right now." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
