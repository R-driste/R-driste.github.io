const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', async (req, res) => {
    try {
        const image = req.body.image;
        const response = await axios.post('http://localhost:5000/detect', { image });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
