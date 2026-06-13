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

      <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
        <div className="container px-4 flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-5">
            <a
              href={resume.viewPath}
              className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors"
            >
              View resume
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
            <a
              href={resume.href}
              download={resume.fileName}
              className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors"
            >
              Download PDF
            </a>
          </div>
          <p className="text-muted-foreground/70">
            © {new Date().getFullYear()}{" "}Himanshu Pandey. Built with passion using Next.js &amp; Framer Motion.
          </p>
        </div>
      </footer>

      {/* Floating scroll-to-top button */}
      <ScrollToTop />
    </main>
  );
}
