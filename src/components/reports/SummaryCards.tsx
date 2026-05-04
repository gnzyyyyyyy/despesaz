export default function SummaryCards({ transactions }: any) {

    const income = transactions
        .filter((t: any) => t.type === "income")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

    const expense = transactions
        .filter((t: any) => t.type === "expense")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

    const balance = income - expense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Total Income" value={income} positive />
            <Card title="Total Expense" value={expense} negative />
            <Card title="Net Balance" value={balance} />
        </div>
    );
}

function Card({ title, value, positive, negative }: any) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <h2
                className={`text-xl font-bold ${
                    positive
                        ? "text-green-500"
                        : negative
                        ? "text-red-500"
                        : value >= 0
                        ? "text-green-500"
                        : "text-red-500"
                }`}
            >
                Rp {value.toLocaleString("id-ID")}
            </h2>
        </div>
    );
}