import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth";
import { createBudget, getBudget } from "@/src/services/budget.service";
import { Transaction } from "@/src/models/Transaction";

// Create Budget
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = getUserFromToken(token);
        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();
        
        if (!body.month) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        const rawDate = new Date(body.month);
        const normalizedMonth = new Date(
            rawDate.getFullYear(),
            rawDate.getMonth(),
            1
        );

        if (!body.month || !body.limitAmount || !body.category) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        const budget = await createBudget({ ...body, category: body.category.toLowerCase(), month: normalizedMonth, userId: userId });
        return NextResponse.json(budget, { status: 200 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ message: "Budget already exists for this month" }, { status: 400 });
        }
        console.error(error);
        return NextResponse.json({ message: "Internal server error: Failed to create budget" }, { status: 500 });
    }
}

// Get All Budget
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = getUserFromToken(token);
        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const budgets = await getBudget(userId);

        const budgetsWithSpent = await Promise.all(
            budgets.map(async (budget: any) => {
                const start = new Date(budget.month);
                const end = new Date(start);
                end.setMonth(end.getMonth() + 1);

                const transactions = await Transaction.find({
                    userId,
                    type: "expense",
                    category: budget.category,
                    date: {
                        $gte: start,
                        $lt: end
                    }
                });

                const spent = transactions.reduce(
                    (sum, t) => sum + t.amount,
                    0
                );

                return {
                    ...budget.toObject(),
                    spent
                };
            })
        );

        return NextResponse.json(budgetsWithSpent, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error: Failed to get budget" },
            { status: 500 }
        );
    }
}