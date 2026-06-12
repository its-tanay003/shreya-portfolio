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

      <div className="max-w-4xl mx-auto mb-32 flex flex-col border-t border-foreground/10">
        {services.map((service, i) => (
          <ServiceAccordion key={i} service={service} index={i} />
        ))}
      </div>

      <motion.div 
        className="py-16 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl uppercase text-center mb-16">How I Work</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-foreground/10 -translate-y-1/2 z-0" />
          
          {["Brief", "Concept", "Execute", "Deliver"].map((step, i) => (
            <motion.div 
              key={step}
              className="z-10 bg-transparent flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center font-display text-2xl mb-4 bg-background/80 backdrop-blur-md">
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

function ServiceAccordion({ service, index }: { service: { title: string, icon: React.ReactNode, desc: string }, index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-foreground/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group transition-colors hover:text-accent cursor-none"
        data-cursor-text={isOpen ? "CLOSE" : "EXPAND"}
      >
        <div className="flex items-center gap-6">
          <span className="font-sans text-sm opacity-30 font-bold">0{index + 1}</span>
          <h3 className="font-display text-3xl md:text-5xl uppercase transition-transform duration-300 group-hover:translate-x-2">
            {service.title}
          </h3>
        </div>
        <div className="text-foreground/50 group-hover:text-accent transition-colors">
          {isOpen ? <div className="w-6 h-[2px] bg-current" /> : <div className="relative w-6 h-6 flex items-center justify-center"><div className="absolute w-6 h-[2px] bg-current" /><div className="absolute w-[2px] h-6 bg-current" /></div>}
        </div>
      </button>

      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="pb-8 pt-2 flex flex-col md:flex-row gap-8 items-start pl-0 md:pl-12">
          <div className="text-accent bg-accent/10 p-4 rounded-2xl">
            {service.icon}
          </div>
          <p className="font-sans text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl">
            {service.desc}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
