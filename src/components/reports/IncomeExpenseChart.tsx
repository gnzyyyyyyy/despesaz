"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function IncomeExpenseChart({ transactions }: any) {

    const income = transactions
        .filter((t: any) => t.type === "income")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

    const expense = transactions
        .filter((t: any) => t.type === "expense")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

    const data = [
        { name: "Income", amount: income },
        { name: "Expense", amount: expense },
    ];

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-center font-semibold mb-4">
                Income vs Expense
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#1e6f9f" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}