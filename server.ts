import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import { connectDatabase, isMongoConnected } from './server/config/db.js';
import { logger } from './server/utils/logger.js';
import authRoutes from './server/routes/authRoutes.js';
import pasteRoutes from './server/routes/pasteRoutes.js';
import statsRoutes from './server/routes/statsRoutes.js';
import { errorHandler } from './server/middleware/errorHandler.js';
import { swaggerDocument } from './server/utils/swagger.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & Rate Limiting Middleware
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Rate limit exceeded. Please wait a few minutes.' }
  });
  app.use('/api/', apiLimiter);

  app.use(helmet({
    contentSecurityPolicy: false, // Allow inline styles and Vite dev tools
    crossOriginEmbedderPolicy: false
  }));
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Connect Database
  await connectDatabase();

  // Request Logging
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });

  // Health Check Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'PasteBin API Gateway',
      database: isMongoConnected ? 'MongoDB (Connected)' : 'Embedded Memory DB (Mongoose Compatible)',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Swagger Documentation Routes
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/api/docs.json', (req, res) => {
    res.json(swaggerDocument);
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/pastes', pasteRoutes);
  app.use('/api/stats', statsRoutes);

  // Global Error Handler for API
  app.use(errorHandler);

  // Vite Middleware / Static Serving Setup
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Running in Development mode - Attaching Vite Middleware');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    logger.info('Running in Production mode - Serving static assets');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`PasteBin Application server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  logger.error('Failed to start application server:', err);
});
