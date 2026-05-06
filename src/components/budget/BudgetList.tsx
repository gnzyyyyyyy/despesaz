import BudgetCard from "./BudgetCard";

export default function BudgetList({ budgets, onDelete, onEdit }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {budgets.map((item: any) => (
            <BudgetCard key={item._id} item={item} onDelete={onDelete} onEdit={onEdit} />
        ))}
        </div>
    );
}