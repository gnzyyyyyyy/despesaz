"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/src/lib/api";

import SummaryCards from "@/src/components/dashboard/SummaryCards";
import ExpensePieChart from "@/src/components/dashboard/ExpensePieChart";
import ExpenseLineChart from "@/src/components/dashboard/LineChart";
import RecentTransactions from "@/src/components/dashboard/RecentTransaction";

export default function DashboardPage() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Welcome back 👋
            </h1>

            {/* SUMMARY */}
            <SummaryCards transactions={transactions} />

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <ExpensePieChart transactions={transactions} />
                <RecentTransactions transactions={transactions} />
            </div>

            {/* LINE */}
            <div className="mt-6">
                <ExpenseLineChart transactions={transactions} />
            </div>
        </div>
    );
}