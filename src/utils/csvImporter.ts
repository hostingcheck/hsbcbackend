import fs from 'fs';
import csv from 'csv-parser';
import FinancialData from '../models/FinancialData';

export const importCSV = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    await FinancialData.create({
                        step: parseInt(row.step),
                        customer: row.customer,
                        age: parseInt(row.age),
                        gender: row.gender,
                        zipcodeOri: row.zipcodeOri,
                        merchant: row.merchant,
                        zipMerchant: row.zipMerchant,
                        category: row.category,
                        amount: parseFloat(row.amount),
                        fraud: row.fraud === 'true',
                    });
                } catch (error) {
                    console.error('Error importing row:', error);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};