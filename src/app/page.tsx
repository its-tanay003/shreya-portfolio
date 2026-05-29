"use client"

import dynamic from "next/dynamic"
const HeroScene = dynamic(() => import("@/components/hero-scene").then((mod) => mod.HeroScene), { ssr: false })
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const nameLetters = "SHREYA SHREE".split("")
  
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden -mt-24">
        <HeroScene />
        
        <div className="z-10 text-center pointer-events-none px-6 flex flex-col items-center mt-24">
          <div className="flex overflow-hidden">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-7xl md:text-[9rem] font-bold uppercase tracking-tighter text-ivory drop-shadow-2xl"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  damping: 12, 
                  stiffness: 100, 
                  delay: 2.8 + (i * 0.05) 
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle Split Reveal */}
          <div className="relative h-12 overflow-hidden mt-4">
            <motion.div
              className="font-sans text-xl tracking-[0.4em] uppercase text-mint"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
            >
              Communication Designer
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="mt-16 pointer-events-auto"
          >
            <Link 
              href="/work" 
              className="group relative inline-flex items-center justify-center w-40 h-40"
              data-cursor-text="EXPLORE"
            >
              <div className="absolute inset-0 bg-bubblegum/20 backdrop-blur-md border border-white/20 text-white font-sans text-xs uppercase tracking-widest flex items-center justify-center transition-all duration-700
                [border-radius:60%_40%_30%_70%/60%_30%_70%_40%] animate-[blob_8s_ease-in-out_infinite] group-hover:[border-radius:50%] group-hover:bg-bubblegum group-hover:scale-110"
              >
                <span className="z-10 group-hover:text-white mix-blend-difference text-center">View <br/> Universe</span>
              </div>
            </Link>
          </motion.div>
        </div>
        
        {/* Double Marquee */}
        <div className="absolute bottom-10 w-full rotate-[-2deg] scale-110 z-20 pointer-events-none">
          <div className="glass py-3 overflow-hidden border-y border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 w-full" />
            
            <motion.div 
              className="flex whitespace-nowrap font-display text-sm md:text-xl uppercase tracking-widest text-mint/80 mb-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              <span className="px-4">ART DIRECTION ✦ PRODUCT STYLING ✦ VISUAL STORYTELLING ✦ WINDOW DISPLAY ✦ SPACE DESIGN ✦</span>
              <span className="px-4">ART DIRECTION ✦ PRODUCT STYLING ✦ VISUAL STORYTELLING ✦ WINDOW DISPLAY ✦ SPACE DESIGN ✦</span>
            </motion.div>
            
            <motion.div 
              className="flex whitespace-nowrap font-display text-sm md:text-xl uppercase tracking-widest text-bubblegum/80"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              <span className="px-4">NIFT GANDHINAGAR ✦ BLENDER ✦ FIGMA ✦ ADOBE SUITE ✦ EXPERIENTIAL RETAIL ✦</span>
              <span className="px-4">NIFT GANDHINAGAR ✦ BLENDER ✦ FIGMA ✦ ADOBE SUITE ✦ EXPERIENTIAL RETAIL ✦</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Journey */}
      <HorizontalScroll />

      {/* Featured Projects Teaser */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-transparent">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-display text-4xl md:text-6xl uppercase font-bold tracking-tighter">Selected Works</h2>
          <Link href="/work" className="font-sans text-sm md:text-base tracking-widest uppercase hover:text-bubblegum transition-colors mb-2" data-cursor-text="ALL WORK">
            View All →
          </Link>
        </div>

        <div className="relative h-[80vh] flex flex-col items-center justify-center perspective-1000">
          {[
            { title: "H&M Art Direction", color: "bg-bubblegum/20" },
            { title: "Chocolate Food Styling", color: "bg-gold/20" },
            { title: "Paperboat Window Display", color: "bg-mint/20" }
          ].map((project, i) => (
            <motion.div
              key={i}
              className={`absolute w-full md:w-3/4 h-[50vh] ${project.color} backdrop-blur-md rounded-3xl border border-white/20 p-8 flex flex-col justify-end overflow-hidden group cursor-pointer`}
              style={{ top: i * 40, zIndex: i }}
              initial={{ rotateX: 20, y: 100, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, zIndex: 50 }}
              data-cursor-text="VIEW PROJECT"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              {/* Noise overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
              
              <h3 className="font-display text-4xl md:text-5xl uppercase text-white mix-blend-difference z-10">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-foreground/10 bg-background/20 backdrop-blur-md flex flex-wrap justify-around items-center gap-8 relative z-10">
        {[
          { num: "5+", label: "Projects" },
          { num: "3", label: "Design Disciplines" },
          { num: "2", label: "Years Experience" },
          { num: "1", label: "Design Vision" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <motion.div 
              className="font-display text-5xl md:text-6xl text-mint"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
            >
              {stat.num}
            </motion.div>
            <span className="font-sans text-xs uppercase tracking-widest opacity-60">{stat.label}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  const panels = [
    { title: "The Art Director", color: "bg-navy text-ivory", desc: "Setting the visual language." },
    { title: "The Stylist", color: "bg-bubblegum text-navy", desc: "Curating the perfect frame." },
    { title: "The Space Maker", color: "bg-mint text-navy", desc: "Designing experiential retail." },
    { title: "The Visual Narrator", color: "bg-gold text-navy", desc: "Storytelling through design." }
  ]

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {panels.map((panel, i) => (
            <div 
              key={i} 
              className={`w-screen h-screen flex flex-col items-center justify-center p-12 ${panel.color} flex-shrink-0 relative overflow-hidden`}
            >
              {/* Floating abstract element */}
              <motion.div 
                className="absolute w-[40vw] h-[40vw] rounded-full mix-blend-overlay opacity-20 blur-3xl bg-white"
                animate={{ x: ["-20%", "20%"], y: ["-20%", "20%"] }}
                transition={{ duration: 10 + i, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-4 text-center z-10">{panel.title}</h2>
              <p className="font-sans text-xl md:text-2xl tracking-widest uppercase opacity-80 z-10">{panel.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
