"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Workflow, BrainCircuit, ShieldCheck, MessageSquare, TerminalSquare } from "lucide-react";
import { MouseEvent } from "react";

type ProjectMeta = {
  icon: any;
  color: string;
  gradient: string;
};

const projectMetadata: Record<string, ProjectMeta> = {
  "webhook-orchestrator": {
    icon: Workflow,
    color: "#c084fc", // Purple
    gradient: "from-purple-500/20 to-fuchsia-500/20",
  },
  "second-brain": {
    icon: BrainCircuit,
    color: "#34d399", // Emerald
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  "slate": {
    icon: MessageSquare,
    color: "#60a5fa", // Blue
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  "devscope": {
    icon: TerminalSquare,
    color: "#fbbf24", // Amber
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  "coursespace": {
    icon: ShieldCheck,
    color: "#f472b6", // Pink
    gradient: "from-pink-500/20 to-rose-500/20",
  },
};

export function ProgrammaticCover({ slug, title }: { slug: string; title: string }) {
  const meta = projectMetadata[slug] || projectMetadata["webhook-orchestrator"];
  const Icon = meta.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group/cover relative w-full h-full overflow-hidden bg-background flex items-center justify-center cursor-default"
      onMouseMove={handleMouseMove}
    >
      {/* Dark Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at center, var(--foreground) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Subtle base glow */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${meta.color} 0%, transparent 60%)`
        }}
      />

      {/* Mouse Tracking Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/cover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              ${meta.color}20,
              transparent 80%
            )
          `,
        }}
      />

      {/* Centerpiece Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-700 group-hover/cover:scale-105">
        <div
          className={`p-7 rounded-3xl bg-gradient-to-br ${meta.gradient} border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden`}
          style={{ boxShadow: `0 0 80px -20px ${meta.color}60` }}
        >
          {/* Inner glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
          <Icon className="w-20 h-20 relative z-10" style={{ color: meta.color }} strokeWidth={1.5} />
        </div>
      </div>

      {/* Typography Overlay */}
      <div className="absolute top-6 left-6 flex items-center gap-2.5 transition-transform duration-500 group-hover/cover:translate-x-1">
        <Icon className="w-5 h-5" style={{ color: meta.color }} strokeWidth={2} />
        <span className="font-outfit font-bold tracking-wide text-foreground/90 text-sm">{title}</span>
      </div>
    </div>
  );
}
