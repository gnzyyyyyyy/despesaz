import { generateReportPDF } from "@/src/lib/report";

export default function({ month, setMonth, data}: any) {
    const handleDownloadCSV = () => {
        const header = "Title,Category,Amount,Type,Date\n";

        const rows = data
            .map((t: any) =>
                `${t.title},${t.category},${t.amount},${t.type},${new Date(t.date).toISOString()}`
            )
            .join("\n");

        const blob = new Blob([header + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `report-${month}.csv`;
        a.click();
    };

    const saveReport = async () => {
        const income = data
            .filter((t: any) => t.type === "income")
            .reduce((sum: number, t: any) => sum + t.amount, 0);

        const expense = data
            .filter((t: any) => t.type === "expense")
            .reduce((sum: number, t: any) => sum + t.amount, 0);

        await fetch("/api/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ 
                month, 
                totalIncome: income, 
                totalExpense: expense, 
            }),
        })
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Report</h1>

            <div className="flex gap-2 items-center">
                <input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="border rounded-md px-3 py-2"
                />

                <button
                    onClick={async () => {
                        const doc = generateReportPDF(data, month);
                        doc.save(`report-${month}.pdf`);
                        await saveReport();
                    }}
                    className="bg-[#1e6f9f] text-white px-4 py-2 rounded-md hover:bg-[#155d85]"
                >
                    Download CSV
                </button>
            </div>
        </div>
    )
}