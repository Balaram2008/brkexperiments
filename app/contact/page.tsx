"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Technical Question");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="technical">COMMUNICATION_CHANNEL</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact Engineering Support
        </h1>
        <p className="text-sm text-neutral-400">
          Questions regarding architecture, enterprise licensing, or technical bug reports?
          Our lab responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-3">
            <Mail className="h-5 w-5 text-primary-light" />
            <h3 className="text-sm font-semibold text-white">Direct Email</h3>
            <p className="text-xs text-neutral-400 font-mono">support@brkexperiments.dev</p>
            <p className="text-xs text-neutral-400 font-mono">enterprise@brkexperiments.dev</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-3">
            <Clock className="h-5 w-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Response Time</h3>
            <p className="text-xs text-neutral-400">Typical response within 2?4 hours during IST / UTC working windows.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-3">
            <MessageSquare className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Office / Lab</h3>
            <p className="text-xs text-neutral-400">BRKExperiments Systems Lab Bengaluru, Karnataka, India</p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#0B0B0D] p-8">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Thank you, {name}. A systems engineer will review your ticket and reply to {email} promptly.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Your Name
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arjun Sharma"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Email Address
                  </label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface-secondary px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-primary"
                >
                  <option value="Technical Question">Technical Question / Architecture</option>
                  <option value="Commercial License">Commercial Licensing & GST Invoice</option>
                  <option value="Download Issue">Download / License Key Assistance</option>
                  <option value="Custom Project">Custom Engineering Request</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry or requirement..."
                  className="w-full rounded-lg border border-border bg-surface-secondary p-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Dispatch Message to Lab
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
