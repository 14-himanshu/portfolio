"use client"

import { motion } from "framer-motion"
import { skills } from "@/lib/data"
import { Cpu, Layout, ShieldCheck, Zap } from "lucide-react"

const skillCategories = [
  { name: "Frontend", icon: Layout, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", icon: Cpu, skills: ["Node.js", "PostgreSQL", "Prisma", "Python", "Redis"] },
  { name: "Infrastructure", icon: ShieldCheck, skills: ["Docker", "AWS", "Git", "CI/CD", "Vercel"] },
]

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mb-24 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6"
          >
            <Zap className="w-3 h-3" />
            Core Stack
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.95] mb-8">
            The weaponry I use <br />
            <span className="text-muted-foreground">to build the web.</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-xl mx-auto">
            A high-performance toolkit curated for speed, reliability, 
            and modern engineering standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border border-border/40 hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <cat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-6 tracking-tight">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-background border border-border/60 rounded-xl text-sm font-medium hover:border-primary/30 hover:shadow-sm transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Simple Marquee for all skills */}
        <div className="mt-24 pt-12 border-t border-border/40 overflow-hidden relative">
          <div className="flex gap-20 animate-marquee whitespace-nowrap">
            {[...skills, ...skills].map((skill, i) => (
              <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-muted-foreground/10 hover:text-primary/20 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
