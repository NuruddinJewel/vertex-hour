"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    ListChecks,
    User,
    LogOut,
    Watch,
} from "lucide-react";

const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Add Watch", href: "/items/add", icon: PlusCircle },
    { label: "Manage Watches", href: "/items/manage", icon: ListChecks },
    { label: "Profile", href: "/profile", icon: User },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen sticky top-0 bg-slate border-r border-gold/20 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2 px-6 h-20 border-b border-gold/20">
                <Watch className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <span className="font-display text-lg text-ivory">
                    Horology<span className="text-gold"> Vault</span>
                </span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-4 py-8 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm transition-all duration-300 ${isActive
                                    ? "bg-gold/10 text-gold border-l-2 border-gold"
                                    : "text-ivory/60 hover:bg-gold/5 hover:text-ivory"
                                }`}
                        >
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Divider + Logout */}
            <div className="px-4 pb-6">
                <div className="h-px bg-gold/20 mb-4" />
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-sm font-body text-sm text-ivory/60 hover:text-gold hover:bg-gold/5 transition-all duration-300">
                    <LogOut className="w-4 h-4" strokeWidth={1.5} />
                    Log Out
                </button>
            </div>
        </aside>
    );
}