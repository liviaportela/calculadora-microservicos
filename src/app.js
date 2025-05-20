const express = require('express');
const path = require('path');
const calculate = require('../api/calculate');
const serviceUrls = require('../config/serviceUrls');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/calculate', calculate);

app.get('/api/config', (req, res) => {
    res.json(serviceUrls);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;