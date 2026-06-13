"use client"

import { motion } from "framer-motion"
import { experience } from "@/lib/data"
import { Milestone, Terminal } from "lucide-react"

export function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2" />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-xs mb-4"
          >
            <Milestone className="w-4 h-4" />
            Engineering Journey
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.95] mb-6">
            How I got <br />
            <span className="text-muted-foreground">here.</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            No bootcamp. No computer science degree shortcuts. Just building harder 
            things until easier things felt obvious.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-border to-transparent" />
          
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-24 md:pl-32 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-8 top-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-background border border-border z-10 shadow-xl group-hover:border-primary/50 transition-colors duration-500">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              
              <div className="glass p-8 md:p-12 rounded-[2rem] border border-border/40 hover:border-primary/20 transition-all duration-500 group-hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    {/* Period shown first in mono — honest timestamp, not a fake company name */}
                    <p className="text-xs font-mono text-primary/70 uppercase tracking-widest mb-2">
                      {item.company}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold font-outfit tracking-tight group-hover:text-primary transition-colors duration-500">
                      {item.role}
                    </h3>
                  </div>
                  <div className="inline-flex px-4 py-2 rounded-xl bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10 self-start whitespace-nowrap">
                    {item.duration}
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
