"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      details: formData.get("details"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast.success("Message sent! I'll be in touch shortly.");
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full pt-20 pb-10 flex flex-col items-center">
      <div className="container px-4 mx-auto max-w-2xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-outfit mb-2">Say Hello</h2>
          <p className="text-muted-foreground text-sm">
            dms are recommended, but email works too.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full flex flex-col items-center"
        >
          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => {
                navigator.clipboard.writeText("himanshupandey.sde@gmail.com");
                toast.success("Email copied to clipboard!");
              }}
              className="bg-foreground text-background py-2 px-4 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Mail className="w-4 h-4" /> copy email
            </button>

            <Link href="https://www.linkedin.com/in/himanshupandey14/" target="_blank">
              <button className="bg-[#0A66C2] text-white py-2 px-4 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-[#0A66C2]/90 transition-colors">
                <FaLinkedin className="w-4 h-4" /> dm on linkedin
              </button>
            </Link>
          </div>

          <div className="w-full max-w-md">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 border rounded-xl bg-card">
                <CheckCircle2 className="w-8 h-8 text-primary" />
                <h3 className="font-bold">Message Sent</h3>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-medium text-primary hover:underline underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-1.5">
                  <label className="text-xs font-medium ml-1">Your Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary/50 outline-none transition-all text-sm"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-medium ml-1">Your Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary/50 outline-none transition-all text-sm"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-medium ml-1">Message</label>
                  <textarea
                    required
                    name="details"
                    rows={4}
                    placeholder="Type your message here."
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary/50 outline-none transition-all text-sm resize-none"
                  />
                </div>
                <button
                  disabled={loading}
                  className={cn(
                    "w-full py-2.5 bg-foreground text-background rounded-lg font-medium text-sm flex items-center justify-center transition-all hover:bg-foreground/90 disabled:opacity-50 mt-1",
                    loading && "cursor-wait"
                  )}
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <footer className="w-full mt-24 text-center">
        <p className="text-xs text-muted-foreground/60">
          designed and developed by{" "}
          <Link href="https://github.com/14-himanshu" target="_blank" className="hover:text-foreground transition-colors">
            himanshu pandey
          </Link>
        </p>
      </footer>
    </section>
  );
}
