"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type ProfessionType =
  | "tech"
  | "design"
  | "finance"
  | "medical"
  | "legal"
  | "gaming"
  | "luxury"
  | "education"
  | "science"
  | "media"

export interface FontConfig {
  name: string
  weights: string
}

export interface ProfessionTheme {
  display: FontConfig
  body: FontConfig
  mono: FontConfig
  accent: FontConfig
  h1: {
    weight: number
    letterSpacing: string
    transform: string
  }
  body_wt: number
  feel: string
  effects: string[]
  palette: {
    primary: string
    secondary: string
    accent: string
  }
}

export const PROFESSION_FONTS: Record<ProfessionType, ProfessionTheme> = {
  tech: {
    display: { name: "Space Grotesk", weights: "300;500;700" },
    body: { name: "DM Sans", weights: "300;400;500" },
    mono: { name: "JetBrains Mono", weights: "400;500" },
    accent: { name: "Orbitron", weights: "700;900" },
    h1: { weight: 700, letterSpacing: "-0.04em", transform: "none" },
    body_wt: 400,
    feel: "sharp, geometric, futuristic — clean edges, wide accent tracking",
    effects: ["gradient", "char-reveal", "glitch-hover", "scan-line", "matrix-reveal"],
    palette: { primary: "#6C63FF", secondary: "#00F5FF", accent: "#FF6584" },
  },
  design: {
    display: { name: "Fraunces", weights: "300;700;900" },
    body: { name: "Epilogue", weights: "300;400;500" },
    mono: { name: "Fragment Mono", weights: "400" },
    accent: { name: "Big Shoulders Display", weights: "800;900" },
    h1: { weight: 900, letterSpacing: "-0.05em", transform: "none" },
    body_wt: 300,
    feel: "editorial contrast — thick/thin strokes, optical refinement, italic flourishes",
    effects: ["gradient", "char-reveal", "italic-on-hover", "stagger-wave", "fade-mask"],
    palette: { primary: "#FF6EB4", secondary: "#00E5C0", accent: "#FAF8FF" }, // Adapted to Shreya's theme
  },
  finance: {
    display: { name: "Instrument Serif", weights: "400;700" },
    body: { name: "Inter", weights: "400;500;600" },
    mono: { name: "IBM Plex Mono", weights: "400;500" },
    accent: { name: "Syne", weights: "700;800" },
    h1: { weight: 600, letterSpacing: "-0.02em", transform: "none" },
    body_wt: 400,
    feel: "authoritative, precise — tight tracking, tabular numerals, strong hierarchy",
    effects: ["number-count-up", "clip-reveal", "underscore-draw", "gold-shimmer"],
    palette: { primary: "#D4AF37", secondary: "#2563EB", accent: "#1E293B" },
  },
  medical: {
    display: { name: "Libre Baskerville", weights: "400;700" },
    body: { name: "Source Sans 3", weights: "300;400;600" },
    mono: { name: "Space Mono", weights: "400;700" },
    accent: { name: "Outfit", weights: "300;600" },
    h1: { weight: 700, letterSpacing: "0.00em", transform: "none" },
    body_wt: 400,
    feel: "clean, clinical trust — high legibility, humanist tone, no decorative excess",
    effects: ["fade-up", "word-reveal", "pulse-glow", "underscore-draw"],
    palette: { primary: "#06B6D4", secondary: "#10B981", accent: "#F0F9FF" },
  },
  legal: {
    display: { name: "Playfair Display", weights: "400;700;900" },
    body: { name: "Lora", weights: "400;500" },
    mono: { name: "Courier Prime", weights: "400;700" },
    accent: { name: "Cormorant Garamond", weights: "300;700" },
    h1: { weight: 700, letterSpacing: "0.01em", transform: "none" },
    body_wt: 400,
    feel: "gravitas serif — traditional authority, stately spacing, refined elegance",
    effects: ["clip-reveal", "underscore-draw", "fade-up", "gold-shimmer"],
    palette: { primary: "#92400E", secondary: "#D4AF37", accent: "#FEF9F0" },
  },
  gaming: {
    display: { name: "Rajdhani", weights: "600;700" },
    body: { name: "Barlow", weights: "400;500;600" },
    mono: { name: "Share Tech Mono", weights: "400" },
    accent: { name: "Bebas Neue", weights: "400" },
    h1: { weight: 900, letterSpacing: "0.08em", transform: "UPPERCASE" },
    body_wt: 500,
    feel: "aggressive, high-contrast — wide tracking, angular, heavy weight, sci-fi edge",
    effects: ["glitch-full", "neon-flicker", "scan-line", "rgb-split", "char-reveal"],
    palette: { primary: "#EF4444", secondary: "#F59E0B", accent: "#0A0A0A" },
  },
  luxury: {
    display: { name: "Cormorant", weights: "300;400;700" },
    body: { name: "Jost", weights: "300;400" },
    mono: { name: "Courier Prime", weights: "400" },
    accent: { name: "Tenor Sans", weights: "400" },
    h1: { weight: 300, letterSpacing: "0.3em", transform: "uppercase" },
    body_wt: 300,
    feel: "haute couture — ultra-thin strokes, whispered elegance, generous negative space",
    effects: ["gold-shimmer", "char-reveal", "letter-spacing-expand", "fade-mask", "fade-up"],
    palette: { primary: "#C9A84C", secondary: "#F5F0E8", accent: "#2D2A24" },
  },
  education: {
    display: { name: "Nunito", weights: "400;700;800" },
    body: { name: "Quicksand", weights: "400;500;600" },
    mono: { name: "Fira Code", weights: "400;500" },
    accent: { name: "Paytone One", weights: "400" },
    h1: { weight: 800, letterSpacing: "-0.01em", transform: "none" },
    body_wt: 500,
    feel: "friendly, rounded — warm tones, energetic spacing, approachable clarity",
    effects: ["bounce-in", "word-reveal", "highlight-sweep", "stagger-wave", "gradient"],
    palette: { primary: "#8B5CF6", secondary: "#F59E0B", accent: "#ECFDF5" },
  },
  science: {
    display: { name: "Syne", weights: "400;700;800" },
    body: { name: "Manrope", weights: "300;400;500" },
    mono: { name: "Roboto Mono", weights: "400;500" },
    accent: { name: "Chakra Petch", weights: "400;600" },
    h1: { weight: 700, letterSpacing: "0.04em", transform: "none" },
    body_wt: 400,
    feel: "data-precise, analytical — structured grid, monospaced accents, lab clarity",
    effects: ["matrix-reveal", "scan-line", "number-count-up", "gradient", "glitch-hover"],
    palette: { primary: "#06B6D4", secondary: "#8B5CF6", accent: "#F0FDFF" },
  },
  media: {
    display: { name: "Libre Franklin", weights: "800;900" },
    body: { name: "Merriweather", weights: "300;400;700" },
    mono: { name: "Source Code Pro", weights: "400" },
    accent: { name: "Anton", weights: "400" },
    h1: { weight: 900, letterSpacing: "-0.03em", transform: "none" },
    body_wt: 400,
    feel: "editorial impact — newspaper authority, heavy headlines, high contrast rhythm",
    effects: ["clip-reveal", "italic-on-hover", "underscore-draw", "stagger-wave"],
    palette: { primary: "#DC2626", secondary: "#111827", accent: "#FEF2F2" },
  },
}

interface MasterThemeContextProps {
  profession: ProfessionType
  theme: ProfessionTheme
  setProfession: (p: ProfessionType) => void
}

const MasterThemeContext = createContext<MasterThemeContextProps | undefined>(undefined)

export function useMasterTheme() {
  const context = useContext(MasterThemeContext)
  if (!context) {
    throw new Error("useMasterTheme must be used within a MasterThemeProvider")
  }
  return context
}

function detectProfessionFromText(): ProfessionType {
  if (typeof window === "undefined") return "design" // Default fallback

  const bodyText = document.body.innerText.toLowerCase()
  const signals: Record<ProfessionType, string[]> = {
    tech: ["developer", "software", "api", "cloud", "saas", "code", "ai", "startup", "stack", "deploy"],
    design: ["creative", "branding", "studio", "visual", "ux", "ui", "portfolio", "identity", "craft", "styling", "art direction"],
    finance: ["investment", "capital", "fund", "portfolio", "returns", "trading", "wealth", "market"],
    medical: ["health", "clinical", "patient", "care", "therapy", "doctor", "wellness", "biotech"],
    legal: ["attorney", "law", "compliance", "firm", "counsel", "litigation", "contract", "justice"],
    gaming: ["game", "esports", "player", "guild", "quest", "arena", "match", "tournament", "level"],
    luxury: ["haute", "couture", "estate", "bespoke", "exclusive", "prestige", "maison", "atelier"],
    education: ["learn", "course", "student", "academy", "school", "campus", "curriculum", "lesson"],
    science: ["research", "data", "lab", "analysis", "experiment", "discovery", "quantum", "neural"],
    media: ["journalism", "story", "publish", "editorial", "broadcast", "news", "magazine", "press"],
  }

  let best: ProfessionType = "design" // Default to design for Shreya
  let bestScore = 0

  for (const [profession, keywords] of Object.entries(signals)) {
    const score = keywords.reduce((s, k) => s + (bodyText.includes(k) ? 1 : 0), 0)
    if (score > bestScore) {
      best = profession as ProfessionType
      bestScore = score
    }
  }
  return best
}

export function MasterThemeProvider({
  children,
  overrideProfession = "auto",
}: {
  children: React.ReactNode
  overrideProfession?: ProfessionType | "auto"
}) {
  const [profession, setProfession] = useState<ProfessionType>("design")

  useEffect(() => {
    // Run all state updates inside requestAnimationFrame to fully satisfy React 19 render warnings
    requestAnimationFrame(() => {
      if (overrideProfession === "auto") {
        const detected = detectProfessionFromText()
        setProfession(detected)
      } else {
        setProfession(overrideProfession)
      }
    })
  }, [overrideProfession])

  const activeTheme = PROFESSION_FONTS[profession]

  useEffect(() => {
    // Dynamic Font Injection
    const linkId = "master-google-fonts"
    let link = document.getElementById(linkId) as HTMLLinkElement
    if (!link) {
      link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }

    const displayFont = activeTheme.display.name.replace(/ /g, "+")
    const bodyFont = activeTheme.body.name.replace(/ /g, "+")
    const monoFont = activeTheme.mono.name.replace(/ /g, "+")
    const accentFont = activeTheme.accent.name.replace(/ /g, "+")

    link.href = `https://fonts.googleapis.com/css2?family=${displayFont}:wght@${activeTheme.display.weights}&family=${bodyFont}:wght@${activeTheme.body.weights}&family=${monoFont}:wght@${activeTheme.mono.weights}&family=${accentFont}:wght@${activeTheme.accent.weights}&display=swap`

    // Synchronize CSS custom properties with document root
    const root = document.documentElement
    root.style.setProperty("--font-display", `'${activeTheme.display.name}', serif`)
    root.style.setProperty("--font-body", `'${activeTheme.body.name}', sans-serif`)
    root.style.setProperty("--font-mono", `'${activeTheme.mono.name}', monospace`)
    root.style.setProperty("--font-accent", `'${activeTheme.accent.name}', display`)

    root.style.setProperty("--glow-color", activeTheme.palette.primary)
    root.style.setProperty("--gradient-start", activeTheme.palette.primary)
    root.style.setProperty("--gradient-mid", activeTheme.palette.secondary)
    root.style.setProperty("--gradient-end", activeTheme.palette.accent)

    // Dynamic style updates to h1 tags
    document.querySelectorAll("h1").forEach((h) => {
      h.style.fontWeight = activeTheme.h1.weight.toString()
      h.style.letterSpacing = activeTheme.h1.letterSpacing
      h.style.textTransform = activeTheme.h1.transform
    })
  }, [profession, activeTheme])

  return (
    <MasterThemeContext.Provider value={{ profession, theme: activeTheme, setProfession }}>
      {children}
    </MasterThemeContext.Provider>
  )
}
