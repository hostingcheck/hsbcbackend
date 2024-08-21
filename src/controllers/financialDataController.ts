import { Request, Response } from 'express';
import FinancialData, { IFinancialData } from '../models/FinancialData';

const getFinancialData = async (req: Request, res: Response) => {
    try {
        const financialData = await FinancialData.find();
        res.status(200).json(financialData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching financial data' });
    }
};

const getFinancialDataById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const financialData = await FinancialData.findById(id);

        if (!financialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        res.status(200).json(financialData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching financial data' });
    }
};

const createFinancialData = async (req: Request, res: Response) => {
    try {
        const financialData = new FinancialData(req.body);
        await financialData.save();
        res.status(201).json(financialData);
    } catch (error) {
        res.status(500).json({ message: 'Error creating financial data' });
    }
};

const updateFinancialData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedFinancialData = await FinancialData.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedFinancialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        res.status(200).json(updatedFinancialData);
    } catch (error) {
        res.status(500).json({ message: 'Error updating financial data' });
    }
};

const deleteFinancialData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedFinancialData = await FinancialData.findByIdAndDelete(id);

        if (!deletedFinancialData) {
            return res.status(404).json({ message: 'Financial data not found' });
        }

        res.status(200).json({ message: 'Financial data deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting financial data' });
    }
};

export { getFinancialData, getFinancialDataById, createFinancialData, updateFinancialData, deleteFinancialData };