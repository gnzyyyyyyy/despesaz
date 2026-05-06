"use client";

import { useEffect, useState } from "react";
import BudgetForm from "@/src/components/budget/BudgetForm";
import BudgetList from "@/src/components/budget/BudgetList";
import { getBudgets, createBudget, deleteBudget } from "@/src/lib/api";
import { updateBudget } from "@/src/lib/api";

export default function BudgetPage() {
    const [budgets, setBudgets] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBudget, setEditingBudget] = useState<any>(null);

    const fetchBudgets = async () => {
        const data = await getBudgets();
        setBudgets(data);
    };
    
    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleCreate = async (form: any) => {
        try {
            await createBudget(form);
            fetchBudgets();
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (budget: any) => {
        setEditingBudget(budget);
        setShowForm(true);
    };

    const handleUpdate = async (form: any) => {
        try {
            await updateBudget(editingBudget._id, form);
            fetchBudgets();
            setShowForm(false);
            setEditingBudget(null);
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleDelete = async (id: string) => {
        try {
            await deleteBudget(id);
            fetchBudgets();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Budget Planning</h1>
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-[#1e6f9f] text-white px-4 py-2 rounded-lg"
            >
            {showForm ? "✕ Close" : "+ Add Planning"}
            </button>
        </div>

        {/* Form */}
        {showForm && (
            <BudgetForm
                onSubmit={editingBudget ? handleUpdate : handleCreate}
                initialData={editingBudget}
            />
        )}

        {/* List */}
        <BudgetList budgets={budgets} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
}