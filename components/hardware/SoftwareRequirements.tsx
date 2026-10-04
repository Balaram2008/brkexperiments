"use client";

import React from "react";
import { Terminal, BookOpen, Download } from "lucide-react";

export interface LibraryItem {
  name: string;
  author: string;
  installMethod: string;
  version?: string;
}

export function SoftwareRequirements({
  softwareReqsJson,
  librariesJson,
}: {
  softwareReqsJson: string;
  librariesJson: string;
}) {
  let softwareReqs: string[] = [];
  let libraries: LibraryItem[] = [];

  try {
    softwareReqs = JSON.parse(softwareReqsJson);
  } catch {
    softwareReqs = [];
  }

  try {
    libraries = JSON.parse(librariesJson);
  } catch {
    libraries = [];
  }

  if (softwareReqs.length === 0 && libraries.length === 0) return null;

  return (
    <div className="space-y-6 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
      {/* 1. Software Environments */}
      {softwareReqs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Software Requirements & Drivers</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {softwareReqs.map((req, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#121217] p-3 text-xs font-mono text-neutral-300"
              >
                <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. Arduino IDE Libraries */}
      {libraries.length > 0 && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary-light" />
              <h3 className="text-base font-bold text-white tracking-tight">Required Arduino IDE Libraries</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">Install via Arduino Library Manager</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider">
                  <th className="py-2 px-3">Library Name</th>
                  <th className="py-2 px-3">Author</th>
                  <th className="py-2 px-3">Install Method</th>
                  <th className="py-2 px-3 text-right">Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {libraries.map((lib, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white font-sans">{lib.name}</td>
                    <td className="py-2.5 px-3 text-neutral-400">{lib.author}</td>
                    <td className="py-2.5 px-3">
                      <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] text-primary-light">
                        {lib.installMethod}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-400">{lib.version || "Latest"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
