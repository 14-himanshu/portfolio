import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";
import Image from "next/image";

export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <main className="min-h-screen pb-24">
      <section className="relative overflow-hidden pt-8 pb-14">
        <div className="container px-4 mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center mt-8">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Case Study
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.92]">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
                  {project.caseStudy.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-secondary/70 text-secondary-foreground text-xs font-bold uppercase tracking-[0.2em] border border-border/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={project.link}
                  target="_blank"
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-primary text-primary-foreground transition-all duration-300",
                    "hover:scale-[1.02] active:scale-[0.98]",
                  )}
                >
                  Open Live App
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href={project.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-secondary text-secondary-foreground border border-border/60 transition-all duration-300 hover:bg-secondary/80 active:scale-[0.98]"
                >
                  View Source
                  <FaGithub className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-border/60 bg-background/60 px-4 py-4 text-sm font-medium text-muted-foreground shadow-sm"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-primary/10 blur-3xl opacity-60" />
              <div className="relative aspect-2/1 overflow-hidden rounded-[2.5rem] border border-border/40 shadow-2xl bg-background/80">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 mx-auto space-y-8">
        {project.caseStudy.sections.map((section) => (
          <article
            key={section.title}
            className="glass rounded-[2.25rem] border border-border/40 p-7 md:p-10 shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-outfit tracking-tight mb-5">
              {section.title}
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-6 grid gap-3">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-muted-foreground"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.quote && (
              <blockquote className="mt-6 rounded-4xl border border-primary/10 bg-primary/5 p-6 text-lg text-foreground leading-relaxed">
                {section.quote}
              </blockquote>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
