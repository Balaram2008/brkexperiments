"use client";

import React from "react";
import { Cpu, Layers, DollarSign } from "lucide-react";

export interface BOMItem {
  component: string;
  qty: string;
  specs: string;
  estCost?: string;
}

export function BOMTable({ bomJson }: { bomJson: string }) {
  let items: BOMItem[] = [];
  try {
    items = JSON.parse(bomJson);
  } catch {
    items = [];
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary-light" />
          <h2 className="text-xl font-bold text-white tracking-tight">Components & Bill of Materials (BOM)</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {items.length} {items.length === 1 ? "component" : "components"} required
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Component</th>
              <th className="py-2.5 px-3">Qty</th>
              <th className="py-2.5 px-3">Specifications</th>
              <th className="py-2.5 px-3 text-right">Approx Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3 text-neutral-500 font-semibold">{idx + 1}</td>
                <td className="py-3 px-3 font-semibold text-white font-sans">{item.component}</td>
                <td className="py-3 px-3 text-primary-light font-bold">{item.qty}</td>
                <td className="py-3 px-3 text-neutral-300 font-sans">{item.specs}</td>
                <td className="py-3 px-3 text-right text-emerald-400 font-semibold">
                  {item.estCost || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
