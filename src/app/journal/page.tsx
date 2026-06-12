"use client"

import { motion } from "framer-motion"

const posts = [
  { slug: "process-behind-hm", title: "The Process Behind H&M's Persona Styling", category: "Behind the Scenes", date: "May 10, 2025" },
  { slug: "color-theory-retail", title: "Color Theory in Experiential Retail", category: "Process", date: "April 22, 2025" },
  { slug: "future-of-pop", title: "The Future of P.O.P. Displays", category: "Trend Watch", date: "April 05, 2025" },
  { slug: "blender-for-designers", title: "Why Every Designer Should Learn Blender", category: "Inspiration", date: "March 18, 2025" },
]

export default function Journal() {
  return (
    <div className="min-h-screen py-24 px-6 max-w-7xl mx-auto">
      <motion.h1 
        className="font-display text-5xl md:text-7xl uppercase mb-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        The <span className="font-serif italic text-lavender lowercase tracking-normal">Journal</span>
      </motion.h1>

      {/* Sketchbook Container */}
      <div className="relative w-full bg-[#f8f5f0] dark:bg-[#2a2a3a] text-[#333] dark:text-[#f8f5f0] shadow-2xl mx-auto" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.08%22/%3E%3C/svg%3E')"
      }}>
        {/* Torn Edge SVG Top */}
        <div className="absolute top-0 left-0 w-full h-8 -translate-y-full overflow-hidden flex">
          {Array.from({ length: 20 }).map((_, i) => (
            <svg key={i} className="h-full w-auto shrink-0 text-[#f8f5f0] dark:text-[#2a2a3a] fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,100 20,40 40,80 60,20 80,60 100,100" />
            </svg>
          ))}
        </div>

        <div className="p-8 md:p-16 lg:p-24 flex flex-col gap-24">
          
          {/* Magazine Spread - Featured Post */}
          <div className="flex flex-col lg:flex-row gap-12 border-b border-black/10 dark:border-white/10 pb-24">
            <div className="w-full lg:w-1/2">
              <h4 className="font-sans text-xs uppercase tracking-widest text-bubblegum mb-4">Featured Article</h4>
              <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] mb-8">Finding Inspiration in the Mundane</h2>
              
              <div className="columns-1 md:columns-2 gap-8 font-serif text-sm leading-relaxed text-justify opacity-80">
                <p>
                  <span className="float-left text-6xl leading-[0.8] pr-2 font-display">T</span>here is a profound beauty in the overlooked details of our daily environments. As a communication designer, I constantly find myself drawn to the unintentional compositions that form naturally in urban spaces. The way morning light hits a discarded receipt, the accidental color palette of peeling paint on a subway wall...
                </p>
                <p>
                  These mundane moments are often the genesis of my most complex spatial designs. By training our eyes to see the extraordinary within the ordinary, we unlock a boundless repository of visual references that transcend traditional Pinterest boards. This approach fundamentally shifts how we experience...
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative group cursor-none" data-cursor-text="READ">
              <div className="w-full aspect-4/5 bg-black/5 dark:bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-tr from-mint/20 to-bubblegum/20 group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>

          {/* Masonry Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {posts.map((post, i) => (
              <motion.div 
                key={i}
                className="bg-white dark:bg-[#1a1a2e] p-6 shadow-xl relative cursor-pointer break-inside-avoid group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, zIndex: 10, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`w-full bg-black/5 dark:bg-white/5 mb-6 relative overflow-hidden ${i % 2 === 0 ? "aspect-4/5" : "aspect-square"}`}>
                   <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h4 className="font-sans text-xs uppercase tracking-widest text-bubblegum mb-2">{post.category}</h4>
                <h3 className="font-display text-2xl uppercase mb-4 line-clamp-3 leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
                <span className="font-sans text-[10px] uppercase tracking-widest opacity-50">{post.date}</span>
              </motion.div>
            ))}
          </div>

          {/* Infinite Scroll Emulation */}
          <div className="flex justify-center mt-12 opacity-50 font-sans text-xs uppercase tracking-widest animate-pulse">
            Loading more entries...
          </div>

        </div>
      </div>
    </div>
  )
}
