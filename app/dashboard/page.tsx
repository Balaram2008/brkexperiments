import React from "react";
import Link from "next/link";
import { Terminal, Download, Heart, Receipt, Sparkles, ArrowRight, ShieldCheck, Key } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const revalidate = 10;

export default async function DashboardOverviewPage() {
  // Fetch demo purchases / entitlements
  const demoUser = await prisma.user.findFirst({
    where: { email: "builder@brkexperiments.dev" },
    include: {
      entitlements: {
        include: {
          project: {
            include: { category: true },
          },
        },
      },
      orders: {
        take: 3,
        orderBy: { createdAt: "desc" },
        include: {
          items: { include: { project: true } },
        },
      },
      favorites: {
        include: { project: true },
      },
    },
  });

  const entitlements = demoUser?.entitlements || [];
  const orders = demoUser?.orders || [];
  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    { label: "Purchased Projects", value: entitlements.length, icon: Terminal, color: "text-primary-light" },
    { label: "Active Entitlements", value: entitlements.length, icon: ShieldCheck, color: "text-emerald-400" },
    { label: "Saved Favorites", value: demoUser?.favorites.length || 2, icon: Heart, color: "text-rose-400" },
    { label: "Total Invested", value: formatCurrency(totalSpent), icon: Receipt, color: "text-cyan-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-primary/10 via-[#0B0B0D] to-[#0B0B0D] p-6 sm:p-8 space-y-2">
        <Badge variant="technical">WORKSPACE // ACTIVE</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome back, {demoUser?.name || "Builder"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
          Your project source archives, cryptographic license keys, and real-time updates are active and ready for download.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="rounded-xl border border-white/10 bg-[#0B0B0D] p-4 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-mono uppercase tracking-wider">{s.label}</span>
                <Icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch / Unlocked Projects */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Ready for Deployment</h2>
            <p className="text-xs text-neutral-400">Instant code downloads and active licenses</p>
          </div>
          <Link href="/dashboard/projects">
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {entitlements.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <Terminal className="h-10 w-10 text-neutral-600 mx-auto" />
            <p className="text-xs text-neutral-400">You haven't acquired any projects yet.</p>
            <Link href="/projects">
              <Button size="sm">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entitlements.map((ent) => (
              <div
                key={ent.id}
                className="rounded-xl border border-white/10 bg-surface-secondary p-4 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span>{ent.project.category?.name}</span>
                    <Badge variant="technical">v{ent.project.currentVersion}</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-white">{ent.project.title}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                    <Key className="h-3 w-3 text-primary-light flex-shrink-0" />
                    <span className="truncate">{ent.licenseKey}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <a
                    href={`/api/downloads/${ent.project.id}`}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary-hover px-3 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download ZIP</span>
                  </a>
                  <Link
                    href={`/projects/${ent.project.slug}`}
                    className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white"
                  >
                    Docs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Purchases */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Recent Invoices & Orders</h2>
          <Link href="/dashboard/purchases" className="text-xs font-mono text-primary-light hover:underline">
            Full History ?
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-neutral-500 py-4 text-center">No orders recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-secondary/40 p-3 text-xs"
              >
                <div>
                  <div className="font-mono font-semibold text-white">{ord.orderNumber}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">{formatDate(ord.createdAt)}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white">{formatCurrency(ord.totalAmount)}</div>
                  <Badge variant="success" className="text-[9px]">
                    {ord.paymentStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
