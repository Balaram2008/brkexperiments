"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Receipt,
  Users,
  Grid,
  Settings,
  Sparkles,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, switchUser } = useAuth();

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Projects CMS", href: "/admin/projects", icon: FolderKanban },
    { label: "Orders & Audits", href: "/admin/orders", icon: Receipt },
    { label: "Users & Roles", href: "/admin/users", icon: Users },
    { label: "Categories", href: "/admin/categories", icon: Grid },
    { label: "Platform Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2 text-center text-xs font-mono text-amber-300 flex items-center justify-center gap-3">
        <ShieldAlert className="h-3.5 w-3.5" />
        <span>ADMIN CONSOLE ACTIVE // AUTHORIZED SESSION</span>
        <button
          onClick={() => switchUser("USER")}
          className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-200 hover:bg-amber-500/30 ml-2"
        >
          Exit to Builder View
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Admin Sidebar */}
          <aside className="md:col-span-1 space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${
                      active
                        ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-4 text-xs font-mono text-neutral-400 space-y-2">
              <span className="text-[10px] uppercase text-neutral-500 block">SYSTEM STATUS:</span>
              <p className="text-emerald-400">DATABASE: SQLite (In-Sync)</p>
              <p className="text-emerald-400">PRISMA CLIENT: v5.22.0</p>
              <p className="text-cyan-400">SERVER: Next.js App Router</p>
            </div>
          </aside>

          {/* Main Admin Area */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
