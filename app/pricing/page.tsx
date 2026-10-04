import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function PricingPage() {
  const tiers = [
    {
      name: "Per-Project Individual",
      tagline: "For individual engineers, researchers, and students.",
      price: "?999 ? ?3,499",
      billing: "per project / perpetual",
      features: [
        "Full unminified source code repository",
        "Setup instructions & architecture documentation",
        "Single developer personal / commercial deployment",
        "Lifetime updates and patches in your dashboard",
        "Community GitHub / Discord support",
      ],
      cta: "Browse Marketplace",
      href: "/projects",
      popular: false,
    },
    {
      name: "Builder All-Access Pass",
      tagline: "For active builders wanting unlimited laboratory access.",
      price: "?9,999",
      billing: "one-time payment / lifetime",
      features: [
        "Access to all 16+ current projects and source archives",
        "Automatic unlock for all future releases for 1 full year",
        "Multi-seat commercial usage (up to 5 team members)",
        "Priority architectural support & roadmap input",
        "Private VIP Discord lab channel access",
        "Verified Purchaser commercial certificate",
      ],
      cta: "Get Lifetime Pass",
      href: "/projects",
      popular: true,
    },
    {
      name: "Enterprise Lab License",
      tagline: "For companies requiring dedicated IP transfer and consulting.",
      price: "Custom",
      billing: "per enterprise agreement",
      features: [
        "Unrestricted unlimited organization-wide deployment",
        "Custom feature adaptation & private repository forks",
        "Dedicated engineer onboarding call (4 hours)",
        "SOC2 & tamper-proof audit compliance packages",
        "SLA-backed direct email & Slack support",
      ],
      cta: "Contact Enterprise",
      href: "/contact",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="technical">LICENSING & PRICING</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple, transparent licensing.
        </h1>
        <p className="text-base text-neutral-400">
          No recurring surprise subscriptions. Buy the project, own the code, build your product.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tiers.map((t, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 ${
              t.popular
                ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(124,58,237,0.2)] ring-1 ring-primary/40 relative"
                : "border-white/10 bg-[#0B0B0D] hover:border-white/20"
            }`}
          >
            {t.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                RECOMMENDED
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">{t.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{t.tagline}</p>
              </div>

              <div className="border-y border-white/5 py-4">
                <span className="text-3xl font-extrabold text-white font-mono">{t.price}</span>
                <span className="text-xs font-mono text-neutral-500 block mt-1">{t.billing}</span>
              </div>

              <ul className="space-y-3">
                {t.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link href={t.href}>
                <Button
                  className="w-full"
                  variant={t.popular ? "default" : "outline"}
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 text-center max-w-3xl mx-auto space-y-3">
        <h3 className="text-lg font-bold text-white">Need a specific customization or invoice?</h3>
        <p className="text-xs text-neutral-400 leading-relaxed">
          We support official GST invoicing for Indian companies and international wire transfers.
          Reach out directly to discuss customized requirements.
        </p>
        <Link href="/contact" className="inline-block pt-2">
          <Button variant="outline" size="sm">Talk to Engineering Team</Button>
        </Link>
      </div>
    </div>
  );
}
