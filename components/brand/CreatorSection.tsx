"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Youtube, Instagram, Shield, Sparkles, CheckCircle2, Cpu, Terminal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export function CreatorSection() {
  const { currentTheme } = useFluxTheme();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#0C0D14] via-[#10121C] to-[#0A0B10] p-6 sm:p-10 lg:p-12 shadow-2xl">
      {/* Background Fluid Aura */}
      <div
        className="flux-aura -top-20 -left-20 h-80 w-80"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <div
        className="flux-aura -bottom-20 -right-20 h-80 w-80"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Creator Portrait */}
        <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            {/* Glowing neon ring */}
            <div
              className="absolute -inset-1 rounded-3xl opacity-75 blur-lg transition duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, #F59E0B, ${currentTheme.secondary})`,
              }}
            />
            <div className="relative h-72 w-56 sm:h-80 sm:w-64 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-neutral-900">
              <Image
                src="/creator.jpg"
                alt="Balaram — Creator & Lead Architect of BRKExperiments"
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="inline-block rounded-full bg-amber-500/90 text-black px-2.5 py-0.5 text-[10px] font-bold font-mono">
                  FOUNDER & ARCHITECT
                </span>
                <p className="text-white font-bold text-base mt-0.5">Balaram</p>
                <p className="text-neutral-300 font-mono text-[10px]">BRKExperiments Lab</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-semibold">Active in Laboratory</span>
          </div>
        </div>

        {/* Right: Bio & Credentials */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-mono font-bold text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>MEET THE CREATOR</span>
            </span>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-mono font-bold text-cyan-300">
              LEAD EMBEDDED ARCHITECT
            </span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Balaram{" "}
              <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
                — Founder & Engineer
              </span>
            </h2>
            <p className="text-sm font-mono text-neutral-400 mt-1">
              Sri Vasavi Engineering College • BRKExperiments Hardware Laboratory
            </p>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Welcome to BRKExperiments! I am <strong className="text-white font-semibold">Balaram</strong>, the founder and creator behind the hardware projects, circuit schematics, and tutorials on this platform and our YouTube channel.
            Every single hardware package here—from ESP32 Wi-Fi smart controllers to Arduino robotics and STM32 biomedical monitors—is designed, soldered, and physically bench-tested on my workbench before being uploaded.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
              <span className="text-cyan-400 font-mono text-lg font-bold block">38+</span>
              <span className="text-neutral-400 text-[11px]">Bench-Tested Projects</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
              <span className="text-emerald-400 font-mono text-lg font-bold block">100% Free</span>
              <span className="text-neutral-400 text-[11px]">Open Hardware Access</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs col-span-2 sm:col-span-1">
              <span className="text-amber-400 font-mono text-lg font-bold block">@BRK</span>
              <span className="text-neutral-400 text-[11px]">YouTube & Instagram</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.youtube.com/@BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition-all shadow-lg"
            >
              <Youtube className="h-4 w-4 fill-white" />
              <span>Watch Balaram on YouTube</span>
            </a>

            <a
              href="https://www.instagram.com/BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-pink-500/40 bg-pink-500/10 px-5 py-2.5 text-xs font-bold text-pink-300 hover:bg-pink-500/20 transition-all"
            >
              <Instagram className="h-4 w-4 text-pink-400" />
              <span>Follow on Instagram</span>
            </a>

            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs rounded-xl border-amber-500/40 text-amber-300 hover:bg-amber-500/10">
                <Shield className="h-3.5 w-3.5 mr-1 text-amber-400" />
                <span>Admin Login (Balaram)</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
