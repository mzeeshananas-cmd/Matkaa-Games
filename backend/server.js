import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './src/config/database.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import partnerRoutes from './modules/partners/partner.routes.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:8443';

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'matkaa-api',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/partners', partnerRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found.' });
});


async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, '0.0.0.0', () => {
      console.log(`MATKAA API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
