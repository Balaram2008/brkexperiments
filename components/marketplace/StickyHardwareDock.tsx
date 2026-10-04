"use client";

import React, { useState } from "react";
import {
  Download,
  Copy,
  Check,
  Youtube,
  Instagram,
  Heart,
  ShieldCheck,
  Cpu,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useFavorites } from "@/components/providers/FavoritesProvider";

interface StickyHardwareDockProps {
  project: {
    id: string;
    title: string;
    slug: string;
    platform: string;
    difficulty: string;
    buildTime?: string | null;
    estimatedCost?: string | null;
    currentVersion: string;
    youtubeUrl?: string | null;
    codeSnippetJson?: string;
  };
}

export function StickyHardwareDock({ project }: StickyHardwareDockProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(project.slug);
  const [downloading, setDownloading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    window.location.href = `/api/downloads/${project.slug}`;
    setTimeout(() => setDownloading(false), 2500);
  };

  const handleCopyCode = () => {
    try {
      const snippets = JSON.parse(project.codeSnippetJson || "[]");
      if (snippets.length > 0) {
        navigator.clipboard.writeText(snippets[0].code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const youtubeUrl = project.youtubeUrl || "https://www.youtube.com/@BRKEXPERIMENTS";
  const instagramUrl = "https://www.instagram.com/BRKEXPERIMENTS";

  return (
    <>
      {/* Desktop Sticky Dock */}
      <div className="hidden lg:block sticky top-24 rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 shadow-2xl space-y-6">
        {/* Header: Platform & Open Access */}
        <div className="border-b border-white/10 pb-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% FREE OPEN ACCESS
            </span>
            <Badge variant="technical">v{project.currentVersion}</Badge>
          </div>

          <div className="pt-2 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                {project.platform}
              </span>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase mt-0.5">
                Complete Hardware Package
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-mono text-cyan-400 font-semibold block">
                {project.buildTime || "1-2 Hours"}
              </span>
              <span className="text-[10px] font-mono text-neutral-500">EST. BUILD TIME</span>
            </div>
          </div>
        </div>

        {/* Technical Specs Summary */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="rounded-lg border border-white/5 bg-[#121217] p-2.5 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase block">Difficulty</span>
            <span className="text-white font-semibold">{project.difficulty}</span>
          </div>
          <div className="rounded-lg border border-white/5 bg-[#121217] p-2.5 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase block">Hardware Cost</span>
            <span className="text-emerald-400 font-semibold">{project.estimatedCost || "Free Access"}</span>
          </div>
        </div>

        {/* Primary Download Button (100% Free) */}
        <div className="space-y-3 pt-1">
          <Button
            size="lg"
            className="w-full text-base font-semibold py-6 shadow-[0_0_25px_rgba(16,185,129,0.3)] bg-emerald-600 hover:bg-emerald-500 text-white"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download className="h-5 w-5 mr-2" />
            <span>{downloading ? "Preparing Package..." : "Download Package (.ZIP)"}</span>
          </Button>

          {/* Quick Copy Code Button */}
          <button
            onClick={handleCopyCode}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface px-4 py-3 text-xs font-mono text-neutral-200 hover:text-white hover:bg-surface-secondary transition-colors"
          >
            {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-primary-light" />}
            <span>{copiedCode ? "Arduino .INO Code Copied!" : "Copy Tested .INO Code"}</span>
          </button>
        </div>

        {/* Social / Video Channels */}
        <div className="border-t border-white/10 pt-4 space-y-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
            Video Build & Community
          </span>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs font-semibold text-red-300 hover:bg-red-500/10 hover:border-red-500/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-500" />
              <span>Watch on YouTube</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-pink-500/20 bg-pink-500/5 p-3 text-xs font-semibold text-pink-300 hover:bg-pink-500/10 hover:border-pink-500/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-pink-400" />
              <span>Follow @BRKEXPERIMENTS</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          <button
            onClick={() => toggleFavorite(project.slug)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
              favorite
                ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                : "border-white/10 bg-surface text-neutral-300 hover:text-white hover:bg-surface-secondary"
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-rose-500" : ""}`} />
            <span>{favorite ? "Saved in Your Projects" : "Bookmark to Favorites"}</span>
          </button>
        </div>

        {/* Verification Badges */}
        <div className="border-t border-white/5 pt-4 space-y-2 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Bench-Tested on Physical Hardware</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>Includes Complete Wiring & BOM</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0B0B0D]/95 backdrop-blur-md p-3 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">100% Free Package</span>
          <span className="text-base font-bold font-mono text-white">
            {project.platform}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(project.slug)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-neutral-300"
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
          <Button onClick={handleDownload} className="px-5 h-10 bg-emerald-600 hover:bg-emerald-500">
            <Download className="h-4 w-4 mr-1.5" />
            <span>Download .ZIP</span>
          </Button>
        </div>
      </div>
    </>
  );
}
