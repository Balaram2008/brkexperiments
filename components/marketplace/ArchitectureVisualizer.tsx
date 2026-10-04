"use client";

import React, { useState } from "react";
import { Layers, ArrowRight, Activity } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  type: string;
}

interface EdgeItem {
  from: string;
  to: string;
}

interface ArchitectureProps {
  architectureJson: string;
}

export function ArchitectureVisualizer({ architectureJson }: ArchitectureProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  let archData: { nodes: NodeItem[]; edges: EdgeItem[] } = { nodes: [], edges: [] };
  try {
    archData = JSON.parse(architectureJson);
  } catch {
    return null;
  }

  if (!archData.nodes || archData.nodes.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary-light" />
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
            System Architecture Pipeline
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>PIPELINE_VERIFIED</span>
        </div>
      </div>

      {/* Nodes visual flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archData.nodes.map((node, index) => {
          const isSelected = selectedNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(isSelected ? null : node.id)}
              className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                  : "border-white/10 bg-surface-secondary hover:border-white/20 hover:bg-surface-tertiary"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1">
                <span>0{index + 1} / NODE</span>
                <span className="uppercase text-primary-light">{node.type}</span>
              </div>
              <p className="text-sm font-medium text-white">{node.label}</p>
              {index < archData.nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-600">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-white/5 pt-3 flex items-center justify-between text-xs text-neutral-500 font-mono">
        <span>Click any node to inspect data flow specifications</span>
        <span>FLOW_DIRECTION: INGRESS ? EGRESS</span>
      </div>
    </div>
  );
}
