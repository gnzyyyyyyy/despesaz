"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function CategoryPieChart({ transactions }: any) {

    const grouped: any = {};

    transactions
        .filter((t: any) => t.type === "expense")
        .forEach((t: any) => {
            grouped[t.category] =
                (grouped[t.category] || 0) + t.amount;
        });

    const data = Object.keys(grouped).map((key) => ({
        name: key,
        value: grouped[key],
    }));

    const COLORS = ["#1e6f9f", "#e74c3c", "#f39c12", "#2ecc71"];

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-center font-semibold mb-4">
                Category Breakdown
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} dataKey="value" outerRadius={90}>
                        {data.map((_: any, i: number) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}