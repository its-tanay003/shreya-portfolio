"use client"

import { motion } from "framer-motion"

import { Compass, Sparkles, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"

// SVG Radar Chart Component
function RadarChart() {
  const data = [
    { label: "Art Direction", value: 90 },
    { label: "Spatial Thinking", value: 85 },
    { label: "Colour Theory", value: 95 },
    { label: "Brand Storytelling", value: 88 },
    { label: "Digital Craft", value: 80 }
  ]
  
  const size = 300
  const center = size / 2
  const radius = size / 2 - 40
  const angleStep = (Math.PI * 2) / data.length

  // Calculate points for polygon
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (d.value / 100) * radius
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
  }).join(" ")

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background webs */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <polygon
            key={i}
            points={data.map((_, j) => {
              const angle = j * angleStep - Math.PI / 2
              return `${center + radius * scale * Math.cos(angle)},${center + radius * scale * Math.sin(angle)}`
            }).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
          />
        ))}
        {/* Axes */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="currentColor"
              strokeOpacity="0.1"
            />
          )
        })}
        {/* Data polygon */}
        <motion.polygon
          points={points}
          fill="var(--color-accent)"
          fillOpacity="0.2"
          stroke="var(--color-accent)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", delay: 0.5 }}
          style={{ transformOrigin: "center" }}
        />
        {/* Labels */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x = center + (radius + 20) * Math.cos(angle)
          const y = center + (radius + 20) * Math.sin(angle)
          return (
            <text
              key={i}
              x={x} y={y}
              fill="currentColor"
              fontSize="10"
              fontFamily="var(--font-sans)"
              textAnchor="middle"
              dominantBaseline="middle"
              className="uppercase tracking-widest opacity-60"
            >
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export default function About() {
  const [blobRadius, setBlobRadius] = useState("60% 40% 30% 70% / 60% 30% 70% 40%")

  useEffect(() => {
    const interval = setInterval(() => {
      const r = () => Math.floor(Math.random() * 40 + 30) // 30-70%
      setBlobRadius(`${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen py-24 overflow-hidden">
      {/* 4-Color Moving Gradient Mesh Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden opacity-30">
        <motion.div 
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-bubblegum mix-blend-multiply blur-[100px]"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-mint mix-blend-multiply blur-[100px]"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }} transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-[10%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-gold mix-blend-multiply blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-[20%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-lavender mix-blend-multiply blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }} transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Entry: Scattered Fragments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          
          <motion.div 
            className="relative flex justify-center items-center"
            initial={{ x: -200, opacity: 0, rotate: -20 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            {/* Animated clip-path blob portrait */}
            <div 
              className="relative w-[300px] h-[400px] overflow-hidden transition-all duration-2000 ease-in-out border border-white/20 glass"
              style={{ borderRadius: blobRadius }}
            >
              <div className="absolute inset-0 bg-foreground/10" />
              {/* Fallback portrait box if image fails */}
              <div className="absolute inset-0 flex items-center justify-center font-display text-2xl uppercase opacity-20">Portrait</div>
            </div>

            {/* Orbiting micro-elements */}
            <motion.div 
              className="absolute w-[400px] h-[400px] border border-dashed border-foreground/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-bubblegum rounded-full flex items-center justify-center shadow-[0_0_15px_#FF6EB4]">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-mint rounded-full flex items-center justify-center shadow-[0_0_15px_#00E5C0]">
                <Compass size={12} className="text-navy" />
              </div>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.h1 
              className="font-display text-5xl md:text-7xl uppercase leading-none"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
            >
              Hello, <br/>
              <span className="font-serif italic text-accent lowercase tracking-normal">I&apos;m Shreya</span>
            </motion.h1>
            
            <motion.div 
              className="font-sans text-lg md:text-xl leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {"I design experiences that feel like stories. Working at the intersection of physical spaces and digital narratives, I bring brands to life through art direction, product styling, and immersive retail design.".split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Personality Bubbles */}
            <div className="flex flex-wrap gap-4 mt-8">
              {["Visual Thinker", "Spatial Designer", "Coffee Enthusiast", "Detail Obsessed"].map((tag, i) => (
                <motion.div 
                  key={tag}
                  className="px-4 py-2 rounded-full border border-foreground/20 glass text-xs uppercase tracking-widest cursor-default"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + (i * 0.1), type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* My Design DNA (Radar) & Education (Holographic Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center">
            <h2 className="font-display text-3xl uppercase mb-12">My Design DNA</h2>
            <RadarChart />
          </div>

          <div className="flex flex-col gap-12">
            <h2 className="font-display text-3xl uppercase">Credentials</h2>
            
            {/* Holographic ID Card */}
            <motion.div 
              className="relative w-full max-w-md h-48 rounded-xl border border-white/30 overflow-hidden glass p-6 flex flex-col justify-between group"
              whileHover={{ rotateY: 10, rotateX: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Holographic sweep */}
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
              
              <div className="flex justify-between items-start">
                <BookOpen className="text-accent" size={24} />
                <span className="font-mono text-xs uppercase opacity-50">ID: NIFT-2023</span>
              </div>
              
              <div>
                <h3 className="font-display text-xl uppercase mb-1">B.Des in Fashion Communication</h3>
                <p className="font-sans text-sm uppercase tracking-widest opacity-80">National Institute of Fashion Technology</p>
                <p className="font-sans text-xs opacity-50 mt-2">Gandhinagar • 2019 - 2023</p>
              </div>
            </motion.div>
          </div>
        </div>

      <Timeline />
      </div>
    </div>
  )
}

const timelineData = [
  {
    year: "2023 - Present",
    role: "Freelance Art Director",
    company: "Independent",
    desc: "Collaborating with premium brands to create compelling visual narratives, product styling, and spatial designs."
  },
  {
    year: "2022 - 2023",
    role: "Visual Merchandiser",
    company: "H&M India",
    desc: "Executed global campaign guidelines across flagship stores, enhancing customer journey and brand presentation."
  },
  {
    year: "2021",
    role: "Design Intern",
    company: "Paperboat",
    desc: "Assisted in packaging design and brand storytelling campaigns for seasonal product launches."
  }
]

function Timeline() {
  return (
    <div className="mt-32 pt-32 border-t border-white/10 relative">
      <h2 className="font-display text-4xl md:text-5xl uppercase mb-24 text-center">Journey So Far</h2>
      
      <div className="relative max-w-4xl mx-auto px-4 md:px-0">
        {/* Vertical Line */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/20 md:-translate-x-1/2" />
        
        {timelineData.map((item, index) => (
          <motion.div 
            key={index}
            className={`relative flex flex-col md:flex-row gap-8 md:gap-16 mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-accent -translate-x-1/2 mt-1 shadow-[0_0_15px_var(--color-accent)] z-10" />
            
            {/* Content Box */}
            <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <span className="font-mono text-sm text-accent tracking-widest">{item.year}</span>
              <h3 className="font-display text-2xl uppercase mt-2 mb-1">{item.role}</h3>
              <h4 className="font-sans font-bold text-foreground/70 uppercase tracking-wider text-sm mb-4">{item.company}</h4>
              <p className={`font-sans text-foreground/60 leading-relaxed text-sm md:w-[80%] inline-block ${index % 2 === 0 ? 'float-right' : 'float-left'}`}>{item.desc}</p>
            </div>
            
            {/* Empty space for other side on desktop */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
