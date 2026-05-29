"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Hexagon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Dynamic Cosmic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-bubblegum mix-blend-multiply blur-[120px]"
          animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-navy mix-blend-multiply blur-[120px]"
          animate={{ x: [0, -100, 50, 0], y: [0, 100, -50, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Floating Hexagon Element */}
        <motion.div
          animate={{ rotate: 360, y: [-10, 10, -10] }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-8 text-accent/50"
        >
          <Hexagon size={64} strokeWidth={1} />
        </motion.div>

        {/* Glitchy 404 Text */}
        <motion.h1 
          className="font-display text-[12rem] md:text-[18rem] leading-none tracking-tighter mix-blend-difference"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <span className="relative inline-block">
            4
            <motion.span
              className="absolute top-0 left-0 text-bubblegum opacity-50 -z-10"
              animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            >
              4
            </motion.span>
          </span>
          <span className="text-transparent text-stroke-white text-stroke-1 italic font-serif mx-2">0</span>
          <span className="relative inline-block">
            4
            <motion.span
              className="absolute top-0 left-0 text-mint opacity-50 -z-10"
              animate={{ x: [2, -2, 2], y: [-1, 1, -1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", delay: 0.1 }}
            >
              4
            </motion.span>
          </span>
        </motion.h1>

        <motion.p 
          className="font-sans text-xl md:text-2xl mt-8 mb-12 uppercase tracking-[0.2em] text-foreground/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          This space doesn&apos;t exist in the current dimension.
        </motion.p>

        {/* Magnetic Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/" 
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-foreground/20 hover:border-foreground/60 transition-colors bg-background/50 backdrop-blur-md"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans uppercase tracking-widest text-sm font-bold">Return to Reality</span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 font-mono text-xs opacity-30">
        LAT: ERR_404 // LONG: VOID
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs opacity-30">
        SIGNAL LOST
      </div>
    </div>
  )
}
