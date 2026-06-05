export type CaseStudySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
  code?: string;
};

export type ProjectCaseStudy = {
  summary: string;
  sections: CaseStudySection[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  highlights: string[];
  caseStudy: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    slug: "second-brain",
    title: "Second Brain",
    description:
      "A full-stack knowledge workspace that captures links, videos, documents, and notes, then turns them into searchable, AI-summarized knowledge with background ingestion and semantic retrieval.",
    image: "/projects/second-brain-preview.png",
    tags: ["React", "Express", "MongoDB", "AI Search"],
    link: "https://secondbrain-chi.vercel.app/signin",
    github: "https://github.com/14-himanshu/secondbrain-monorepo",
    highlights: [
      "AI-assisted summaries",
      "Semantic retrieval with fallback",
      "Background queue processing",
      "Google OAuth",
    ],
    caseStudy: {
      summary:
        "A full-stack personal knowledge workspace featuring automated ingestion workers, hybrid semantic search, context-grounded AI synthesis (RAG), and a subscription-based upgrade funnel.",
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "Second Brain is a decentralized cognitive extension for modern professionals, developers, and researchers. Built on a modular monorepo architecture, the application aggregates scattered bookmarks, articles, tweets, documents, and transcripts into a unified portal.",
            "By utilizing vector database indexes, it creates a personal semantic web of knowledge—allowing users to search their memories, generate automated AI summaries, and converse with their database through a context-grounded AI assistant.",
          ],
        },
        {
          title: "Problem Statement",
          paragraphs: [
            "With the explosion of daily digital consumption, users suffer from information fragmentation. Bookmarks get lost in browser folders, articles sit unread, and videos lack text searchability.",
            "Moreover, engineering a unified knowledge capture system poses severe technical challenges:",
          ],
          bullets: [
            "Scraper Blockades: Major platforms (like YouTube, Google, and Notion) block standard data center IP addresses (Render, AWS, Vercel) with captchas and 429 errors.",
            "Credit Consumption & Quotas: Synthesizing deep AI insights is expensive; without strict conversion funnels, manual extraction costs can scale unsustainably.",
            "Account Duplication: Users signing up via email/password often create duplicate accounts when later attempting to authenticate via Google OAuth.",
          ],
        },
        {
          title: "The Goal",
          paragraphs: [
            "To build a resilient, secure personal knowledge system with zero capture friction. The platform must automate ingestion (scraping pages, downloading video transcripts), support fast semantic vector query lookups, and feature a robust conversion funnel that restricts free users to a monthly quota while providing a seamless upgrade route to Pro.",
          ],
        },
        {
          title: "Key Features",
          paragraphs: [
            "Second Brain is packed with robust capabilities designed to minimize friction while keeping the architecture modular and clean:",
          ],
          bullets: [
            "Resilient Multi-Source Ingestion: Automatic parsing of articles, Notion pages, Reddit posts, Twitter feeds, and YouTube transcripts. Features an automatic public oEmbed API fallback to bypass data center IP blocks.",
            "Descriptive RAG Chat & Cited Sources: A sidebar assistant that answers questions using only stored content, rendering descriptive inline badges with truncated card titles (e.g. [1] Ram Singh Verma...) and interactive source cards showing document details.",
            "SaaS Pro Upgrade Funnel: Restricts free users to 5 manual neural extractions. Exceeding the quota displays a premium, glassmorphic conversion modal directing the user to a tab-linked billing settings panel (/settings?tab=billing) backed by a Razorpay payment gateway and an animated success completion page.",
            "Dynamic Settings & Privacy Panel: Allows users to manage custom profiles, set security passwords, toggle integrations, delete accounts, and update AI preferences (such as auto-tagging default states).",
          ],
        },
        {
          title: "Tech Stack",
          paragraphs: [
            "The architecture consists of standard web layers coupled with background processors and queue workers:",
          ],
          bullets: [
            "Frontend: React, TypeScript, Vite, React Router, Axios, Tailwind CSS, TanStack Query",
            "Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, Redis (BullMQ queues), Razorpay",
            "Shared Layer: @secondbrain/contracts (Shared TypeScript DTO definitions and interfaces)",
            "AI & Ingestion: Groq & OpenAI APIs, standard Vector Embeddings, Puppeteer & JSDOM, youtube-transcript",
          ],
        },
        {
          title: "Architecture & Workflow",
          paragraphs: [
            "The monorepo separates ingestion services and public API routes to isolate heavy scraping tasks from user interactions:",
          ],
          code: `[User Action] ──> [React App] ──> [Express API]
                                     │ (Check Quota & Deduct)
                                     ▼
[MongoDB Atlas] <── [AI Services] <── [Queue Workers] <── [Ingestion Pipeline]
      │                                                         │
      │ (Create Vector Embeddings)                              ▼
      └───────────────────────────────────────────> [oEmbed API / Puppeteer]`,
          bullets: [
            "Capture: The user saves a link. The Express API checks the user's plan and deducts credits (if on a free tier).",
            "Ingestion: The link is queued. Extraction workers retrieve transcripts or fetch page content.",
            "Synthesis: The AI summarizes the text, extracts key ideas, identifies difficulty tags, and generates vector embeddings stored in MongoDB.",
            "Interactive Retrieval (RAG): The user queries the chat panel. The system generates query embeddings, performs a hybrid (vector + text) lookup, and feeds the top grounded context to the LLM to write a cited response.",
          ],
        },
        {
          title: "Key Challenges & Resolutions",
          paragraphs: [
            "Resolving complex operational and integration issues was essential to make the application reliable in production:",
          ],
          bullets: [
            "Challenge 1: Data Center IP Blocks on YouTube Scraper\n• The Problem: Standard watch page scrapes and transcript downloads failed with 429 Too Many Requests or captchas when executed from deployed server environments (Render/Vercel) due to IP address flagging by Google.\n• The Resolution: Built an automatic fallback using YouTube's public, unauthenticated oEmbed API. If the standard watch page HTML fetch fails, the worker queries the oEmbed endpoint to retrieve the video title, author, and description, saving the bookmark successfully as processed rather than failing.",
            "Challenge 2: Duplicate Account Creation with OAuth\n• The Problem: Users who registered with username/password would experience duplicate account creation when later selecting \"Sign in with Google\", even if they used the exact same email address.\n• The Resolution: Redesigned the Google callback controller lookup to query both the username and primary email fields. If a matched record is found, it merges the Google integration details into the existing profile rather than writing a duplicate user document.",
            "Challenge 3: stuck-State Cron Recovery Loops\n• The Problem: A background cron recovery job meant to re-evaluate failed or stuck extraction items query-targeted all \"pending\" records, which caused newly saved free bookmarks to automatically process, bypassing the free tier limits.\n• The Resolution: Restructured the MongoDB query filter to target strictly queued or processing ingestion states, ensuring newly created free bookmarks remain untouched until manual user extraction is initiated.",
          ],
        },
        {
          title: "Performance & UI/UX Optimizations",
          paragraphs: [
            "User engagement relies heavily on latency and design polish:",
          ],
          bullets: [
            "Hybrid Context Caching: Integrated a 5-minute memory cache map for vector searches on repetitive chat queries to minimize database lookups and speed up response times.",
            "Conversion Modal UX: Replaced native browser window.alert messages with a modern glassmorphic conversion modal containing Sparks icons, checklists of unlocked Pro features, and direct billing tab redirection.",
            "De-congested Navigation: Refactored the dashboard sidebar to compress the profile settings and logout options, maximizing the space available for user folders and saved nodes.",
          ],
        },
        {
          title: "Results & Key Learnings",
          paragraphs: [
            "Synthesizing multiple service APIs taught us the importance of system design beyond simple endpoints:",
          ],
          bullets: [
            "Resilient API Design: Learned that relying purely on HTML parsing is fragile for web-scale scraping; integrating public metadata API fallbacks (like oEmbed) is critical for ingestion pipeline uptime.",
            "Idempotent Queuing: Designed strict worker queues and job status workflows to prevent credit consumption race conditions when tasks execute asynchronously.",
            "SaaS Funnels: Gained experience in creating elegant conversion loops that elevate standard tool utility into a monetization-ready product.",
          ],
        },
      ],
    },
  },
  {
    slug: "slate",
    title: "Slate",
    description:
      "A real-time multi-room chat platform with JWT auth, live room switching, typing indicators, reactions, edits, media uploads, and persistent message history.",
    image: "/projects/slate-card.png",
    tags: ["React", "Express", "WebSocket", "MongoDB"],
    link: "https://slate-project.vercel.app/",
    github: "https://github.com/14-himanshu/slate",
    highlights: [
      "Multi-room messaging",
      "WebSocket live sync",
      "Message lifecycle actions",
      "Cloudinary uploads",
    ],
    caseStudy: {
      summary:
        "Slate is a full-stack real-time chat application where authenticated users can join multiple rooms, exchange messages instantly, and manage their profile across a modern responsive interface.",
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "Slate combines a React and TypeScript frontend with a Node.js and Express backend plus a WebSocket layer so room events and chat messages feel instant.",
          ],
        },
        {
          title: "Problem Statement",
          paragraphs: [
            "Most basic chat apps either rely on polling, which is slow and wasteful, or skip production concerns like authentication, persistence, and message lifecycle features.",
            "The goal was to build a chat experience that feels immediate while still supporting the real workflows people expect in production messaging products.",
          ],
        },
        {
          title: "Goal",
          paragraphs: [
            "Build a responsive, maintainable chat system that delivers real-time communication with secure authentication, persistent history, and a modern UX across desktop and mobile.",
          ],
        },
        {
          title: "Solution",
          paragraphs: [
            "The app uses REST APIs for account, profile, and file operations and WebSockets for room events and chat delivery. MongoDB stores users and message history, while Cloudinary handles media uploads. On the client, room-scoped state maps keep unread counts, typing indicators, and messages synchronized in real time.",
          ],
        },
        {
          title: "Features",
          paragraphs: [
            "The chat product focuses on the features people actually use in active rooms.",
          ],
          bullets: [
            "JWT-based signup and login with session restore.",
            "Multi-room chat with join, leave, switch room, and unread badges.",
            "Real-time room history plus live message broadcast.",
            "Message lifecycle support for reply, edit, soft-delete, and reactions.",
            "Typing indicators and active users per room.",
            "File and image messaging through an authenticated upload endpoint.",
            "Profile management for avatar upload, bio or status update, and password change.",
            "Responsive UI with sidebar navigation and contextual message actions.",
          ],
        },
        {
          title: "Tech Stack",
          paragraphs: [
            "The stack is intentionally simple and controllable so the real-time protocol stays easy to reason about.",
          ],
          bullets: [
            "Frontend: React 19, TypeScript, Vite, Tailwind CSS tokens.",
            "Backend: Node.js, Express 5, ws, TypeScript.",
            "Database: MongoDB plus Mongoose.",
            "APIs and services: Cloudinary for media storage, browser WebSocket API, and Fetch API.",
            "Deployment tooling: split deployment with a static frontend host and a Node backend host plus CORS and origin controls.",
          ],
        },
        {
          title: "Architecture / Workflow",
          paragraphs: [
            "The app separates REST concerns from realtime event handling so each layer can stay focused.",
          ],
          bullets: [
            "Express routes handle /api/auth, /api/user, and /api/upload while the WebSocket server attaches to the same HTTP server.",
            "React local state stores room-scoped maps for messages, unread counts, typing users, and online users.",
            "REST is used for auth, profile, and uploads; WS message types drive join, chat, and typing events.",
            "JWT is issued at login and signup, then validated on both REST middleware and the WebSocket handshake.",
            "History queries are limited and sorted for efficient room loads.",
            "The root app orchestrates auth, session, and socket state while ChatRoom holds the interaction-heavy UI.",
          ],
        },
        {
          title: "Challenges Faced",
          paragraphs: [
            "Realtime systems expose edge cases quickly, so the project focused on consistency and recovery.",
          ],
          bullets: [
            "Keeping multi-room state consistent during reconnects and token-expiry events.",
            "Synchronizing message mutations like edit, delete, and reaction across all connected clients.",
            "Combining REST file upload with WebSocket message delivery in one user action.",
            "Preventing invalid payloads and unauthorized access paths across both HTTP and WS layers.",
          ],
        },
        {
          title: "Performance & Optimization",
          paragraphs: [
            "The implementation avoids polling and keeps updates targeted to the active room.",
          ],
          bullets: [
            "Real-time push model with WebSockets avoids polling overhead.",
            "Room-scoped broadcasts reduce unnecessary client updates.",
            "History queries are capped to keep room loads fast.",
            "Incremental state updates by room minimize broad re-renders.",
            "Responsive layout and keyboard-first interactions improve usability.",
            "Upload limits and MIME filtering prevent expensive or invalid media operations.",
          ],
        },
        {
          title: "UI/UX Decisions",
          paragraphs: [
            "The interface is designed to help active conversations remain easy to scan and control.",
          ],
          bullets: [
            "Dark-first interface with clear visual hierarchy for long chat sessions.",
            "Distinct sent and received message styling for scanning speed.",
            "Sidebar room model with unread counters for multi-room awareness.",
            "Inline reply and edit context to reduce interaction friction.",
            "Typing and presence indicators to make conversations feel live.",
          ],
        },
        {
          title: "Security Considerations",
          paragraphs: [
            "Authentication and ownership checks sit on every important boundary.",
          ],
          bullets: [
            "Password hashing with bcrypt before persistence.",
            "JWT auth for protected REST routes and WebSocket upgrade validation.",
            "Input validation for usernames, passwords, status, and payload structure.",
            "Multer file-size caps plus MIME allowlists for upload safety.",
            "CORS allowlist strategy with explicit origin controls.",
            "Server-side ownership checks for message edit and delete operations.",
          ],
        },
        {
          title: "Results / Outcomes",
          paragraphs: [
            "The result is a production-style chat architecture that feels instant without compromising persistence or auth.",
          ],
          bullets: [
            "Delivered persistent history and authenticated real-time messaging.",
            "Improved feature depth beyond basic chat with rooms, reactions, replies, profile, and media.",
            "Established a clean separation between REST responsibilities and event-driven communication.",
          ],
        },
        {
          title: "What I Learned",
          paragraphs: [
            "This project made the state-sync problems of realtime apps much more concrete.",
          ],
          bullets: [
            "How to design reliable state sync across REST and WebSocket boundaries.",
            "How to model chat message lifecycle events for collaborative consistency.",
            "Why strong validation and auth checks matter more in real-time systems than in standard CRUD apps.",
            "How to structure frontend state per domain or room for scalability and maintainability.",
          ],
        },
        {
          title: "Future Improvements",
          paragraphs: [
            "The current version is solid, but a few production-hardening steps would make it scale better.",
          ],
          bullets: [
            "Add message pagination and virtualization for very large room histories.",
            "Move token transport from query params to a stricter WebSocket auth strategy.",
            "Introduce Redis pub/sub for horizontal scaling across WebSocket instances.",
            "Add rate limiting, abuse controls, and stronger audit logging.",
            "Add delivery and read receipts with richer presence semantics.",
          ],
        },
        {
          title: "Deployment",
          paragraphs: [
            "The app is built for split deployment so the frontend and real-time backend can evolve independently.",
          ],
          bullets: [
            "Frontend: Vite static build on a static host such as Vercel or Netlify.",
            "Backend: Node and Express with WebSocket service on a Node host such as Railway or Render.",
            "Data and media: MongoDB and Cloudinary for file and image storage.",
            "Environment variables control the backend URL, WebSocket URL, database URI, JWT secret, Cloudinary keys, and client origin.",
          ],
        },
      ],
    },
  },
  {
    slug: "devscope",
    title: "DevScope",
    description:
      "An AI-powered app that analyzes a GitHub profile and repositories, then returns mentorship-style feedback with actionable portfolio guidance.",
    image: "/projects/devscope-card.png",
    tags: ["HTML/CSS/JS", "FastAPI", "LangGraph", "Groq"],
    link: "https://devscope-q72q.onrender.com/",
    github: "https://github.com/14-himanshu/student-github-reviewer",
    highlights: [
      "Mentor-style feedback",
      "GitHub API enrichment",
      "FastAPI + Vanilla JS split",
      "Render deployment",
    ],
    caseStudy: {
      summary:
        "DevScope is an AI-powered app that analyzes a GitHub user's profile and repositories, then returns mentorship-style feedback on their portfolio.",
      sections: [
        {
          title: "Project Summary",
          paragraphs: [
            "DevScope analyzes a GitHub profile and repository set, then converts that information into practical, mentorship-style feedback.",
            "The app is designed to help students understand how their public work looks to a reviewer and what they can improve next.",
          ],
        },
        {
          title: "What You Used",
          paragraphs: [
            "This stack intentionally keeps the UI simple while letting the AI pipeline do the heavy lifting.",
          ],
          bullets: [
            "Frontend: Vanilla HTML, CSS, and JavaScript.",
            "Backend/API: FastAPI (Python) with Uvicorn.",
            "AI / Orchestration: LangGraph and LangChain.",
            "LLM: Groq running llama-3.1-8b-instant.",
            "Data and API integration: GitHub REST API endpoints for user and repository data.",
            "Other libraries: requests and python-dotenv.",
          ],
        },
        {
          title: "Hosting / Deployment",
          paragraphs: [
            "The app is deployed as two separate services so the UI and API can scale and fail independently.",
          ],
          bullets: [
            "Platform: Render.",
            "Deployment model: one backend API service and one static frontend service.",
            "Configuration: render.yaml with GROQ_API_KEY, GITHUB_TOKEN, and BACKEND_URL environment variables.",
          ],
        },
        {
          title: "Core Features",
          paragraphs: [
            "The product is focused on fast feedback and a clear review experience.",
          ],
          bullets: [
            "Enter a GitHub username and analyze the portfolio.",
            "Fetch recent repositories, languages, and public repository count.",
            "Generate AI feedback with actionable suggestions.",
            "Handle API and LLM issues with timeouts, rate limits, and retries.",
            "Present a clean UI with metrics and expandable review sections.",
          ],
        },
        {
          title: "Architecture",
          paragraphs: [
            "The high-level flow is simple: collect, enrich, review, and render.",
          ],
          bullets: [
            "The user submits a GitHub username in the frontend UI.",
            "The UI calls a FastAPI POST /review endpoint.",
            "A LangGraph pipeline runs extract_github_data against the GitHub API, then code_mentor_review through the Groq LLM.",
            "The backend returns JSON containing extracted data and mentor feedback.",
            "The UI renders metrics and the mentor review response.",
          ],
        },
        {
          title: "Portfolio-ready Blurb",
          paragraphs: [
            "Built a full-stack AI portfolio reviewer using Vanilla JS, FastAPI, LangGraph, and Groq Llama 3.1. The app consumes the GitHub REST API to extract repository and language insights, then generates mentorship-style feedback through an LLM pipeline. Deployed as separate frontend and backend services on Render, with production-style handling for rate limits, timeouts, and API errors.",
          ],
          quote:
            "Built a full-stack AI portfolio reviewer using Vanilla JS, FastAPI, LangGraph, and Groq Llama 3.1. The app consumes the GitHub REST API to extract repository and language insights, then generates mentorship-style feedback through an LLM pipeline. Deployed as separate frontend and backend services on Render, with production-style handling for rate limits, timeouts, and API errors.",
        },
      ],
    },
  },
  {
    slug: "coursespace",
    title: "CourseSpace",
    description:
      "A modern, responsive e-learning platform to master your craft with world-class courses and top instructors.",
    image: "/projects/coursespace-card.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://coursespace-xi.vercel.app/",
    github: "https://github.com/14-himanshu/coursespace",
    highlights: [
      "Intuitive course discovery",
      "Modern UI/UX",
      "Responsive design",
      "Next.js App Router"
    ],
    caseStudy: {
      summary:
        "CourseSpace is a modern e-learning platform designed to connect students with world-class instructors.",
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "CourseSpace provides a clean, fast, and accessible interface for discovering and consuming educational content.",
          ],
        },
        {
          title: "Problem Statement",
          paragraphs: [
            "Many online learning platforms suffer from cluttered interfaces and slow load times, creating friction for students.",
          ],
        },
        {
          title: "Goal",
          paragraphs: [
            "Build an intuitive and fast e-learning storefront that prioritizes content discovery and a smooth user experience.",
          ],
        }
      ]
    }
  },
];

export const experience = [
  {
    company: "Independent Software Engineer",
    role: "Full-Stack & AI Integrations",
    duration: "2023 - Present",
    description:
      "Architected and deployed multiple production-ready web applications focusing on real-time communication and AI-driven workflows. Engineered platforms like Second Brain and CourseSpace using Next.js, TypeScript, and MongoDB. Implemented advanced features including WebSocket syncing, semantic search, and background queue processing.",
  },
  {
    company: "Open Source & Personal Projects",
    role: "Frontend & Backend Developer",
    duration: "2022 - 2023",
    description:
      "Mastered core web fundamentals by building responsive, data-intensive applications. Developed secure REST APIs, integrated OAuth authentication, and built complex UI components using React and Tailwind CSS. Emphasized clean code architecture and scalable database design.",
  },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Framer Motion",
  "Git",
  "Docker",
  "AWS",
  "Python",
];
