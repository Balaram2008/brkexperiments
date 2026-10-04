import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectDetailClient } from "./ProjectDetailClient";

export const revalidate = 30;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  });
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      technologies: {
        include: { technology: true },
      },
      reviews: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project || !project.published) {
    notFound();
  }

  // Related projects in same category
  const relatedProjects = await prisma.project.findMany({
    where: {
      categoryId: project.categoryId,
      id: { not: project.id },
      published: true,
    },
    take: 3,
    include: {
      category: true,
      technologies: {
        include: { technology: true },
      },
    },
  });

  return (
    <ProjectDetailClient
      project={project as any}
      relatedProjects={relatedProjects as any}
    />
  );
}
