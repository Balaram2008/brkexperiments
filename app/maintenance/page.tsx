import React from "react";
import Link from "next/link";
import { Atom } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function MaintenancePage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary-light mx-auto animate-pulse">
          <Atom className="h-8 w-8" />
        </div>
        <Badge variant="experiment">SYS // LAB MAINTENANCE</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Running an Experiment
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          BRKExperiments is currently upgrading database schemas and deploying low-latency telemetry nodes.
          Please check back in a few minutes.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="outline">Refresh Status</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
