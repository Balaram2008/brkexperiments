"use client";

import React, { useState } from "react";
import { Terminal, CheckSquare, Copy, Check } from "lucide-react";

export interface TestingProcedureData {
  steps?: string[];
  expectedBaudRate?: number;
  expectedSerialOutput?: string;
}

export function TestingProcedure({ testingProcedureJson }: { testingProcedureJson: string }) {
  const [copied, setCopied] = useState(false);

  let data: TestingProcedureData = {};
  try {
    data = JSON.parse(testingProcedureJson);
  } catch {
    data = {};
  }

  const steps = data.steps || [];
  const baudRate = data.expectedBaudRate || 115200;
  const serialOutput = data.expectedSerialOutput || "[SYSTEM] Hardware initialized successfully.\n[READY] Running loop task...";

  const handleCopySerial = () => {
    navigator.clipboard.writeText(serialOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">Bench Testing & Serial Monitor Verification</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span>PORT: COM3 / /dev/ttyUSB0</span>
        </div>
      </div>

      {/* Verification Steps */}
      {steps.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Testing Checklist
          </h3>
          <ul className="space-y-2">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckSquare className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Realistic Arduino IDE Serial Monitor Window */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Expected Serial Terminal Output
          </span>
          <div className="flex items-center gap-3">
            <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-amber-300">
              {baudRate} baud
            </span>
            <button
              onClick={handleCopySerial}
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy Output"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#050507] p-4 font-mono text-xs shadow-inner overflow-x-auto">
          <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/5 mb-3">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] text-neutral-500 ml-2">COM PORT MONITOR — 115200 8N1</span>
          </div>
          <pre className="text-emerald-400 leading-relaxed font-mono whitespace-pre-wrap">
            {serialOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}
