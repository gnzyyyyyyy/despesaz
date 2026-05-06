"use client";

import React, { useState, useEffect } from "react";

export default function BudgetForm({ onSubmit, initialData }: any) {
    const [form, setForm] = useState({
        category: "",
        limitAmount: "",
        month: "",
        notes: "",
    });

    const [error, setError] = useState("");

    //Prefill when editing
    useEffect(() => {
        if (initialData) {
            setForm({
                category: initialData.category || "",
                limitAmount: initialData.limitAmount?.toString() || "",
                month: initialData.month
                    ? new Date(initialData.month).toISOString().slice(0, 7)
                    : "",
                notes: initialData.notes || "",
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.category || !form.limitAmount || !form.month) {
            setError("Please fill all required fields");
            return;
        }

        //normalize category for backend
        const payload = {
            ...form,
            category: form.category.toLowerCase(),
            limitAmount: Number(form.limitAmount),
        };

        onSubmit(payload);

        //Reset ONLY if creating
        if (!initialData) {
            setForm({
                category: "",
                limitAmount: "",
                month: "",
                notes: "",
            });
        }

        setError("");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 animate-fadeIn">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
                {/* Category */}
                <div>
                    <label className="text-sm text-gray-500 font-semibold">
                        Category
                    </label>
                    <select
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                    >
                        <option value="">Select category</option>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health_care">Health Care</option>
                        <option value="utilities">Utilities</option>
                        <option value="miscellaneous">Miscellaneous</option>
                        <option value="other">Other</option>
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
                                limitAmount: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                        placeholder="Enter limit amount"
                    />
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
                                month: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                    />
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

                {/* Button */}
                <button
                    className="col-span-full md:col-span-1 bg-[#1e6f9f] text-white px-4 py-2 rounded-lg hover:bg-[#155d85] transition"
                >
                    {initialData ? "💾 Save Changes" : "+ Create Plan"}
                </button>
            </form>

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}