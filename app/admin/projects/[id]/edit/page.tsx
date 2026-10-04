"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Code2,
  Zap,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentTheme } = useFluxTheme();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [platform, setPlatform] = useState("ESP32");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [categorySlug, setCategorySlug] = useState("esp32");
  const [buildTime, setBuildTime] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [published, setPublished] = useState(true);
  const [isExperiment, setIsExperiment] = useState(false);

  // Technical hardware package fields
  const [bomJsonText, setBomJsonText] = useState("[]");
  const [wiringJsonText, setWiringJsonText] = useState("[]");
  const [codeText, setCodeText] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/admin/projects/${params.id}`);
        const data = await res.json();
        if (data.project) {
          const p = data.project;
          setTitle(p.title);
          setSlug(p.slug);
          setPlatform(p.platform || "ESP32");
          setDifficulty(p.difficulty || "Beginner");
          setCategorySlug(p.category?.slug || "esp32");
          setBuildTime(p.buildTime || "1-2 Hours");
          setEstimatedCost(p.estimatedCost || "Free");
          setYoutubeUrl(p.youtubeUrl || "https://www.youtube.com/@BRKEXPERIMENTS");
          setShortDesc(p.shortDescription || "");
          setFullDesc(p.description || "");
          setThumbnail(p.thumbnail || "");
          setPublished(p.published);
          setIsExperiment(p.isExperiment || false);

          setBomJsonText(p.bomJson || "[]");
          setWiringJsonText(p.wiringTableJson || "[]");

          try {
            const snippets = JSON.parse(p.codeSnippetJson || "[]");
            if (snippets.length > 0) {
              setCodeText(snippets[0].code || "");
            }
          } catch {}
        }
      } catch (err) {
        console.error("Failed to load project:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const codeSnippetJson = JSON.stringify([
      {
        filename: `${slug || "project"}.ino`,
        language: "cpp",
        code: codeText,
      },
    ]);

    try {
      const res = await fetch(`/api/admin/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          platform,
          difficulty,
          categorySlug,
          buildTime,
          estimatedCost,
          youtubeUrl,
          shortDescription: shortDesc,
          description: fullDesc,
          thumbnail,
          published,
          isExperiment,
          bomJson: bomJsonText,
          wiringTableJson: wiringJsonText,
          codeSnippetJson,
        }),
      });

      if (res.ok) {
        setStatusMessage("Project successfully updated by Admin Balaram!");
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        alert("Failed to update project.");
      }
    } catch (err) {
      alert("Error saving project changes.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      await fetch(`/api/admin/projects/${params.id}`, { method: "DELETE" });
      router.push("/admin/projects");
    } catch {
      alert("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-neutral-400">
        Loading Hardware Project Studio...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Projects Catalog</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[10px] font-mono font-bold">
              BALARAM STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Edit Project: {title}
            </h1>
          </div>
          <p className="text-xs text-neutral-400">
            Edit technical specifications, firmware code, and wiring pinouts before uploading live.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/projects/${slug}`} target="_blank">
            <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-xl">
              <Eye className="h-3.5 w-3.5 text-cyan-400" />
              <span>Preview Live</span>
            </Button>
          </Link>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10 rounded-xl"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Publishing & Visibility Controls */}
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                1. Project Visibility & Publishing Status
              </h3>
            </div>
            <Badge variant={published ? "success" : "default"}>
              {published ? "PUBLIC TO ALL USERS" : "ADMIN DRAFT ONLY"}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Publish to BRKExperiments Catalog</p>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                Only published projects are visible to regular users and students. When set to Draft, you can edit and test the project in complete privacy before uploading.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPublished(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  !published
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Draft (Hidden)
              </button>
              <button
                type="button"
                onClick={() => setPublished(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  published
                    ? "bg-emerald-500 text-black font-bold shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Published (Live)
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Core Hardware Metadata */}
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 sm:p-7 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. Core Hardware Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Project Title
              </label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ESP32 Wi-Fi Smart Irrigation System"
                className="bg-[#11131A] border-white/10 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                URL Slug
              </label>
              <Input
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="esp32-smart-irrigation-system"
                className="bg-[#11131A] border-white/10 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Microcontroller Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#11131A] p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ESP32">ESP32 (Wi-Fi + BLE)</option>
                <option value="Arduino UNO">Arduino UNO (ATmega328P)</option>
                <option value="Arduino Nano">Arduino Nano (Compact)</option>
                <option value="Arduino Mega">Arduino Mega 2560</option>
                <option value="ESP8266">ESP8266 (NodeMCU)</option>
                <option value="Raspberry Pi Pico">Raspberry Pi Pico (RP2040)</option>
                <option value="STM32">STM32 Blue Pill (ARM Cortex-M3)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#11131A] p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Build Time
              </label>
              <Input
                value={buildTime}
                onChange={(e) => setBuildTime(e.target.value)}
                placeholder="1-2 Hours"
                className="bg-[#11131A] border-white/10 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Est. Component Cost
              </label>
              <Input
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="₹450 - ₹650"
                className="bg-[#11131A] border-white/10 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                YouTube Build Tutorial URL
              </label>
              <Input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/@BRKEXPERIMENTS"
                className="bg-[#11131A] border-white/10 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Thumbnail Image URL
              </label>
              <Input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="bg-[#11131A] border-white/10 rounded-xl text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Short Description (Card Summary)
            </label>
            <Input
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Brief summary displayed on project cards and search results"
              className="bg-[#11131A] border-white/10 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Full Project Overview & Architecture Guide
            </label>
            <textarea
              rows={4}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              placeholder="Detailed explanation of how the circuit works, operating principles, and hardware setup."
              className="w-full rounded-xl border border-white/10 bg-[#11131A] p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>
        </div>

        {/* Section 3: Tested Firmware Source Code (.INO) */}
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                3. Tested Arduino / ESP C++ Firmware (.INO)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-300">Flash Ready Sketch</span>
          </div>

          <p className="text-xs text-neutral-400">
            Paste the complete, tested Arduino sketch. Users can view and copy this directly on the project page.
          </p>

          <textarea
            rows={14}
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            placeholder="// Paste Arduino .ino firmware code here..."
            className="w-full rounded-2xl border border-white/10 bg-[#08080C] p-4 text-xs text-neutral-200 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
          />
        </div>

        {/* Section 4: BOM and Pinout Tables (JSON) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <Layers className="h-4 w-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase font-mono">
                Bill of Materials (BOM JSON)
              </h4>
            </div>
            <p className="text-[11px] text-neutral-400">
              Format: [{`{"component": "ESP32", "qty": 1, "specs": "Dual core"}`}]
            </p>
            <textarea
              rows={8}
              value={bomJsonText}
              onChange={(e) => setBomJsonText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08080C] p-3 text-xs text-neutral-300 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase font-mono">
                Pinout Wiring Matrix (JSON)
              </h4>
            </div>
            <p className="text-[11px] text-neutral-400">
              Format: [{`{"boardPin": "GPIO 4", "component": "Relay", "componentPin": "IN"}`}]
            </p>
            <textarea
              rows={8}
              value={wiringJsonText}
              onChange={(e) => setWiringJsonText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08080C] p-3 text-xs text-neutral-300 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-30 rounded-2xl border border-white/20 bg-[#0C0D14]/95 backdrop-blur-2xl p-4 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <span className={`h-2 w-2 rounded-full ${published ? "bg-emerald-400" : "bg-amber-400"}`} />
            <span>Status: <strong>{published ? "Published (Live)" : "Draft (Hidden)"}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/projects">
              <Button type="button" variant="outline" size="sm" className="rounded-xl text-xs">
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              size="sm"
              disabled={submitting}
              className="rounded-xl text-xs font-bold text-black shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, #F59E0B)`,
              }}
            >
              <Save className="h-4 w-4 mr-1.5" />
              <span>{submitting ? "Saving Project..." : "Save Project Changes"}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
