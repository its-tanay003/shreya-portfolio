"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState("")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - (isHovered ? 40 : 10))
      mouseY.set(e.clientY - (isHovered ? 40 : 10))
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest("a, button, [data-cursor-text]")
      
      if (isInteractive) {
        setIsHovered(true)
        const text = isInteractive.getAttribute("data-cursor-text")
        if (text) setCursorText(text)
        else setCursorText("")
      } else {
        setIsHovered(false)
        setCursorText("")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [mouseX, mouseY, isHovered])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference hidden md:flex items-center justify-center font-sans text-[10px] font-bold tracking-widest text-background"
      style={{
        x: cursorX,
        y: cursorY,
        width: isHovered ? 80 : 20,
        height: isHovered ? 80 : 20,
        backgroundColor: "var(--color-accent)",
        borderRadius: "50%",
        boxShadow: "0 0 20px var(--color-accent)",
      }}
    >
      <AnimatePresence>
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute text-background"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

import { AnimatePresence } from "framer-motion"
