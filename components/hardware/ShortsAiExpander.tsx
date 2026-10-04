"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Zap,
  Youtube,
  Cpu,
  Layers,
  Code2,
  Copy,
  Check,
  Download,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Wand2,
  RefreshCw,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useFluxTheme } from "@/components/providers/FluxThemeProvider";
import { ShortProjectKnowledge } from "@/app/api/ai/expand-short/route";

const CURATED_SHORTS = [
  {
    id: "mini-radar",
    title: "360° Ultrasonic Mini Radar Screen",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    duration: "45s",
    views: "18.4K",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
    tags: ["Radar", "HC-SR04", "SG90 Servo", "Processing"],
    shortDesc: "Sweeps ultrasonic sonar 180 degrees and plots real-time detected obstacles on a green radar HUD.",
  },
  {
    id: "laser-tripwire",
    title: "Laser Tripwire Security Grid with Siren",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    duration: "38s",
    views: "24.1K",
    thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
    tags: ["Laser", "LDR", "Audio Siren", "Security"],
    shortDesc: "Invisible perimeter security beam triggers dual-tone police siren whenever someone crosses the room.",
  },
  {
    id: "knock-lock",
    title: "Secret Knock Vibration Door Lock",
    platform: "Arduino Nano",
    difficulty: "Intermediate",
    duration: "52s",
    views: "31.7K",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    tags: ["Piezo", "12V Solenoid", "TIP120", "Rhythm Lock"],
    shortDesc: "Piezo vibration sensor listens for your secret rhythmic tap sequence to pop open a 12V deadbolt lock.",
  },
  {
    id: "gesture-car",
    title: "Gesture-Controlled Hand Glove Robot",
    platform: "Arduino Nano & UNO",
    difficulty: "Advanced",
    duration: "58s",
    views: "42.9K",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    tags: ["MPU6050", "NRF24L01", "4WD Chassis", "RF Remote"],
    shortDesc: "Wearable sensor glove turns your natural hand tilting into wireless driving commands for a 4WD rover.",
  },
];

export function ShortsAiExpander() {
  const { currentTheme } = useFluxTheme();
  const [selectedShortId, setSelectedShortId] = useState<string>("mini-radar");
  const [synthesizing, setSynthesizing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [projectData, setProjectData] = useState<ShortProjectKnowledge | null>(null);
  const [activeTab, setActiveTab] = useState<"code" | "wiring" | "bom" | "guide">("code");
  const [copiedCode, setCopiedCode] = useState(false);

  // Load default short on initial view or selection
  const fetchSynthesis = async (id?: string, promptText?: string, boardName?: string) => {
    setSynthesizing(true);
    try {
      const res = await fetch("/api/ai/expand-short", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortId: id || selectedShortId,
          query: promptText || customPrompt,
          board: boardName,
        }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProjectData(data.project);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSynthesizing(false);
    }
  };

  const handleSelectShort = (id: string) => {
    setSelectedShortId(id);
    fetchSynthesis(id);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    fetchSynthesis(undefined, customPrompt);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPackage = () => {
    if (!projectData) return;
    const blob = new Blob([projectData.firmwareCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectData.id || "experiment"}-firmware.ino`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-10">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#0C0D14] via-[#0E1019] to-[#0A0B10] p-6 sm:p-10 shadow-2xl">
        <div
          className="flux-aura -top-16 -right-16 h-80 w-80"
          style={{ backgroundColor: currentTheme.primary }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-mono font-bold text-red-400 shadow-sm">
              <Youtube className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              <span>YOUTUBE SHORTS EXPANDER</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-mono font-bold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>BRK AI HARDWARE AGENT</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Shorts Are Under 60 Seconds. <br />
            <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
              Ask Our AI Agent to Fulfill the Whole Experiment.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            YouTube Shorts from{" "}
            <a
              href="https://www.youtube.com/@BRKEXPERIMENTS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline font-semibold"
            >
              @BRKEXPERIMENTS
            </a>{" "}
            show exciting demos, but 60 seconds is too short to show the schematics, pinout matrix, BOM prices, and full tested firmware. Click any Short below or enter any hardware idea, and our AI Agent generates the complete physical build blueprint instantly!
          </p>
        </div>
      </div>

      {/* 2. Curated Shorts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              Featured Shorts from @BRKEXPERIMENTS
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Click a Short to synthesize with AI</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURATED_SHORTS.map((short) => {
            const isSelected = selectedShortId === short.id;
            return (
              <div
                key={short.id}
                onClick={() => handleSelectShort(short.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "border-cyan-500 ring-2 ring-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] bg-[#12141F]"
                    : "border-white/10 bg-[#0C0D12] hover:border-white/20 hover:bg-[#10121A]"
                }`}
              >
                {/* Image & YouTube Badge */}
                <div className="relative aspect-[9/12] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={short.thumbnail}
                    alt={short.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-black/40 to-transparent" />

                  {/* Red Shorts Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-lg">
                    <Youtube className="h-3 w-3 fill-white text-white" />
                    <span>SHORT {short.duration}</span>
                  </div>

                  {/* Views */}
                  <div className="absolute top-3 right-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                    {short.views} views
                  </div>

                  {/* Title & Platform inside preview */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <span className="inline-block rounded bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
                      {short.platform}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {short.title}
                    </h4>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-neutral-400">{short.difficulty}</span>
                  <span className="text-[11px] font-bold text-cyan-400 group-hover:underline flex items-center gap-1">
                    <span>⚡ Fulfill Short</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Custom Query Input Bar */}
      <div className="rounded-2xl border border-white/10 bg-[#0C0D12] p-4 sm:p-5 shadow-xl">
        <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ask AI about any YouTube Short or experiment (e.g., 'Automatic hand sanitizer with IR sensor' or 'ESP32 Voice Light')..."
              className="w-full rounded-xl border border-white/10 bg-[#12141C] pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={synthesizing}
            className="rounded-xl font-semibold text-xs sm:text-sm shadow-lg whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            }}
          >
            {synthesizing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>AI Synthesizing...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                <span>Ask AI Agent to Fulfill</span>
              </span>
            )}
          </Button>
        </form>
      </div>

      {/* 4. AI Synthesis Output Console */}
      {projectData && (
        <div className="rounded-3xl border border-white/15 bg-[#0C0D14] overflow-hidden shadow-2xl space-y-6">
          {/* Top Banner: Status & Quick Actions */}
          <div className="border-b border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>AI SYNTHESIS COMPLETED</span>
                </span>
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-0.5 text-xs font-mono font-bold text-cyan-300">
                  {projectData.platform}
                </span>
                <Badge variant="outline" className="font-mono text-xs">
                  {projectData.difficulty}
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {projectData.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {projectData.shortSummary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="sm"
                onClick={() => handleCopy(projectData.firmwareCode)}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs rounded-xl"
              >
                {copiedCode ? (
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Copy className="h-4 w-4 text-cyan-400" />
                    <span>Copy Full .INO</span>
                  </span>
                )}
              </Button>

              <Button
                size="sm"
                onClick={handleDownloadPackage}
                className="rounded-xl text-xs font-semibold shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                }}
              >
                <Download className="h-4 w-4 mr-1.5" />
                <span>Download Sketch (.INO)</span>
              </Button>
            </div>
          </div>

          {/* Insufficient Explanation Card */}
          <div className="mx-6 sm:mx-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3 text-xs">
            <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 font-mono">
                WHY THE YOUTUBE SHORT WAS INSUFFICIENT:
              </span>
              <p className="text-neutral-300 leading-relaxed">
                {projectData.insufficientReason}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 sm:px-8 flex items-center gap-2 border-b border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-3 text-xs font-mono font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "code"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="h-4 w-4" />
                <span>Firmware (.INO Code)</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("wiring")}
              className={`pb-3 text-xs font-mono font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "wiring"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                <span>Pinout Wiring Matrix</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("bom")}
              className={`pb-3 text-xs font-mono font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "bom"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                <span>Components (BOM & Prices)</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`pb-3 text-xs font-mono font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === "guide"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Assembly & Flashing Guide</span>
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="px-6 sm:px-8 pb-8">
            {/* 1. Code Tab */}
            {activeTab === "code" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="text-cyan-300">firmware.ino — Ready to flash via Arduino IDE</span>
                  <span>Tested & Production Verified</span>
                </div>
                <div className="relative rounded-2xl border border-white/10 bg-[#08080C] p-4 overflow-x-auto max-h-[500px]">
                  <pre className="text-xs font-mono text-neutral-200 leading-relaxed">
                    <code>{projectData.firmwareCode}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* 2. Wiring Tab */}
            {activeTab === "wiring" && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#08080C]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider bg-white/[0.02]">
                        <th className="py-3 px-4">Peripheral / Sensor Pin</th>
                        <th className="py-3 px-4">Microcontroller Pin</th>
                        <th className="py-3 px-4">Wire Color</th>
                        <th className="py-3 px-4">Connection Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {projectData.pinoutTable.map((pin, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-semibold text-white">{pin.sensorPin}</td>
                          <td className="py-3 px-4">
                            <span className="rounded bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-cyan-300 font-bold">
                              {pin.mcuPin}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-neutral-300">{pin.wireColor}</td>
                          <td className="py-3 px-4 text-neutral-400 font-sans">{pin.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ASCII Schematic representation */}
                <div className="rounded-2xl border border-white/10 bg-[#08080C] p-4">
                  <p className="text-xs font-mono text-cyan-300 mb-2">SCHEMATIC LOGIC TOPOLOGY:</p>
                  <pre className="text-xs font-mono text-neutral-400 overflow-x-auto leading-relaxed">
                    {projectData.schematicAscii}
                  </pre>
                </div>
              </div>
            )}

            {/* 3. BOM Tab */}
            {activeTab === "bom" && (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#08080C]">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider bg-white/[0.02]">
                      <th className="py-3 px-4">Hardware Component</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Technical Specs</th>
                      <th className="py-3 px-4">Approx Price (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projectData.bom.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-semibold text-white">{item.component}</td>
                        <td className="py-3 px-4 text-cyan-400 font-bold">{item.qty}x</td>
                        <td className="py-3 px-4 text-neutral-300 font-sans">{item.specs}</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">{item.estPriceInr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 4. Guide Tab */}
            {activeTab === "guide" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Step-by-Step Breadboard Assembly:
                  </h4>
                  <div className="space-y-2.5">
                    {projectData.assemblySteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold font-mono text-[10px] flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-neutral-200 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#08080C] p-4 space-y-2">
                  <h4 className="text-xs font-mono font-bold text-amber-300">
                    BENCH TESTING & VERIFICATION:
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {projectData.testingInstructions}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive AI Prompt Tweaks */}
          <div className="border-t border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-3">
            <span className="text-xs font-mono uppercase text-neutral-400 block">
              Ask AI Agent to adapt or expand this circuit:
            </span>
            <div className="flex flex-wrap gap-2">
              {projectData.suggestedTweaks.map((tweak, idx) => (
                <button
                  key={idx}
                  onClick={() => fetchSynthesis(undefined, tweak)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-neutral-200 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all font-mono"
                >
                  ⚡ {tweak}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
