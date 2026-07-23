const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Horizon Clear Signal is LIVE!');
});

app.get('/test', (req, res) => {
    res.json({ status: 'test endpoint works!' });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Running on port ${PORT}`);
});
