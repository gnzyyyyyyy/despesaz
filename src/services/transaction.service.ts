import { Transaction } from "../models/Transaction";

export async function createTransaction(date: any) {
    const transaction = await Transaction.create(date);
    return transaction;
}

export async function getTransaction(userId: string) {
    const transaction = await Transaction.find({ userId }).sort({ createdAt: -1 });
    return transaction;
}

export async function updateTransaction(id: string, userId: string, data: any) {
    const transaction = await Transaction.findOneAndUpdate({ _id: id, userId }, data, { new: true });
    return transaction;
}

export async function deleteTransaction(id: string, userId: string) {
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
    return transaction;
}