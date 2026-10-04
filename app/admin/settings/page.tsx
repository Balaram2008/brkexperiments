import React from "react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Tag } from "lucide-react";

export const revalidate = 10;

export default async function AdminSettingsPage() {
  const coupons = await prisma.coupon.findMany();

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Platform Configuration & Coupons</h1>
        <p className="text-xs text-neutral-400">Configure promotional discount codes and gateway routing.</p>
      </div>

      {/* Promotional Coupons */}
      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary-light" />
          <h2 className="text-base font-semibold text-white">Active Promotional Coupons</h2>
        </div>

        <div className="space-y-2">
          {coupons.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-3.5 rounded-lg border border-white/5 bg-surface-secondary text-xs"
            >
              <div>
                <span className="font-mono font-bold text-white text-sm mr-2">{c.code}</span>
                <span className="text-neutral-400">
                  {c.discountType === "PERCENTAGE" ? `${c.discountValue}% OFF` : `?${c.discountValue} FLAT OFF`}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-neutral-500">{c.usageCount} redeemed</span>
                <Badge variant={c.active ? "success" : "default"}>{c.active ? "ACTIVE" : "INACTIVE"}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Gateway toggles */}
      <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <h2 className="text-base font-semibold text-white">Payment Gateway Abstraction</h2>
        </div>
        <p className="text-xs text-neutral-400">
          The payment architecture is structured to support multiple pluggable gateways without altering the user checkout interface.
        </p>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary text-neutral-300">
            <span>MOCK INSTANT TEST PROVIDER (Zero Friction)</span>
            <Badge variant="success">ENABLED</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary text-neutral-300">
            <span>STRIPE CHECKOUT API (USD / International)</span>
            <Badge variant="outline">READY / HOOKED</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary text-neutral-300">
            <span>RAZORPAY GATEWAY (INR / UPI / Cards)</span>
            <Badge variant="outline">READY / HOOKED</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
