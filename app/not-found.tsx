import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <Badge variant="technical">ERROR // 404_NULL_REFERENCE</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Experiment Not Found
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          The requested codebase or laboratory experiment may have moved, been archived, or never existed in this dimension.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/projects">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Projects
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Return Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
