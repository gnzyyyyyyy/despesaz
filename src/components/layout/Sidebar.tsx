"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import logo from "@/public/sidebar/logo.png"
import dashboardLogo from "@/public/sidebar/dashboard-logo.png"
import expensesLogo from "@/public/sidebar/expenses-logo.png"
import budgetPlanningLogo from "@/public/sidebar/budget-planning-logo.png"
import reportsLogo from "@/public/sidebar/reports-logo.png"
import settingsLogo from "@/public/sidebar/settings-logo.png"
import helpLogo from "@/public/sidebar/help-logo.png"

const menu = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: dashboardLogo
    },
    {
        name: "Expenses",
        href: "/expenses",
        icon: expensesLogo
    },
    {
        name: "Budget Planning",
        href: "/budget",
        icon: budgetPlanningLogo
    },
    {
        name: "Reports",
        href: "/reports",
        icon: reportsLogo
    },
]

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[220px] hidden md:flex flex-col bg-white shadow-lg p-5 sticky top-0 h-screen">

            {/* Logo */}
            <Link href="/" className="mb-8 flex justify-center">
                <Image src={logo} alt="Logo" width={120} height={40} />
            </Link>

            {/* MENU */}
            <nav className="flex flex-col gap-2">
                {menu.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${active ? "bg-[#e6f2f8] text-[#1e6f9f]" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            <Image src={item.icon} alt={item.name} width={18} height={18} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t space-y-2">
                <Link href="/settings" className="flex items-center gap-3 text-sm text-gray-500 hover:text-black">
                    <Image src={settingsLogo} alt="Settings" width={18} height={18} />
                    Settings
                </Link>
                <Link href="/help" className="flex items-center gap-3 text-sm text-gray-500 hover:text-black">
                    <Image src={helpLogo} alt="Help" width={18} height={18} />
                    Help
                </Link>
            </div>
        </aside>
    );
}
