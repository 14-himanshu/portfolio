"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Layout, Layers } from "lucide-react";

const skillCategories = [
  {
    name: "Frontend",
    icon: Layout,
    description: "UI layer across shipped projects",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    name: "Backend",
    icon: Cpu,
    description: "APIs, queues, and real-time layers",
    skills: ["Node.js", "Express", "FastAPI", "BullMQ", "Redis", "WebSocket (ws)"],
  },
  {
    name: "AI & Data",
    icon: Brain,
    description: "Pipelines for agent orchestration",
    skills: ["LangGraph", "LangChain", "Groq", "OpenAI", "Vector Embeddings", "RAG"],
  },
  {
    name: "Infrastructure",
    icon: Layers,
    description: "Delivery and deployment",
    skills: ["MongoDB", "Cloudinary", "Razorpay", "Vercel", "Render", "Git"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-border/50">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="mb-10 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-outfit">Core Stack</h2>
          <p className="text-muted-foreground text-sm max-w-[600px]">
            Tools I&apos;ve shipped real products with. No bootcamp certificates, just intentional choices backed by production code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col p-6 rounded-2xl border border-border/60 bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                  <cat.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.skills.map(skill => (
                  <div key={skill} className="group relative inline-block">
                    <span
                      className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium cursor-help border border-border/50 hover:border-primary/30 transition-colors inline-block"
                    >
                      {skill}
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-foreground text-background text-xs px-2 py-1 rounded shadow-lg z-50 pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground">
                      Experienced in {skill}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
