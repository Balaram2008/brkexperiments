"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, Download, Zap, ExternalLink, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { useFavorites } from "@/components/providers/FavoritesProvider";

interface StickyPurchaseCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    price: number;
    discountPrice?: number | null;
    currentVersion: string;
    demoUrl?: string | null;
    isExperiment: boolean;
  };
}

export function StickyPurchaseCard({ project }: StickyPurchaseCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(project.slug);

  const effectivePrice = project.discountPrice ?? project.price;
  const isFree = effectivePrice === 0;

  const handleCheckout = () => {
    router.push(`/checkout?projectId=${project.id}`);
  };

  const inclusions = [
    "Full complete production source code",
    "Architecture diagrams & setup manuals",
    "Lifetime dashboard access & updates",
    "Commercial perpetual license key",
    "Instant authenticated zip download",
  ];

  return (
    <>
      {/* Desktop Sticky Card */}
      <div className="hidden lg:block sticky top-24 rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 shadow-2xl space-y-6">
        {/* Pricing header */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              One-Time Purchase
            </span>
            <Badge variant="technical">v{project.currentVersion}</Badge>
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {formatCurrency(effectivePrice)}
            </span>
            {project.discountPrice !== null && project.discountPrice !== undefined && project.discountPrice < project.price && (
              <span className="text-sm font-mono text-neutral-500 line-through">
                {formatCurrency(project.price)}
              </span>
            )}
            {project.discountPrice !== null && project.discountPrice !== undefined && project.discountPrice < project.price && (
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-400 border border-emerald-500/20">
                SAVE {Math.round(((project.price - project.discountPrice) / project.price) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Feature inclusions */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Package Includes:
          </h4>
          <ul className="space-y-2.5">
            {inclusions.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <Button
            size="lg"
            className="w-full text-base font-semibold py-6 shadow-[0_0_25px_rgba(124,58,237,0.4)]"
            onClick={handleCheckout}
          >
            {isFree ? (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Access Free Experiment
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Purchase Project
              </span>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-surface-secondary transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-primary-light" />
                <span>Live Demo</span>
              </a>
            ) : (
              <button
                disabled
                className="rounded-lg border border-white/5 bg-surface/50 px-3 py-2 text-xs font-medium text-neutral-600 cursor-not-allowed"
              >
                Demo Offline
              </button>
            )}

            <button
              onClick={() => toggleFavorite(project.slug)}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                favorite
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                  : "border-white/10 bg-surface text-neutral-300 hover:text-white hover:bg-surface-secondary"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-rose-500" : ""}`} />
              <span>{favorite ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/5 pt-4 space-y-2 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Secure 256-Bit Encrypted Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-3.5 w-3.5 text-cyan-400" />
            <span>Instant Digital Code Delivery to Dashboard</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0B0B0D]/95 backdrop-blur-md p-3 px-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-neutral-400 block uppercase">One-Time Access</span>
          <span className="text-xl font-bold font-mono text-white">
            {formatCurrency(effectivePrice)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(project.slug)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-neutral-300"
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
          <Button onClick={handleCheckout} className="px-5 h-10">
            {isFree ? "Access Free" : "Purchase Now"}
          </Button>
        </div>
      </div>
    </>
  );
}
