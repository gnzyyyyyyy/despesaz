"use client";

import { useState } from "react";

export default function ExpenseForm({ onSubmit }: any) {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
    });

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
                setForm({title: "", amount: "", type: "", category: "", date: ""})
            }}
                className="bg-white rounded-2xl p-5 shadow-sm flex flex-wrap gap-4 items-center"
            >
                <input 
                    placeholder="Transaction name..." 
                    value={form.title} 
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="flex-1 min-w-[180px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-200"
                />

                <input 
                    placeholder="Amount..." 
                    value={form.amount} 
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="flex-1 min-w-[140px] p-3 border rounded-lg"
                />

                <select 
                    value={form.type} 
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="p-3 border rounded-lg"
                >
                    <option value="">Type</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <select 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="p-3 border rounded-lg"
                >
                    <option value="">Category</option>
                    <option value="housing">Housing</option>
                    <option value="food">Food</option>
                    <option value="utilities">Utilities</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health_care">Health & Care</option>
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="salary">Salary</option>
                    <option value="investments">Investments</option>
                    <option value="gifts">Gifts</option>
                    <option value="refunds">Refunds</option>
                    <option value="other">Other</option>
                </select>

                <input 
                    placeholder="Date..." 
                    value={form.date} 
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="p-3 border rounded-lg"
                />

                <button className="bg-[#9fd3e8] px-6 py-2 rounded-lg hover:bg-[#528caa] text-white transition">
                    Submit
                </button>
            </form>
        </div>
    )
}