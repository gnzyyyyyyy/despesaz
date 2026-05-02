"use client"

import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function ExpenseLineChart({ transactions }: any) {
    const monthly: any = {};

    transactions.forEach((t: any) => {
        const month = new Date(t.date).toLocaleString("default", { month: "long" });
        monthly[month] = (monthly[month] || 0) + t.amount;
    });

    const data = Object.keys(monthly).map(m => ({
        month: m,
        amount: monthly[m]
    }));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-center font-semibold mb-4">
                Expense Activity
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#4aa3df" />
                </LineChart>
            </ResponsiveContainer>
        </div>        
    )
}