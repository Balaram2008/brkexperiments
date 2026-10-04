"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Cpu,
  Zap,
  Heart,
  User,
  Wifi,
  Battery,
  Monitor,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";
import { useDeviceView } from "@/components/providers/DeviceViewProvider";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";
import { useAuth } from "@/components/providers/AuthProvider";

export function MobileAppShell({ children }: { children: React.ReactNode }) {
  const { viewMode, setViewMode } = useDeviceView();
  const { currentTheme } = useFluxTheme();
  const { user } = useAuth();
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("12:00 PM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (viewMode === "desktop") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Lab", href: "/projects", icon: Cpu },
    { label: "Shorts AI", href: "/shorts", icon: Zap, highlight: true },
    { label: "Saved", href: "/dashboard/favorites", icon: Heart },
    {
      label: user?.role === "ADMIN" ? "Admin" : "Profile",
      href: user ? (user.role === "ADMIN" ? "/admin" : "/dashboard") : "/login",
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020204] py-2 sm:py-6 px-0 sm:px-4 flex flex-col items-center justify-start relative">
      {/* Background Glow */}
      <div
        className="flux-aura top-10 left-1/2 -translate-x-1/2 h-[500px] w-[500px]"
        style={{ backgroundColor: currentTheme.primary }}
      />

      {/* Floating View Mode Switcher Hint for Desktop users */}
      <div className="hidden sm:flex items-center gap-2 mb-3 bg-[#11131C]/90 border border-white/15 px-3 py-1 rounded-full text-xs font-mono text-neutral-300 shadow-xl backdrop-blur-md z-50">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>OxygenOS Mobile App Simulator Active</span>
        <button
          onClick={() => setViewMode("desktop")}
          className="ml-2 flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[11px] text-cyan-300 hover:bg-white/20 transition-colors"
        >
          <Monitor className="h-3 w-3" />
          <span>Exit to PC View</span>
        </button>
      </div>

      {/* Smartphone Hardware Frame */}
      <div className="w-full max-w-[440px] bg-[#07080C] border-0 sm:border-4 border-[#2A2E3D] rounded-none sm:rounded-[44px] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col relative z-20 min-h-[92vh]">
        {/* 1. Android / OxygenOS Top Status Bar */}
        <div className="bg-[#0A0B10] px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-mono text-neutral-300 border-b border-white/5 select-none">
          <span className="font-semibold text-white">{currentTime}</span>

          {/* Camera Notch Punchhole */}
          <div className="h-3.5 w-16 rounded-full bg-black border border-white/10 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-950 border border-blue-400/40" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <span className="text-[10px] font-bold text-white">5G</span>
            <Wifi className="h-3 w-3 text-white" />
            <div className="flex items-center gap-0.5 text-emerald-400 font-bold">
              <span>98%</span>
              <Battery className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* 2. Mobile App Header */}
        <div className="bg-[#0C0D14]/95 backdrop-blur-xl px-4 py-3 border-b border-white/10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <Link href="/login" className="relative group">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <Image src="/creator.jpg" alt="Balaram" fill className="object-cover" />
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-black" />
            </Link>
            <div>
              <p className="text-xs font-bold text-white leading-none">BRKExperiments</p>
              <p className="text-[10px] font-mono text-cyan-400">Balaram's Hardware Lab</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("desktop")}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono text-neutral-300 hover:text-white"
              title="Return to PC Desktop View"
            >
              <Monitor className="h-3 w-3 text-cyan-400" />
              <span>PC</span>
            </button>
          </div>
        </div>

        {/* 3. Mobile Content Scroll Area */}
        <div className="flex-1 overflow-y-auto pb-20 p-3 sm:p-4 space-y-6">
          {children}
        </div>

        {/* 4. Fixed Smartphone Bottom Navigation Dock */}
        <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-[#0A0B10]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around z-40">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  active
                    ? "text-cyan-400 font-bold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition-transform ${
                    active ? "bg-cyan-500/20 scale-110" : ""
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-cyan-400" : ""}`} />
                </div>
                <span className="text-[9px] font-mono leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
