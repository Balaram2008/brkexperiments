"use client";

import React, { useState } from "react";
import { Check, User, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Arjun Sharma");
  const [email, setEmail] = useState(user?.email || "builder@brkexperiments.dev");
  const [bio, setBio] = useState("Full-stack engineer building AI workflows and hardware prototypes.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Builder Profile</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Manage your personal details, developer identity, and credentials.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6">
        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
              Full Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
              Email Address
            </label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
              Engineering Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-secondary p-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                <Check className="h-3.5 w-3.5" />
                <span>Saved successfully</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
