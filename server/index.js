import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { eventsRouter } from './routes/events.js';
import { forumsRouter } from './routes/forums.js';
import { usersRouter } from './routes/users.js';
import { servicesRouter } from './routes/services.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticate } from './middleware/authenticate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}));
app.use(express.json());

// Public routes
app.use('/auth', authRouter);

// Protected routes
app.use('/events', authenticate, eventsRouter);
app.use('/api', forumRoutes);
app.use('/users', authenticate, usersRouter);
app.use('/services', authenticate, servicesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});