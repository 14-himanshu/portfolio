"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { resume } from "@/lib/site"

export function Hero() {
  return (
    <section
      id="home"
      className="w-full flex justify-center py-5 pt-36 md:pt-48 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl flex flex-col items-center px-4"
      >
        <div className="mb-6 flex items-center justify-center">
          <div className="relative w-20 h-20 rounded-full border border-border shadow-sm overflow-hidden">
            <Image 
              src="https://github.com/14-himanshu.png" 
              alt="Himanshu Pandey"
              fill
              priority
              sizes="80px"
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl md:text-[2.5rem] font-bold tracking-tight mb-6 text-foreground font-outfit">
            Hi, I&apos;m Himanshu Pandey
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto mb-6 font-medium">
            20, I build systems that think, scale, and ship. Full-stack engineer deep into AI-integrated backends, real-time layers, and production SaaS products. Still chasing mastery.
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
            If you’re working on something real, let’s talk.
          </p>

          <div className="flex items-center justify-center gap-2.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-muted-foreground">Currently: Building AI-integrated backends</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Link
            href="#projects"
            className="px-6 py-2.5 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors text-sm"
          >
            Explore my work
          </Link>
          <Link
            href={resume.viewPath}
            target="_blank"
            className="px-6 py-2.5 bg-background text-foreground border border-border rounded-lg font-medium hover:bg-muted transition-colors text-sm"
          >
            View resume
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
