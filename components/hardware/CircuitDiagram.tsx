"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, Download, Layers, ShieldCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CircuitDiagram({
  circuitSvg,
  title,
  platform,
}: {
  circuitSvg?: string | null;
  title: string;
  platform: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [activeWire, setActiveWire] = useState<string | null>(null);

  const getPlatformColors = (plat: string) => {
    switch (plat.toLowerCase()) {
      case "esp32":
        return { stroke: "#EF4444", bg: "#1A0E0E", text: "#FCA5A5", label: "ESP32-WROOM-32D (Wi-Fi + BLE)" };
      case "arduino uno":
        return { stroke: "#10B981", bg: "#0E1A16", text: "#6EE7B7", label: "ARDUINO UNO R3 (ATmega328P)" };
      case "arduino nano":
        return { stroke: "#06B6D4", bg: "#0E181A", text: "#7DD3FC", label: "ARDUINO NANO (CH340G / V3.0)" };
      case "arduino mega":
        return { stroke: "#8B5CF6", bg: "#140E1A", text: "#C4B5FD", label: "ARDUINO MEGA 2560 (54 GPIO)" };
      case "esp8266":
        return { stroke: "#3B82F6", bg: "#0E121A", text: "#93C5FD", label: "NodeMCU ESP8266 (ESP-12E)" };
      case "raspberry pi pico":
      case "rp2040":
        return { stroke: "#EC4899", bg: "#1A0E15", text: "#F472B6", label: "RASPBERRY PI PICO (Dual-Core RP2040)" };
      case "stm32":
        return { stroke: "#6366F1", bg: "#0E101A", text: "#A5B4FC", label: "STM32 BLUE PILL (ARM Cortex-M3)" };
      default:
        return { stroke: "#06B6D4", bg: "#0E181A", text: "#7DD3FC", label: `${plat.toUpperCase()} CONTROLLER` };
    }
  };

  const pConfig = getPlatformColors(platform);

  return (
    <div className="space-y-4 rounded-3xl border border-white/15 bg-[#0C0D14] p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Schematic & Circuit Connection Diagram
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Vector breadboard layout & pin-to-pin wiring bus
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            <span>BENCH_VERIFIED</span>
          </span>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoomed(!zoomed)}
            className="text-xs font-mono h-8 border-white/15 text-neutral-300 hover:text-white"
          >
            {zoomed ? (
              <span className="flex items-center gap-1.5">
                <ZoomOut className="h-3.5 w-3.5 text-cyan-400" />
                <span>Default View</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <ZoomIn className="h-3.5 w-3.5 text-cyan-400" />
                <span>Expand Canvas</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Interactive Schematic Diagram */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#07080C] p-4 transition-all duration-300 ${
          zoomed ? "h-[560px]" : "h-[360px]"
        }`}
      >
        {/* Engineering Grid */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#06B6D4 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {circuitSvg ? (
          <div
            className="relative z-10 w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: circuitSvg }}
          />
        ) : (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <svg
              className="w-full h-full max-h-[500px]"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Power Rail Indicator Top */}
              <rect x="30" y="20" width="790" height="24" rx="6" fill="#11131A" stroke="#262A36" />
              <line x1="45" y1="28" x2="805" y2="28" stroke="#EF4444" strokeWidth="2" />
              <text x="50" y="27" fill="#EF4444" fontSize="9" fontWeight="bold" fontFamily="monospace">+5V / 3V3 POWER RAIL</text>
              <line x1="45" y1="36" x2="805" y2="36" stroke="#3B82F6" strokeWidth="2" />
              <text x="50" y="42" fill="#3B82F6" fontSize="9" fontWeight="bold" fontFamily="monospace">GND COMMON GROUND</text>

              {/* 1. Main MCU Board */}
              <g
                className="cursor-pointer transition-transform hover:scale-[1.01]"
                onMouseEnter={() => setActiveWire("mcu")}
                onMouseLeave={() => setActiveWire(null)}
              >
                <rect
                  x="40"
                  y="70"
                  width="220"
                  height="240"
                  rx="12"
                  fill={pConfig.bg}
                  stroke={pConfig.stroke}
                  strokeWidth="2.5"
                />
                {/* Board Label */}
                <rect x="55" y="85" width="190" height="35" rx="6" fill="#0C0D12" stroke="#ffffff15" />
                <text x="150" y="102" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {platform.toUpperCase()}
                </text>
                <text x="150" y="114" fill={pConfig.text} fontSize="8" textAnchor="middle" fontFamily="monospace">
                  {pConfig.label}
                </text>

                {/* USB / Power Header */}
                <rect x="40" y="140" width="15" height="40" rx="3" fill="#D4D4D8" />
                <text x="44" y="165" fill="#18181B" fontSize="7" fontWeight="bold" fontFamily="monospace">USB</text>

                {/* Pin Rows */}
                {/* Pin 1: 5V/3V3 */}
                <circle cx="260" cy="140" r="5" fill="#EF4444" />
                <text x="248" y="144" fill="#FFFFFF" fontSize="10" textAnchor="end" fontFamily="monospace">VCC (+)</text>

                {/* Pin 2: GND */}
                <circle cx="260" cy="170" r="5" fill="#3B82F6" />
                <text x="248" y="174" fill="#FFFFFF" fontSize="10" textAnchor="end" fontFamily="monospace">GND (-)</text>

                {/* Pin 3: Data / Trig / SDA */}
                <circle cx="260" cy="200" r="5" fill="#EAB308" />
                <text x="248" y="204" fill="#FFFFFF" fontSize="10" textAnchor="end" fontFamily="monospace">SDA / TRIG</text>

                {/* Pin 4: Clock / Echo / SCL */}
                <circle cx="260" cy="230" r="5" fill="#06B6D4" />
                <text x="248" y="234" fill="#FFFFFF" fontSize="10" textAnchor="end" fontFamily="monospace">SCL / ECHO</text>

                {/* Pin 5: Actuator / PWM */}
                <circle cx="260" cy="260" r="5" fill="#10B981" />
                <text x="248" y="264" fill="#FFFFFF" fontSize="10" textAnchor="end" fontFamily="monospace">PWM / RELAY</text>
              </g>

              {/* 2. Color-Coded Jumper Wires */}
              {/* Wire 1: VCC Red */}
              <path
                d="M 260 140 C 340 140, 360 110, 480 110"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 480 110 L 580 110"
                stroke="#EF4444"
                strokeWidth="2.5"
              />

              {/* Wire 2: GND Blue */}
              <path
                d="M 260 170 C 330 170, 370 135, 480 135"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 480 135 L 580 135"
                stroke="#3B82F6"
                strokeWidth="2.5"
              />

              {/* Wire 3: SDA / Trig Yellow */}
              <path
                d="M 260 200 C 350 200, 410 160, 580 160"
                stroke="#EAB308"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                strokeLinecap="round"
              />

              {/* Wire 4: SCL / Echo Cyan */}
              <path
                d="M 260 230 C 360 230, 440 185, 580 185"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Wire 5: Actuator Green to Module 2 */}
              <path
                d="M 260 260 C 380 260, 460 270, 580 270"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* 3. Sensor / Primary Peripheral Module */}
              <g className="cursor-pointer transition-transform hover:scale-[1.01]">
                <rect
                  x="580"
                  y="75"
                  width="230"
                  height="135"
                  rx="10"
                  fill="#11131E"
                  stroke="#06B6D4"
                  strokeWidth="2"
                />
                <rect x="595" y="88" width="200" height="28" rx="4" fill="#0A0B10" stroke="#06B6D4" strokeWidth="0.8" />
                <text x="695" y="106" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  PRIMARY SENSOR / TELEMETRY
                </text>

                {/* Sensor Pins */}
                <circle cx="580" cy="110" r="4.5" fill="#EF4444" />
                <text x="592" y="113" fill="#E4E4E7" fontSize="9" fontFamily="monospace">VCC (3.3V / 5V)</text>

                <circle cx="580" cy="135" r="4.5" fill="#3B82F6" />
                <text x="592" y="138" fill="#E4E4E7" fontSize="9" fontFamily="monospace">GND (Ground)</text>

                <circle cx="580" cy="160" r="4.5" fill="#EAB308" />
                <text x="592" y="163" fill="#E4E4E7" fontSize="9" fontFamily="monospace">SDA / Trig Data</text>

                <circle cx="580" cy="185" r="4.5" fill="#06B6D4" />
                <text x="592" y="188" fill="#E4E4E7" fontSize="9" fontFamily="monospace">SCL / Echo Clock</text>
              </g>

              {/* 4. Actuator / Relay / Display Module */}
              <g className="cursor-pointer transition-transform hover:scale-[1.01]">
                <rect
                  x="580"
                  y="230"
                  width="230"
                  height="80"
                  rx="10"
                  fill="#161214"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <text x="695" y="255" fill="#FBBF24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  ACTUATOR / MOTOR / RELAY
                </text>
                <circle cx="580" cy="270" r="4.5" fill="#10B981" />
                <text x="592" y="274" fill="#E4E4E7" fontSize="9" fontFamily="monospace">IN (Active Trigger)</text>
                <text x="695" y="295" fill="#A1A1AA" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  5V Optocoupler Solenoid / Driver
                </text>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Wire Color Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-neutral-400 font-bold">WIRING BUS:</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-neutral-300">VCC (5V/3V3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="text-neutral-300">GND</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="text-neutral-300">SDA / Trig</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span className="text-neutral-300">SCL / Echo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-neutral-300">PWM / Actuator</span>
          </div>
        </div>

        <span className="text-cyan-400 text-[11px]">
          SVG Schematic included in 1-Click .ZIP Package
        </span>
      </div>
    </div>
  );
}
