import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

const port = Number(process.env.PORT || 3000);

const start = async () => {
  app.listen(port, () => {
    console.log(`Room booking API running on port:http://localhost:${port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
