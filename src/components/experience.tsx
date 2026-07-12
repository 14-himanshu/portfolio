"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { MagicCard } from "@/components/ui/magic-card";
import { Briefcase, Terminal } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-border/50">
      <div className="container px-4 mx-auto max-w-3xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2 font-outfit">Experience & Journey</h2>
          <p className="text-muted-foreground text-sm">
            How I got here. No bootcamps, just deliberate building.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {experience.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MagicCard 
                  className="group relative p-5 md:p-6 rounded-2xl border border-border/60 !bg-card cursor-pointer"
                  gradientColor="rgba(255, 255, 255, 0.05)"
                >
                  <div className="flex flex-row items-start gap-4 md:gap-6">
                    {/* Icon Column */}
                    <div className="mt-1 flex shrink-0 items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        {index === 0 ? <Briefcase className="w-5 h-5 md:w-6 md:h-6" /> : <Terminal className="w-5 h-5 md:w-6 md:h-6" />}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 w-full relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold tracking-tight text-foreground">
                          {item.role}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                            {item.company}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-primary/80 mb-3">
                        {item.duration}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
