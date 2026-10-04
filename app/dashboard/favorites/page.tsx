"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { Button } from "@/components/ui/Button";

const sampleFavData: Record<string, { title: string; category: string; price: number; desc: string }> = {
  "autonomous-web-research-agent": {
    title: "Autonomous Web Research Agent",
    category: "Artificial Intelligence",
    price: 1499,
    desc: "Self-directing autonomous research worker using headless browser navigation.",
  },
  "realtime-collaborative-canvas-engine": {
    title: "Realtime Collaborative Canvas Engine",
    category: "Web & Realtime",
    price: 1999,
    desc: "Infinite collaborative whiteboard engine powered by conflict-free replicated data types.",
  },
};

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Saved Favorites</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Projects and prototypes you have marked for future development.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-white/10 p-8 space-y-3">
          <Heart className="h-10 w-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">You haven't saved any projects yet.</h3>
          <p className="text-xs text-neutral-400">Click the heart icon on any project card to bookmark it here.</p>
          <Link href="/projects" className="inline-block pt-2">
            <Button size="sm">Explore Projects</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((slug) => {
            const data = sampleFavData[slug] || {
              title: slug.replace(/-/g, " ").toUpperCase(),
              category: "Technology",
              price: 1899,
              desc: "Verified laboratory implementation.",
            };
            return (
              <div
                key={slug}
                className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1">
                    <span>{data.category}</span>
                    <button
                      onClick={() => toggleFavorite(slug)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <h3 className="text-base font-semibold text-white">{data.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {data.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="font-mono font-bold text-white text-sm">?{data.price}</span>
                  <Link
                    href={`/projects/${slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary-light hover:text-white"
                  >
                    <span>View Project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
