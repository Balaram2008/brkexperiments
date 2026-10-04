import React from "react";
import Link from "next/link";
import { Plus, Edit3, Eye, Trash2, Cpu, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[10px] font-mono font-bold">
              BALARAM CMS
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Project Catalog Management</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Create, edit, draft, and publish hardware packages before uploading live for users.
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button size="sm" className="gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold">
            <Plus className="h-4 w-4" />
            <span>Create New Project</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 font-mono uppercase text-neutral-400">
              <tr>
                <th className="p-3.5 pl-5">Project Title</th>
                <th className="p-3.5">Platform</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Difficulty</th>
                <th className="p-3.5">Downloads</th>
                <th className="p-3.5">Visibility Status</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-5">
                    <p className="font-semibold text-white truncate max-w-xs">{p.title}</p>
                    <span className="text-[10px] font-mono text-neutral-500">v{p.currentVersion} • slug: {p.slug}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono text-cyan-300 font-bold">
                      {p.platform}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-neutral-400">{p.category?.name}</td>
                  <td className="p-3.5">
                    <Badge variant="outline" className="text-[10px]">
                      {p.difficulty}
                    </Badge>
                  </td>
                  <td className="p-3.5 font-mono text-emerald-400 font-semibold">{p.purchaseCount} downloads</td>
                  <td className="p-3.5">
                    <Badge variant={p.published ? "success" : "default"} className="text-[10px]">
                      {p.published ? "LIVE (PUBLIC)" : "DRAFT (HIDDEN)"}
                    </Badge>
                  </td>
                  <td className="p-3.5 pr-5 text-right space-x-2">
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 font-semibold"
                      title="Edit Overall Project"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Link>

                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
                      title="View Live Page"
                      target="_blank"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
