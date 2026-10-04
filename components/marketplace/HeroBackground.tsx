"use client";

import React, { useState } from "react";
import { Sparkles, Cpu, Eye, Wifi, Terminal, Shield, Globe, Atom } from "lucide-react";

const nodes = [
  { id: "ai", label: "AI / LLM", icon: Cpu, x: "15%", y: "25%", color: "text-purple-400", border: "border-purple-500/30" },
  { id: "cv", label: "VISION", icon: Eye, x: "78%", y: "20%", color: "text-cyan-400", border: "border-cyan-500/30" },
  { id: "iot", label: "IOT & EMBEDDED", icon: Wifi, x: "85%", y: "65%", color: "text-emerald-400", border: "border-emerald-500/30" },
  { id: "dev", label: "DEV TOOLS", icon: Terminal, x: "12%", y: "70%", color: "text-amber-400", border: "border-amber-500/30" },
  { id: "sec", label: "ZERO TRUST", icon: Shield, x: "48%", y: "82%", color: "text-rose-400", border: "border-rose-500/30" },
  { id: "web", label: "CRDT / REALTIME", icon: Globe, x: "65%", y: "38%", color: "text-blue-400", border: "border-blue-500/30" },
  { id: "qm", label: "QUANTUM LAB", icon: Atom, x: "32%", y: "35%", color: "text-indigo-400", border: "border-indigo-500/30" },
];

export function HeroBackground() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Radial ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[400px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute top-1/2 -left-40 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[140px]" />

      {/* Subtle fine grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Floating Interactive Technical Nodes (Desktop only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-auto">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              style={{ left: node.x, top: node.y }}
              className={`absolute cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
                isActive ? "scale-110 z-20" : "scale-100 opacity-60 hover:opacity-100"
              }`}
            >
              <div
                className={`flex items-center gap-2 rounded-full border ${node.border} bg-[#0B0B0D]/90 px-3 py-1.5 backdrop-blur-md shadow-lg transition-all duration-300`}
              >
                <span className="flex h-2 w-2 rounded-full bg-current animate-ping opacity-60"></span>
                <Icon className={`h-3.5 w-3.5 ${node.color}`} />
                <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-300">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
