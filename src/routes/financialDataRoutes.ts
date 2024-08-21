import express from 'express';
import {
    getFinancialData,
    getFinancialDataById,
    createFinancialData,
    updateFinancialData,
    deleteFinancialData,
} from '../controllers/financialDataController';
import authenticateToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/data', authenticateToken, getFinancialData);
router.get('/data/:id', authenticateToken, getFinancialDataById);
router.post('/data', authenticateToken, createFinancialData);
router.put('/data/:id', authenticateToken, updateFinancialData);
router.delete('/data/:id', authenticateToken, deleteFinancialData);

export default router;