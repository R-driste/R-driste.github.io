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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
