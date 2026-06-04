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
      "An AI-powered app that analyzes a GitHub profile and repositories, then returns mentorship-style feedback with actionable portfolio guidance, career tools, and an interactive AI mentor.",
    image: "/projects/devscope-card.png",
    tags: ["HTML/JS", "FastAPI", "LangGraph", "Groq", "SQLite"],
    link: "https://devscope-q72q.onrender.com/",
    github: "https://github.com/14-himanshu/student-github-reviewer",
    highlights: [
      "Mentor-style feedback",
      "Interactive AI Chat",
      "Career Tools & PDF Export",
      "SQLite & Caching",
    ],
    caseStudy: {
      summary:
        "DevScope is an AI-powered app that analyzes a GitHub user’s profile and repositories, providing comprehensive mentorship-style feedback, actionable career tools, and an interactive AI chat interface.",
      sections: [
        {
          title: "Project Summary",
          paragraphs: [
            "DevScope acts as a virtual tech mentor. It analyzes a developer's GitHub profile, repositories, and languages, then translates that data into practical, mentorship-style feedback.",
            "The platform has evolved from a simple reviewer into a comprehensive career tool, offering gamified feedback, AI-generated cover letters, project ideas, and interactive chat, all aimed at helping students and junior developers improve their portfolios.",
          ],
        },
        {
          title: "What You Used",
          paragraphs: [
            "The tech stack focuses on a fast, decoupled architecture with a strong AI pipeline at its core.",
          ],
          bullets: [
            "Frontend: Custom HTML, CSS (Dark Theme), and Vanilla JavaScript.",
            "Backend/API: FastAPI (Python) with Uvicorn.",
            "AI / Orchestration: LangGraph and LangChain.",
            "LLM: Groq running Llama 3.1 8B Instant.",
            "Database: SQLite with SQLAlchemy ORM for saving reviews.",
            "Data & Integrations: GitHub REST API for extracting user data.",
            "Other tools: ReportLab for PDF generation, in-memory caching for rate limits.",
          ],
        },
        {
          title: "Hosting / Deployment",
          paragraphs: [
            "The app is deployed as a consolidated full-stack service to optimize deployment speed.",
          ],
          bullets: [
            "Platform: Render.",
            "Deployment model: A single FastAPI backend serving static HTML/JS assets and API routes.",
            "Configuration: render.yaml with GROQ_API_KEY, GITHUB_TOKEN, and environmental variables.",
          ],
        },
        {
          title: "Core Features",
          paragraphs: [
            "DevScope provides a complete suite of tools to help developers understand and enhance their public work.",
          ],
          bullets: [
            "AI Code Mentor: Generates professional code reviews based on repository data and READMEs.",
            "Gamification: Automatically awards an overall portfolio grade and custom achievement badges.",
            "Interactive AI Chat: A built-in floating chat mentor to answer follow-up questions about the portfolio.",
            "Career Tools Suite: Generates tailored cover letters, skill roadmaps, project ideas, and interview questions.",
            "Export & Save: Export reviews as PDFs or Markdown, and save past reviews to the database.",
            "Performance: In-memory caching for instant loads on subsequent requests and robust exponential backoff for rate limits.",
          ],
        },
        {
          title: "Architecture",
          paragraphs: [
            "The architecture is designed to handle API orchestration and LLM streaming efficiently.",
          ],
          bullets: [
            "The user inputs a GitHub username via the responsive HTML/JS frontend.",
            "FastAPI receives the POST request and first checks the in-memory cache to bypass API rate limits.",
            "A LangGraph pipeline extracts data from the GitHub API and streams it through the Groq Llama 3.1 LLM for evaluation.",
            "The backend saves the generated review using SQLAlchemy into a SQLite database.",
            "The frontend renders the complex JSON payload into a clean dashboard with expandable career tools and actionable metrics.",
          ],
        },
        {
          title: "Portfolio-ready Blurb",
          paragraphs: [
            "Built a full-stack AI portfolio reviewer using FastAPI, LangGraph, Groq Llama 3.1, and SQLite. The application consumes the GitHub REST API to extract repository and language insights, then generates deep mentorship-style feedback via an LLM pipeline. It features an interactive AI mentor chat, gamified grading, automated PDF generation, and robust handling for rate limits and caching.",
          ],
          quote:
            "Built a full-stack AI portfolio reviewer using FastAPI, LangGraph, Groq Llama 3.1, and SQLite. The application consumes the GitHub REST API to extract repository and language insights, then generates deep mentorship-style feedback via an LLM pipeline. It features an interactive AI mentor chat, gamified grading, automated PDF generation, and robust handling for rate limits and caching.",
        },
      ],
    },
  },
  {
    slug: "coursespace",
    title: "CourseSpace",
    description:
      "A modern, enterprise-grade Course Selling Application featuring a beautiful, dark-mode focused UI, a custom YouTube video player, and a highly secure backend.",
    image: "/projects/coursespace-card.png",
    tags: ["React", "Express.js", "MongoDB", "Node.js"],
    link: "https://coursespace-xi.vercel.app/",
    github: "https://github.com/14-himanshu/coursespace",
    highlights: [
      "Stunning Dark-Mode UI",
      "Robust Course Player",
      "Role-Based Auth",
      "Secure Backend",
    ],
    caseStudy: {
      summary:
        "CourseSpace is a comprehensive SaaS platform designed to facilitate the seamless creation, management, and consumption of educational content. Built with the MERN stack, it offers a robust solution for educators to host courses and for students to learn interactively.",
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "CourseSpace is a comprehensive SaaS platform designed to facilitate the seamless creation, management, and consumption of educational content. Built with the MERN stack, it offers a robust solution for educators to host courses and for students to learn interactively. The platform prioritizes high-end aesthetics, robust security, and an intuitive user experience.",
          ],
        },
        {
          title: "Problem Statement",
          paragraphs: [
            "Many existing course platforms are clunky, overly complex, and lack modern aesthetic appeal. Creators often struggle with confusing admin dashboards, while students face disjointed video playback and uninspiring interfaces. Furthermore, security and proper data validation are frequently overlooked in basic e-learning templates, leaving user data vulnerable.",
          ],
        },
        {
          title: "Goal",
          paragraphs: [
            "To build a state-of-the-art, secure, and visually stunning course-selling platform that provides a frictionless experience for both administrators (creators) and end-users (students). The application must feature a reliable video delivery system, strict backend security, and a premium \"dark-mode\" design language.",
          ],
        },
        {
          title: "Solution",
          paragraphs: [
            "Developed a full-stack application leveraging React and Vite for a lightning-fast frontend, coupled with a Node.js/Express backend fortified with industry-standard security practices. The platform utilizes MongoDB for scalable data storage, Cloudinary for efficient media delivery, and Razorpay for seamless payment processing.",
          ],
        },
        {
          title: "Features",
          paragraphs: [
            "Here are the core functionalities integrated into the application:",
          ],
          bullets: [
            "Stunning Dark-Mode UI: Built with pure CSS, featuring glassmorphism, responsive grids, and subtle micro-animations for a premium feel.",
            "Admin Dashboard: Comprehensive CRUD (Create, Read, Update, Delete) capabilities with a sleek Modal interface for managing courses, users, and content.",
            "Robust Course Player: An integrated video player utilizing the native YouTube embed API to flawlessly handle course lessons and track progress.",
            "Interactive Notifications: Beautiful success and error toasts using react-hot-toast for real-time user feedback.",
            "Cloud Storage Integration: Integrated with Cloudinary and multer for secure, cloud-based image hosting for course thumbnails and assets.",
            "Role-Based Authentication: JWT-based authentication with properly segregated Admin and User access controls and middlewares.",
          ],
        },
        {
          title: "Tech Stack",
          paragraphs: [
            "The project was built utilizing the following core technologies:",
          ],
          bullets: [
            "Frontend: React, Vite, React Router DOM, Lucide-React",
            "Backend: Node.js, Express.js",
            "Database: MongoDB & Mongoose",
            "Security & Validation: JWT, Zod, Helmet, Express-Rate-Limit, Bcrypt",
            "Media & Payments: Cloudinary API, Razorpay",
            "Logging: Winston, Morgan",
          ],
        },
        {
          title: "Architecture / Workflow",
          paragraphs: [
            "The application follows a standard modern web architecture:",
          ],
          bullets: [
            "Client-Side: The React frontend handles routing, state management, and UI rendering. It communicates with the backend via RESTful APIs.",
            "API Layer: Express.js routes process incoming HTTP requests, route them through security and validation middlewares, and pass them to controllers.",
            "Data Validation: Zod schemas strictly validate all incoming payloads before they hit the database, preventing injection attacks.",
            "Data Persistence: Mongoose models define the schema for MongoDB, handling database queries and relationships.",
            "Media Management: Images uploaded by admins are temporarily stored using Multer and then uploaded to Cloudinary, with the resulting URL saved to the database.",
          ],
        },
        {
          title: "Challenges Faced",
          paragraphs: [
            "During development, several technical hurdles were encountered and resolved:",
          ],
          bullets: [
            "Secure Video Delivery: Ensuring the course player smoothly integrated YouTube APIs while maintaining a custom, branded look.",
            "State Management: Handling complex state across the admin dashboard, especially during multi-step course creation and updates.",
            "Security Implementation: Properly configuring Helmet and Rate-Limiting without inadvertently blocking legitimate API traffic.",
            "Image Uploads: Managing multipart form data and ensuring reliable uploads to Cloudinary via the backend.",
          ],
        },
        {
          title: "Performance & Optimization",
          paragraphs: [
            "To ensure a fast and responsive application, the following optimizations were made:",
          ],
          bullets: [
            "Implemented Vite for significantly faster frontend build times and Hot Module Replacement (HMR).",
            "Utilized pure CSS for styling, reducing the overhead of large CSS frameworks.",
            "Configured MongoDB indexes on frequently queried fields to speed up database reads.",
            "Leveraged Cloudinary's CDN for optimized image delivery, reducing bandwidth and load times.",
          ],
        },
        {
          title: "UI/UX Decisions",
          paragraphs: [
            "The design philosophy centered on creating a premium, focused environment:",
          ],
          bullets: [
            "Dark Mode Default: Reduces eye strain for long learning sessions and provides a sleek, modern aesthetic.",
            "Glassmorphism: Used for modals and cards to create depth and hierarchy without cluttered borders.",
            "Micro-Animations: Added subtle hover and transition effects to make the interface feel alive and responsive.",
            "Intuitive Navigation: Kept the sidebar and routing simple so users can find courses and lessons instantly.",
          ],
        },
        {
          title: "Security Considerations",
          paragraphs: [
            "Security was a primary focus from day one, incorporating:",
          ],
          bullets: [
            "Helmet: Secures Express apps by setting various HTTP headers.",
            "Express-Rate-Limit: Protects against brute-force and DDoS attacks by limiting repeated requests.",
            "Zod Validation: Prevents NoSQL injections and data corruption by strictly enforcing schema types on all incoming data.",
            "JWT: Secure, stateless authentication for user sessions.",
            "Bcrypt: Secure password hashing before storing credentials in the database.",
          ],
        },
        {
          title: "Results / Outcomes",
          paragraphs: [
            "The culmination of this project resulted in a production-ready application that:",
          ],
          bullets: [
            "Delivers a seamless, high-quality learning experience for users.",
            "Provides a powerful, yet easy-to-use administrative interface for content creators.",
            "Demonstrates a strong understanding of full-stack development, API security, and modern UI design.",
          ],
        },
        {
          title: "What I Learned",
          paragraphs: [
            "This project provided invaluable experience in several key areas:",
          ],
          bullets: [
            "Implementing robust security measures (Helmet, Rate Limiting, Validation) in a Node.js environment.",
            "Integrating third-party services like Cloudinary and Razorpay into a seamless workflow.",
            "Building a complete, end-to-end application architecture from database modeling to UI deployment.",
            "The importance of structured logging (Winston/Morgan) for debugging and observability.",
          ],
        },
        {
          title: "Future Improvements",
          paragraphs: [
            "While the application is fully functional, there are areas for future enhancement:",
          ],
          bullets: [
            "Implement unit and integration testing (e.g., using Jest and Supertest).",
            "Add a community forum or discussion board for individual courses.",
            "Integrate analytics to track student progress and course popularity.",
            "Implement advanced caching mechanisms (like Redis) for frequently accessed data.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "This project is an educational showcase and portfolio piece.",
          ],
          bullets: [
            "All course content and user data are mock data used for demonstration purposes.",
            "The application is not actively monitored for commercial use.",
            "Payment gateways are configured in test mode.",
          ],
        },
      ],
    },
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
