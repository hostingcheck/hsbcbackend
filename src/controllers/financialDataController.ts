import { Request, Response } from 'express';
import FinancialData, { IFinancialData } from '../models/FinancialData';
import { io } from '../app';

export const getFinancialData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        const data = await FinancialData.find(filters)
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber);

        const total = await FinancialData.countDocuments(filters);

        res.json({
            data,
            totalPages: Math.ceil(total / limitNumber),
            currentPage: pageNumber,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching financial data' });
    }
};

export const addFinancialData = async (req: Request, res: Response): Promise<void> => {
    try {
        const newData = new FinancialData(req.body);
        await newData.save();
        io.emit('dataUpdated', newData);
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ message: 'Error adding financial data' });
    }
};

export const updateFinancialData = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedData = await FinancialData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            res.status(404).json({ message: 'Financial data not found' });
            return;
        }
        io.emit('dataUpdated', updatedData);
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ message: 'Error updating financial data' });
    }
};

export const deleteFinancialData = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedData = await FinancialData.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            res.status(404).json({ message: 'Financial data not found' });
            return;
        }
        io.emit('dataDeleted', req.params.id);
        res.json({ message: 'Financial data deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting financial data' });
    }
};

export const getAggregatedData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { groupBy, aggregateField, aggregateOperation } = req.query;

        if (!groupBy || !aggregateField || !aggregateOperation) {
            res.status(400).json({ message: 'Missing required query parameters' });
            return;
        }

        const aggregationPipeline: any[] = [
            {
                $group: {
                    _id: `$${groupBy}`,
                    value: { [`$${aggregateOperation}`]: `$${aggregateField}` }
                }
            },
            { $sort: { _id: 1 } }
        ];

        const aggregatedData = await FinancialData.aggregate(aggregationPipeline);
        res.json(aggregatedData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching aggregated data' });
    }
};