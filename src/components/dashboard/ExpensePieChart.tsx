" use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpensePieChart({ transactions }: any) {
    const grouped: any = {};

    transactions
        .filter((t: any) => t.type === "expense")
        .forEach((t: any) => {
            grouped[t.category] = (grouped[t.category] || 0) + t.amount;
        });
    
    const data = Object.keys(grouped).map(key => ({
        name: key,
        value: grouped[key]
    }));

    const COLORS = ["#7EC8E3", "#FF9E80", "#C3A6FF", "#FFD580"];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-center font-semibold mb-4">Expenses by Category</h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} dataKey="value" innerRadius={70}>
                        {data.map((_: any, i: number) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}