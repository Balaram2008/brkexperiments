"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Shield, Lock, ArrowRight, Sparkles, CheckCircle2, Key } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export function StartingLoginCard() {
  const router = useRouter();
  const { user, login } = useAuth();
  const { currentTheme } = useFluxTheme();
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminOneClick = async () => {
    setLoading(true);
    await login("Balaram", "balaram@2008", "ADMIN");
    setLoading(false);
    router.push("/admin");
  };

  const handleUserOneClick = async () => {
    setLoading(true);
    await login("brkexperiments", "maker123", "USER");
    setLoading(false);
    router.push("/dashboard");
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;

    if (activeTab === "admin") {
      if (password !== "balaram@2008") {
        setError("Password for Admin Balaram must be balaram@2008");
        return;
      }
      setLoading(true);
      setError(null);
      await login("Balaram", password, "ADMIN");
      setLoading(false);
      router.push("/admin");
    } else {
      setLoading(true);
      setError(null);
      await login(identifier, password, "USER");
      setLoading(false);
      router.push("/dashboard");
    }
  };

  if (user) {
    return (
      <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0C0D14] via-[#10121C] to-[#0A0B10] p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Image
              src={user.avatar || (user.role === "ADMIN" ? "/creator.jpg" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150")}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">{user.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                  user.role === "ADMIN"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                }`}
              >
                {user.role === "ADMIN" ? "ADMIN_CREATOR" : "MAKER_ACCOUNT"}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={user.role === "ADMIN" ? "/admin" : "/dashboard"}>
            <Button
              size="sm"
              className="rounded-xl font-semibold text-xs shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              }}
            >
              <span>Go to {user.role === "ADMIN" ? "Admin Studio" : "Dashboard"}</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0C0D14] via-[#10121C] to-[#0A0B10] p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Key className="h-3.5 w-3.5" />
            <span>STARTING PAGE ACCESS</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Sign in as Maker User or Admin (Balaram)
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
          <button
            onClick={() => {
              setActiveTab("user");
              setError(null);
            }}
            className={`rounded-lg px-4 py-1.5 text-xs font-mono font-semibold transition-all ${
              activeTab === "user"
                ? "bg-cyan-500 text-black shadow-md font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => {
              setActiveTab("admin");
              setError(null);
            }}
            className={`rounded-lg px-4 py-1.5 text-xs font-mono font-semibold transition-all ${
              activeTab === "admin"
                ? "bg-amber-400 text-black shadow-md font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Admin (Balaram)
          </button>
        </div>
      </div>

      {/* Tab 1: User Login Card */}
      {activeTab === "user" ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <User className="h-4 w-4 text-cyan-400" />
              <span>Maker / Student Builder Access</span>
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Explore 38+ verified hardware packages, download `.ino` firmware sketches, BOM checklists, and view YouTube Shorts with AI synthesis.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Button
                size="sm"
                onClick={handleUserOneClick}
                disabled={loading}
                className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs rounded-xl"
              >
                ⚡ 1-Click Maker Demo Login
              </Button>
              <Link href="/register" className="text-xs text-neutral-400 hover:text-white underline">
                Create new account
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 bg-[#08080C] border border-white/10 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-mono text-cyan-300">USER CREDENTIALS:</p>
            <div className="text-xs font-mono text-neutral-300 space-y-1">
              <p>Username: <strong className="text-white">brkexperiments</strong></p>
              <p>Email: <strong className="text-white">brkexperiments@gmail.com</strong></p>
              <p>Password: <strong className="text-white">maker123</strong></p>
            </div>
            <Link href="/login" className="block pt-1">
              <Button size="sm" variant="outline" className="w-full text-xs rounded-xl">
                Open Full Sign In Page →
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Tab 2: Admin Balaram Login Card */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex-shrink-0">
                <Image src="/creator.jpg" alt="Balaram" fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-400" />
                  <span>Admin Balaram Privileged Studio</span>
                </h4>
                <p className="text-[11px] font-mono text-amber-300">Full CMS & Project Control</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Create new hardware experiments, edit existing projects before uploading, manage draft vs published statuses, and synthesize custom circuits.
            </p>
            <div className="pt-1">
              <Button
                size="sm"
                onClick={handleAdminOneClick}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-lg"
              >
                ⚡ 1-Click Login as Admin Balaram
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 bg-[#08080C] border border-amber-500/30 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-mono text-amber-300">OFFICIAL ADMIN CREDENTIALS:</p>
            <div className="text-xs font-mono text-neutral-300 space-y-1">
              <p>Admin Name: <strong className="text-amber-300">Balaram</strong></p>
              <p>Password: <strong className="text-amber-300">balaram@2008</strong></p>
              <p className="text-[10px] text-neutral-400">Privilege: Create & Edit All Projects</p>
            </div>
            <Link href="/login" className="block pt-1">
              <Button size="sm" variant="outline" className="w-full text-xs rounded-xl border-amber-500/40 text-amber-300">
                Admin Sign In Form →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
