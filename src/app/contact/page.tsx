"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Check, ArrowRight } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Minimal Particle Network implementation for background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number, y: number, vx: number, vy: number, size: number }[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      })
    }

    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")
    setTimeout(() => setFormState("success"), 2000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" />

      <div className="max-w-7xl mx-auto w-full px-6 py-24 flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          {/* Holographic Availability Card */}
          <motion.div 
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass border border-white/20 mb-12 w-max relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
            <div className="w-3 h-3 rounded-full bg-mint shadow-[0_0_10px_#00E5C0] animate-pulse" />
            <span className="font-sans text-xs uppercase tracking-widest font-bold">Open for Projects — Fall 2026</span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] mb-8">
            <span className="text-bubblegum block">Let&apos;s</span>
            <span className="text-mint block">Create</span>
            <span className="text-gold block">Something</span>
            <span className="text-lavender block">Beautiful</span>
          </h1>

          <div className="flex gap-8 mt-8">
            {["Email", "Instagram", "Behance", "LinkedIn"].map((link) => (
              <a key={link} href="#" className="font-sans text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all hover:-translate-y-1" data-cursor-text="LINK">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side / Form */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
            
            {/* Success Confetti overlay */}
            <AnimatePresence>
              {formState === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
                >
                  <div className="text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center text-navy mb-4">
                      <Check size={32} />
                    </div>
                    <h3 className="font-display text-3xl uppercase">Message Sent</h3>
                    <p className="font-sans text-xs uppercase tracking-widest opacity-60 mt-2">I&apos;ll be in touch soon.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <input type="text" required className="w-full bg-transparent border-b border-foreground/20 py-4 outline-none font-display text-xl text-foreground peer placeholder-transparent" placeholder="Name" />
              <label className="absolute left-0 top-4 font-sans text-xs uppercase tracking-widest opacity-50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px] transition-all">What&apos;s your name?</label>
              {/* Neon underline */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_10px_var(--color-accent)]" />
            </div>

            <div className="relative group">
              <input type="email" required className="w-full bg-transparent border-b border-foreground/20 py-4 outline-none font-display text-xl text-foreground peer placeholder-transparent" placeholder="Email" />
              <label className="absolute left-0 top-4 font-sans text-xs uppercase tracking-widest opacity-50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px] transition-all">Your email address</label>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_10px_var(--color-accent)]" />
            </div>

            <div className="relative group">
              <textarea required className="w-full bg-transparent border-b border-foreground/20 py-4 outline-none font-display text-xl text-foreground peer placeholder-transparent resize-none h-32" placeholder="Message" />
              <label className="absolute left-0 top-4 font-sans text-xs uppercase tracking-widest opacity-50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px] transition-all">Tell me about your project</label>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_10px_var(--color-accent)]" />
            </div>

            <button 
              type="submit" 
              disabled={formState !== "idle"}
              className="relative w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center overflow-hidden hover:scale-110 transition-transform self-end group"
            >
              {formState === "idle" && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
              {formState === "loading" && (
                <motion.div 
                  className="w-6 h-6 border-2 border-background/20 border-t-background rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

import { AnimatePresence } from "framer-motion"
