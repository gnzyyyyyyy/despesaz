export default function BudgetCard({item, onDelete}: any) {
    const progress = item.limitAmount
        ? Math.min((item.spent / item.limitAmount) * 100, 100)
        : 0;
        
    const isOver = item.spent > item.limitAmount;

    return(
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex justify-between mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {item.category}
                </span>
                <span className="text-sm text-gray-400">
                    {new Date(item.month).toISOString().slice(0, 7)}
                </span>
            </div>

            <div className="mb-3">
                <span className="text-xl font-bold">
                    Rp {Number(item.spent).toLocaleString("id-ID")}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                    of Rp {Number(item.limitAmount).toLocaleString("id-ID")}
                </span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                <div className={`h-2 rounded-full ${isOver ? "bg-red-500" : "bg-[#1e6f9f]"}`} style={{ width: `${progress}%` }}></div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                {item.notes || "No notes"}
            </p>

            <button onClick={() => onDelete(item._id)} className="text-sm text-gray-400 hover:text-red-500">Remove Plan</button>
        </div>
    )
}