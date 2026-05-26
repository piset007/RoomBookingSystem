import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorMiddleware);

export default app;
