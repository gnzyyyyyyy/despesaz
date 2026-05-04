"use client"

import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function ExpenseLineChart({ transactions }: any) {

    //Get last 6 months
    const months: any[] = [];

    const now = new Date();

    for (let i = 3; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

        const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");

        months.push({
            key,
            label: d.toLocaleString("default", { month: "short" }),
            amount: 0
        });
    }

    //Fill expense data
    transactions.forEach((t: any) => {
        if (t.type !== "expense") return;

        const d = new Date(t.date);

        const key =
            d.getFullYear() +
            "-" +
            String(d.getMonth() + 1).padStart(2, "0");

        const target = months.find(m => m.key === key);

        if (target) {
            target.amount += t.amount;
        }
    });

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-center font-semibold mb-4">
                Expense Activity (Last 4 Months)
            </h3>

            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={months}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) =>
                            "Rp " + v.toLocaleString("id-ID")
                        }
                    />

                    <Tooltip
                        formatter={(value: any) =>
                            "Rp " + value.toLocaleString("id-ID")
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#4aa3df"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}