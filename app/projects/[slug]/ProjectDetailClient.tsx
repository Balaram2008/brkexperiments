"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  Cpu,
  Clock,
  Youtube,
  Instagram,
  Download,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Zap,
  ExternalLink,
  Edit3,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BOMTable } from "@/components/hardware/BOMTable";
import { WiringTable } from "@/components/hardware/WiringTable";
import { CircuitDiagram } from "@/components/hardware/CircuitDiagram";
import { SoftwareRequirements } from "@/components/hardware/SoftwareRequirements";
import { BuildSteps } from "@/components/hardware/BuildSteps";
import { TestingProcedure } from "@/components/hardware/TestingProcedure";
import { TroubleshootingGuide } from "@/components/hardware/TroubleshootingGuide";
import { CodePreviewTabs } from "@/components/marketplace/CodePreviewTabs";
import { ArchitectureVisualizer } from "@/components/marketplace/ArchitectureVisualizer";
import { StickyHardwareDock } from "@/components/marketplace/StickyHardwareDock";
import { ReviewSection } from "@/components/marketplace/ReviewSection";
import { ProjectCard } from "@/components/marketplace/ProjectCard";

interface ProjectDetailClientProps {
  project: any;
  relatedProjects: any[];
}

export function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const { user } = useAuth();
  let galleryImages: string[] = [];
  try {
    galleryImages = JSON.parse(project.gallery);
  } catch {
    galleryImages = [project.thumbnail];
  }
  if (!galleryImages || galleryImages.length === 0) {
    galleryImages = [project.thumbnail];
  }

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  let faqs: Array<{ question: string; answer: string }> = [];
  let applications: string[] = [];

  try {
    faqs = JSON.parse(project.faqJson || "[]");
  } catch {}
  try {
    applications = JSON.parse(project.applicationsJson || "[]");
  } catch {}

  const youtubeUrl = project.youtubeUrl || "https://www.youtube.com/@BRKEXPERIMENTS";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-neutral-600" />
        <Link href="/projects" className="hover:text-white transition-colors">
          Hardware Lab
        </Link>
        <ChevronRight className="h-3 w-3 text-neutral-600" />
        <span className="text-primary-light font-bold">{project.platform}</span>
        <ChevronRight className="h-3 w-3 text-neutral-600" />
        <span className="text-white truncate max-w-xs">{project.title}</span>
      </nav>

      {/* 2. Top Header & Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-primary/20 border border-primary/30 px-3 py-1 font-mono text-xs font-bold text-primary-light shadow-sm">
              {project.platform}
            </span>
            <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
              {project.category?.name}
            </Badge>
            <Badge variant={project.difficulty === "Beginner" ? "success" : project.difficulty === "Intermediate" ? "accent" : "warning"}>
              {project.difficulty}
            </Badge>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% FREE OPEN HARDWARE</span>
            </div>
            {/* Creator Balaram Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-xs">
              <div className="relative h-4 w-4 rounded-full overflow-hidden border border-amber-400">
                <Image src="/creator.jpg" alt="Balaram" fill className="object-cover" />
              </div>
              <span className="text-[11px] font-mono text-amber-300">Creator: <strong>Balaram</strong></span>
            </div>
          </div>

          {/* Admin Edit Shortcut */}
          {user?.role === "ADMIN" && (
            <Link href={`/admin/projects/${project.id}/edit`}>
              <Button size="sm" className="rounded-xl text-xs gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg">
                <Edit3 className="h-3.5 w-3.5" />
                <span>Admin: Edit This Project</span>
              </Button>
            </Link>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-4xl">
          {project.shortDescription}
        </p>

        {/* Quick YouTube Video Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-gradient-to-r from-red-950/20 via-[#0B0B0D] to-[#0B0B0D] p-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg">
              <Youtube className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Full Video Build Tutorial on YouTube</p>
              <p className="text-neutral-400 font-mono text-[11px]">
                Watch the complete step-by-step soldering, breadboarding, and code upload walkthrough on @BRKEXPERIMENTS
              </p>
            </div>
          </div>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 transition-colors shadow-lg"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/5 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-white font-semibold text-sm">{project.rating.toFixed(1)}</span>
            <span>({project.reviewCount} maker reviews)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>Build Time: <strong className="text-white">{project.buildTime || "1-2 Hours"}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Hardware Cost: <strong className="text-emerald-400">{project.estimatedCost || "Free"}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>BENCH_TESTED_HARDWARE</span>
          </div>
        </div>
      </div>

      {/* 3. Main Layout: Content (Left) + Sticky Hardware Dock (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Media Preview Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
              <Image
                src={activeImage}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
                      activeImage === img
                        ? "border-primary ring-2 ring-primary/40"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Overview */}
          <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight">Project Overview & Architecture</h2>
            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* 1. Components & Bill of Materials (BOM) */}
          <BOMTable bomJson={project.bomJson} />

          {/* 2. Pin Configuration & Wiring Table */}
          <WiringTable wiringTableJson={project.wiringTableJson} platform={project.platform} />

          {/* 3. Circuit Diagram & Schematic */}
          <CircuitDiagram circuitSvg={project.circuitSvg} title={project.title} platform={project.platform} />

          {/* 4. Full Source Code (.INO) Preview & Tabs */}
          <CodePreviewTabs codeSnippetJson={project.codeSnippetJson} />

          {/* 5. Software Requirements & Libraries */}
          <SoftwareRequirements
            softwareReqsJson={project.softwareReqsJson}
            librariesJson={project.librariesJson}
          />

          {/* 6. Logic Flow / How It Works */}
          <ArchitectureVisualizer architectureJson={project.architectureJson} />

          {/* 7. Step-by-Step Hardware Build Guide */}
          <BuildSteps buildInstructionsJson={project.buildInstructionsJson} />

          {/* 8. Bench Testing & Serial Monitor Verification */}
          <TestingProcedure testingProcedureJson={project.testingProcedureJson} />

          {/* 9. Troubleshooting & Debug Guide */}
          <TroubleshootingGuide troubleshootingJson={project.troubleshootingJson} />

          {/* 10. Practical Real-World Applications */}
          {applications.length > 0 && (
            <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white tracking-tight">Real-World Applications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {applications.map((app, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11. Frequently Asked Questions */}
          {faqs.length > 0 && (
            <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B0B0D] p-6 shadow-xl">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-light" />
                <h2 className="text-xl font-bold text-white tracking-tight">Hardware FAQ & Common Gotchas</h2>
              </div>
              <div className="space-y-2 pt-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-white/5 bg-surface-secondary/40 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left text-xs font-semibold text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="font-mono text-neutral-500">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 12. Verified Builder Reviews */}
          <ReviewSection
            projectId={project.id}
            rating={project.rating}
            reviewCount={project.reviewCount}
            reviews={project.reviews}
          />
        </div>

        {/* Right Column (1 col): Sticky Hardware Dock */}
        <div className="lg:col-span-1">
          <StickyHardwareDock project={project} />
        </div>
      </div>

      {/* 4. Related Projects Grid */}
      {relatedProjects.length > 0 && (
        <div className="border-t border-white/10 pt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              More Projects in {project.category?.name}
            </h2>
            <Link
              href={`/projects?category=${project.category?.slug}`}
              className="text-xs font-mono text-primary-light hover:underline"
            >
              View All {project.category?.name} Projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rp) => (
              <ProjectCard key={rp.id} project={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
