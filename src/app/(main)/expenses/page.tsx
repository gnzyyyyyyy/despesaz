"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "@/src/components/expenses/ExpenseForm";
import ExpenseTable from "@/src/components/expenses/ExpenseTable";
import {
  getTransactions,
  createTransaction,
} from "@/src/lib/api";

export default function ExpensesPage() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
        const res = await getTransactions();
        setData(res);
        } catch (err) {
        console.error(err);
        }
    };

    const handleSubmit = async (form: any) => {
        try {
        await createTransaction(form);
        fetchData();
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
        <h1 className="text-2xl font-bold mb-6">Expenses</h1>

        <ExpenseForm onSubmit={handleSubmit} />

        <ExpenseTable data={data} refresh={fetchData} />
        </div>
    );
}