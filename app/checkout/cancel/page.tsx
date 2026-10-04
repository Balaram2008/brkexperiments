import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-bold text-white">Payment Cancelled</h1>
        <p className="text-xs text-neutral-400">
          The transaction was interrupted or cancelled. No charges were made to your account.
        </p>

        <div className="flex flex-col gap-2 pt-2">
          <Link href="/projects">
            <Button className="w-full">Return to Projects Catalog</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="w-full">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
