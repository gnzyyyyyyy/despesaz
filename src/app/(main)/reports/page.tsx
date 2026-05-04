"use client";

import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "@/src/lib/api";

import SummaryCards from "@/src/components/reports/SummaryCards";
import IncomeExpenseChart from "@/src/components/reports/IncomeExpenseChart";
import CategoryPieChart from "@/src/components/reports/CategoryPieChart";
import ReportHeader from "@/src/components/reports/ReportHeader";
import ReportHistory from "@/src/components/reports/ReportHistory";

export default function ReportsPage() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [month, setMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTransactions();
            setTransactions(data);
        };
        fetchData();
    }, []);

    // Filter by selected month
    const filtered = useMemo(() => {
        return transactions.filter((t) =>
            new Date(t.date).toISOString().slice(0, 7) === month
        );
    }, [transactions, month]);

    return (
        <div className="min-h-screen space-y-6">
            <ReportHeader month={month} setMonth={setMonth} data={filtered} />

            <SummaryCards transactions={filtered} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IncomeExpenseChart transactions={filtered} />
                <CategoryPieChart transactions={filtered} />
            </div>

            <ReportHistory />
        </div>
    );
}