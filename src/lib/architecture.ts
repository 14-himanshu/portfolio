// Architecture data for the interactive system-diagram hover effect on project cards.
// Each project has an array of nodes (positioned by center x/y) and edges (SVG path strings).
// NW=80 (node width), NH=26 (node height), so half-dims are 40 and 13 respectively.

export type DiagramNode = {
  id: string
  label: string
  sublabel?: string
  x: number   // center X in viewBox coordinates
  y: number   // center Y in viewBox coordinates
  color: string  // hex accent color for the left-side bar and sublabel
}

export type DiagramEdge = {
  id: string
  d: string       // SVG path d-attribute
  delay: number   // framer-motion animation start delay (seconds)
  label?: string  // optional short label to render near the midpoint
  lx?: number     // label center X
  ly?: number     // label center Y
}

export type DiagramData = {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  viewBox: string
}

// Accent colors that work well on both dark/light background
const C = {
  cyan:   "#22d3ee",
  indigo: "#818cf8",
  amber:  "#fbbf24",
  violet: "#a78bfa",
  emerald:"#34d399",
  pink:   "#f472b6",
}

export const architectures: Record<string, DiagramData> = {

  /* ─── WEBHOOK ORCHESTRATOR ───────────────────────────────────────────────────
     5-node decoupling flow:
     Next.js API → Redis Queue → Node Worker → Target Server / PostgreSQL (DLQ)
     viewBox 500×195, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "webhook-orchestrator": {
    viewBox: "0 0 500 195",
    nodes: [
      { id: "nextjs",  label: "Next.js API",   sublabel: "Ingestion",    x: 60,  y: 98,  color: C.cyan   },
      { id: "redis",   label: "Redis Queue",   sublabel: "Buffer",       x: 190, y: 98,  color: C.pink   },
      { id: "worker",  label: "Node Worker",   sublabel: "BullMQ",       x: 320, y: 98,  color: C.amber  },
      { id: "target",  label: "Target Server", sublabel: "Delivery",     x: 440, y: 45,  color: C.emerald},
      { id: "dlq",     label: "PostgreSQL",    sublabel: "DLQ",          x: 440, y: 151, color: C.indigo },
    ],
    edges: [
      // nextjs right(100) → redis left(150)
      { id: "n-r",  d: "M100,98 H150",                       delay: 0.10, label: "enqueue",   lx: 125, ly: 89  },
      // redis right(230) → worker left(280)
      { id: "r-w",  d: "M230,98 H280",                       delay: 0.35, label: "pull job",  lx: 255, ly: 89  },
      // worker top(320,85) → target left(400,45)
      { id: "w-t",  d: "M320,85 C320,45 400,45 400,45",      delay: 0.60, label: "deliver",   lx: 350, ly: 59  },
      // worker bottom(320,111) → dlq left(400,151)
      { id: "w-d",  d: "M320,111 C320,151 400,151 400,151",  delay: 0.85, label: "fail/DLQ",  lx: 350, ly: 137 },
    ],
  },

  /* ─── SECOND BRAIN ───────────────────────────────────────────────────────────
     6-node hexagonal pipeline loop:
     User → Express API → BullMQ Queue → Groq+OpenAI → Vector Store → RAG Engine → (back to User)
     viewBox 400×210, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "second-brain": {
    viewBox: "0 0 400 210",
    nodes: [
      { id: "user",   label: "User",          sublabel: "Browser",       x: 44,  y: 105, color: C.cyan   },
      { id: "api",    label: "Express API",    sublabel: "REST + Auth",   x: 164, y: 35,  color: C.indigo },
      { id: "queue",  label: "BullMQ Queue",   sublabel: "Async Worker",  x: 296, y: 35,  color: C.amber  },
      { id: "ai",     label: "Groq + OpenAI",  sublabel: "LLM + Embed",   x: 356, y: 105, color: C.violet },
      { id: "vector", label: "Vector Store",   sublabel: "MongoDB Atlas",  x: 296, y: 175, color: C.emerald},
      { id: "rag",    label: "RAG Engine",     sublabel: "Hybrid Search",  x: 164, y: 175, color: C.emerald},
    ],
    edges: [
      // user  top(44,92) → api   left(124,35)
      { id: "u-a",  d: "M44,92 C44,35 124,35 124,35",       delay: 0.10, label: "save link",  lx: 76,  ly: 56  },
      // api   right(204,35) → queue left(256,35)
      { id: "a-q",  d: "M204,35 H256",                       delay: 0.35, label: "enqueue",    lx: 230, ly: 27  },
      // queue right(336,35) → ai   top(356,92)
      { id: "q-ai", d: "M336,35 C356,35 356,92 356,92",      delay: 0.60, label: "process",    lx: 370, ly: 60  },
      // ai    bottom(356,118) → vector right(336,175)
      { id: "ai-v", d: "M356,118 C356,175 336,175 336,175",  delay: 0.85, label: "embed",      lx: 370, ly: 148 },
      // vector left(256,175) → rag right(204,175)
      { id: "v-r",  d: "M256,175 H204",                      delay: 1.10, label: "retrieve",   lx: 230, ly: 167 },
      // rag   left(124,175) → user bottom(44,118)
      { id: "r-u",  d: "M124,175 C44,175 44,118 44,118",     delay: 1.35, label: "cited ans.", lx: 76,  ly: 161 },
    ],
  },

  /* ─── DEVSCOPE ───────────────────────────────────────────────────────────────
     4-node left-to-right pipeline:
     GitHub API → FastAPI → AI Pipeline (LangGraph+Groq) → Mentor Report
     viewBox 500×110, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "devscope": {
    viewBox: "0 0 500 110",
    nodes: [
      { id: "github",   label: "GitHub API",    sublabel: "repos + langs",     x: 50,  y: 55, color: C.cyan    },
      { id: "fastapi",  label: "FastAPI",        sublabel: "Python + Uvicorn",  x: 180, y: 55, color: C.amber   },
      { id: "pipeline", label: "AI Pipeline",    sublabel: "LangGraph + Groq",  x: 320, y: 55, color: C.violet  },
      { id: "output",   label: "Mentor Report",  sublabel: "JSON response",     x: 450, y: 55, color: C.emerald },
    ],
    edges: [
      { id: "gh-fa", d: "M90,55 H140",  delay: 0.10, label: "fetch",        lx: 115,  ly: 47 },
      { id: "fa-pi", d: "M220,55 H280", delay: 0.40, label: "orchestrate",  lx: 250, ly: 47 },
      { id: "pi-ou", d: "M360,55 H410", delay: 0.70, label: "render",       lx: 385, ly: 47 },
    ],
  },

  /* ─── SLATE ──────────────────────────────────────────────────────────────────
     5-node real-time messaging flow:
     User A → JWT Auth → WebSocket Server ↔ User B, WS → MongoDB
     viewBox 400×185, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "slate": {
    viewBox: "0 0 400 185",
    nodes: [
      { id: "userA", label: "User A",     sublabel: "Browser",    x: 44,  y: 92,  color: C.cyan   },
      { id: "jwt",   label: "JWT Auth",   sublabel: "Middleware",  x: 152, y: 30,  color: C.amber  },
      { id: "ws",    label: "WebSocket",  sublabel: "ws Server",   x: 200, y: 92,  color: C.violet },
      { id: "mongo", label: "MongoDB",    sublabel: "History",     x: 200, y: 155, color: C.emerald},
      { id: "userB", label: "User B",     sublabel: "Browser",    x: 356, y: 92,  color: C.cyan   },
    ],
    edges: [
      // userA top(44,79) → jwt left(112,30)
      { id: "a-j",  d: "M44,79 C44,30 112,30 112,30",     delay: 0.10, label: "connect",   lx: 67,  ly: 48  },
      // jwt right(192,30) → ws top(200,79)
      { id: "j-ws", d: "M192,30 C220,30 200,79 200,79",    delay: 0.35, label: "validate",  lx: 214, ly: 52  },
      // ws bottom(200,105) → mongo top(200,142)
      { id: "ws-m", d: "M200,105 V142",                    delay: 0.60, label: "persist",   lx: 214, ly: 125 },
      // ws right(240,92) → userB left(316,92)
      { id: "ws-b", d: "M240,92 H316",                     delay: 0.85, label: "broadcast", lx: 278, ly: 84  },
      // userB left(316,99) → ws right(240,99) — return path at y+7
      { id: "b-ws", d: "M316,99 H240",                     delay: 1.10, label: "reply",     lx: 278, ly: 108 },
    ],
  },

  /* ─── COURSESPACE ────────────────────────────────────────────────────────────
     5-node security-first SaaS flow:
     Client → Rate Limiter → Express API → Cloudinary (media) / MongoDB (data)
     viewBox 500×195, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "coursespace": {
    viewBox: "0 0 500 195",
    nodes: [
      { id: "client",  label: "Client",       sublabel: "React + Vite",    x: 60,  y: 98,  color: C.cyan   },
      { id: "guard",   label: "Rate Limiter",  sublabel: "Helmet + IP",     x: 190, y: 98,  color: C.amber  },
      { id: "express", label: "Express API",   sublabel: "Zod Validation",  x: 320, y: 98,  color: C.indigo },
      { id: "cdn",     label: "Cloudinary",    sublabel: "Media CDN",       x: 440, y: 45,  color: C.pink   },
      { id: "db",      label: "MongoDB",       sublabel: "Atlas",           x: 440, y: 151, color: C.emerald},
    ],
    edges: [
      { id: "c-g",  d: "M100,98 H150",                       delay: 0.10, label: "request",   lx: 125, ly: 89  },
      { id: "g-e",  d: "M230,98 H280",                       delay: 0.35, label: "validated", lx: 255, ly: 89  },
      { id: "e-cd", d: "M320,85 C320,45 400,45 400,45",      delay: 0.60, label: "upload",    lx: 350, ly: 59  },
      { id: "e-db", d: "M320,111 C320,151 400,151 400,151",  delay: 0.85, label: "store",     lx: 350, ly: 137 },
      { id: "db-c", d: "M400,151 C200,185 100,111 100,111",  delay: 1.10, label: "response",  lx: 240, ly: 179 },
    ],
  },

  /* ─── VITALITY AI ────────────────────────────────────────────────────────────
     5-node dual-agent health flow:
     React 19 → Node.js (PII Scrub/Context) ↔ SQLite (Memory) → FastAPI (AI) ↔ PubMed/USDA
     viewBox 500×210, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "vitality-ai": {
    viewBox: "0 0 500 210",
    nodes: [
      { id: "react",   label: "React 19",      sublabel: "UI",             x: 60,  y: 98,  color: C.cyan   },
      { id: "node",    label: "Node.js API",   sublabel: "PII Scrub",      x: 190, y: 98,  color: C.amber  },
      { id: "sqlite",  label: "SQLite",        sublabel: "Memory",         x: 190, y: 155, color: C.emerald},
      { id: "python",  label: "FastAPI",       sublabel: "Dual-Agent",     x: 320, y: 98,  color: C.violet },
      { id: "apis",    label: "PubMed/USDA",   sublabel: "RAG Data",       x: 440, y: 98,  color: C.pink   },
    ],
    edges: [
      { id: "r-n",  d: "M100,98 H150",                       delay: 0.10, label: "ask AI",      lx: 125, ly: 89  },
      { id: "n-s",  d: "M190,111 V142",                      delay: 0.35, label: "history",     lx: 215, ly: 126 },
      { id: "n-p",  d: "M230,98 H280",                       delay: 0.60, label: "scrubbed",    lx: 255, ly: 89  },
      { id: "p-a",  d: "M360,98 H400",                       delay: 0.85, label: "verify",      lx: 380, ly: 89  },
      { id: "p-r",  d: "M320,111 C320,205 60,205 60,111",    delay: 1.10, label: "safe reply",  lx: 255, ly: 190 },
    ],
  },
}
