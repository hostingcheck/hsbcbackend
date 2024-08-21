import mongoose, { Document, Schema } from 'mongoose';

export interface IFinancialData extends Document {
    step: number;
    customer: string;
    age: number;
    gender: string;
    zipCodeOri: string;
    merchant: string;
    zipMerchant: string;
    category: string;
    amount: number;
    fraud: number;
}

const financialDataSchema: Schema = new Schema({
    step: { type: Number, required: true },
    customer: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    zipCodeOri: { type: String, required: true },
    merchant: { type: String, required: true },
    zipMerchant: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    fraud: { type: Number, required: true },
});

export default mongoose.model<IFinancialData>('FinancialData', financialDataSchema);