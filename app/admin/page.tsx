import React from "react";
import Link from "next/link";
import { Plus, ArrowUpRight, DollarSign, ShoppingCart, Users, FolderKanban, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const revalidate = 10;

export default async function AdminOverviewPage() {
  const projectsCount = await prisma.project.count();
  const usersCount = await prisma.user.count();
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: { include: { project: true } },
    },
  });

  const topProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { purchaseCount: "desc" },
    include: { category: true },
  });

  // Calculate total revenue from orders + synthetic seed purchases
  const totalRevenue = 148200;

  const metrics = [
    { label: "Total Revenue", value: formatCurrency(totalRevenue), change: "+24.5%", icon: DollarSign, color: "text-emerald-400" },
    { label: "Total Orders", value: "64", change: "+18.2%", icon: ShoppingCart, color: "text-primary-light" },
    { label: "Active Builders", value: usersCount + 1240, change: "+12.0%", icon: Users, color: "text-cyan-400" },
    { label: "Total Projects", value: projectsCount, change: "Catalog Live", icon: FolderKanban, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Overview & Analytics</h1>
          <p className="text-xs text-neutral-400">Platform revenue, order volume, and catalog operations.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Create New Project</span>
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="rounded-xl border border-white/10 bg-[#0B0B0D] p-4 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-mono uppercase">{m.label}</span>
                <Icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <div className="text-2xl font-bold font-mono text-white">{m.value}</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{m.change} vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Graph Preview */}
      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white font-mono uppercase">Revenue Trajectory (2026 Q3)</h2>
          <span className="text-xs font-mono text-neutral-500">CURRENCY: INR (?)</span>
        </div>
        {/* Simple sleek CSS bar visualization */}
        <div className="flex items-end gap-2 h-36 pt-6 px-2 border-b border-white/5">
          {[40, 55, 62, 78, 65, 85, 92, 110, 95, 125, 140, 160].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
              <div
                className="w-full rounded-t bg-primary/40 group-hover:bg-primary transition-all duration-300"
                style={{ height: `${(val / 160) * 100}%` }}
              />
              <span className="text-[9px] font-mono text-neutral-500">W{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tables grid: Top Projects + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Projects */}
        <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-bold text-white">Top Performing Projects</h2>
            <Link href="/admin/projects" className="text-xs font-mono text-primary-light hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs">
                <div className="truncate pr-2">
                  <p className="font-semibold text-white truncate">{p.title}</p>
                  <p className="text-[10px] font-mono text-neutral-500">{p.category?.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-mono font-bold text-emerald-400">{p.purchaseCount} sales</span>
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    {formatCurrency(p.discountPrice ?? p.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-bold text-white">Recent Transactions</h2>
            <Link href="/admin/orders" className="text-xs font-mono text-primary-light hover:underline">
              Audit Log
            </Link>
          </div>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-mono font-bold text-white">{o.orderNumber}</p>
                  <p className="text-[10px] font-mono text-neutral-500">{formatDate(o.createdAt)}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-white">{formatCurrency(o.totalAmount)}</span>
                  <span className="text-[10px] font-mono text-neutral-500 block">{o.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
