import React from "react";
import Link from "next/link";
import { Terminal, Cpu, Shield, Globe, Award, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="technical">THE BRKEXPERIMENTS MANIFESTO</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Where curiosity meets real code.
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          BRKExperiments was established to bridge the chasm between superficial video tutorials
          and hardened, production-ready software architectures.
        </p>
      </div>

      {/* Mission */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Our Mission</h2>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Most developers waste weeks reinventing the wheel?rewriting video streaming backbones,
          setting up zero-trust policies, or struggling to quantize vision models for production edge devices.
          We build, stress-test, and document those exact foundations so you can immediately focus on the proprietary
          value of your product.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <div className="p-4 rounded-xl bg-surface-secondary">
            <span className="text-2xl font-bold font-mono text-primary-light">100%</span>
            <p className="text-xs text-neutral-400 mt-1">Verified runnable source code</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-secondary">
            <span className="text-2xl font-bold font-mono text-cyan-400">Zero</span>
            <p className="text-xs text-neutral-400 mt-1">Obfuscated or black-box blobs</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-secondary">
            <span className="text-2xl font-bold font-mono text-emerald-400">Perpetual</span>
            <p className="text-xs text-neutral-400 mt-1">Direct lifetime source updates</p>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center">
          Laboratory Engineering Standards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary-light font-mono text-xs">
              <Terminal className="h-4 w-4" />
              <span>STANDARD 01</span>
            </div>
            <h3 className="text-base font-semibold text-white">Strict Modularity</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every codebase is built with clean service layers, typed interfaces, and decoupled database adapters.
              Swap SQLite for PostgreSQL or MinIO for AWS S3 with single-line configuration changes.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <Cpu className="h-4 w-4" />
              <span>STANDARD 02</span>
            </div>
            <h3 className="text-base font-semibold text-white">Hardware & Efficiency</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We test low-level performance?quantized models, FreeRTOS multitasking, and WebGL shader pipelines
              capable of 60 FPS under heavy concurrency.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <Shield className="h-4 w-4" />
              <span>STANDARD 03</span>
            </div>
            <h3 className="text-base font-semibold text-white">Security & Auditability</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No telemetry spyware or hard-coded secrets. Downloads are cryptographically hashed and verified
              upon delivery to your dashboard.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
              <Sparkles className="h-4 w-4" />
              <span>STANDARD 04</span>
            </div>
            <h3 className="text-base font-semibold text-white">The Experiment Spirit</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We deliberately maintain an open experimental lab for prototypes that challenge conventional software
              paradigms?like quantum gate simulators and generative AST compilers.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <Link href="/projects">
          <Button size="lg" className="px-8">
            Explore the Lab Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
