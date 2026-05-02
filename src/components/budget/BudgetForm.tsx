"use client";

import React, { useState } from "react";

export default function BudgetForm({onSubmit}: any){
    const [form, setForm] = useState({
        category: "",
        limitAmount: "",
        month: "",
        notes: "",
    });

    const [ error, setError ] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.category || !form.limitAmount || !form.month) {
            setError("Please fill all required fields");
            return;
        }

        onSubmit(form);

        setForm({
            category: "",
            limitAmount: "",
            month: "",
            notes: "",
        });

        setError("");
    };
    
    return(
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 animate-fadeIn">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                
                {/* Category */}
                <div>
                    <label className="text-sm text-gray-500 font-semibold">
                        Category
                    </label>
                    <select 
                        value={form.category} 
                        onChange={(e) => setForm({ ...form, category: e.target.value})}
                        className="w-full p-2 border rounded-lg mt-1"
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm text-gray-500 font-semibold">
                        Limit Amount
                    </label>
                    <input 
                        type="number"
                        value={form.limitAmount}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                limitAmount: e.target.value
                            }
                        )}
                        className="w-full p-2 border rounded-lg mt-1"
                        placeholder="Enter limit amount" />
                </div>

                {/* Month */}
                <div>
                    <label className="text-sm text-gray-500 font-semibold">
                        Month
                    </label>
                    <input 
                        type="month"
                        value={form.month}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                month: e.target.value
                            }
                        )}
                        className="w-full p-2 border rounded-lg mt-1"
                        placeholder="Enter month" />
                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm text-gray-500 font-semibold">
                        Notes
                    </label>
                    <input
                        value={form.notes}
                        onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                        placeholder="Optional"
                    />
                </div>

                <button className="col-span-full md:col-span-1 bg-[#1e6f9f] text-white px-4 py-2 rounded-lg hover:bg-[#155d85] transition">
                    + Create Plan
                </button>
            </form>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    )
}