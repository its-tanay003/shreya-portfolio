"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Monitor, Camera, PenTool, LayoutTemplate, Sparkles, Box } from "lucide-react"

const services = [
  { title: "Art Direction & Creative Strategy", icon: <Monitor size={32} />, desc: "Conceptualizing and guiding the visual narrative for brands and campaigns." },
  { title: "Product & Food Styling", icon: <Camera size={32} />, desc: "Crafting visually appetizing and aesthetically pleasing compositions for products." },
  { title: "Visual Storytelling", icon: <PenTool size={32} />, desc: "Translating brand values into compelling visual narratives across mediums." },
  { title: "Window & Retail Display", icon: <LayoutTemplate size={32} />, desc: "Designing immersive and engaging physical retail spaces." },
  { title: "Brand Identity", icon: <Sparkles size={32} />, desc: "Developing cohesive visual identities that resonate with the target audience." },
  { title: "3D Space Visualisation", icon: <Box size={32} />, desc: "Creating detailed 3D models and environments using Blender." },
]

export default function Services() {
  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
      <motion.h1 
        className="font-display text-5xl md:text-7xl uppercase mb-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What I <span className="font-serif italic text-gold lowercase tracking-normal">Offer</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} />
        ))}
      </div>

      <motion.div 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl uppercase text-center mb-16">How I Work</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-foreground/10 -translate-y-1/2 z-0" />
          
          {["Brief", "Concept", "Execute", "Deliver"].map((step, i) => (
            <motion.div 
              key={step}
              className="z-10 bg-background flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center font-display text-2xl mb-4 bg-background">
                {i + 1}
              </div>
              <h3 className="font-sans uppercase tracking-widest text-sm font-bold">{step}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ServiceCard({ service, index }: { service: { title: string, icon: React.ReactNode, desc: string }, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div 
      className="h-64 relative perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d transition-all duration-500 ease-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 border border-foreground/10">
          <div className="text-bubblegum">{service.icon}</div>
          <h3 className="font-display text-xl uppercase">{service.title}</h3>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden glass rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-foreground text-background border border-foreground/20"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-sans text-sm leading-relaxed">{service.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
