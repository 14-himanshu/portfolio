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
     viewBox 400×110, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "devscope": {
    viewBox: "0 0 400 110",
    nodes: [
      { id: "github",   label: "GitHub API",    sublabel: "repos + langs",     x: 44,  y: 55, color: C.cyan    },
      { id: "fastapi",  label: "FastAPI",        sublabel: "Python + Uvicorn",  x: 148, y: 55, color: C.amber   },
      { id: "pipeline", label: "AI Pipeline",    sublabel: "LangGraph + Groq",  x: 260, y: 55, color: C.violet  },
      { id: "output",   label: "Mentor Report",  sublabel: "JSON response",     x: 356, y: 55, color: C.emerald },
    ],
    edges: [
      // github right(84,55) → fastapi left(108,55)
      { id: "gh-fa", d: "M84,55 H108",  delay: 0.10, label: "fetch",        lx: 96,  ly: 47 },
      // fastapi right(188,55) → pipeline left(220,55)
      { id: "fa-pi", d: "M188,55 H220", delay: 0.40, label: "orchestrate",  lx: 204, ly: 47 },
      // pipeline right(300,55) → output left(316,55)
      { id: "pi-ou", d: "M300,55 H316", delay: 0.70, label: "render",       lx: 308, ly: 47 },
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
     viewBox 400×195, NW=80, NH=26
  ─────────────────────────────────────────────────────────────────────────── */
  "coursespace": {
    viewBox: "0 0 400 195",
    nodes: [
      { id: "client",  label: "Client",       sublabel: "React + Vite",    x: 44,  y: 98,  color: C.cyan   },
      { id: "guard",   label: "Rate Limiter",  sublabel: "Helmet + IP",     x: 155, y: 98,  color: C.amber  },
      { id: "express", label: "Express API",   sublabel: "Zod Validation",  x: 268, y: 98,  color: C.indigo },
      { id: "cdn",     label: "Cloudinary",    sublabel: "Media CDN",       x: 355, y: 45,  color: C.pink   },
      { id: "db",      label: "MongoDB",       sublabel: "Atlas",           x: 355, y: 151, color: C.emerald},
    ],
    edges: [
      // client right(84,98) → guard left(115,98)
      { id: "c-g",  d: "M84,98 H115",                        delay: 0.10, label: "request",   lx: 100, ly: 89  },
      // guard right(195,98) → express left(228,98)
      { id: "g-e",  d: "M195,98 H228",                       delay: 0.35, label: "validated",  lx: 212, ly: 89  },
      // express top(268,85) → cdn left(315,45)
      { id: "e-cd", d: "M268,85 C268,45 315,45 315,45",      delay: 0.60, label: "upload",    lx: 283, ly: 59  },
      // express bottom(268,111) → db left(315,151)
      { id: "e-db", d: "M268,111 C268,151 315,151 315,151",  delay: 0.85, label: "store",     lx: 283, ly: 137 },
      // db left(315,151) → client right(84,111) — long return arc
      { id: "db-c", d: "M315,151 C175,182 84,111 84,111",    delay: 1.10, label: "response",  lx: 198, ly: 179 },
    ],
  },
}
