"use client";

import { useEffect, useState } from "react";

export default function ReportHistory() {
    const [reports, setReports] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/reports", { credentials: "include" })
            .then((res) => res.json())
            .then(setReports);
    }, []);

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Report History</h3>

            <div className="space-y-3">
                {reports.map((r) => (
                    <div
                        key={r._id}
                        className="flex justify-between items-center border-b pb-2"
                    >
                        <div>
                            <p className="font-medium">{r.month}</p>
                            <p className="text-sm text-gray-500">
                                Income: Rp {r.totalIncome.toLocaleString("id-ID")} |
                                Expense: Rp {r.totalExpense.toLocaleString("id-ID")}
                            </p>
                        </div>

                        <span className="text-xs text-gray-400">
                            {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}