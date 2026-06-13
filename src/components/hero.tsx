"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { resume } from "@/lib/site"

export function Hero() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center overflow-hidden pt-20 px-4"
    >
      {/* 1. Background Layer (z-0) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* 2. Main Content Container (z-10) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto relative z-10 text-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Open for Projects
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-outfit tracking-tighter leading-[0.9] mb-10"
        >
          Engineering <span className="text-gradient">complete</span> <br />
          systems.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed font-medium"
        >
          Hi, I&apos;m <span className="text-foreground font-bold">Himanshu Pandey</span>. 
          I build AI-integrated backends, real-time communication layers, and 
          production SaaS products — end to end.
        </motion.p>

        {/* CTAs (z-20 for click priority) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-6"
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
      </div>

      {/* 3. Scroll Indicator (Separated in flow to prevent overlap) */}
      <div className="h-24 flex items-center justify-center relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/30">Scroll</span>
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
