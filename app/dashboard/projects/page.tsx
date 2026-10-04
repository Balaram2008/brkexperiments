"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Key, ExternalLink, Check, Copy, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Initial projects for builder account
const initialProjects = [
  {
    id: "proj-sva",
    title: "Smart Vision Analytics Engine",
    slug: "smart-vision-analytics-engine",
    category: "Computer Vision",
    version: "2.1.0",
    licenseKey: "BRK-SVA-COMMERCIAL-9A82-41C2-88B1",
    purchasedDate: "September 18, 2026",
    downloadUrl: "/api/downloads/smart-vision-analytics-engine",
  },
  {
    id: "proj-agent",
    title: "Autonomous Web Research Agent",
    slug: "autonomous-web-research-agent",
    category: "Artificial Intelligence",
    version: "1.4.2",
    licenseKey: "BRK-AGNT-PERSONAL-3F71-98B2-CC45",
    purchasedDate: "October 02, 2026",
    downloadUrl: "/api/downloads/autonomous-web-research-agent",
  },
];

export default function MyProjectsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">My Projects & Downloads</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Access your acquired project repositories, verified license keys, and downloadable archives.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {initialProjects.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] uppercase font-mono">
                    {p.category}
                  </Badge>
                  <Badge variant="technical">v{p.version}</Badge>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    LICENSED
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white">{p.title}</h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                Acquired on {p.purchasedDate}
              </span>
            </div>

            {/* License Key Box */}
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-secondary p-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 truncate">
                <Key className="h-3.5 w-3.5 text-primary-light flex-shrink-0" />
                <span className="text-neutral-500">LICENSE:</span>
                <span className="font-semibold text-white truncate">{p.licenseKey}</span>
              </div>
              <button
                onClick={() => copyLicense(p.licenseKey)}
                className="flex items-center gap-1 rounded bg-white/5 hover:bg-white/10 px-2 py-1 text-[11px] font-mono text-neutral-300 transition-colors flex-shrink-0 ml-2"
              >
                {copiedKey === p.licenseKey ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <a
                  href={`/api/downloads/${p.slug}`}
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Source (.ZIP)</span>
                </a>
                <Link
                  href={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-surface-secondary"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-primary-light" />
                  <span>Project Overview & Docs</span>
                </Link>
              </div>

              <span className="text-[10px] font-mono text-neutral-500">
                LIFETIME_COMMERCIAL_ACCESS_ACTIVE
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
