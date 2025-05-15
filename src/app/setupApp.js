import express from 'express';
import { registerRoutes } from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../docs/swagger.js';

export const setupApp = (controllers) => {
  const app = express();
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  registerRoutes(app, controllers);
  return app;
};
