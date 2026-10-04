"use client";

import React, { useState } from "react";
import { Key, Copy, Check, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("brk_live_948f21908aa34e10b");
  const [copied, setCopied] = useState(false);
  const [notifyReleases, setNotifyReleases] = useState(true);
  const [notifySecurity, setNotifySecurity] = useState(true);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateKey = () => {
    const newKey = "brk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 6);
    setApiKey(newKey);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Account Settings</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          API credentials, notifications, and security configurations.
        </p>
      </div>

      {/* Developer API Token */}
      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-primary-light" />
          <h2 className="text-base font-semibold text-white">Developer API Key</h2>
        </div>
        <p className="text-xs text-neutral-400">
          Use this personal token for automated CLI downloads and script access to your licensed archives.
        </p>

        <div className="flex items-center gap-2">
          <input
            readOnly
            value={apiKey}
            className="flex-1 rounded-lg border border-border bg-surface-secondary px-3 py-2 font-mono text-xs text-neutral-300 focus:outline-none"
          />
          <Button variant="outline" size="sm" onClick={copyKey} className="gap-1 font-mono">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </Button>
          <Button variant="outline" size="sm" onClick={regenerateKey} className="font-mono text-xs">
            Roll Key
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-cyan-400" />
          <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary text-xs text-neutral-300 cursor-pointer">
            <span>Notify me when my purchased projects release updates or new versions</span>
            <input
              type="checkbox"
              checked={notifyReleases}
              onChange={() => setNotifyReleases(!notifyReleases)}
              className="rounded bg-black/40 border-border text-primary"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary text-xs text-neutral-300 cursor-pointer">
            <span>Notify me about critical security patches and dependency vulnerability advisories</span>
            <input
              type="checkbox"
              checked={notifySecurity}
              onChange={() => setNotifySecurity(!notifySecurity)}
              className="rounded bg-black/40 border-border text-primary"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
