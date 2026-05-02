function Card({title, value, bg}: any) {
    return (
        <div className={`${bg} p-6 rounded-2xl shadow-sm hover:shadow-md transition`}>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    )
}

export default function SummaryCards({ transactions }: any) {
    const income = transactions
        .filter((t: any) => t.type === "income")
        .reduce((acc: any, t: any) => acc + t.amount, 0);

    const expense = transactions
        .filter((t: any) => t.type === "expense")
        .reduce((acc: any, t: any) => acc + t.amount, 0);

    const balance = income - expense;
    const format = (num: number) =>
        "IDR " + num.toLocaleString("id-ID");

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Active Balance" value={format(balance)} bg="bg-green-50" />
            <Card title="Total Income" value={format(income)} bg="bg-purple-50" />
            <Card title="Total Expense" value={format(expense)} bg="bg-red-50" />
        </div>
    )
}