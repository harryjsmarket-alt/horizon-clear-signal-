app.listen()
// Health check for Railway
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Horizon Clear Signal is LIVE!');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/db-test', async (req, res) => {
    try {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        const result = await pool.query('SELECT NOW() as current_time');
        await pool.end();
        res.json({
            status: 'Database connected!',
            current_time: result.rows[0].current_time
        });
    } catch (err) {
        res.status(500).json({
            status: 'Database connection failed',
            error: err.message
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Running on port ${PORT}`);
});
