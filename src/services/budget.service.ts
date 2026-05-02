import { Budget } from "../models/Budget";

export async function createBudget(data: any) {
    const budget = await Budget.create(data);
    return budget;
}

export async function getBudget(userId: string, month?: Date) {
    const query: any = { userId};
    if (month) query.month = month;
    const budget = await Budget.find(query).sort({ createdAt: -1 });
    return budget;
}

export async function updateBudget(id: string, userId: string, data: any) {
    const budget = await Budget.findOneAndUpdate({ _id: id, userId }, data, { new: true });
    return budget;
}

export async function deleteBudget(id: string, userId: string) {
    const budget = await Budget.findOneAndDelete({ _id: id, userId });
    return budget;
}