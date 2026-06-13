"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  href: string;
}

/**
 * A reliable back button that uses native Next.js Link navigation.
 * Since all homepage components are statically imported, hash navigation
 * (e.g., /#projects) is now synchronous and guarantees correct scrolling.
 */
export function BackButton({
  label = "Back",
  href = "/",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
