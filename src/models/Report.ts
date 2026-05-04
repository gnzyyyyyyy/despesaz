import mongoose, { Schema, model, models } from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    totalIncome: Number,
    totalExpense: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Report =
    models.Report || model("Report", reportSchema);