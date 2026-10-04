"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, Mail, Sparkles, Shield, Key, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { currentTheme } = useFluxTheme();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError("Please enter your username or email address.");
      return;
    }

    const cleanId = identifier.trim().toLowerCase();
    const isAdminAttempt = cleanId === "balaram" || cleanId.includes("balaram") || cleanId === "admin";

    // Validate admin password
    if (isAdminAttempt && password && password !== "balaram@2008") {
      setError("Incorrect password for Admin Balaram. Please check your credentials.");
      return;
    }

    setLoading(true);
    setError(null);
    await login(identifier, password, isAdminAttempt ? "ADMIN" : "USER");
    setLoading(false);
    router.push(isAdminAttempt ? "/admin" : "/dashboard");
  };

  const handleOneClickLogin = async (idValue: string, passValue: string, role: "USER" | "ADMIN") => {
    setIdentifier(idValue);
    setPassword(passValue);
    setLoading(true);
    await login(idValue, passValue, role);
    setLoading(false);
    router.push(role === "ADMIN" ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* Dynamic OxygenOS Flux aura */}
      <div
        className="flux-aura -top-20 -left-20 h-96 w-96"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <div
        className="flux-aura -bottom-20 -right-20 h-96 w-96"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-white/15 bg-[#0C0D12]/90 backdrop-blur-2xl p-7 sm:p-9 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-block mb-1">
            <Logo showSubtitle />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Sign in to <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>BRKExperiments</span>
          </h1>
          <p className="text-xs text-neutral-400">
            Select User Login or Creator & Admin Login (Balaram) to continue.
          </p>
        </div>

        {/* Credentials Box & 1-Click Auto-Fill */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-200">
            <div className="flex items-center gap-1.5 font-bold">
              <Key className="h-4 w-4 text-cyan-400" />
              <span>OFFICIAL ACCOUNTS (1-CLICK LOGIN)</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              READY
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {/* 1. Admin Balaram Account */}
            <div className="flex items-center justify-between rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 to-[#12141C] p-3 text-xs shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                  <Image src="/creator.jpg" alt="Balaram Creator" fill className="object-cover" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                    <span>Balaram (Creator & Admin)</span>
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-mono text-amber-300 font-bold border border-amber-500/40">
                      ADMIN
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-white">Admin Name: <strong>Balaram</strong></p>
                  <p className="text-[10px] font-mono text-amber-300">Pass: balaram@2008</p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                className="text-[11px] h-8 px-3 bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg"
                onClick={() => handleOneClickLogin("Balaram", "balaram@2008", "ADMIN")}
              >
                1-Click Login
              </Button>
            </div>

            {/* 2. Maker User Account */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#12141C] p-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <span>Maker / Builder Account</span>
                  <span className="rounded bg-cyan-500/10 px-1.5 py-0.2 text-[9px] font-mono text-cyan-400">USER</span>
                </div>
                <p className="text-[11px] font-mono text-cyan-300">User: brkexperiments</p>
                <p className="text-[10px] font-mono text-neutral-400">Email: brkexperiments@gmail.com</p>
                <p className="text-[10px] font-mono text-neutral-500">Pass: maker123</p>
              </div>
              <Button
                type="button"
                size="sm"
                className="text-[11px] h-8 px-3 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30"
                onClick={() => handleOneClickLogin("brkexperiments", "maker123", "USER")}
              >
                1-Click Login
              </Button>
            </div>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Username or Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                required
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Balaram (Admin) OR brkexperiments (User)"
                className="pl-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-neutral-300">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="balaram@2008 OR maker123"
                className="pl-9 pr-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl font-semibold shadow-lg text-sm"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Laboratory"}
          </Button>
        </form>

        <div className="border-t border-white/10 pt-4 text-center text-xs text-neutral-400 flex items-center justify-between">
          <span>Don't have an account?</span>
          <Link
            href="/register"
            className="text-cyan-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Create an account</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
