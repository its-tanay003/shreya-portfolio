"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const SkillsScene = dynamic(() => import("@/components/skills-scene").then((mod) => mod.SkillsScene), { ssr: false })

function ProficiencyRing({ percentage, label }: { percentage: number, label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="4" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-accent)" 
            strokeWidth="4"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-xl">{percentage}%</div>
      </div>
      <span className="font-sans text-xs uppercase tracking-widest opacity-60 text-center">{label}</span>
    </div>
  )
}

export default function Skills() {
  const [learningText, setLearningText] = useState("")
  const fullText = "> loading new skills... generative_ai... node.js... ✓ complete."

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setLearningText(fullText.substring(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen py-24 overflow-hidden">
      {/* ASCII Art Background */}
      <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none overflow-hidden flex flex-wrap leading-none font-mono text-[8px] break-all">
        {Array.from({ length: 50 }).map(() => "/* TOOLS */ // DESIGN // CREATIVE // 3D // ART // ".repeat(20)).join(" ")}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          className="font-display text-5xl md:text-7xl uppercase mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Creative <span className="font-serif italic text-accent lowercase">Orbit</span>
        </motion.h1>

        {/* 3D Solar System */}
        <div className="w-full h-[60vh] rounded-3xl overflow-hidden glass mb-24 cursor-grab active:cursor-grabbing border border-foreground/10">
          <SkillsScene />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-24">
          
          {/* Fan-out Card Stacks */}
          <div className="flex justify-center h-64 relative perspective-1000">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-80 glass rounded-2xl p-6 border border-white/20 flex flex-col justify-between origin-bottom shadow-2xl"
                initial={{ rotateZ: 0, y: i * -10 }}
                whileHover={{ rotateZ: (i - 1) * 15, y: -20, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ zIndex: 3 - i }}
              >
                <div className="font-sans text-xs uppercase tracking-widest opacity-50">Stack 0{i+1}</div>
                <h3 className="font-display text-2xl uppercase">
                  {i === 0 ? "Design Thinking" : i === 1 ? "Spatial Layout" : "Art Direction"}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* SVG Animated Rings */}
          <div className="grid grid-cols-2 gap-8">
            <ProficiencyRing percentage={95} label="Visual Communication" />
            <ProficiencyRing percentage={88} label="Styling" />
            <ProficiencyRing percentage={85} label="Spatial Design" />
            <ProficiencyRing percentage={75} label="3D Modeling" />
          </div>

        </div>

        {/* Currently Learning Terminal */}
        <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-black text-green-400 font-mono text-sm">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="min-h-[20px]">{learningText}<span className="animate-pulse">_</span></p>
        </div>

      </div>
    </div>
  )
}
