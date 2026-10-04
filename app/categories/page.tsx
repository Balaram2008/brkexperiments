import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Eye, Wifi, Cloud, Globe, Shield, Terminal, FlaskConical } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const iconMap: Record<string, any> = {
  Cpu,
  Eye,
  Wifi,
  Cloud,
  Globe,
  Shield,
  Terminal,
  FlaskConical,
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { projects: true },
      },
      projects: {
        take: 3,
        select: { title: true, slug: true },
      },
    },
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="text-xs font-mono text-primary-light uppercase tracking-wider">
          SYSTEM DOMAINS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore by Category
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Browse specialized technology verticals from computer vision pipelines to zero-trust kernels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => {
          const Icon = iconMap[c.icon] || Cpu;
          return (
            <div
              key={c.id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0B0B0D] p-6 hover:border-primary/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {c._count.projects} {c._count.projects === 1 ? "Project" : "Projects"}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-primary-light transition-colors">
                  {c.name}
                </h2>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {c.description}
                </p>

                {c.projects.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                      Sample Deployments:
                    </span>
                    {c.projects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="block text-xs text-neutral-400 hover:text-white truncate"
                      >
                        ? {p.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <Link
                  href={`/projects?category=${c.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light hover:text-white transition-colors"
                >
                  <span>Browse All {c.name} Projects</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
