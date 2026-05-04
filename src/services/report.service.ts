import { Report } from "../models/Report";

export async function createReport(data: any) {
    return await Report.create(data);
}

export async function getReports(userId: string) {
    return await Report.find({ userId }).sort({ createdAt: -1 });
}

export async function deleteReport(id: string, userId: string) {
    return await Report.findOneAndDelete({ _id: id, userId });
}