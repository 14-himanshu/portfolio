"use client"

import { motion } from "framer-motion"
import { Brain, Cpu, Layout, Layers } from "lucide-react"

// ── Only tech that is ACTUALLY used in at least one shipped project ──────────
const skillCategories = [
  {
    name: "Frontend",
    icon: Layout,
    description: "UI layer across all four projects",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    name: "Backend & Systems",
    icon: Cpu,
    description: "APIs, queues, and real-time layers",
    skills: ["Node.js", "Express", "FastAPI", "BullMQ", "Redis", "WebSocket (ws)"],
  },
  {
    name: "AI & Data",
    icon: Brain,
    description: "Pipelines built across Second Brain & DevScope",
    skills: ["LangGraph", "LangChain", "Groq", "OpenAI", "Vector Embeddings", "RAG"],
  },
  {
    name: "Infrastructure",
    icon: Layers,
    description: "Storage, delivery, payments, and deployment",
    skills: ["MongoDB", "Cloudinary", "Razorpay", "Vercel", "Render", "Git"],
  },
]

// The marquee shows the genuinely unusual picks — not the generic ones everyone lists
const unusualTech = [
  "BullMQ", "LangGraph", "Vector Search", "RAG", "oEmbed Fallback",
  "Razorpay", "ws (raw WebSocket)", "Groq", "Puppeteer", "MongoDB Atlas",
]

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-xs mb-4"
          >
            <Layers className="w-4 h-4" />
            Core Stack
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.95] mb-6">
            Tools I&apos;ve shipped <br />
            <span className="text-muted-foreground">real products with.</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Everything listed here is backed by a shipped project — not a tutorial or a certificate.
            The unusual choices (LangGraph, BullMQ, raw WebSocket) are intentional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-8 rounded-[2.5rem] border border-border/40 hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <cat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground/60 font-mono mt-1">{cat.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-background border border-border/60 rounded-xl text-sm font-medium hover:border-primary/30 hover:shadow-sm transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Marquee — shows the UNUSUAL stack choices, not the generic ones */}
        <div className="mt-20 pt-12 border-t border-border/40 overflow-hidden relative">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40 mb-6">
            The non-obvious choices ↓
          </p>
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...unusualTech, ...unusualTech].map((tech, i) => (
              <span
                key={i}
                className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-muted-foreground/8 hover:text-primary/15 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
