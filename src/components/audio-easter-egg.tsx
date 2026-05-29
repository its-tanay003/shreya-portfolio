"use client"

import { useEffect } from "react"
import { Howl } from "howler"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function AudioEasterEgg() {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    // Visual-only Easter Egg (Audio removed to fix 404)

    let buffer: string[] = []
    const secretCode = "DESIGN"

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      buffer.push(e.key.toUpperCase())
      if (buffer.length > secretCode.length) {
        buffer.shift()
      }

      if (buffer.join("") === secretCode) {
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        buffer = []
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full glass border border-accent/50 flex items-center gap-3 text-accent shadow-[0_0_20px_rgba(255,110,180,0.3)] pointer-events-none"
        >
          <Sparkles size={16} className="animate-pulse" />
          <span className="font-sans text-xs uppercase tracking-widest font-bold">Creative Mode Unlocked</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
