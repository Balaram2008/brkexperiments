"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
  Terminal,
  Youtube,
  Instagram,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { FluxThemeSwitcher } from "@/components/layout/FluxThemeSwitcher";
import { DeviceViewSwitcher } from "@/components/layout/DeviceViewSwitcher";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, switchUser } = useAuth();
  const { favorites } = useFavorites();
  const { currentTheme } = useFluxTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Hardware Catalog", href: "/projects" },
    { label: "⚡ Shorts AI Agent", href: "/shorts", highlight: true },
    { label: "ESP32 Lab", href: "/projects?category=esp32" },
    { label: "Arduino UNO", href: "/projects?category=arduino-uno" },
    { label: "Robotics", href: "/projects?category=robotics" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050508]/90 backdrop-blur-xl shadow-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-7">
          <Logo showSubtitle />

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-mono font-bold transition-all ${
                      active
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-white/5 border border-white/10 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30"
                    }`}
                  >
                    <Zap className="h-3 w-3 text-cyan-400 animate-pulse" />
                    <span>Shorts AI Agent</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono transition-colors hover:text-white ${
                    active ? "text-cyan-400 font-bold" : "text-neutral-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions & Social Links */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* YouTube Channel Link */}
          <a
            href="https://www.youtube.com/@BRKEXPERIMENTS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-mono font-semibold text-red-400 hover:bg-red-500/20 hover:text-white transition-all shadow-sm"
            title="Subscribe on YouTube (@BRKEXPERIMENTS)"
          >
            <Youtube className="h-4 w-4 text-red-500 fill-red-500" />
            <span className="hidden md:inline">YouTube</span>
          </a>

          {/* Instagram Channel Link */}
          <a
            href="https://www.instagram.com/BRKEXPERIMENTS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-2.5 py-1.5 text-xs font-mono font-semibold text-pink-400 hover:bg-pink-500/20 hover:text-white transition-all shadow-sm"
            title="Follow on Instagram (@BRKEXPERIMENTS)"
          >
            <Instagram className="h-4 w-4 text-pink-400" />
            <span className="hidden md:inline">Instagram</span>
          </a>

          {/* Quick CMD+K trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            className="hidden lg:flex items-center gap-2 rounded-lg border border-white/10 bg-surface px-2.5 py-1.5 text-xs text-neutral-400 hover:border-white/20 hover:text-neutral-200 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded bg-white/5 border border-white/10 px-1 py-0.5 font-mono text-[10px] text-neutral-400">
              ⌘K
            </kbd>
          </button>

          {/* Favorites Heart */}
          <Link
            href="/dashboard/favorites"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface hover:bg-surface-secondary text-neutral-400 hover:text-rose-400 transition-colors"
            title="Saved Hardware Projects"
          >
            <Heart className={`h-4 w-4 ${favorites.length > 0 ? "fill-rose-500/20 text-rose-500" : ""}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* PC vs. Mobile App Switcher */}
          <DeviceViewSwitcher />

          {/* OxygenOS Flux Theme Switcher */}
          <FluxThemeSwitcher />

          {/* Dark / Light Toggle */}
          <ThemeToggle />

          {/* User Account / Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface p-1.5 pr-2.5 text-sm text-neutral-300 hover:border-white/20 hover:text-white transition-colors"
              >
                {user.avatar ? (
                  <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-amber-400/50 flex-shrink-0">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white border"
                    style={{
                      backgroundColor: `${currentTheme.primary}25`,
                      borderColor: `${currentTheme.primary}60`,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-medium text-xs font-mono">{user.name.split(" ")[0]}</span>
                {user.role === "ADMIN" && (
                  <span className="hidden sm:inline rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] font-mono text-amber-300 border border-amber-500/40 font-bold">
                    BALARAM
                  </span>
                )}
                <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/15 bg-[#0C0D12]/95 backdrop-blur-2xl p-2 shadow-2xl animate-in zoom-in-95 z-50">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] font-mono text-neutral-400 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-block rounded bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono text-cyan-400">
                        {user.role === "ADMIN" ? "ADMIN_PRIVILEGED" : "MAKER_ACCOUNT"}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                    >
                      <User className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Maker Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard/projects"
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                    >
                      <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Saved Packages</span>
                    </Link>
                    <Link
                      href="/shorts"
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>Shorts AI Expander</span>
                    </Link>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                      >
                        <Shield className="h-3.5 w-3.5 text-amber-400" />
                        <span>Admin Console</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={() => switchUser(user.role === "ADMIN" ? "USER" : "ADMIN")}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Switch to {user.role === "ADMIN" ? "Maker Demo" : "Admin Demo"}</span>
                    </button>
                    <button
                      onClick={() => logout()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-xs">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="hidden sm:inline-block">
                <Button size="sm" className="text-xs">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-white/10 bg-[#050508]/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  link.highlight
                    ? "text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <a
              href="https://www.youtube.com/@BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-xs font-semibold text-red-400"
            >
              <Youtube className="h-4 w-4 text-red-500 fill-red-500" />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 p-2 text-xs font-semibold text-pink-400"
            >
              <Instagram className="h-4 w-4 text-pink-400" />
              <span>Instagram</span>
            </a>
          </div>

          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <Link href="/projects">
              <Button className="w-full">Explore Hardware Lab</Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
