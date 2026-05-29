"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const experiments = [
  { id: 1, title: "Liquid Dynamics", status: "Active" },
  { id: 2, title: "Kinetic Typography", status: "Archived" },
  { id: 3, title: "WebGL Distortion", status: "Active" },
  { id: 4, title: "Spatial Audio Interaction", status: "WIP" },
]

export default function Lab() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[-1] overflow-hidden opacity-5">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="min-w-full min-h-full object-cover mix-blend-difference"
        >
          {/* A cool noisy/glitchy placeholder texture effect would go here */}
        </video>
      </div>

      <motion.h1 
        className="font-display text-5xl md:text-8xl uppercase mb-20 flex flex-col"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="text-foreground/50">Experimental</span>
        <span className="text-mint">Laboratory</span>
      </motion.h1>

      <div className="grid grid-cols-1 border-t border-foreground/10">
        {experiments.map((exp) => (
          <motion.div 
            key={exp.id}
            className="group relative border-b border-foreground/10 py-12 cursor-none"
            onMouseEnter={() => setHoveredExp(exp.id)}
            onMouseLeave={() => setHoveredExp(null)}
            data-cursor-text="PLAY"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-accent/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-[-1]" />
            
            <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between gap-4 px-4">
              <div className="flex items-baseline gap-8">
                <span className="font-sans text-xs opacity-50 font-bold">0{exp.id}</span>
                <h2 className="font-display text-4xl md:text-6xl uppercase group-hover:text-accent group-hover:translate-x-4 transition-all duration-500">
                  {exp.title}
                </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span className="font-sans text-xs uppercase tracking-widest opacity-70">
                  {exp.status}
                </span>
              </div>
            </div>

            {/* Hover Image Reveal (Abstract Placeholder) */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-foreground/10 mix-blend-difference pointer-events-none z-10 hidden md:block"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={hoveredExp === exp.id ? { opacity: 1, scale: 1, rotate: 5 } : { opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.5%22/%3E%3C/svg%3E')"
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
