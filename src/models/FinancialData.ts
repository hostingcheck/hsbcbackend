import mongoose, { Document, Schema } from 'mongoose';

export interface IFinancialData extends Document {
    step: number;
    customer: string;
    age: number;
    gender: string;
    zipcodeOri: string;
    merchant: string;
    zipMerchant: string;
    category: string;
    amount: number;
    fraud: boolean;
}

const FinancialDataSchema: Schema = new Schema({
    step: { type: Number, required: true },
    customer: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    zipcodeOri: { type: String, required: true },
    merchant: { type: String, required: true },
    zipMerchant: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    fraud: { type: Boolean, required: true },
});

FinancialDataSchema.index({ customer: 1, category: 1, fraud: 1 });

export default mongoose.model<IFinancialData>('FinancialData', FinancialDataSchema);