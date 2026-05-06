import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth";
import { updateBudget, deleteBudget } from "@/src/services/budget.service";

// Update Budget
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
    ) {
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

        const { id } = await context.params;
        const body = await req.json();

        const rawDate = new Date(body.month);
        const normalizedMonth = new Date(
        rawDate.getFullYear(),
        rawDate.getMonth(),
        1
        );

        const updated = await updateBudget(id, userID, {
        ...body,
        category: body.category.toLowerCase(),
        month: normalizedMonth,
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { message: "Internal server error: Failed to update budget" },
        { status: 500 }
        );
    }
}

// Delete Budget
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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

        const params = await context.params;

        const transaction = await deleteBudget(params.id, userID);
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error: Failed to delete transaction" }, { status: 500 });
    }
}
