import express from 'express';
import {
    getFinancialData,
    addFinancialData,
    updateFinancialData,
    deleteFinancialData,
    getAggregatedData
} from '../controllers/financialDataController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/financial-data', authMiddleware, getFinancialData);
router.post('/financial-data', authMiddleware, addFinancialData);
router.put('/financial-data/:id', authMiddleware, updateFinancialData);
router.delete('/financial-data/:id', authMiddleware, deleteFinancialData);
router.get('/financial-data/aggregate', authMiddleware, getAggregatedData);

export default router;