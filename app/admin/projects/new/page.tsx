"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Cpu,
  Layers,
  Code2,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export default function NewHardwareProjectPage() {
  const router = useRouter();
  const { currentTheme } = useFluxTheme();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [platform, setPlatform] = useState("ESP32");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [categorySlug, setCategorySlug] = useState("esp32");
  const [buildTime, setBuildTime] = useState("1-2 Hours");
  const [estimatedCost, setEstimatedCost] = useState("₹450 - ₹650");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/@BRKEXPERIMENTS");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1518770660439-4636190af475?w=800");
  const [published, setPublished] = useState(true);
  const [isExperiment, setIsExperiment] = useState(false);

  const [codeText, setCodeText] = useState(`// =================================================================
// BRKEXPERIMENTS — New Hardware Project Sketch
// Created by: Balaram
// Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  Serial.println("BRKExperiments Project Initialized");
}

void loop() {
  // Main control loop
  delay(100);
}
`);

  const [bomJsonText, setBomJsonText] = useState(
    JSON.stringify([
      { component: "Main Controller Board", qty: 1, specs: "MCU", estCost: "₹450" },
      { component: "Primary Sensor Module", qty: 1, specs: "I2C/Digital", estCost: "₹180" },
      { component: "Breadboard & Jumpers", qty: 1, specs: "400 tie points", estCost: "₹80" },
    ], null, 2)
  );

  const [wiringJsonText, setWiringJsonText] = useState(
    JSON.stringify([
      { boardPin: "5V / 3V3", componentPin: "VCC", component: "Sensor Module", notes: "Power rail" },
      { boardPin: "GND", componentPin: "GND", component: "Common Ground", notes: "Ground rail" },
      { boardPin: "GPIO / Analog", componentPin: "SIG", component: "Sensor Module", notes: "Signal telemetry" },
    ], null, 2)
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let parsedBom = [];
    let parsedWiring = [];
    try { parsedBom = JSON.parse(bomJsonText); } catch {}
    try { parsedWiring = JSON.parse(wiringJsonText); } catch {}

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          platform,
          difficulty,
          categorySlug,
          buildTime,
          estimatedCost,
          youtubeUrl,
          shortDescription: shortDesc,
          description: fullDesc || shortDesc,
          thumbnail,
          published,
          isExperiment,
          bom: parsedBom,
          wiring: parsedWiring,
          codeSnippets: [
            {
              filename: `${slug || "project"}.ino`,
              language: "cpp",
              code: codeText,
            },
          ],
        }),
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        alert("Failed to create project.");
        setSubmitting(false);
      }
    } catch {
      alert("Error submitting project.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
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
              BALARAM CREATOR STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Create New Hardware Project Package
            </h1>
          </div>
          <p className="text-xs text-neutral-400">
            Publish a bench-tested hardware package with complete C++ firmware, wiring matrix, and BOM.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Visibility */}
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                1. Visibility & Publishing Mode
              </h3>
            </div>
            <Badge variant={published ? "success" : "default"}>
              {published ? "PUBLISH DIRECTLY" : "SAVE AS DRAFT"}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Upload as Draft or Live Project</p>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                Choose whether regular students and makers should see this project immediately or if you want to keep it in Draft mode while you finish breadboarding.
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

        {/* Section 2: Metadata */}
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. Technical Specifications
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. ESP32 Bluetooth Low Energy Beacon Node"
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
                placeholder="esp32-ble-beacon-node"
                className="bg-[#11131A] border-white/10 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Platform
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
                Category
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#11131A] p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="esp32">ESP32 Lab</option>
                <option value="arduino-uno">Arduino UNO Lab</option>
                <option value="arduino-nano">Arduino Nano Lab</option>
                <option value="arduino-mega">Arduino Mega Lab</option>
                <option value="esp8266">ESP8266 Lab</option>
                <option value="robotics">Robotics & Motion</option>
                <option value="home-automation">Smart Home Automation</option>
                <option value="environmental">Environmental & Sensors</option>
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
              Short Summary (Display on Cards)
            </label>
            <Input
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Short 1-2 sentence overview of the hardware package"
              className="bg-[#11131A] border-white/10 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Full Project Architecture & Working Principle
            </label>
            <textarea
              rows={4}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              placeholder="Detailed explanation of how the circuit works, sensor pins, and step-by-step setup."
              className="w-full rounded-xl border border-white/10 bg-[#11131A] p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>
        </div>

        {/* Section 3: Tested Firmware Code (.INO) */}
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                3. Tested Firmware Source Code (.INO)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-300">Ready to Flash</span>
          </div>

          <textarea
            rows={12}
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#08080C] p-4 text-xs text-neutral-200 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
          />
        </div>

        {/* Section 4: BOM & Pinout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-2 shadow-xl">
            <h4 className="text-xs font-bold text-white uppercase font-mono">
              Bill of Materials (BOM JSON)
            </h4>
            <textarea
              rows={6}
              value={bomJsonText}
              onChange={(e) => setBomJsonText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08080C] p-3 text-xs text-neutral-300 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#0C0D14] p-6 space-y-2 shadow-xl">
            <h4 className="text-xs font-bold text-white uppercase font-mono">
              Pinout Wiring Matrix (JSON)
            </h4>
            <textarea
              rows={6}
              value={wiringJsonText}
              onChange={(e) => setWiringJsonText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08080C] p-3 text-xs text-neutral-300 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="sticky bottom-4 z-30 rounded-2xl border border-white/20 bg-[#0C0D14]/95 backdrop-blur-2xl p-4 shadow-2xl flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-300">
            Publish Mode: <strong className={published ? "text-emerald-400" : "text-amber-400"}>{published ? "Live on Marketplace" : "Save as Draft"}</strong>
          </span>

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
              <Plus className="h-4 w-4 mr-1.5" />
              <span>{submitting ? "Uploading Project..." : "Upload Project to Lab"}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
