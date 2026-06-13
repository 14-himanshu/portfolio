"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
}

/**
 * A reliable back button that uses browser history (router.back()) instead of
 * href-based navigation. Avoids two common Next.js App Router issues:
 * 1. Hash navigation race conditions when the target section is dynamically imported
 * 2. z-index interception when fixed navbars overlap Link elements
 *
 * Falls back to `fallbackHref` when there is no browser history
 * (e.g., the user opened the page directly in a new tab).
 */
export function BackButton({
  label = "Back",
  fallbackHref = "/",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
