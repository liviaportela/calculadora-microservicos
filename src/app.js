const express = require('express');
const path = require('path');
const calculate = require('../../api/calculate');
const serviceUrls = require('../../config/serviceUrls');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/calculate', calculate);

app.get('/api/config', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://calculadora-microservicos-zeta.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    res.json(serviceUrls);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;