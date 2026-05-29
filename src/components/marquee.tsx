"use client"

import { motion } from "framer-motion"

interface MarqueeProps {
  text: string
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden bg-foreground py-6 text-background flex whitespace-nowrap">
      <motion.div 
        className="flex font-display text-2xl md:text-4xl uppercase tracking-widest gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  )
}
