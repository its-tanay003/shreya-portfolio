"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import Link from "next/link"
import { useRef, use } from "react"
import { ArrowLeft } from "lucide-react"

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const projectIndex = projects.findIndex(p => p.slug === slug)
  const project = projects[projectIndex]
  
  if (!project) notFound()

  const nextProject = projects[(projectIndex + 1) % projects.length]

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-transparent text-foreground">
      {/* Parallax Hero */}
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div 
          style={{ y: heroY }} 
          className="absolute inset-0 bg-foreground/10"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background z-10" />
        
        <div className="absolute bottom-24 left-6 md:left-12 z-20 max-w-4xl">
          <Link href="/work" className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest hover:text-accent transition-colors mb-8" data-cursor-text="BACK">
            <ArrowLeft size={16} /> Back to Work
          </Link>
          <motion.div className="overflow-hidden">
            <motion.h1 
              className="font-display text-5xl md:text-8xl uppercase leading-[0.9] mix-blend-difference text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {project.title}
            </motion.h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16 relative z-20 bg-transparent">
        {/* Sticky Metadata Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-32 flex flex-col gap-8">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest opacity-50 mb-2">Category</h4>
              <p className="font-display text-xl uppercase">{project.category}</p>
            </div>
            {project.visualIdentity && (
              <div>
                <h4 className="font-sans text-xs uppercase tracking-widest opacity-50 mb-2">Visual Identity</h4>
                <p className="font-display text-xl uppercase leading-tight">{project.visualIdentity}</p>
              </div>
            )}
            {project.pillars && project.pillars.length > 0 && (
              <div>
                <h4 className="font-sans text-xs uppercase tracking-widest opacity-50 mb-2">Pillars</h4>
                <ul className="flex flex-wrap gap-2">
                  {project.pillars.map((pillar, i) => (
                    <li key={i} className="font-display text-xs uppercase px-3 py-1 rounded-full border border-foreground/20">{pillar}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Content & Timeline */}
        <div className="w-full md:w-3/4 flex flex-col gap-24">
          <motion.div 
            className="flex flex-col gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {project.overview && (
              <div>
                <h3 className="font-display text-3xl md:text-5xl uppercase mb-6">Overview</h3>
                <p className="font-sans text-xl md:text-2xl leading-relaxed opacity-80">{project.overview}</p>
              </div>
            )}
            {project.objective && (
              <div>
                <h3 className="font-display text-3xl md:text-5xl uppercase mb-6 text-accent">Objective</h3>
                <p className="font-sans text-xl md:text-2xl leading-relaxed opacity-80">{project.objective}</p>
              </div>
            )}
          </motion.div>

          {/* Curtain Reveal Images */}
          <div className="flex flex-col gap-16">
            {[1, 2, 3].map((img, i) => (
              <CurtainImage key={i} index={i} />
            ))}
          </div>

          {/* SVG Drawing Process Timeline */}
          {project.process && project.process.length > 0 && (
            <div className="py-12 relative">
              <h3 className="font-display text-4xl md:text-6xl uppercase mb-16">The Process</h3>
              <ProcessTimeline steps={project.process} />
            </div>
          )}
        </div>
      </div>

      {/* Next Project Footer - Slide up effect */}
      <div className="h-screen bg-foreground text-background flex items-center justify-center sticky bottom-0 z-[-1]">
        <div className="text-center">
          <span className="font-sans text-xs uppercase tracking-widest opacity-50 block mb-4">Next Project</span>
          <Link href={`/work/${nextProject.slug}`} className="group cursor-none" data-cursor-text="NEXT">
            <h2 className="font-display text-6xl md:text-9xl uppercase tracking-tighter group-hover:text-accent transition-colors">
              {nextProject.title}
            </h2>
          </Link>
        </div>
      </div>
      {/* Spacer to push content down so sticky footer reveals */}
      <div className="h-screen bg-transparent pointer-events-none" />
    </div>
  )
}

function CurtainImage({ index }: { index: number }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden glass rounded-2xl group cursor-none" data-cursor-text="ZOOM">
      {/* The actual image placeholder */}
      <div className="absolute inset-0 bg-foreground/10 scale-105 group-hover:scale-100 transition-transform duration-1000" />
      
      {/* Curtain Element */}
      <motion.div 
        className="absolute inset-0 bg-background z-10 origin-left"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 + (index * 0.1) }}
      />
    </div>
  )
}

function ProcessTimeline({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  })

  return (
    <div ref={ref} className="relative pl-8">
      {/* SVG Line that draws itself */}
      <svg className="absolute top-0 left-[15px] h-full w-2 overflow-visible" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
        <motion.line 
          x1="0" y1="0" x2="0" y2="100%" 
          stroke="var(--color-accent)" 
          strokeWidth="2"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      {steps.map((step, i) => (
        <div key={i} className="mb-16 relative">
          <motion.div 
            className="absolute left-[-33px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", delay: 0.2 }}
          />
          <motion.h4 
            className="font-display text-2xl md:text-4xl uppercase mb-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
          >
            0{i + 1}
          </motion.h4>
          <motion.p 
            className="font-sans text-lg opacity-80"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {step}
          </motion.p>
        </div>
      ))}
    </div>
  )
}
