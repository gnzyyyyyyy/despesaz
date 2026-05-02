import mongoose, { Schema, model, models } from "mongoose";

const budgetSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        enum: ['housing', 'food', 'utilities', 'transportation', 'entertainment', 'health_care', 'miscellaneous', 'salary', 'investments', 'gifts', 'refunds', 'other'],
        default: 'other'
    },
    limitAmount: {
        type: Number,
        required: true,
        min: 0
    },
    month: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});

budgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true });
export const Budget = models.Budget || model('Budget', budgetSchema);