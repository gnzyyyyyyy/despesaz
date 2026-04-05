import mongoose, { Schema, model, models } from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'],
        default: 'expense'
    },
    category: {
        type: String,
        required: true,
        enum: ['Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment', 'Health & Care', 'Miscellaneous', 'Salary', 'Investments', 'Gifts', 'Refunds', 'Other'],
        default: 'Other'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
}, {
    timestamps: true
})

export const Transaction = models.Transaction || model('Transaction', transactionSchema);