import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateReportPDF(data: any[], month: string) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Financial Report - ${month}`, 14, 20);

    const income = data
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = data
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    doc.setFontSize(12);
    doc.text(`Income: Rp ${income.toLocaleString("id-ID")}`, 14, 35);
    doc.text(`Expense: Rp ${expense.toLocaleString("id-ID")}`, 14, 42);
    doc.text(`Balance: Rp ${balance.toLocaleString("id-ID")}`, 14, 49);

    // Table
    autoTable(doc, {
        startY: 60,
        head: [["Title", "Category", "Type", "Amount", "Date"]],
        body: data.map((t) => [
            t.title,
            t.category,
            t.type,
            `Rp ${t.amount.toLocaleString("id-ID")}`,
            new Date(t.date).toLocaleDateString(),
        ]),
    });

    return doc;
}