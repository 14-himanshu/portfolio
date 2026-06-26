"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);
import { motion } from "framer-motion";
import Link from "next/link";

export function GitGraph() {
  return (
    <section className="w-full flex flex-col items-center py-12 md:py-20 border-b border-border/50">
      <div className="container px-4 mx-auto max-w-5xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-outfit mb-2">
            GitHub Contributions
          </h2>
          <p className="text-muted-foreground text-sm">
            What I&apos;ve been building lately.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full overflow-x-auto flex justify-center p-4 bg-background/50 rounded-xl border border-border/40"
        >
          <Link href="https://github.com/14-himanshu" target="_blank" className="hover:opacity-80 transition-opacity">
            <GitHubCalendar
              username="14-himanshu"
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              colorScheme="dark"
              theme={{
                dark: ["#1e1e2f", "#4c1d95", "#6d28d9", "#8b5cf6", "#c4b5fd"] // Purple theme
              }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
