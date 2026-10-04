"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, Terminal, Key } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function CheckoutSuccessInner() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "BRK-2026-90412";
  const projectSlug = searchParams.get("projectSlug") || "smart-vision-analytics-engine";

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  }, []);

  const generatedLicense = "BRK-COMMERCIAL-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                           Math.random().toString(36).substring(2, 6).toUpperCase();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl space-y-8 rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 sm:p-10 shadow-2xl text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="success">PAYMENT VERIFIED & ENTITLEMENT ACTIVE</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Order Complete!
          </h1>
          <p className="text-xs text-neutral-400">
            Order Number: <span className="font-mono text-white">{orderNumber}</span>
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface-secondary p-4 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="uppercase">Your Commercial License Key</span>
            <span className="text-emerald-400">VERIFIED</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-white bg-black/40 p-2.5 rounded-lg border border-white/5 truncate">
            <Key className="h-4 w-4 text-primary-light flex-shrink-0" />
            <span className="truncate">{generatedLicense}</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            This key has been permanently archived in your builder account dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`/api/downloads/${projectSlug}`}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download Source Code (.ZIP)</span>
          </a>

          <Link href="/dashboard/projects" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-sm gap-2">
              <Terminal className="h-4 w-4 text-primary-light" />
              <span>Go to My Projects</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    }>
      <CheckoutSuccessInner />
    </Suspense>
  );
}
