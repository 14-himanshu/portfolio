"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (
      typeof window !== "undefined" &&
      document.referrer.includes(window.location.origin)
    ) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl text-center space-y-8 flex flex-col items-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="relative flex justify-center items-center"
        >
          <h1 className="text-[120px] md:text-[200px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/20 leading-none drop-shadow-sm font-outfit select-none">
            404
          </h1>
          {/* Decorative floating elements */}
          <motion.div
            className="absolute top-10 left-10 w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary/30"
            animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary/50"
            animate={{ y: [0, 20, 0], scale: [1, 0.8, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 -right-4 md:-right-12 w-3 h-3 rounded-full bg-foreground/10"
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-outfit">
            Page not found
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-6"
        >
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border/50 w-full sm:w-auto justify-center group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 w-full sm:w-auto justify-center group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
