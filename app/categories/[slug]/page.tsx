import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/marketplace/ProjectCard";

export const revalidate = 60;

export default async function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      projects: {
        where: { published: true },
        include: {
          category: true,
          technologies: {
            include: { technology: true },
          },
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Categories</span>
      </Link>

      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="text-xs font-mono text-primary-light uppercase tracking-wider">
          DOMAIN // {category.slug.toUpperCase()}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.projects.map((p) => (
          <ProjectCard key={p.id} project={p as any} />
        ))}
      </div>

      {category.projects.length === 0 && (
        <p className="text-sm text-neutral-500 py-12 text-center">
          No projects listed in this domain yet.
        </p>
      )}
    </div>
  );
}
