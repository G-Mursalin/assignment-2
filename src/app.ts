import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', router);

// Base Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the server',
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
