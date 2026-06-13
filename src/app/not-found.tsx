"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";


export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 text-center space-y-8 max-w-xl mx-auto">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10rem] md:text-[14rem] font-black font-outfit tracking-tighter leading-none text-gradient select-none"
        >
          404
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-outfit tracking-tight">
            Page not found
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Looks like this page got lost in the void. Let&apos;s get you back somewhere meaningful.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="shimmer group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-black border border-border/50 transition-all duration-300 hover:bg-secondary/80 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            View Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
