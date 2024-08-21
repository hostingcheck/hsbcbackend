import express from 'express';
import {
    getFinancialData,
    getFinancialDataById,
    createFinancialData,
    updateFinancialData,
    deleteFinancialData,
} from '../controllers/financialDataController';

const router = express.Router();

router.get('/data', getFinancialData);
router.get('/data/:id', getFinancialDataById);
router.post('/data', createFinancialData);
router.put('/data/:id', updateFinancialData);
router.delete('/data/:id', deleteFinancialData);

export default router;