import express, { Application } from 'express';
import dotenv from 'dotenv';
import financialDataRoutes from './routes/financialDataRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api/data', financialDataRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.use(errorMiddleware);

export default app;