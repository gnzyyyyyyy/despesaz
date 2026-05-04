import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth";
import { createReport, getReports } from "@/src/services/report.service";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        const userId = getUserFromToken(token!);

        const body = await req.json();

        const report = await createReport({
            ...body,
            userId,
        });

        return NextResponse.json(report);
    } catch (err) {
        return NextResponse.json({ message: "Error saving report" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userID = getUserFromToken(token);
        if (!userID) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const reports = await getReports(userID);

        return NextResponse.json(reports);
    } catch (err) {
        return NextResponse.json({ message: "Error fetching reports" }, { status: 500 });
    }
}