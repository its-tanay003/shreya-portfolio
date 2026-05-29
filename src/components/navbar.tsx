"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Skills", href: "/skills" },
    { name: "Journal", href: "/journal" },
    { name: "Lab", href: "/lab" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 mix-blend-difference text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-bold uppercase tracking-widest z-50" data-cursor-text="HOME">
            Shreya
          </Link>
          
          <div className="flex items-center gap-6 z-50">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:scale-110 transition-transform"
                data-cursor-text="THEME"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            
            <button 
              className="md:hidden" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <nav className="hidden md:flex gap-8 font-sans text-sm tracking-wide uppercase">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-bubblegum transition-colors relative group" data-cursor-text="GO">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubblegum transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-background flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="font-display text-5xl uppercase hover:text-mint transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
