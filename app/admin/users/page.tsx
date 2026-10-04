import React from "react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const revalidate = 10;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orders: true, entitlements: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Users & Role Access</h1>
        <p className="text-xs text-neutral-400">Inspect registered builder profiles and assign administrative permissions.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 font-mono uppercase text-neutral-400">
              <tr>
                <th className="p-3.5 pl-5">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Purchases</th>
                <th className="p-3.5">Entitlements</th>
                <th className="p-3.5 pr-5">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-5">
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-[10px] font-mono text-neutral-500">{u.email}</p>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={u.role === "ADMIN" ? "warning" : "default"} className="text-[10px] font-mono">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-3.5 font-mono">{u._count.orders} orders</td>
                  <td className="p-3.5 font-mono text-primary-light">{u._count.entitlements} active</td>
                  <td className="p-3.5 pr-5 font-mono text-neutral-500">{formatDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
