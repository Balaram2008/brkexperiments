import React from "react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const revalidate = 10;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: { include: { project: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Orders Audit Log</h1>
        <p className="text-xs text-neutral-400">Tamper-evident log of all digital marketplace purchases and entitlement grants.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 font-mono uppercase text-neutral-400">
              <tr>
                <th className="p-3.5 pl-5">Order #</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Project Acquired</th>
                <th className="p-3.5">Provider</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 pr-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-5 font-mono font-bold text-white">{o.orderNumber}</td>
                  <td className="p-3.5">
                    <p className="font-semibold text-white">{o.user?.name || "Builder"}</p>
                    <p className="text-[10px] font-mono text-neutral-500">{o.user?.email}</p>
                  </td>
                  <td className="p-3.5 font-medium max-w-xs truncate">
                    {o.items[0]?.project?.title || "Project Asset"}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-neutral-400">{o.paymentMethod}</td>
                  <td className="p-3.5 font-mono font-bold text-white">{formatCurrency(o.totalAmount)}</td>
                  <td className="p-3.5 font-mono text-neutral-500">{formatDate(o.createdAt)}</td>
                  <td className="p-3.5 pr-5">
                    <Badge variant="success" className="text-[10px]">
                      {o.paymentStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
