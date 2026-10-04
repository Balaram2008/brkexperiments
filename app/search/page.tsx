import React from "react";
import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "@/app/projects/ProjectsClient";

export const revalidate = 30;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: {
      category: true,
      technologies: {
        include: { technology: true },
      },
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ProjectsClient
        initialProjects={projects as any}
        categories={categories}
        initialCategory={null}
        initialQuery={searchParams.q || ""}
      />
    </div>
  );
}
