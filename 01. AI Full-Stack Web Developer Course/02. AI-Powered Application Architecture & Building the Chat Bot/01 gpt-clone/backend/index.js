import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import db from './db/db.config.js';
import mainRouter from './src/api/chat/main.routes.js';

const app = express();

// Parse incoming JSON request bodies (was missing — POST routes couldn't read req.body without this)
app.use(express.json());

// Allow the frontend (running on a different port, e.g. Vite on 5173) to call this API
app.use(cors());

app.use('/api', mainRouter);

// Simple health check route, useful for confirming the server is up
app.get('/', (req, res) => {
  res.send('GPT-Clone backend is running.');
});

const PORT = process.env.PORT || 3888;

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();
    console.log('Connected to MySQL database.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
}

startServer();
