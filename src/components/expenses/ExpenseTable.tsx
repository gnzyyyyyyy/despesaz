"use client";

import { deleteTransaction } from "@/src/lib/api";

export default function ExpenseTable({ data, refresh }: any) {
    const handleDelete = async (id: string) => {
        await deleteTransaction(id);
        refresh();
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm mt-6">
        <h3 className="text-center font-semibold mb-4">
            Transaction History
        </h3>

        <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500">
                <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {data.length === 0 ? (
                <tr>
                    <td colSpan={5} className="text-center p-4">
                    No transactions yet.
                    </td>
                </tr>
                ) : (
                data.map((item: any) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">
                        {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right text-red-500 font-semibold">
                        -IDR {item.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                        <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:underline"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
}