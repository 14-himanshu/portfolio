import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { resume } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Himanshu Pandey — Resume & CV | Software Engineer",
  description:
    "Download or view the resume of Himanshu Pandey — Software Engineer specialising in React, Next.js, Node.js, and AI integrations. Available for freelance projects and full-time roles.",
  keywords: [
    "Himanshu Pandey resume",
    "Himanshu Pandey CV",
    "Himanshu Pandey software engineer",
    "Himanshu Pandey developer",
    "full-stack developer resume India",
    "Next.js developer resume",
    "React developer resume",
  ],
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Himanshu Pandey — Resume & CV",
    description:
      "Download or view the resume of Himanshu Pandey — Full-stack Software Engineer.",
    url: "https://himanshupandey.me/resume",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const actionClass = cn(
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all active:scale-[0.98]",
);

export default function ResumePage() {
  const pdfSrc = `${resume.href}#view=FitH`;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                actionClass,
                "border border-border/60 bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              Open in new tab
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={resume.href}
              download={resume.fileName}
              className={cn(
                actionClass,
                "bg-primary text-primary-foreground hover:scale-[1.02]",
              )}
            >
              Download PDF
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="container mx-auto flex-1 px-4 py-6 md:py-10">
        <div className="mb-6 space-y-2">
          <p className="text-primary text-xs font-black uppercase tracking-[0.3em]">
            Resume
          </p>
          <h1 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            Himanshu Pandey
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
            Software Engineer — open the PDF below or download a copy for your
            records.
          </p>
        </div>

        {/* Desktop / tablet: inline PDF preview */}
        <div className="glass hidden overflow-hidden rounded-3xl border border-border/40 shadow-2xl md:block">
          <object
            data={pdfSrc}
            type="application/pdf"
            className="h-[calc(100vh-14rem)] min-h-[70vh] w-full bg-background"
            aria-label="Himanshu Pandey resume PDF preview"
          >
            <iframe
              src={pdfSrc}
              title="Himanshu Pandey resume"
              className="h-[calc(100vh-14rem)] min-h-[70vh] w-full bg-background"
            />
          </object>
        </div>

        {/* Mobile: native viewer (iframes often fail on iOS Safari) */}
        <div className="glass flex flex-col items-center rounded-3xl border border-border/40 px-6 py-12 text-center shadow-2xl md:hidden">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/15">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-outfit text-xl font-bold tracking-tight">
            Resume ready to view
          </h2>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
            For the best experience on your phone, open the PDF in your browser
            or save it to your device.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(actionClass, "w-full bg-primary text-primary-foreground")}
            >
              View resume
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={resume.href}
              download={resume.fileName}
              className={cn(
                actionClass,
                "w-full border border-border/60 bg-secondary text-secondary-foreground",
              )}
            >
              Download PDF
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
