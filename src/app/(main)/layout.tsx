import Sidebar from "@/src/components/layout/Sidebar";

export default function MainLayout({
    children,    
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#eaf3f7]">
            <Sidebar />
            <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
    );
}