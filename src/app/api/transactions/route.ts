import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth";
import { createTransaction, getTransaction } from "@/src/services/transaction.service";

// Create Transaction
export async function POST(req: NextRequest) {
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

        const body = await req.json();

        const transaction = await createTransaction({ ...body, userId: userID });
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error: Failed to create transaction" }, { status: 500 });
    }   
}

// Get All Transaction
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

        const transactions = await getTransaction(userID);
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error: Failed to get transaction" }, { status: 500 });
    }   
}