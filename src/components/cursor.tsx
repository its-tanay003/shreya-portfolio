"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

export function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState("")

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  
  // Spring configurations for 0.12s lerp feel
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 }
  const ringX = useSpring(dotX, springConfig)
  const ringY = useSpring(dotY, springConfig)

  const idleTimer = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Move exact dot and target ring
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)

      // Spawning trail dot programmatically for 60fps zero-react-render lag
      createTrail(e.clientX, e.clientY)

      // Reset idle timer
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current)
      }
      idleTimer.current = window.setTimeout(() => {
        // Idle breathing trigger (haptics)
        if ("vibrate" in navigator) {
          navigator.vibrate(5)
        }
      }, 3000)
    }

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement("div")
      trail.className = "cursor-trail"
      trail.style.left = `${x}px`
      trail.style.top = `${y}px`
      trail.style.position = "fixed"
      trail.style.width = "4px"
      trail.style.height = "4px"
      trail.style.borderRadius = "50%"
      trail.style.pointerEvents = "none"
      trail.style.zIndex = "99"
      trail.style.background = "var(--glow-color)"
      trail.style.opacity = "0.5"
      trail.style.transform = "translate(-50%, -50%)"
      document.body.appendChild(trail)

      // Animate fade and scale down
      setTimeout(() => {
        trail.style.transition = "transform 0.4s ease, opacity 0.4s ease"
        trail.style.transform = "translate(-50%, -50%) scale(0)"
        trail.style.opacity = "0"
        setTimeout(() => trail.remove(), 400)
      }, 50)
    }

    // click trigger: Spawn haptic feedback + click explosion particles
    const handleMouseDown = (e: MouseEvent) => {
      // Direct click haptic double pulse
      if ("vibrate" in navigator) {
        navigator.vibrate([8, 20, 8])
      }

      // Explosion particles
      const count = 30
      for (let i = 0; i < count; i++) {
        const p = document.createElement("div")
        p.style.position = "fixed"
        p.style.left = `${e.clientX}px`
        p.style.top = `${e.clientY}px`
        p.style.width = `${Math.random() * 6 + 2}px`
        p.style.height = p.style.width
        p.style.background = "var(--glow-color)"
        p.style.borderRadius = "50%"
        p.style.pointerEvents = "none"
        p.style.zIndex = "101"
        p.style.transform = "translate(-50%, -50%)"
        
        // Random angles/velocities
        const angle = Math.random() * Math.PI * 2
        const velocity = Math.random() * 80 + 30
        const tx = Math.cos(angle) * velocity
        const ty = Math.sin(angle) * velocity

        document.body.appendChild(p)

        p.animate([
          { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
        ], {
          duration: Math.random() * 400 + 400,
          easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          fill: "forwards"
        }).onfinish = () => p.remove()
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest("a, button, [data-cursor-text]")
      
      if (isInteractive) {
        if (!isHovered) {
          setIsHovered(true)
          if ("vibrate" in navigator) {
            navigator.vibrate(3) // Hover micro-tick
          }
        }
        const text = isInteractive.getAttribute("data-cursor-text")
        if (text) setCursorText(text)
        else setCursorText("")
      } else {
        setIsHovered(false)
        setCursorText("")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseover", handleMouseOver)
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
    }
  }, [dotX, dotY, isHovered])

  return (
    <>
      {/* Outer Ring Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:flex items-center justify-center pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          border: "1px solid var(--glow-color)",
          borderRadius: isHovered ? "12px" : "50%",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "transparent",
          backdropFilter: isHovered ? "blur(2px)" : "none",
          boxShadow: isHovered ? "0 0 20px var(--glow-color)" : "none",
          transition: "width 0.3s, height 0.3s, border-radius 0.3s, background-color 0.3s",
        }}
      >
        <AnimatePresence>
          {isHovered && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-sans text-[10px] font-bold tracking-widest text-[var(--glow-color)] drop-shadow-md select-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[101] pointer-events-none hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "var(--foreground)",
        }}
      />
    </>
  )
}
