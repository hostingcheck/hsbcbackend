import express from 'express';
import handleChatbotQuery from '../controllers/chatbotController';

const router = express.Router();

router.post('/chat', handleChatbotQuery);

export default router;