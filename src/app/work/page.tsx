"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { projects, Project } from "@/data/projects"
import { Grid, List, Maximize } from "lucide-react"

export default function Work() {
  const [filter, setFilter] = useState("All")
  const [layoutMode, setLayoutMode] = useState<"gallery" | "list" | "cinematic">("gallery")
  const categories = ["All", "Art Direction", "Styling", "Space Design"]

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div className="relative min-h-screen py-24 px-6 max-w-7xl mx-auto">
      {/* Giant Background Number */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[-1] overflow-hidden">
        <motion.span 
          className="text-[40vw] font-display font-bold text-foreground/5 leading-none select-none"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          06
        </motion.span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <h1 className="font-display text-5xl md:text-7xl uppercase">Selected <br/><span className="font-serif italic text-accent lowercase tracking-normal">Works</span></h1>
        
        <div className="flex flex-col gap-4 items-end">
          {/* Liquid Morphing Filter Bar */}
          <div className="flex gap-2 p-1 rounded-full glass relative border border-foreground/10">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-colors z-10 ${filter === cat ? "text-background" : "text-foreground hover:text-accent"}`}
                data-cursor-text="FILTER"
              >
                {filter === cat && (
                  <motion.div 
                    layoutId="filter-blob"
                    className="absolute inset-0 bg-foreground rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Layout Toggles */}
          <div className="flex gap-4">
            <button onClick={() => setLayoutMode("gallery")} className={`p-2 transition-colors ${layoutMode === "gallery" ? "text-accent" : "text-foreground/50 hover:text-foreground"}`}><Grid size={20}/></button>
            <button onClick={() => setLayoutMode("list")} className={`p-2 transition-colors ${layoutMode === "list" ? "text-accent" : "text-foreground/50 hover:text-foreground"}`}><List size={20}/></button>
            <button onClick={() => setLayoutMode("cinematic")} className={`p-2 transition-colors ${layoutMode === "cinematic" ? "text-accent" : "text-foreground/50 hover:text-foreground"}`}><Maximize size={20}/></button>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <motion.div 
        layout
        className={`
          ${layoutMode === "gallery" ? "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8" : ""}
          ${layoutMode === "list" ? "flex flex-col gap-0" : ""}
          ${layoutMode === "cinematic" ? "flex flex-col gap-24" : ""}
        `}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={layoutMode === "gallery" ? "break-inside-avoid" : ""}
            >
              {layoutMode === "gallery" && <GalleryCard project={project} />}
              {layoutMode === "list" && <ListCard project={project} index={i} />}
              {layoutMode === "cinematic" && <CinematicCard project={project} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function GalleryCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group relative overflow-hidden rounded-2xl glass cursor-none" data-cursor-text="EXPLORE">
      <div className="aspect-[4/5] bg-foreground/5 relative overflow-hidden">
        {/* Hover zoom & grain overlay */}
        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] z-20 pointer-events-none" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {/* Variable font weight emulation via text shadow / stroke */}
        <h3 className="font-display text-2xl uppercase group-hover:font-bold transition-all duration-300">{project.title}</h3>
        <span className="font-sans text-xs uppercase tracking-widest text-accent">{project.category}</span>
        
        {/* Sweeping progress bar on hover */}
        <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out" />
      </div>
      {/* Rotating Badge */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-sans text-[8px] uppercase font-bold tracking-widest origin-center animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity z-30">
        {project.category.split(" ")[0]}
      </div>
    </Link>
  )
}

function ListCard({ project, index }: { project: Project, index: number }) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex items-center justify-between py-8 border-b border-foreground/10 hover:border-accent transition-colors cursor-none" data-cursor-text="EXPLORE">
      <div className="flex items-center gap-8">
        <span className="font-sans text-sm opacity-30">0{index + 1}</span>
        <h3 className="font-display text-3xl md:text-5xl uppercase group-hover:text-accent transition-colors group-hover:translate-x-4 duration-300">{project.title}</h3>
      </div>
      <span className="font-sans text-sm uppercase tracking-widest opacity-60 hidden md:block">{project.category}</span>
    </Link>
  )
}

function CinematicCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group relative w-full h-[70vh] rounded-3xl overflow-hidden cursor-none" data-cursor-text="EXPLORE">
      <div className="absolute inset-0 bg-foreground/5 group-hover:scale-105 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
        <span className="font-sans text-xs uppercase tracking-widest text-accent mb-4 block overflow-hidden">
          <motion.span className="block" initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.5 }}>{project.category}</motion.span>
        </span>
        <h3 className="font-display text-5xl md:text-8xl uppercase leading-none overflow-hidden">
          <motion.span className="block group-hover:font-bold transition-all duration-300" initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {project.title}
          </motion.span>
        </h3>
      </div>
    </Link>
  )
}
