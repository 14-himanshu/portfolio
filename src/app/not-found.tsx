"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-left space-y-6">
        <h1 className="text-xl font-bold font-mono tracking-tight text-foreground">
          404: Route not found
        </h1>
        <p className="text-muted-foreground text-sm font-mono leading-relaxed">
          The requested path does not exist in the current environment. 
          It may have been moved, or you might have typed the URL incorrectly.
        </p>
        
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-md font-mono text-xs hover:bg-secondary/80 transition-colors border border-border/50"
          >
            <span className="text-primary font-black">{">"}</span> cd .. (Return Home)
          </Link>
        </div>
      </div>
    </main>
  );
}
