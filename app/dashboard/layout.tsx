"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Terminal,
  Receipt,
  Heart,
  User,
  Settings,
  Shield,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Projects", href: "/dashboard/projects", icon: Terminal },
    { label: "Purchase History", href: "/dashboard/purchases", icon: Receipt },
    { label: "Saved Favorites", href: "/dashboard/favorites", icon: Heart },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Dashboard Sidebar */}
          <aside className="md:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary-light font-bold text-lg border border-primary/30">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-bold text-white truncate">{user?.name || "Builder"}</h3>
                  <p className="text-[11px] font-mono text-neutral-400 truncate">{user?.email || "builder@brk.dev"}</p>
                  <span className="inline-block rounded bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[9px] font-mono text-primary-light mt-1">
                    ROLE: {user?.role || "USER"}
                  </span>
                </div>
              </div>

              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Admin Console</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            {/* Sidebar Navigation */}
            <nav className="rounded-xl border border-white/10 bg-[#0B0B0D] p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${
                      active
                        ? "bg-primary text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="border-t border-white/5 pt-1 mt-1">
                <button
                  onClick={() => logout()}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4 flex-shrink-0" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
