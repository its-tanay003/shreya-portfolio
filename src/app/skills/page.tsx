"use client"

import { motion } from "framer-motion"
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
  return (
    <div className="relative min-h-screen py-24 overflow-hidden">
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-bubblegum/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-mint/20 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          className="font-display text-5xl md:text-8xl uppercase mb-6 text-center leading-[0.9]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Creative <span className="font-serif italic text-accent lowercase">Orbit</span>
        </motion.h1>
        <motion.p 
          className="font-sans text-sm md:text-base uppercase tracking-widest opacity-60 text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The tools and disciplines that shape my visual universe.
        </motion.p>

        {/* 3D Solar System */}
        <div className="w-full h-[60vh] rounded-4xl overflow-hidden glass mb-32 cursor-grab active:cursor-grabbing border border-white/10 relative shadow-2xl">
          <div className="absolute top-6 left-6 font-sans text-xs uppercase tracking-widest opacity-50 pointer-events-none z-10">Interactive Map</div>
          <SkillsScene />
        </div>

        {/* Core Methodology Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-foreground/10 pb-8">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wider">Methodology</h2>
            <p className="font-sans text-xs uppercase tracking-widest opacity-50 max-w-xs text-right hidden md:block">
              A structured approach to visual problem solving and artistic direction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Design Thinking",
                desc: "Empathizing with visual goals, defining visual styling problems, and ideating premium visual stories that capture user attention."
              },
              {
                title: "Spatial Layout",
                desc: "Arranging physical elements, designing display windows, and curating experiential spaces to establish a seamless visual flow."
              },
              {
                title: "Art Direction",
                desc: "Directing aesthetics, choosing curated color systems, and orchestrating visual styling concepts across digital and physical mediums."
              }
            ].map((method, i) => (
              <motion.div
                key={i}
                className="w-full glass rounded-3xl p-10 border border-white/5 flex flex-col gap-12 relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="font-sans text-xs uppercase tracking-widest text-accent relative z-10">Phase 0{i+1}</div>
                <div className="relative z-10">
                  <h3 className="font-display text-3xl uppercase mb-4">
                    {method.title}
                  </h3>
                  <p className="font-sans text-sm opacity-60 leading-relaxed">
                    {method.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proficiency Metrics Section */}
        <div className="mb-32 pb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-foreground/10 pb-8">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wider">Skill Metrics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <ProficiencyRing percentage={95} label="Visual Comm." />
            <ProficiencyRing percentage={88} label="Styling" />
            <ProficiencyRing percentage={85} label="Spatial Design" />
            <ProficiencyRing percentage={75} label="3D Modeling" />
          </div>
        </div>

      </div>
    </div>
  )
}
