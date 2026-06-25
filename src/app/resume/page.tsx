"use client";

import React from "react";
import { BackButton } from "@/components/back-button";
import { Download, ExternalLink } from "lucide-react";
import { resume } from "@/lib/site";

// ── Resume data matching the uploaded PDF ──────────────────────────────────────

const CONTACT = {
  email: "himanshupandey.sde@gmail.com",
  phone: "+91 70785 44148",
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/himanshupandey14/" },
  github: { label: "GitHub", href: "https://github.com/14-himanshu" },
  portfolio: { label: "Portfolio", href: "https://himanshupandey.me" },
};

const SKILLS = {
  "Languages": "JavaScript (ES6+), TypeScript, Python, HTML5, CSS3",
  "Frontend": "React 19, Next.js, Tailwind CSS, Framer Motion, Vite",
  "Backend": "Node.js, Express.js, FastAPI, WebSockets, Prisma ORM, BullMQ, RESTful APIs, Zod",
  "Databases": "MongoDB, PostgreSQL, Redis, MySQL",
  "Infrastructure": "Docker, Vercel, Render, Cloudinary, Git, GitHub",
};

const PROJECTS = [
  {
    title: "CourseSpace",
    subtitle: "Secure E-Learning SaaS Platform",
    date: "Jan 2026",
    stack: "React, Node.js, Express, MongoDB, Zod, Cloudinary",
    live: "https://coursespace-xi.vercel.app/",
    github: "https://github.com/14-himanshu/coursespace",
    bullets: [
      "Hardened API surface with runtime Zod payload validation eliminating NoSQL injection vectors, Helmet security headers, and modular IP rate-limiters; sustained zero security incidents across 500+ course enrollments.",
      "Built a stateless media pipeline (Multer → Cloudinary CDN) and sandboxed YouTube Player iframes to neutralize digital piracy; structured Winston rolling logs for real-time audit trails.",
    ],
  },
  {
    title: "Second Brain",
    subtitle: "AI-Powered Knowledge Workspace",
    date: "Nov 2025",
    stack: "React 19, TypeScript, Node.js, MongoDB, Redis, BullMQ, Groq/OpenAI",
    live: "https://secondbrain-chi.vercel.app/signin",
    github: "https://github.com/14-himanshu/secondbrain-monorepo",
    bullets: [
      "Automated ingestion of articles and YouTube transcripts into a MongoDB Atlas vector index; RAG pipeline via Groq and OpenAI APIs delivers sub-2s context-grounded responses across 1,000+ stored knowledge chunks.",
      "Architected a Redis + BullMQ async queue with freemium billing gates; engineered oEmbed fallback orchestration to bypass data-center IP blocks and streaming 429 rate errors with 100% ingestion success.",
      "Secured multi-tenant data with JWT + Google OAuth 2.0, bcrypt hashing, and Zod schema validation; cross-layer deduplication in the OAuth callback eliminated duplicate account creation entirely.",
    ],
  },
  {
    title: "Webhook Orchestrator",
    subtitle: "Fault-Tolerant Distributed Delivery System",
    date: "June 2026",
    stack: "Next.js, Node.js, Redis, BullMQ, PostgreSQL, Docker",
    live: "https://webhook-orchestrator-one.vercel.app/",
    github: "https://github.com/14-himanshu/webhook-orchestrator",
    bullets: [
      "Engineered a four-tier decoupled webhook delivery system routing 10,000+ payloads/min from serverless Next.js ingestion to stateful Node.js workers via Redis, eliminating cold-start timeout failures entirely.",
      "Guaranteed zero data loss via exponential backoff retries and a PostgreSQL Dead Letter Queue (DLQ); HMAC SHA-256 signature verification and idempotency keys enforced end-to-end payload integrity.",
      "Deployed containerized workers via Docker with token-bucket rate limiters controlling ingestion velocity; architecture sustained sub-200ms delivery p99 under sustained load.",
    ],
  },
];

const EDUCATION = [
  {
    institution: "Newton School of Technology, Rishihood University",
    detail: "B.Tech in Computer Science & Data Science",
    year: "2024 – 2028",
  },
  {
    institution: "Kendriya Vidyalaya Almora",
    detail: "Intermediate (Class XII), Grade: 87.0%",
    year: "2022 – 2023",
  },
  {
    institution: "Holy Angel Public School",
    detail: "Matriculation (Class X), Grade: 90.0%",
    year: "2020 – 2021",
  },
];

const CERTIFICATIONS = [
  {
    title: "Google AI Essentials Specialization | Google",
    date: "Jun 2026",
    bullets: [
      "Completed a rigorous 5-course curriculum covering advanced prompt engineering frameworks, productivity optimization, and responsible AI architectures.",
      "Mastered practical generative AI strategies to accelerate software development workflows, automate data-driven problem solving, and mitigate algorithmic bias.",
    ],
  },
];

const ACHIEVEMENTS = [
  "LeetCode: Developing algorithmic proficiency by actively practicing core patterns and data structures, including Graphs, Dynamic Programming, Trees, Sliding Window, and Two Pointers.",
  "Portfolio: Engineered himanshupandey.me from scratch — Next.js + Framer Motion, custom HSL design tokens, dark-mode transitions, zero external UI library dependencies.",
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="resume-section-heading">
      <h2>{children}</h2>
      <div className="resume-rule" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* ── Sticky Toolbar ── */}
      <header className="resume-toolbar border-b border-border/40">
        <div className="resume-toolbar-inner max-w-5xl">
          <div className="resume-toolbar-left">
            <BackButton label="Back" href="/" />
          </div>

          <div className="flex-1 flex justify-center">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
              Interactive Resume
            </span>
          </div>

          <div className="resume-toolbar-right">
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-action-btn resume-action-btn--ghost"
              title="Open Original PDF"
            >
              <ExternalLink size={15} />
              <span className="resume-action-label">Open PDF</span>
            </a>
            <a
              href={resume.href}
              download={resume.fileName}
              className="resume-action-btn resume-action-btn--primary"
              title="Download PDF"
            >
              <Download size={15} />
              <span className="resume-action-label">Download</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Beautiful HTML Resume ── */}
      <div className="resume-page-wrapper">
        <div className="resume-document">
          {/* ── Header ── */}
          <div className="resume-header">
            <h1 className="resume-name">Himanshu Pandey</h1>
            <p className="resume-title">Full-Stack Engineer • Building production-grade distributed systems • Open to SDE Internships</p>
            <div className="resume-contact-row">
              <span>{CONTACT.phone}</span>
              <span className="resume-contact-sep">|</span>
              <a href={`mailto:${CONTACT.email}`} className="resume-contact-link">
                {CONTACT.email}
              </a>
              <span className="resume-contact-sep">|</span>
              <a href={CONTACT.linkedin.href} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
                LinkedIn
              </a>
              <span className="resume-contact-sep">|</span>
              <a href={CONTACT.github.href} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
                GitHub
              </a>
              <span className="resume-contact-sep">|</span>
              <a href={CONTACT.portfolio.href} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
                {CONTACT.portfolio.label}
              </a>
            </div>
          </div>

          {/* ── Technical Skills ── */}
          <section className="resume-section">
            <SectionHeading>Technical Skills</SectionHeading>
            <div className="resume-skills-grid">
              {Object.entries(SKILLS).map(([category, items]) => (
                <div key={category} className="resume-skill-row">
                  <span className="resume-skill-label">{category}:</span>
                  <span className="resume-skill-value">{items}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Projects ── */}
          <section className="resume-section">
            <SectionHeading>Projects</SectionHeading>
            {PROJECTS.map((project) => (
              <div key={project.title} className="resume-project">
                <div className="resume-project-header">
                  <div>
                    <span className="resume-project-title">{project.title}</span>
                    <span className="resume-project-subtitle"> — {project.subtitle}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="resume-project-links hidden sm:flex">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="resume-link-pill">
                        GitHub
                      </a>
                      <span className="resume-contact-sep">|</span>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="resume-link-pill">
                        Live Demo
                      </a>
                    </div>
                    <span className="resume-date">{project.date}</span>
                  </div>
                </div>
                <p className="resume-stack">{project.stack}</p>
                <ul className="resume-bullet-list">
                  {project.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Education ── */}
          <section className="resume-section">
            <SectionHeading>Education</SectionHeading>
            {EDUCATION.map((edu) => (
              <div key={edu.institution} className="resume-edu-row">
                <div>
                  <span className="resume-edu-institution">{edu.institution}</span>
                  <p className="resume-edu-detail">{edu.detail}</p>
                </div>
                <span className="resume-date">{edu.year}</span>
              </div>
            ))}
          </section>

          {/* ── Certifications ── */}
          <section className="resume-section">
            <SectionHeading>Certifications</SectionHeading>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className="resume-project">
                <div className="resume-project-header">
                  <div>
                    <span className="resume-project-title">{cert.title}</span>
                  </div>
                  <span className="resume-date">{cert.date}</span>
                </div>
                <ul className="resume-bullet-list mt-2">
                  {cert.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Achievements ── */}
          <section className="resume-section">
            <SectionHeading>Achievements & Coding Profiles</SectionHeading>
            <ul className="resume-bullet-list">
              {ACHIEVEMENTS.map((achievement, i) => {
                const [boldPart, rest] = achievement.split(": ");
                return (
                  <li key={i}>
                    <strong>{boldPart}:</strong> {rest}
                  </li>
                );
              })}
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
