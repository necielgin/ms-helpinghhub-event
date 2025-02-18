import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON parsing middleware

// Routes
app.use('/api/events', eventRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;