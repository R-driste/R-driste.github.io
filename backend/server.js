const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../')));

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
    res.sendFile(path.join(__dirname, '../pages/home.html'));
});

app.get('/run-python', (req, res) => {
    const pythonProcess = spawn('python', ['C:/Users/stidr/ECOFRIEND/R-driste.github.io/computer_vision.py']);
    
    let scriptOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.send(scriptOutput);
        } else {
            res.status(500).send(`Python script exited with code ${code}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
