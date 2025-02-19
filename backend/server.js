const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
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

app.get('/process', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/process.html'));
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
    const pythonProcess = spawn('python', ['C:/Users/stidr/ECOFRIEND/R-driste.github.io/object_detection.py']);

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
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

    console.log('Received message:', message);

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: message,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const chatResponse = response.data.choices[0].text.trim();
        console.log('ChatGPT response:', chatResponse);
        res.json({ response: chatResponse });
    } catch (error) {
        console.error('Error communicating with ChatGPT API:', error);
        res.json({ response: "Sorry, I'm not available right now." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
