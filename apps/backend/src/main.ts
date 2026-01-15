import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 9000;

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:7000', 'http://localhost:7001'],
  credentials: true,
}));
app.use(json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Medusa B2B Backend is running' });
});

// Basic API routes
app.get('/', (req, res) => {
    res.send({ 'message': 'Welcome to Medusa B2B API'});
});

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
    console.log(`[ info ] Medusa B2B Backend is running`);
});
