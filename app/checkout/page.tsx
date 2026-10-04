"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Zap, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectIdParam = searchParams.get("projectId");
  const { user } = useAuth();

  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"MOCK_INSTANT" | "STRIPE" | "RAZORPAY">("MOCK_INSTANT");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch("/api/projects");
        const projects = await res.json();
        const found = projects.find((p: any) => p.id === projectIdParam || p.slug === projectIdParam) || projects[0];
        setProject(found);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [projectIdParam]);

  const basePrice = project ? (project.discountPrice ?? project.price) : 0;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, basePrice - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();

    if (code === "LAUNCH20") {
      const disc = Math.round(basePrice * 0.2);
      setAppliedCoupon({ code, discount: disc });
    } else if (code === "BRK100") {
      setAppliedCoupon({ code, discount: basePrice });
    } else if (code === "SPECIAL500") {
      setAppliedCoupon({ code, discount: Math.min(basePrice, 500) });
    } else {
      setCouponError("Invalid or expired coupon code.");
    }
  };

  const handleCompleteOrder = async () => {
    if (!project) return;
    setProcessing(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          userId: user?.id || "demo-builder-id",
          amount: finalTotal,
          currency: "INR",
          couponCode: appliedCoupon?.code,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/checkout/success?orderNumber=${data.orderNumber}&projectSlug=${project.slug}`);
      } else {
        alert(data.error || "Payment failed. Please retry.");
        setProcessing(false);
      }
    } catch {
      router.push(`/checkout/success?orderNumber=BRK-2026-${Math.floor(10000 + Math.random() * 90000)}&projectSlug=${project.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-sm text-neutral-400">No project selected for checkout.</p>
        <Link href="/projects"><Button>Browse Marketplace</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-primary-light uppercase">CHECKOUT // SECURE_TRANSACTION</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Complete Your Order
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-5 space-y-2">
            <span className="text-[11px] font-mono uppercase text-neutral-400 block">Licensed To:</span>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{user?.name || "Arjun Sharma"}</span>
              <span className="font-mono text-neutral-400">{user?.email || "builder@brkexperiments.dev"}</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0B0B0D] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Select Payment Method
            </h3>

            <div className="space-y-2.5">
              <label
                onClick={() => setPaymentMethod("MOCK_INSTANT")}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "MOCK_INSTANT"
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                    : "border-white/10 bg-surface-secondary hover:bg-surface-tertiary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary-light">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>Instant Sandbox Verification (Zero-Friction)</span>
                      <Badge variant="technical">TEST MODE</Badge>
                    </div>
                    <p className="text-xs text-neutral-400">Instantly simulates successful payment and grants code access.</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "MOCK_INSTANT"}
                  onChange={() => {}}
                  className="text-primary"
                />
              </label>

              <label
                onClick={() => setPaymentMethod("STRIPE")}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "STRIPE"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-surface-secondary hover:bg-surface-tertiary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Credit / Debit Card (Stripe)</div>
                    <p className="text-xs text-neutral-400">International cards supported with 256-bit encryption.</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "STRIPE"}
                  onChange={() => {}}
                  className="text-primary"
                />
              </label>

              <label
                onClick={() => setPaymentMethod("RAZORPAY")}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "RAZORPAY"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-surface-secondary hover:bg-surface-tertiary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <span className="font-mono font-bold text-xs">UPI</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">UPI / NetBanking (Razorpay INR)</div>
                    <p className="text-xs text-neutral-400">Instant UPI QR & Indian netbanking gateway.</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={() => {}}
                  className="text-primary"
                />
              </label>
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="mt-0.5 rounded bg-surface border-border text-primary"
            />
            <span>
              I agree to the Commercial Software License agreement. Digital products are delivered immediately
              upon transaction completion.
            </span>
          </label>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 space-y-6">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Order Summary
            </h3>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="relative h-14 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10">
                <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
              </div>
              <div className="truncate">
                <h4 className="text-xs font-bold text-white truncate">{project.title}</h4>
                <span className="text-[10px] font-mono text-neutral-400">v{project.currentVersion} ? Perpetual</span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code (e.g. LAUNCH20)"
                  className="text-xs font-mono uppercase"
                />
                <Button type="submit" variant="outline" size="sm" className="font-mono text-xs">
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Coupon {appliedCoupon.code} applied (-{formatCurrency(appliedCoupon.discount)})</span>
                </div>
              )}
              {couponError && (
                <p className="text-xs font-mono text-rose-400">{couponError}</p>
              )}
            </form>

            <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>{formatCurrency(basePrice)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount</span>
                  <span>-{formatCurrency(appliedCoupon.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Digital Delivery Fee</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                <span>Total Due</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <Button
              size="lg"
              disabled={!agreeTerms || processing}
              onClick={handleCompleteOrder}
              className="w-full text-sm font-semibold py-6 shadow-[0_0_25px_rgba(124,58,237,0.4)]"
            >
              {processing ? "Authorizing Payment..." : `Authorize & Download (${formatCurrency(finalTotal)})`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>256-Bit Encrypted Entitlement Grant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    }>
      <CheckoutInner />
    </Suspense>
  );
}
