export default function RecentTransaction({ transactions }: any) {

    const recent = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
    
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-center font-semibold mb-4">
                    Recent Transactions
                </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500">
                            <th className="text-left p-2">Name</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recent.map((t: any) => (
                            <tr key={t._id} className="border-t">
                                <td className="p-2">{t.title}</td>
                                <td>{t.category}</td>
                                <td>
                                    {new Date(t.date).toLocaleDateString()}
                                </td>
                                <td className={`text-right ${
                                    t.type === "income"
                                        ? "text-green-500"
                                        : "text-gray-700"
                                }`}>
                                    {t.type === "income" ? "+" : "-"} IDR {t.amount.toLocaleString("id-ID")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>                
        </div>
    )
}