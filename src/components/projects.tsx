"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4"
          >
            Proof of Work
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.95] mb-6">
            Case studies that <br />
            <span className="text-muted-foreground">
              show the full product story.
            </span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Three representative builds from my portfolio: one focused on
            AI-powered knowledge management, one on real-time communication, and
            one on AI-assisted portfolio review.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group relative bg-transparent"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_0.95fr] items-stretch gap-6 rounded-3xl border border-border/30 overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                  <div className="p-6 md:p-8 flex flex-col justify-between bg-background/5">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-bold font-outfit tracking-tight text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                          <Link
                            href={project.github}
                            target="_blank"
                            className="p-2 rounded-lg bg-foreground/6 hover:bg-foreground/10 transition"
                          >
                            <FaGithub className="w-5 h-5 text-muted-foreground" />
                          </Link>
                          <Link
                            href={project.link}
                            target="_blank"
                            className="p-2 rounded-lg bg-foreground/6 hover:bg-foreground/10 transition"
                          >
                            <ExternalLink className="w-5 h-5 text-muted-foreground" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-primary/5 text-primary/70 text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {"highlights" in project &&
                        Array.isArray(project.highlights) && (
                          <ul className="mt-6 space-y-2 text-muted-foreground">
                            {project.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                <span className="text-sm">{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                      >
                        Read case study
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex items-center justify-center bg-linear-to-br from-background/0 via-background/5 to-background/0">
                    <div className="w-full relative transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="w-full rounded-2xl border border-border/40 shadow-lg overflow-hidden bg-black/5">
                        <div className="flex items-center gap-3 px-3 py-2 bg-background/90 border-b border-border/30">
                          <span className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="w-3 h-3 rounded-full bg-yellow-400" />
                          <span className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="relative w-full aspect-2/1 overflow-hidden bg-background/80">
                          <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-contain object-center transition-transform duration-700 will-change-transform group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
