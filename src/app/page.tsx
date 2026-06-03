import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import dynamic from 'next/dynamic';

// Dynamically import below-the-fold components to reduce initial JavaScript payload
const Experience = dynamic(() => import("@/components/experience").then(mod => mod.Experience));
const Projects = dynamic(() => import("@/components/projects").then(mod => mod.Projects));
const Skills = dynamic(() => import("@/components/skills").then(mod => mod.Skills));
const Contact = dynamic(() => import("@/components/contact").then(mod => mod.Contact));
import { resume } from "@/lib/site";

export default function Home() {
  return (
    <main className="min-h-screen space-y-24 pb-24">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      
      <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
        <div className="container px-4 space-y-3">
          <p>
            <a
              href={resume.viewPath}
              className="font-bold text-foreground/80 hover:text-primary transition-colors"
            >
              View resume
            </a>
            <span className="mx-2 text-border">·</span>
            <a
              href={resume.href}
              download={resume.fileName}
              className="font-bold text-foreground/80 hover:text-primary transition-colors"
            >
              Download PDF
            </a>
          </p>
          <p>© {new Date().getFullYear()} Himanshu Pandey. Built with passion using Next.js & Framer Motion.</p>
        </div>
      </footer>
    </main>
  );
}
