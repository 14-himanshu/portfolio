"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useId } from "react"
import type { DiagramData } from "@/lib/architecture"

// Node box dimensions (in viewBox units)
const NW = 80   // node width
const NH = 26   // node height

export function ArchitectureDiagram({ data }: { data: DiagramData }) {
  const uid = useId().replace(/:/g, "")
  const gridId = `grid_${uid}`

  return (
    <svg
      viewBox={data.viewBox}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Subtle dot-grid background pattern — makes it feel like a proper diagram canvas */}
        <pattern id={gridId} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="0.8" cy="0.8" r="0.6" style={{ fill: "var(--border)", fillOpacity: 0.5 }} />
        </pattern>
      </defs>

      {/* Dot-grid background */}
      <rect width="100%" height="100%" fill={`url(#${gridId})`} />

      {/* ── Edges (rendered behind nodes) ──────────────────────────────── */}
      {data.edges.map((edge) => (
        <motion.path
          key={edge.id}
          d={edge.d}
          fill="none"
          strokeLinecap="round"
          strokeWidth="1.5"
          style={{ stroke: "var(--primary)", strokeOpacity: 0.45 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: edge.delay, duration: 0.75, ease: "easeInOut" },
            opacity:    { delay: edge.delay, duration: 0.1 },
          }}
        />
      ))}

      {/* ── Edge labels ─────────────────────────────────────────────────── */}
      {data.edges.map((edge) =>
        edge.label && edge.lx !== undefined && edge.ly !== undefined ? (
          <motion.text
            key={`lbl-${edge.id}`}
            x={edge.lx}
            y={edge.ly}
            textAnchor="middle"
            fontSize="5.5"
            fontFamily="monospace"
            style={{ fill: "var(--primary)", fillOpacity: 0.65 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: edge.delay + 0.65, duration: 0.3 }}
          >
            {edge.label}
          </motion.text>
        ) : null
      )}

      {/* ── Nodes (rendered above edges) ───────────────────────────────── */}
      {data.nodes.map((node, i) => {
        const nx = node.x - NW / 2   // top-left X
        const ny = node.y - NH / 2   // top-left Y

        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.08,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "center center", transformBox: "fill-box" }}
          >
            {/* Shadow / glow behind node */}
            <rect
              x={nx + 1}
              y={ny + 2}
              width={NW}
              height={NH}
              rx="5"
              style={{ fill: node.color, fillOpacity: 0.08 }}
            />

            {/* Main node box */}
            <rect
              x={nx}
              y={ny}
              width={NW}
              height={NH}
              rx="5"
              style={{
                fill: "var(--card)",
                stroke: "var(--border)",
                strokeWidth: 1,
              }}
            />

            {/* Coloured left accent bar */}
            <rect
              x={nx + 1}
              y={ny + 5}
              width={2.5}
              height={NH - 10}
              rx="1.5"
              fill={node.color}
            />

            {/* Primary label */}
            <text
              x={node.x + 4}
              y={node.sublabel ? node.y - 1 : node.y + 4}
              textAnchor="middle"
              fontSize="8"
              fontWeight="600"
              fontFamily="Inter, ui-sans-serif, sans-serif"
              style={{ fill: "var(--foreground)" }}
            >
              {node.label}
            </text>

            {/* Sublabel (tech stack / description) */}
            {node.sublabel && (
              <text
                x={node.x + 4}
                y={node.y + 9}
                textAnchor="middle"
                fontSize="5.5"
                fontFamily="monospace"
                fill={node.color}
                fillOpacity="0.85"
              >
                {node.sublabel}
              </text>
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}
