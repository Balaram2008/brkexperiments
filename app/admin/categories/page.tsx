import React from "react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 60;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { projects: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Category Taxonomies</h1>
        <p className="text-xs text-neutral-400">Manage engineering domain tags and taxonomy groupings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{c.name}</h3>
              <Badge variant="outline" className="font-mono text-[10px]">
                {c._count.projects} projects
              </Badge>
            </div>
            <p className="text-xs text-neutral-400 font-mono text-[11px]">SLUG: {c.slug}</p>
            <p className="text-xs text-neutral-400 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
