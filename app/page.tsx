import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Code2,
  ShieldCheck,
  Download,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ChevronRight,
  Youtube,
  Instagram,
  Wand2,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/marketplace/ProjectCard";
import { HeroBackground } from "@/components/marketplace/HeroBackground";
import { ShortsAiExpander } from "@/components/hardware/ShortsAiExpander";
import { CreatorSection } from "@/components/brand/CreatorSection";
import { StartingLoginCard } from "@/components/brand/StartingLoginCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 60;

export default async function HomePage() {
  const featuredProjects = await prisma.project.findMany({
    where: { published: true, featured: true },
    take: 6,
    include: {
      category: true,
      technologies: {
        include: { technology: true },
      },
    },
    orderBy: { purchaseCount: "desc" },
  });

  const experimentProjects = await prisma.project.findMany({
    where: { published: true, isExperiment: true },
    take: 3,
    include: {
      category: true,
      technologies: {
        include: { technology: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { label: "Hardware Projects", value: "38+", desc: "Tested .ino code & wiring schematics" },
    { label: "Silicon Platforms", value: "7", desc: "ESP32, UNO, Nano, Mega, ESP8266, Pico, STM32" },
    { label: "YouTube Shorts AI", value: "Instant", desc: "AI Agent fulfills <60s shorts to hardware" },
    { label: "Free Open Access", value: "100%", desc: "No paywalls — instant .ZIP downloads" },
  ];

  const platforms = [
    {
      name: "ESP32 Lab",
      count: "11 Projects",
      slug: "esp32",
      desc: "Wi-Fi + BLE, Home Automation, Async Web Servers, LoRa & ESP32-CAM.",
      color: "from-red-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-red-500/30 hover:border-red-500/60",
      accent: "text-red-400",
    },
    {
      name: "Arduino UNO Lab",
      count: "10 Projects",
      slug: "arduino-uno",
      desc: "Robotics, Ultrasonic Radar, Line Followers, and Smart Controllers.",
      color: "from-teal-500/20 via-emerald-500/10 to-transparent",
      borderColor: "border-teal-500/30 hover:border-teal-500/60",
      accent: "text-teal-400",
    },
    {
      name: "Arduino Nano Lab",
      count: "5 Projects",
      slug: "arduino-nano",
      desc: "Wearables, gesture cars, mini weather stations, and acoustic devices.",
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
      accent: "text-cyan-400",
    },
    {
      name: "Arduino Mega Lab",
      count: "5 Projects",
      slug: "arduino-mega",
      desc: "High I/O capacity, 8-channel relays, 4-axis robot arms, and CNC rigs.",
      color: "from-purple-500/20 via-indigo-500/10 to-transparent",
      borderColor: "border-purple-500/30 hover:border-purple-500/60",
      accent: "text-purple-400",
    },
    {
      name: "ESP8266 Lab",
      count: "5 Projects",
      slug: "esp8266",
      desc: "Smart sockets, ThingSpeak loggers, Alexa voice relays, and IoT alarms.",
      color: "from-blue-500/20 via-sky-500/10 to-transparent",
      borderColor: "border-blue-500/30 hover:border-blue-500/60",
      accent: "text-blue-400",
    },
    {
      name: "Raspberry Pi Pico",
      count: "New Lab",
      slug: "environmental",
      desc: "Dual-Core RP2040 133MHz, Pico W Wi-Fi, FreeRTOS telemetry web HUDs.",
      color: "from-pink-500/20 via-rose-500/10 to-transparent",
      borderColor: "border-pink-500/30 hover:border-pink-500/60",
      accent: "text-pink-400",
    },
    {
      name: "STM32 Blue Pill",
      count: "New Lab",
      slug: "environmental",
      desc: "ARM Cortex-M3 72MHz, 12-bit ADC, ECG telemetry, and digital scopes.",
      color: "from-indigo-500/20 via-violet-500/10 to-transparent",
      borderColor: "border-indigo-500/30 hover:border-indigo-500/60",
      accent: "text-indigo-400",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-14 pb-16 sm:px-6 lg:px-8">
        <HeroBackground />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Official Brand Logo Showcase */}
          <div className="mx-auto w-fit rounded-3xl bg-white/95 p-3 sm:p-4 shadow-[0_0_60px_rgba(6,182,212,0.25)] border border-white/40 transition-transform duration-500 hover:scale-105">
            <Image
              src="/logo.png"
              alt="BRK Experiments - Learn Build Innovate"
              width={260}
              height={173}
              priority
              className="h-20 sm:h-28 w-auto object-contain"
            />
          </div>

          {/* Release Chip */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OXYGENOS FLUX THEMES • 38+ TESTED HARDWARE PACKAGES • SHORTS AI AGENT</span>
            <ChevronRight className="h-3 w-3" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build real hardware. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              From circuit to firmware.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            The dedicated open hardware engineering lab for <strong className="text-white">ESP32</strong>,{" "}
            <strong className="text-white">Arduino UNO</strong>, <strong className="text-white">Nano</strong>,{" "}
            <strong className="text-white">Mega</strong>, <strong className="text-white">ESP8266</strong>,{" "}
            <strong className="text-white">RP2040 Pico</strong>, and <strong className="text-white">STM32</strong>.
            Real verified circuit schematics, pinout matrices, component BOM, and tested Arduino <span className="font-mono text-cyan-300">.ino</span> sketches.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link href="/projects">
              <Button size="lg" className="w-full sm:w-auto text-base gap-2 px-8 py-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <Cpu className="h-5 w-5" />
                <span>Explore 38+ Hardware Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/shorts">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base gap-2 px-8 py-6 rounded-2xl border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10">
                <Wand2 className="h-5 w-5 text-cyan-400" />
                <span>⚡ Shorts AI Agent</span>
              </Button>
            </Link>

            <a
              href="https://www.youtube.com/@BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/40 bg-red-600/20 px-8 py-5 text-base font-semibold text-white hover:bg-red-600/30 transition-all shadow-lg"
            >
              <Youtube className="h-5 w-5 text-red-500 fill-red-500" />
              <span>Watch on YouTube</span>
            </a>
          </div>

          {/* Social Proof Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
            <a
              href="https://www.youtube.com/@BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <Youtube className="h-4 w-4 text-red-500" />
              <span>YouTube: @BRKEXPERIMENTS</span>
            </a>
            <span className="text-neutral-600">•</span>
            <a
              href="https://www.instagram.com/BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
            >
              <Instagram className="h-4 w-4 text-pink-400" />
              <span>Instagram: @BRKEXPERIMENTS</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. STARTING PAGE ACCESS (USER LOGIN & ADMIN BALARAM LOGIN) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 mb-14 relative z-20">
        <StartingLoginCard />
      </section>

      {/* 3. MEET THE CREATOR: BALARAM */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <CreatorSection />
      </section>

      {/* 4. STATS SECTION */}
      <section className="border-y border-white/10 bg-[#08080C]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center sm:items-start space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {s.label}
                </span>
                <p className="text-xs text-neutral-400 text-center sm:text-left">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. YOUTUBE SHORTS AI HARDWARE AGENT EMBED */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ShortsAiExpander />
      </section>

      {/* 4. PLATFORM HUBS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Microcontroller Architecture Hubs
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Explore Hardware Platforms
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Verified circuits, wiring pinout matrices, and tested firmware code tailored for each silicon platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((p, idx) => (
            <Link
              key={idx}
              href={`/projects?category=${p.slug}`}
              className={`group rounded-3xl border ${p.borderColor} bg-gradient-to-b ${p.color} p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl bg-[#0C0D12]`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-black/60 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-white font-bold">
                    {p.count}
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className={`text-base font-bold text-white transition-colors group-hover:${p.accent}`}>
                  {p.name}
                </h3>
                <p className="mt-2 text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t border-white/10 text-[11px] font-mono ${p.accent} font-semibold`}>
                Explore Lab Packages →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED HARDWARE PROJECTS */}
      <section className="py-16 border-t border-white/5 bg-[#08080C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>BENCH TESTED PACKAGES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Hardware Projects
              </h2>
              <p className="text-sm text-neutral-400 mt-1 max-w-xl">
                Ready to wire and flash. Complete with bill of materials, circuit schematics, and tested .ino code.
              </p>
            </div>
            <Link href="/projects" className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
                <span>View All 38+ Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERIMENT LAB SECTION */}
      <section id="experiments" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 via-[#0C0D14] to-[#0A0B10] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 h-64 w-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4 mb-10">
            <Badge variant="experiment" className="px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1.5" />
              THE HARDWARE EXPERIMENT LAB
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Novel telemetry. Unusual sensors. <br />
              Custom firmware experiments.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Where BRKExperiments pushes microcontroller silicon to its limits: 802.11 packet sniffers,
              inverse kinematics robotic arms, LoRa long-range mesh nodes, and ECG biomedical telemetry. 100% free open hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {experimentProjects.map((p) => (
              <ProjectCard key={p.id} project={p as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM YOUTUBE & CALL TO ACTION */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-b from-[#08080C] to-[#050508] text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-red-600/10 blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <Badge variant="technical">COMMUNITY / @BRKEXPERIMENTS</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Build with the Community
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed">
            Subscribe to our YouTube channel for weekly project builds, breadboard speedruns, and embedded firmware guides.
            Follow us on Instagram for behind-the-scenes laboratory updates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="https://www.youtube.com/@BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-base font-semibold text-white hover:bg-red-500 transition-all shadow-xl"
            >
              <Youtube className="h-5 w-5 fill-white" />
              <span>Subscribe on YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-pink-500/40 bg-pink-500/10 px-8 py-4 text-base font-semibold text-pink-300 hover:bg-pink-500/20 transition-all"
            >
              <Instagram className="h-5 w-5 text-pink-400" />
              <span>Follow @BRKEXPERIMENTS</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
