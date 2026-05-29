"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Total preloader time 2.5 - 3s
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          exit={{ 
            clipPath: [
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", // shatter/split effect
              "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
            ],
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

          <div className="relative flex items-center justify-center w-48 h-48 mb-8">
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="301.59"
                initial={{ strokeDashoffset: 301.59 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </svg>

            {/* S.S SVG drawing */}
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M 60 30 C 40 30, 30 40, 50 50 C 70 60, 60 70, 40 70"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.circle 
                cx="70" cy="70" r="2" fill="white" stroke="none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
              />
              <motion.path
                d="M 30 30 C 10 30, 0 40, 20 50 C 40 60, 30 70, 10 70"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
              />
              <motion.circle 
                cx="40" cy="70" r="2" fill="white" stroke="none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              />
            </svg>
          </div>

          <motion.div 
            className="font-mono text-xs uppercase tracking-[0.2em] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Creative Universe...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
