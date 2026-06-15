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
  "Backend": "Node.js, Express.js, FastAPI, RESTful APIs, WebSockets (ws), Prisma ORM",
  "Databases": "MongoDB, PostgreSQL, MySQL",
  "Tools": "Git, GitHub, Cloudinary, Vercel, Render, Postman, Zod",
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
      "Built a secure course platform with runtime Zod payload validation eliminating NoSQL injection vulnerabilities, plus Helmet headers and modular IP rate-limiters to harden against DDoS/brute-force.",
      "Mitigated digital piracy risks by sandboxing YouTube Player APIs in custom iframes; built a stateless media pipeline with Multer → Cloudinary CDN and rolling file-system logging via Winston.",
    ],
  },
  {
    title: "Second Brain",
    subtitle: "AI-Powered Knowledge Workspace",
    date: "Nov 2025",
    stack: "React, Node.js, MongoDB, Redis, Groq/OpenAI APIs",
    live: "https://secondbrain-chi.vercel.app/signin",
    github: "https://github.com/14-himanshu/secondbrain-monorepo",
    bullets: [
      "Built a production-ready knowledge hub automating ingestion of articles and YouTube transcripts into a MongoDB vector index for context-grounded RAG chat via Groq and OpenAI APIs.",
      "Designed an async queue system using Redis + BullMQ with a freemium conversion funnel enforcing custom billing blocks for free-tier users.",
      "Bypassed strict data-center IP blocks and 429 rate errors from streaming platforms by engineering an automated fallback orchestration pipeline using public oEmbed APIs.",
      "Secured multi-user data with JWT + Google OAuth 2.0, Zod schema validation, and bcrypt hashing; extended OAuth callback to eliminate duplicate account bugs via cross-layer lookups.",
    ],
  },
  {
    title: "Slate",
    subtitle: "Real-Time Collaborative Chat Platform",
    date: "Apr 2025",
    stack: "React 19, Node.js, WebSockets, MongoDB, Cloudinary, Vite",
    live: "https://slate-project.vercel.app/",
    github: "https://github.com/14-himanshu/slate",
    bullets: [
      "Developed a low-latency multi-room WebSocket server sustaining 100+ simultaneous connections with optimistic UI updates achieving sub-100ms perceived message latency.",
      "Implemented full message lifecycle — typing indicators, inline replies, presence tracking, edits, soft-deletes — synchronized in real time across room-scoped client maps.",
      "Reduced initial JavaScript payload by 30% via Vite code-splitting and lazy-route evaluation; secured WebSocket upgrades with JWT handshake validation and ownership authorization.",
    ],
  },
];

const EDUCATION = [
  {
    institution: "Newton School of Technology, Rishihood University",
    detail: "Bachelor of Technology (Data Science)",
    year: "2024 – 2028",
  },
  {
    institution: "Kendraya Vidyalaya Almora",
    detail: "Intermediate (Class XII), Grade: 87.0%",
    year: "2022 – 2023",
  },
  {
    institution: "Holy Angel Public School",
    detail: "Matriculation (Class X), Grade: 90.0%",
    year: "2020 – 2021",
  },
];

const ACHIEVEMENTS = [
  "LeetCode: Solved challenges spanning Graphs, DP, Trees, Sliding Window, and Two Pointers; competes in weekly timed contests to sharpen algorithmic speed and pattern recognition.",
  "Portfolio: Built himanshupandey.me from scratch using Next.js + Framer Motion with custom HSL design tokens, dark-mode transitions, and zero external UI library dependencies.",
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
            <p className="resume-title">Specializing in Full-Stack Development and Data Science • Open to SDE Internships</p>
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
