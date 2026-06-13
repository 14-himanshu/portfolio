"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { resume } from "@/lib/site"

// ── Rotating lines — each one is specific and verifiable ──────────────────────
// Generic portfolios say what they know. This says what they've actually SOLVED.
const technicalFacts = [
  { label: "Bypassed YouTube IP blocks", detail: "oEmbed public-API fallback" },
  { label: "Queue recovery on cold starts", detail: "BullMQ + Redis on Render" },
  { label: "Multi-step agent orchestration", detail: "LangGraph + Groq + FastAPI" },
  { label: "Real-time rooms without Socket.io", detail: "Raw ws + JWT presence" },
  { label: "Hybrid semantic + keyword search", detail: "MongoDB Atlas Vector Index" },
  { label: "SaaS billing funnel in production", detail: "Razorpay + upgrade modal" },
]

// ── Professional dot-grid background ────────────────────────────────────────
// Same visual language as the architecture diagram canvases — fine, subtle,
// reads as "technical" without forming any visible geometric shape.
function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.65" style={{ fill: "var(--primary)", fillOpacity: 0.18 }} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
    </svg>
  )
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(true)
  const [factIndex, setFactIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY <= 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cycle through facts every 3.5s
  useEffect(() => {
    const t = setInterval(() =>
      setFactIndex(i => (i + 1) % technicalFacts.length), 3500)
    return () => clearInterval(t)
  }, [])

  const currentFact = technicalFacts[factIndex]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center overflow-hidden pt-40 md:pt-44 px-4"
    >
      {/* ── Dot grid background (z-0) ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-100">
        <DotGrid />
      </div>

      {/* ── Vignette mask so grid fades at edges ─────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, var(--background) 100%)",
        }}
      />

      {/* ── Soft primary glow centred behind the title (z-0) ─────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[140px] pointer-events-none z-[2]" />

      {/* ── Main content (z-10) ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto relative z-10 text-center">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available · Open to Opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[8.5rem] font-bold font-outfit tracking-tighter leading-[0.9] mb-8"
        >
          Systems that think, <br />
          <span className="text-gradient">scale, and ship.</span>
        </motion.h1>

        {/* Static identity line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed font-medium mb-4"
        >
          Hi, I&apos;m <span className="text-foreground font-bold">Himanshu Pandey</span> —
          full-stack engineer building AI-integrated backends, real-time layers,
          and production SaaS products end to end.
        </motion.p>

        {/* ── Rotating technical fact ───────────────────────────────────── */}
        {/* This is the line that separates "builder" from "lister" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="h-8 mb-10 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-sm"
            >
              <span className="text-primary/40 select-none">$</span>
              <span className="text-foreground/70">{currentFact.label}</span>
              <span className="hidden sm:inline text-primary/30">·</span>
              <span className="hidden sm:inline text-primary/50 text-xs">{currentFact.detail}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#projects"
            className={cn(
              "shimmer group px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black flex items-center gap-3 transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-[0_20px_50px_-20px_oklch(from_var(--primary)_l_c_h_/_0.5)] active:scale-[0.98]"
            )}
          >
            EXPLORE MY WORK
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={resume.viewPath}
            className={cn(
              "px-10 py-5 bg-secondary text-secondary-foreground rounded-2xl font-black border border-border/50 transition-all duration-300 shadow-lg",
              "hover:bg-secondary/80 active:scale-[0.98] flex items-center gap-3"
            )}
          >
            <FileText className="w-5 h-5" />
            VIEW RESUME
          </Link>
        </motion.div>

        {/* ── Tech fingerprint strip ────────────────────────────────────── */}
        {/* The non-obvious stack choices, listed quietly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {["BullMQ", "LangGraph", "Groq", "ws (raw)", "Vector Search", "Razorpay"].map((tech, i) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-muted-foreground/25 uppercase tracking-widest"
            >
              {tech}
              {i < 5 && <span className="ml-5 opacity-40">·</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <div className="h-24 flex items-center justify-center relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/30">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 text-muted-foreground/20" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
