"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";
import Image from "next/image";
import { architectures } from "@/lib/architecture";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { BackButton } from "@/components/back-button";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const [showArch, setShowArch] = useState(false);
  const arch = architectures[project.slug];

  return (
    <main className="min-h-screen pb-24 border-t border-border/50">
      <section className="pt-12 pb-14">
        <div className="container px-4 mx-auto max-w-5xl">
          <BackButton label="Back to projects" href="/#projects" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start mt-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold font-outfit tracking-tight">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                  {project.caseStudy.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={project.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-foreground text-background text-sm transition-colors hover:bg-foreground/90"
                >
                  Visit Live
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={project.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-secondary text-secondary-foreground text-sm border border-border/50 hover:bg-secondary/80 transition-colors"
                >
                  Source Code
                  <FaGithub className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/50">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: screenshot + architecture diagram toggle ─────────── */}
            <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden">
              {/* Toggle bar — only shown when a diagram exists */}
              {arch && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-muted/30 border-b border-border/30">
                  <button
                    onClick={() => setShowArch(false)}
                    className={cn(
                      "flex-1 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-colors",
                      !showArch
                        ? "bg-background text-foreground shadow-sm border border-border/50"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowArch(true)}
                    className={cn(
                      "flex-1 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-colors",
                      showArch
                        ? "bg-background text-foreground shadow-sm border border-border/50"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Architecture
                  </button>
                </div>
              )}

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/10">
                {/* Screenshot */}
                <motion.div
                  className="absolute inset-0 p-4"
                  animate={{ opacity: showArch ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/40 shadow-sm">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-top"
                    />
                  </div>
                </motion.div>

                {/* Architecture diagram — mounts fresh each time tab is activated */}
                <AnimatePresence>
                  {showArch && arch && (
                    <motion.div
                      key={`arch-cs-${project.slug}`}
                      className="absolute inset-0 p-4 bg-background"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArchitectureDiagram data={arch} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case study body ─────────────────────────────────────────────── */}
      <section className="container px-4 mx-auto max-w-5xl mt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 items-start">
          
          {/* ── Mini-Map (Sticky Sidebar) ── */}
          <aside className="sticky top-24 hidden md:block">
            <nav className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                On this page
              </span>
              {project.caseStudy.sections.map((section) => {
                const id = section.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link 
                    key={`nav-${id}`}
                    href={`#${id}`}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {section.title}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* ── Main Content ── */}
          <div className="space-y-16 max-w-3xl">
            {project.caseStudy.sections.map((section) => {
              const id = section.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <article
                  key={section.title}
                  id={id}
                  className="space-y-4 scroll-mt-24"
                >
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.code && (
                    <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground whitespace-pre">
                      <code>{section.code}</code>
                    </pre>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 grid gap-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm md:text-base text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                          <span className="whitespace-pre-line">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.quote && (
                    <blockquote className="mt-6 border-l-2 border-primary/40 pl-4 text-base italic text-muted-foreground">
                      &quot;{section.quote}&quot;
                    </blockquote>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
