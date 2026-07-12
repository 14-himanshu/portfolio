"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/lib/data";
import { architectures } from "@/lib/architecture";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { MagicCard } from "@/components/ui/magic-card";
import ShineBorder from "@/components/ui/shine-border";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const arch = architectures[project.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col rounded-xl overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <ShineBorder 
        className="relative flex h-full w-full flex-col !bg-card text-card-foreground p-0 !overflow-hidden border border-border/50 shadow-md rounded-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        borderRadius={12}
      >
        <MagicCard
          className="flex h-full w-full flex-col !bg-transparent border-none rounded-xl"
          gradientColor="rgba(255,255,255,0.05)"
        >
      {/* Top Image Area */}
      <div className="relative w-full aspect-video bg-muted/30 border-b overflow-hidden flex items-end justify-center pt-8 px-8 pb-0">
        {/* Actual Screenshot */}
        <motion.div
          className="relative w-full h-full rounded-t-xl border-x border-t border-border bg-background shadow-2xl overflow-hidden translate-y-2 group-hover:translate-y-0 transition-transform duration-500 flex flex-col"
          animate={{ opacity: hovered && arch ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* macOS Browser Header */}
          <div className="w-full h-5 bg-muted/50 border-b border-border/50 flex items-center px-2.5 gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
          </div>
          
          <div className="relative w-full flex-grow bg-background">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Architecture Diagram overlay */}
        <AnimatePresence>
          {hovered && arch && (
            <motion.div
              className="absolute inset-0 p-4 bg-background/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArchitectureDiagram data={arch} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint for architecture diagram */}
        {arch && !hovered && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 backdrop-blur text-[9px] font-mono rounded text-muted-foreground border">
            Hover for architecture
          </div>
        )}

        {/* Action Links */}
        <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
           <Link href={project.github} target="_blank" aria-label="View source on GitHub" className="p-2 bg-background/90 backdrop-blur rounded hover:bg-background border transition-colors text-foreground shadow-sm">
             <FaGithub className="w-4 h-4" />
           </Link>
           <Link href={project.link} target="_blank" aria-label="View live project" className="p-2 bg-background/90 backdrop-blur rounded hover:bg-background border transition-colors text-foreground shadow-sm">
             <ExternalLink className="w-4 h-4" />
           </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold tracking-tight mb-2">
          <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-2">
          Read case study <ArrowRight className="ml-1 w-3.5 h-3.5" />
        </Link>
      </div>
        </MagicCard>
      </ShineBorder>
    </motion.div>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<'ai' | 'systems'>('ai');
  
  const aiProjects = projects.filter((p) => p.category === "ai");
  const systemsProjects = projects.filter((p) => p.category === "systems");

  return (
    <section id="projects" className="py-24 border-b border-border/50">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-outfit">Projects</h2>
          <p className="text-muted-foreground max-w-[600px]">
            A collection of my work. Ranging from AI-powered tools to real-time communication platforms and robust backend systems.
          </p>
        </div>
        
        <div className="w-full">
          <div className="flex justify-center mb-12 max-sm:mb-8 max-sm:px-2">
            <div className="w-full max-w-md bg-muted/50 backdrop-blur-lg border border-border/50 grid grid-cols-2 gap-1 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('ai')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'ai'
                    ? 'bg-background text-foreground shadow border border-border/50'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                AI & Agentic Systems
              </button>
              <button
                onClick={() => setActiveTab('systems')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'systems'
                    ? 'bg-background text-foreground shadow border border-border/50'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Full-Stack Engineering
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {(activeTab === 'ai' ? aiProjects : systemsProjects).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

