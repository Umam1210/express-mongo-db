import express from 'express';
import { registerRoutes } from './routes/index.js';

export const setupApp = (controllers) => {
  const app = express();
  app.use(express.json());
  registerRoutes(app, controllers);
  return app;
};
