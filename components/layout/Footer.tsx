import React from "react";
import Link from "next/link";
import { Youtube, Instagram, Cpu, Terminal, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand info & Socials */}
          <div className="md:col-span-2 space-y-4">
            <Logo showSubtitle />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              BRKExperiments is a dedicated Arduino and ESP hardware engineering laboratory.
              Discover, build, and master 35+ production-tested hardware projects with verified circuit schematics,
              accurate pinouts, and tested firmware.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@BRKEXPERIMENTS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-red-400 hover:bg-red-500/20 hover:text-white transition-all shadow-sm"
              >
                <Youtube className="h-4 w-4 text-red-500 fill-red-500" />
                <span>@BRKEXPERIMENTS</span>
              </a>

              <a
                href="https://www.instagram.com/BRKEXPERIMENTS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-pink-400 hover:bg-pink-500/20 hover:text-white transition-all shadow-sm"
              >
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>@BRKEXPERIMENTS</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYS_STATUS: 35 HARDWARE PACKAGES VERIFIED</span>
            </div>
          </div>

          {/* Column 1: Hardware Labs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">Hardware Labs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects?category=esp32" className="hover:text-white transition-colors">ESP32 Lab</Link></li>
              <li><Link href="/projects?category=arduino-uno" className="hover:text-white transition-colors">Arduino UNO Lab</Link></li>
              <li><Link href="/projects?category=arduino-nano" className="hover:text-white transition-colors">Arduino Nano Lab</Link></li>
              <li><Link href="/projects?category=arduino-mega" className="hover:text-white transition-colors">Arduino Mega Lab</Link></li>
              <li><Link href="/projects?category=esp8266" className="hover:text-white transition-colors">ESP8266 Lab</Link></li>
            </ul>
          </div>

          {/* Column 2: Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">Engineering Domains</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects?category=robotics" className="hover:text-white transition-colors">Robotics & Motion</Link></li>
              <li><Link href="/projects?category=home-automation" className="hover:text-white transition-colors">Smart Home Automation</Link></li>
              <li><Link href="/projects?category=environmental" className="hover:text-white transition-colors">Sensors & Weather</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">All 8 Categories</Link></li>
            </ul>
          </div>

          {/* Column 3: Community & Auth */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">Maker Hub</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Maker Sign In</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About BRKExperiments</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Hardware Support</Link></li>
              <li><span className="text-neutral-500 font-mono text-xs">Open Hardware v1.0</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} BRKExperiments. Dedicated Arduino & ESP Project Library.</p>
          <p className="mt-2 sm:mt-0">100% FREE OPEN HARDWARE • TESTED FIRMWARE • REAL CIRCUITS</p>
        </div>
      </div>
    </footer>
  );
}
