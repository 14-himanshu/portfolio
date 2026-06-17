import { Navbar } from "@/components/navbar";
import { resume } from "@/lib/site";
import { Hero } from "@/components/hero";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Experience } from "@/components/experience";
import { GitGraph } from "@/components/git-graph";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen space-y-16 md:space-y-24 pb-24">
      <Navbar />
      <Hero />
      <GitGraph />
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
