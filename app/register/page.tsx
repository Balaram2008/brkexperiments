"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { currentTheme } = useFluxTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please complete all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    await register(username, email, password);
    setLoading(false);
    router.push("/dashboard");
  };

  const handleAutoFill = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setUsername(`maker_brk${randomNum}`);
    setEmail(`maker${randomNum}@brkexperiments.dev`);
    setPassword("maker123");
    setConfirmPassword("maker123");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* OxygenOS Flux aura */}
      <div
        className="flux-aura -top-24 -right-24 h-96 w-96"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <div
        className="flux-aura -bottom-24 -left-24 h-96 w-96"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-white/15 bg-[#0C0D12]/90 backdrop-blur-2xl p-7 sm:p-9 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-block mb-1">
            <Logo showSubtitle />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create Maker Account
          </h1>
          <p className="text-xs text-neutral-400">
            Join the BRKExperiments community. Access tested hardware sketches, schematics, and AI tools.
          </p>
        </div>

        {/* 1-Click Demo Fill */}
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-neutral-300 font-mono text-[11px]">Need a quick test account?</span>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAutoFill}
            className="text-[11px] h-7 px-2.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30"
          >
            1-Click Auto-Fill
          </Button>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. arjun_maker"
                className="pl-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maker@domain.com"
                className="pl-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••••• (min. 6 chars)"
                className="pl-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="pl-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-xs text-neutral-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>100% Free Open Hardware Access — No credit cards or payments needed.</span>
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
            {loading ? "Creating Account..." : "Create Account & Start Building"}
          </Button>
        </form>

        <div className="border-t border-white/10 pt-4 text-center text-xs text-neutral-400 flex items-center justify-between">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="text-cyan-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Sign in</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
