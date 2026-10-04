"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Terminal, FolderKanban, ShieldCheck, Heart, User, Sparkles, X } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface ProjectQuickItem {
  title: string;
  slug: string;
  category: string;
}

const sampleQuickProjects: ProjectQuickItem[] = [
  { title: "Smart Vision Analytics Engine", slug: "smart-vision-analytics-engine", category: "Computer Vision" },
  { title: "Autonomous Web Research Agent", slug: "autonomous-web-research-agent", category: "Artificial Intelligence" },
  { title: "IoT Smart Energy Grid Monitor", slug: "iot-smart-energy-grid-monitor", category: "IoT & Hardware" },
  { title: "Realtime Collaborative Canvas Engine", slug: "realtime-collaborative-canvas-engine", category: "Web & Realtime" },
  { title: "Quantum Algorithm Circuit Simulator", slug: "quantum-algorithm-circuit-simulator", category: "Experiment Lab" },
  { title: "Zero-Trust Network Perimeter Sentinel", slug: "zero-trust-network-perimeter-sentinel", category: "Cybersecurity" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { user, switchUser } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  const filteredProjects = sampleQuickProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (path: string) => {
    setOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:p-6 sm:pt-24">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-50 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 text-neutral-400 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search projects, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Projects */}
          <div>
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              Projects & Experiments ({filteredProjects.length})
            </div>
            <div className="space-y-1">
              {filteredProjects.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => navigateTo(`/projects/${p.slug}`)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal className="h-4 w-4 text-primary-light" />
                    <span>{p.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400">
                    {p.category}
                  </span>
                </button>
              ))}
              {filteredProjects.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-neutral-500">
                  No matching projects found for "{query}"
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-white/5 pt-2">
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => navigateTo("/projects")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              >
                <FolderKanban className="h-4 w-4 text-cyan-400" />
                <span>All Projects</span>
              </button>
              <button
                onClick={() => navigateTo("/categories")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Categories</span>
              </button>
              <button
                onClick={() => navigateTo("/dashboard")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              >
                <User className="h-4 w-4 text-emerald-400" />
                <span>User Dashboard</span>
              </button>
              <button
                onClick={() => navigateTo("/dashboard/favorites")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              >
                <Heart className="h-4 w-4 text-rose-400" />
                <span>Saved Favorites</span>
              </button>
              <button
                onClick={() => navigateTo("/admin")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              >
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Admin Console</span>
              </button>
              <button
                onClick={() => {
                  switchUser(user?.role === "ADMIN" ? "USER" : "ADMIN");
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary-light hover:bg-primary/10"
              >
                <Terminal className="h-4 w-4 text-primary" />
                <span>Switch Role ({user?.role === "ADMIN" ? "to Builder" : "to Admin"})</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/40 px-4 py-2.5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span>?? Navigate</span>
            <span>? Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-primary-light">BRK COMMAND PALETTE</span>
        </div>
      </div>
    </div>
  );
}
