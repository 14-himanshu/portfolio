import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ScrollToTop } from "@/components/scroll-to-top";
import dynamic from "next/dynamic";
import { resume } from "@/lib/site";


// Loading skeleton shared across all below-the-fold sections
function SectionSkeleton() {
  return (
    <div className="py-32 container px-4 mx-auto">
      <div className="h-12 w-64 rounded-2xl bg-muted/30 animate-pulse mb-8" />
      <div className="space-y-4">
        <div className="h-6 w-full rounded-xl bg-muted/20 animate-pulse" />
        <div className="h-6 w-5/6 rounded-xl bg-muted/20 animate-pulse" />
        <div className="h-6 w-4/6 rounded-xl bg-muted/20 animate-pulse" />
      </div>
    </div>
  );
}

// Dynamically import below-the-fold components to reduce initial JavaScript payload
const Experience = dynamic(
  () => import("@/components/experience").then((mod) => mod.Experience),
  { loading: () => <SectionSkeleton /> }
);
const Projects = dynamic(
  () => import("@/components/projects").then((mod) => mod.Projects),
  { loading: () => <SectionSkeleton /> }
);
const Skills = dynamic(
  () => import("@/components/skills").then((mod) => mod.Skills),
  { loading: () => <SectionSkeleton /> }
);
const Contact = dynamic(
  () => import("@/components/contact").then((mod) => mod.Contact),
  { loading: () => <SectionSkeleton /> }
);

export default function Home() {
  return (
    <main className="min-h-screen space-y-24 pb-24">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />

      <footer className="w-full py-10 border-t border-border/50">
        <div className="w-full flex flex-col items-center justify-center gap-3">

          {/* Row 1 — Resume links */}
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-foreground/70">
            <a
              href={resume.viewPath}
              className="hover:text-primary transition-colors"
            >
              View resume
            </a>
            <span className="text-border/40 text-[10px]">&#9679;</span>
            <a
              href={resume.href}
              download={resume.fileName}
              className="hover:text-primary transition-colors"
            >
              Download PDF
            </a>
          </div>

          {/* Row 2 — Social + copyright */}
          <div className="flex items-center justify-center gap-5 text-xs font-mono text-muted-foreground/40">
            <a
              href="https://github.com/14-himanshu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <span className="text-border/30 text-[10px]">&#9679;</span>
            <a
              href="https://www.linkedin.com/in/himanshupandey14/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-border/30 text-[10px]">&#9679;</span>
            <span>Himanshu Pandey &copy; {new Date().getFullYear()}</span>
          </div>

        </div>
      </footer>


      {/* Floating scroll-to-top button */}
      <ScrollToTop />
    </main>
  );
}
