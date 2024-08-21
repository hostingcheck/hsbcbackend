import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/database';
import financialDataRoutes from './routes/financialDataRoutes';
import authRoutes from './routes/authRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', financialDataRoutes);

app.use(errorMiddleware);

export { app, httpServer };