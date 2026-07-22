const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Horizon Signal is LIVE!');
});

// Simple database test endpoint
app.get('/db-test', async (req, res) => {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const result = await pool.query('SELECT NOW() as current_time');
        res.json({
            status: 'Database connected!',
            current_time: result.rows[0].current_time
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database connection failed');
    } finally {
        await pool.end();
    }
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
