"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Mail, Key, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export default function ForgotPasswordPage() {
  const { currentTheme } = useFluxTheme();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identifier, setIdentifier] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setLoading(true);
    setTimeout(() => {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(code);
      setOtpCode(code); // Pre-fill for seamless user testing experience!
      setLoading(false);
      setStep(2);
    }, 400);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* OxygenOS Flux aura */}
      <div
        className="flux-aura -top-24 -left-24 h-96 w-96"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <div
        className="flux-aura -bottom-24 -right-24 h-96 w-96"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-white/15 bg-[#0C0D12]/90 backdrop-blur-2xl p-7 sm:p-9 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-block mb-1">
            <Logo showSubtitle />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Account Recovery
          </h1>
          <p className="text-xs text-neutral-400">
            {step === 1 && "Enter your username or email address to receive a verification token."}
            {step === 2 && "Enter your verification token and create a new password."}
            {step === 3 && "Your password has been successfully updated!"}
          </p>
        </div>

        {/* STEP 1: Enter Username or Email */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                Username or Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="brkexperiments OR brkexperiments@gmail.com"
                  className="pl-9 bg-[#11131A] border-white/10 text-white placeholder:text-neutral-500 rounded-xl"
                />
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
              {loading ? "Generating Security Token..." : "Send Verification Token"}
            </Button>
          </form>
        )}

        {/* STEP 2: Enter Verification Code & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>SIMULATED RECOVERY TOKEN GENERATED</span>
              </div>
              <p className="text-neutral-300 text-[11px]">
                Token dispatched for <strong className="text-white font-mono">{identifier}</strong>:{" "}
                <span className="font-mono font-bold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {generatedOtp}
                </span>{" "}
                (Auto-filled below for testing).
              </p>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                6-Digit Security Token
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="pl-9 bg-[#11131A] border-white/10 text-white font-mono text-center tracking-widest text-lg rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-9 bg-[#11131A] border-white/10 text-white rounded-xl"
                />
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
              {loading ? "Updating Credentials..." : "Reset Password & Continue"}
            </Button>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center py-4 space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Password Successfully Reset</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Your account password has been updated. You can now sign in using your username or email.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full rounded-xl font-semibold text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                  }}
                >
                  Proceed to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-4 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
