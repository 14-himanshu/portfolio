export type CaseStudySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
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
    image: "/projects/second-brain-preview.jpg",
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
        "Second Brain is a full-stack knowledge workspace that helps users save links, videos, documents, and notes in one place, then organize and retrieve them with AI-assisted search and summaries.",
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "Second Brain turns raw saved content into structured, searchable knowledge. Instead of keeping information scattered across tabs, bookmarks, docs, and social posts, the app centralizes it and makes it easier to resurface later.",
          ],
        },
        {
          title: "Problem Statement",
          paragraphs: [
            "Most people store knowledge across browser tabs, bookmarks, docs, and social platforms. Traditional bookmark tools are static: they do not summarize content, connect related ideas, or make retrieval easy when memory fades.",
            "Users need a system that can capture content quickly and surface the right context later.",
          ],
        },
        {
          title: "Goal",
          paragraphs: [
            "Build a scalable personal knowledge platform that supports fast content capture, secure authentication, semantic retrieval, AI-generated summaries and insights, and controlled sharing across private, link-based, and public modes.",
          ],
        },
        {
          title: "Solution",
          paragraphs: [
            "The platform stores user content in MongoDB, generates embeddings, and runs background AI processing through a queue worker. On the frontend, React Query powers data fetching and optimistic updates, while semantic search and AI insight panels help users move from saved link to usable knowledge.",
          ],
        },
        {
          title: "Features",
          paragraphs: [
            "The product is designed around a capture-first workflow with AI assisted retrieval.",
          ],
          bullets: [
            "Content capture pipeline for posts, videos, and documents with URL normalization and metadata extraction.",
            "Semantic search using vector search with text-search fallback for meaning-based retrieval.",
            "AI synthesis workflow that generates summaries, tags, and topic intelligence for saved content.",
            "Background ingestion via queue worker to avoid blocking user actions.",
            "Google OAuth support for sign-in and integration flows.",
            "Share controls with private, link-based, and public visibility modes.",
            "AI chat over the personal knowledge base with source-aware responses.",
            "Manual fallback path for protected or unreadable sources so users can paste content and continue processing.",
          ],
        },
        {
          title: "Tech Stack",
          paragraphs: [
            "The stack was chosen to balance product speed, AI flexibility, and maintainability.",
          ],
          bullets: [
            "Frontend: React 19, TypeScript, Vite, React Router, Tailwind CSS, React Query.",
            "Backend: Node.js, Express 5, TypeScript, Mongoose, Zod, JWT, bcrypt.",
            "AI / Processing: OpenAI or Groq providers, Xenova/all-MiniLM-L6-v2 embeddings, BullMQ, Redis.",
            "Database: MongoDB with text indexes and vector-search compatible flow.",
            "Shared package: @secondbrain/contracts for DTO and enum consistency.",
            "Deployment: Vercel for the frontend, Render for the backend and worker, MongoDB Atlas, and Redis.",
          ],
        },
        {
          title: "Architecture / Workflow",
          paragraphs: [
            "The system is built around a simple request then enrich workflow so users never wait on heavy AI tasks.",
          ],
          bullets: [
            "Routing: React Router handles /, /signin, /signup, /share/:id, OAuth callbacks, and integration callbacks.",
            "State management: React Query handles server state, while local component state and localStorage hold UI preferences.",
            "API flow: Axios interceptors normalize errors and inject bearer tokens automatically.",
            "Authentication: Username and password auth uses bcrypt plus JWT, and Google OAuth uses a callback and code exchange.",
            "Database interaction: Mongoose models store users, content, and share links with performance-oriented indexes.",
            "Data flow: content is saved immediately, then background AI and embedding jobs enrich it asynchronously.",
          ],
        },
        {
          title: "Challenges Faced",
          paragraphs: [
            "The hardest part was making AI retrieval dependable without forcing ideal-path assumptions.",
          ],
          bullets: [
            "Reliable AI retrieval across environments was solved with a three-tier retrieval strategy: vector search, text search, then in-memory cosine and recency fallback.",
            "Latency versus UX quality was solved by decoupling ingestion into background workers and showing progressive AI states in the UI.",
            "OAuth complexity across login and integration use cases was solved by separating login scopes from account-connect scopes.",
            "Protected-source ingestion limitations were solved with a manual-content fallback in the UI.",
            "Consistency between frontend and backend contracts was solved with a shared contracts package in the monorepo.",
          ],
        },
        {
          title: "Performance & Optimization",
          paragraphs: [
            "The app emphasizes responsive feedback and avoids wasted work wherever possible.",
          ],
          bullets: [
            "Debounced semantic search to reduce noisy API traffic.",
            "React Query stale-time tuning and selective invalidation to minimize unnecessary refetches.",
            "Optimistic UI updates for edit and delete actions.",
            "Targeted polling only for currently selected content under AI processing.",
            "Background queue processing for heavy AI work.",
            "Puppeteer scraping optimization by blocking non-critical resources like images, fonts, and styles.",
            "Progressive rendering patterns and responsive layout behavior for desktop and mobile flows.",
          ],
        },
        {
          title: "UI/UX Decisions",
          paragraphs: [
            "The interface was designed around a single dashboard so users could stay in one place while moving from capture to insight.",
          ],
          bullets: [
            "Single-dashboard workflow so creation, search, filtering, and AI insights happen together.",
            "Clear processing states such as queued, processing, and failed to improve trust during asynchronous AI work.",
            "Mobile-first sidebar controls and adaptable layout for smaller screens.",
            "Direct source access from cards to preserve transparency and verification.",
            "Manual synthesis entry when automated extraction fails so the user never hits a dead end.",
          ],
        },
        {
          title: "Security Considerations",
          paragraphs: [
            "Security was handled with the usual production basics plus a few content-specific controls.",
          ],
          bullets: [
            "Passwords are hashed with bcrypt.",
            "Protected endpoints use JWT middleware and bearer-token verification.",
            "Request payloads are validated with Zod to reduce malformed-input risk.",
            "OAuth integration stores encrypted token fields where available.",
            "CORS is configured using allowed frontend origins.",
            "Token handling is centralized through API client interceptors and backend middleware checks.",
          ],
        },
        {
          title: "Results / Outcomes",
          paragraphs: [
            "The final result is a production-ready full-stack knowledge app with AI-assisted retrieval and synthesis.",
          ],
          bullets: [
            "Reduced friction from save now, forget later by enabling semantic recall and contextual insights.",
            "Established a maintainable monorepo architecture with shared contracts and clean frontend/backend boundaries.",
            "Created a flexible foundation for adding more integrations and advanced retrieval features.",
          ],
        },
        {
          title: "What I Learned",
          paragraphs: [
            "The project reinforced that production AI needs reliable fallback paths and clear UX, not just ideal model calls.",
          ],
          bullets: [
            "Graceful fallback paths matter more than optimistic model assumptions.",
            "Queue-based processing is essential when balancing user-perceived speed with heavy compute.",
            "Shared type contracts significantly reduce integration bugs across frontend and backend.",
            "Good AI product UX depends on communicating state, confidence, and failure modes clearly.",
          ],
        },
        {
          title: "Future Improvements",
          paragraphs: [
            "The current foundation is strong, but there is room to push discovery, analytics, and collaboration further.",
          ],
          bullets: [
            "Add per-user analytics on retrieval quality and insight usefulness.",
            "Introduce stronger token-hardening policies with encryption-required mode.",
            "Add role-based access and team or shared-workspace support.",
            "Expand connectors beyond Google with Notion, Slack, and GitHub.",
            "Improve AI ranking with reranking and hybrid retrieval tuning.",
            "Add end-to-end observability dashboards for queue latency, provider errors, and search success rates.",
          ],
        },
        {
          title: "Deployment",
          paragraphs: [
            "The app is deployed as a split production system so the UI can stay fast while background AI work remains isolated.",
          ],
          bullets: [
            "Frontend: deployed on Vercel with SPA rewrite rules for client-side routing.",
            "Backend API and worker: deployed on Render as separate services.",
            "Data and infrastructure: MongoDB Atlas for persistence and Redis for queue orchestration.",
            "Environment management: separate configs for API URLs, OAuth, JWT secrets, AI providers, and queue settings.",
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
    tags: ["Streamlit", "FastAPI", "LangGraph", "Groq"],
    link: "https://devscope-q72q.onrender.com/",
    github: "https://github.com/14-himanshu/student-github-reviewer",
    highlights: [
      "Mentor-style feedback",
      "GitHub API enrichment",
      "FastAPI + Streamlit split",
      "Render deployment",
    ],
    caseStudy: {
      summary:
        "DevScope is an AI-powered app that analyzes a GitHub user’s profile and repositories, then returns mentorship-style feedback on their portfolio.",
      sections: [
        {
          title: "Project Summary",
          paragraphs: [
            "DevScope analyzes a GitHub profile and repository set, then converts that information into practical, mentorship-style feedback.",
            "The app is designed to help students understand how their public work reads to a reviewer and what they can improve next.",
          ],
        },
        {
          title: "What You Used",
          paragraphs: [
            "The stack intentionally keeps the UI simple while letting the AI pipeline do the heavy lifting.",
          ],
          bullets: [
            "Frontend: Streamlit.",
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
            "Deployment model: one backend API service and one frontend Streamlit service.",
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
            "The user submits a GitHub username in the Streamlit UI.",
            "The UI calls a FastAPI POST /review endpoint.",
            "A LangGraph pipeline runs extract_github_data against the GitHub API, then code_mentor_review through the Groq LLM.",
            "The backend returns JSON containing extracted_data and mentor_feedback.",
            "The UI renders metrics and the mentor review response.",
          ],
        },
        {
          title: "Portfolio-ready Blurb",
          paragraphs: [
            "Built a full-stack AI portfolio reviewer using Streamlit, FastAPI, LangGraph, and Groq Llama 3.1. The app consumes the GitHub REST API to extract repository and language insights, then generates mentorship-style feedback through an LLM pipeline. Deployed as separate frontend and backend services on Render, with production-style handling for rate limits, timeouts, and API errors.",
          ],
          quote:
            "Built a full-stack AI portfolio reviewer using Streamlit, FastAPI, LangGraph, and Groq Llama 3.1. The app consumes the GitHub REST API to extract repository and language insights, then generates mentorship-style feedback through an LLM pipeline. Deployed as separate frontend and backend services on Render, with production-style handling for rate limits, timeouts, and API errors.",
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
