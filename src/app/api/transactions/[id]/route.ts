import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth";
import { updateTransaction, deleteTransaction } from "@/src/services/transaction.service";

// Update Transaction
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

        const transaction = await updateTransaction(params.id, userID, body);
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error: Failed to update transaction" }, { status: 500 });
    }
}

// Delete Transaction
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

        const transaction = await deleteTransaction(params.id, userID);
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error: Failed to delete transaction" }, { status: 500 });
    }
}
