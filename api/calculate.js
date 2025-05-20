const axios = require('axios');
const serviceUrls = require('../config/serviceUrls');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        console.log('Recebido requisição OPTIONS');
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        console.log('Verificação de saúde: servidor online');
        return res.status(200).json({ message: 'servidor online' });
    }

    if (req.method !== 'POST') {
        console.error(`Método inválido: ${req.method}`);
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { a, b, operation } = req.body;
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        console.error(`Parâmetros inválidos: a=${a}, b=${b}`);
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    if (!serviceUrls[operation]) {
        console.error(`Operação inválida: ${operation}`);
        return res.status(400).json({ error: 'Operação inválida' });
    }

    try {
        const response = await axios.post(serviceUrls[operation], { a: numA, b: numB });
        console.log(`Calculado ${operation}: ${numA}, ${numB} = ${response.data.result}`);
        res.status(200).json({ result: response.data.result });
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        console.error(`Erro durante ${operation}: ${errorMessage}`);
        res.status(error.response?.status || 500).json({ error: errorMessage });
    }
};