"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ArrowUpRight, Cpu, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useFavorites } from "@/components/providers/FavoritesProvider";

export interface ProjectCardData {
  id: string;
  title: string;
  slug: string;
  platform?: string;
  shortDescription: string;
  thumbnail: string;
  difficulty: string;
  projectType?: string;
  buildTime?: string | null;
  estimatedCost?: string | null;
  isExperiment?: boolean;
  experimentTag?: string | null;
  rating: number;
  reviewCount: number;
  category?: { name: string; slug: string };
  technologies?: Array<{ technology: { name: string; color: string } }>;
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(project.slug);

  const difficultyVariant =
    project.difficulty === "Beginner"
      ? "success"
      : project.difficulty === "Intermediate"
      ? "accent"
      : "warning";

  const platform = project.platform || "ESP32";

  // Distinct OxygenOS Fluid Colors for each platform
  const getPlatformBadge = (plat: string) => {
    const p = plat.toLowerCase();
    if (p.includes("esp32")) {
      return "border-red-500/40 text-red-300 bg-red-950/70 shadow-[0_0_12px_rgba(239,68,68,0.2)]";
    }
    if (p.includes("uno")) {
      return "border-teal-500/40 text-teal-300 bg-teal-950/70 shadow-[0_0_12px_rgba(20,184,166,0.2)]";
    }
    if (p.includes("nano")) {
      return "border-cyan-500/40 text-cyan-300 bg-cyan-950/70 shadow-[0_0_12px_rgba(6,182,212,0.2)]";
    }
    if (p.includes("mega")) {
      return "border-purple-500/40 text-purple-300 bg-purple-950/70 shadow-[0_0_12px_rgba(139,92,246,0.2)]";
    }
    if (p.includes("esp8266")) {
      return "border-blue-500/40 text-blue-300 bg-blue-950/70 shadow-[0_0_12px_rgba(59,130,246,0.2)]";
    }
    if (p.includes("pico") || p.includes("rp2040")) {
      return "border-pink-500/40 text-pink-300 bg-pink-950/70 shadow-[0_0_12px_rgba(236,72,153,0.2)]";
    }
    if (p.includes("stm32")) {
      return "border-indigo-500/40 text-indigo-300 bg-indigo-950/70 shadow-[0_0_12px_rgba(99,102,241,0.2)]";
    }
    return "border-white/20 text-white bg-black/70";
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0C0D12] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_10px_35px_rgba(6,182,212,0.15)]">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-transparent to-transparent opacity-85" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(project.slug);
          }}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-rose-400 hover:border-rose-500/40 transition-all active:scale-90"
          title={favorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Platform Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`rounded-xl backdrop-blur-md border px-2.5 py-1 text-[11px] font-mono font-bold ${getPlatformBadge(
              platform
            )}`}
          >
            {platform}
          </span>
        </div>

        {/* Category & Build Time Tag */}
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
          {project.category && (
            <Badge variant="outline" className="bg-black/70 backdrop-blur-md text-[10px] uppercase font-mono tracking-wider border-white/15">
              {project.category.name}
            </Badge>
          )}
          {project.buildTime && (
            <span className="rounded-lg bg-black/70 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {project.buildTime}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={difficultyVariant} className="text-[10px] font-mono uppercase">
            {project.difficulty}
          </Badge>
          <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Tested Hardware
          </span>
        </div>

        <Link href={`/projects/${project.slug}`} className="group-hover:text-cyan-300 transition-colors">
          <h3 className="text-base font-semibold text-white line-clamp-1 group-hover:text-cyan-300">
            {project.title}
          </h3>
        </Link>

        <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technology Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-300"
              >
                {item.technology.name}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-lg bg-white/5 border border-white/5 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: 100% Free Open Access & Action */}
      <div className="border-t border-white/5 bg-black/40 p-4 px-5 flex items-center justify-between">
        <div>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
            FREE OPEN HARDWARE
          </span>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-neutral-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-neutral-200">{project.rating.toFixed(1)}</span>
            <span className="text-neutral-500 font-mono">({project.reviewCount})</span>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-surface px-3 py-1.5 text-xs font-semibold text-white hover:bg-surface-secondary hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
        >
          <span>View Package</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
