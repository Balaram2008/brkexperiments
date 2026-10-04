"use client";

import React from "react";
import { Zap, ShieldCheck } from "lucide-react";

export interface WiringItem {
  boardPin: string;
  componentPin: string;
  component: string;
  notes?: string;
}

export function WiringTable({ wiringTableJson, platform }: { wiringTableJson: string; platform: string }) {
  let connections: WiringItem[] = [];
  try {
    connections = JSON.parse(wiringTableJson);
  } catch {
    connections = [];
  }

  if (!connections || connections.length === 0) return null;

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">Pin Configuration & Wiring Guide</h2>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
          <ShieldCheck className="h-3 w-3" />
          <span>VERIFIED PINOUT</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">{platform} Pin</th>
              <th className="py-2.5 px-3">Component</th>
              <th className="py-2.5 px-3">Component Pin</th>
              <th className="py-2.5 px-3">Connection Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {connections.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3">
                  <span className="rounded bg-primary/20 border border-primary/30 px-2 py-1 text-primary-light font-bold">
                    {item.boardPin}
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-white font-sans">{item.component}</td>
                <td className="py-3 px-3 text-amber-300 font-bold">{item.componentPin}</td>
                <td className="py-3 px-3 text-neutral-400 font-sans text-xs">{item.notes || "Direct Connection"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
