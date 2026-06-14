"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import React, { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function Contact() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const EMAIL = "himanshupandey.sde@gmail.com"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setEmailCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      
      toast("Email address copied", {
        icon: <CheckCircle2 className="w-4 h-4 text-primary" />,
        className: "bg-background/80 backdrop-blur-md border border-border/40 text-foreground font-medium rounded-xl shadow-2xl",
      })
      timeoutRef.current = setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      toast.error("Could not copy email.")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      details: formData.get('details'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitted(true)
        toast.success("Message sent! I'll be in touch shortly.")
      } else {
        toast.error(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold font-outfit tracking-tight leading-[0.95]"
              >
                Let&apos;s build something <br />
                <span className="text-gradient">legendary</span> together.
              </motion.h2>
              <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
                I&apos;m currently open to new projects and collaborations. 
                Whether you have a specific idea or just want to chat about 
                the latest tech, I&apos;m all ears.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Email Me</p>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-bold">{EMAIL}</p>
                    <button
                      onClick={handleCopyEmail}
                      title="Copy email"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      {emailCopied
                        ? <Check className="w-4 h-4 text-primary" />
                        : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-black text-muted-foreground/60 mb-1">Social Channels</p>
                  <div className="flex items-center gap-4">
                    <a href="https://www.linkedin.com/in/himanshupandey14/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors">
                      <FaLinkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                    <span className="text-border">/</span>
                    <a href="https://github.com/14-himanshu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors">
                      <FaGithub className="w-5 h-5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-[2.5rem] border border-border/40 shadow-2xl relative overflow-hidden"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Message Received!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-bold text-primary hover:underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide ml-1">Your Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="Your full name"
                    className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-border/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide ml-1">Email</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-border/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/30 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide ml-1">Message <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <textarea 
                    name="details"
                    rows={4}
                    placeholder="What's on your mind? A project, a question, or just saying hi."
                    className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-border/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/30 font-medium resize-none"
                  />
                </div>
                <button 
                  disabled={loading}
                  className={cn(
                    "shimmer w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-primary/20",
                    loading && "cursor-wait"
                  )}
                >
                  {loading ? "TRANSMITTING..." : "SEND MESSAGE"}
                  {!loading && <Send className="w-5 h-5" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
