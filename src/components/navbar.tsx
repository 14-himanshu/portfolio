"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Briefcase, Code, Layers, Mail, Moon, Sun } from "lucide-react"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LiveVisitors } from "@/components/live-visitors"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Skills", href: "#skills", icon: Layers },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("Home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = navItems.map(item => item.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 150) {
          setActiveItem(navItems.find(i => i.href === `#${section}`)?.name || "Home")
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-[2.5rem] border transition-all duration-500 glass pointer-events-auto",
          scrolled ? "scale-95 translate-y-[-5px]" : "scale-100"
        )}
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.name
            return (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "relative p-2.5 rounded-full transition-all duration-300 group",
                  isActive ? "bg-primary/5 dark:bg-primary/10" : "hover:bg-primary/5"
                )}
              >
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} 
                />
                
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}

                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute -bottom-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] rounded-xl pointer-events-none whitespace-nowrap z-[110] shadow-2xl"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </div>

        <div className="w-[1px] h-6 bg-border/50 mx-2" />

        <div className="flex items-center gap-1">
          <Link
            href="https://github.com/14-himanshu"
            target="_blank"
            aria-label="GitHub profile"
            className="p-2.5 hover:bg-primary/5 rounded-full transition-all group"
          >
            <FaGithub className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/himanshupandey14/"
            target="_blank"
            aria-label="LinkedIn profile"
            className="p-2.5 hover:bg-primary/5 rounded-full transition-all group"
          >
            <FaLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className="p-2.5 hover:bg-primary/5 rounded-full transition-all group"
          >
            {!mounted ? (
              <span className="w-5 h-5 block" />
            ) : currentTheme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>
        </div>

        <div className="w-[1px] h-6 bg-border/50 mx-1" />
        <div>
          <LiveVisitors />
        </div>
      </motion.div>
    </nav>
  )
}
