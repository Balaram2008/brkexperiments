import React from "react";
import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "./ProjectsClient";

export const revalidate = 30;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string; query?: string };
}) {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: {
      category: true,
      technologies: {
        include: { technology: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ProjectsClient
        initialProjects={projects as any}
        categories={categories}
        initialCategory={searchParams.category || null}
        initialQuery={searchParams.query || ""}
      />
    </div>
  );
}
