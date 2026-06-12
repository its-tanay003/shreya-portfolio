export interface Project {
  slug: string
  title: string
  category: string
  description: string
  color: string
  tagline?: string
  overview?: string
  objective?: string
  pillars?: string[]
  process?: string[]
  visualIdentity?: string
}

export const projects: Project[] = [
  {
    slug: "flavour-fusion",
    title: "Flavour Fusion — Where Chocolate Meets Its Match",
    category: "Product Styling · Art Direction · Photography",
    description: "A conceptual visual exploration of luxury chocolate",
    color: "bg-gold/40",
    tagline: "A conceptual visual exploration of luxury chocolate",
    overview: "A luxury chocolate collection that blends time-honored cocoa expertise with bold, adventurous pairings. The concept captures chocolate in its different avatars through varied texture, colors and mood to bring out richness and sensory appeal.",
    objective: "Move away from \"fuss\" to focus not just on taste but on chocolate's natural tendency of enhancing the flavor of other enjoyment — dividing each flavor into chapters.",
    pillars: [
      "Art Direction",
      "Food Styling",
      "Photography"
    ],
    process: [
      "Color-blocking strategy to differentiate flavor profiles (vibrant blue + pink for \"Fruit & Nut Fusion\" = freshness + energy)",
      "Product shown in varied states: snapped squares, rough-edged bars in foil, drizzled over desserts — emphasizing rich smooth mouthfeel",
      "Styling prioritizes organic abundance and texture over sterile perfect arrangements",
      "Lifestyle elements: laptop, white roses, lit candles to evoke senses",
      "Deliverable: Physical lookbook/catalogue"
    ],
    visualIdentity: "Dark rich browns, deep burgundy, vibrant pink + blue accent, gold highlights"
  },
  {
    slug: "paperboat-window-display",
    title: "Paperboat — Drinks and Memories",
    category: "Window Display · Experiential Design · Brand Installation",
    description: "Childhood flavors, freshness and sustainability in one visual",
    color: "bg-mint/40",
    tagline: "Childhood flavors, freshness and sustainability in one visual",
    overview: "Zero-brief to execution for Paperboat, evoking childhood nostalgia through a playful, handcrafted window installation.",
    objective: "Create a window display that evokes childhood memories associated with Paperboat drinks.",
    pillars: ["Experiential Design", "Brand Installation"],
    process: ["Handcrafted elements", "Playful window installation"],
    visualIdentity: "Nostalgic, vibrant, playful"
  },
  {
    slug: "hm-styling",
    title: "H&M — Art Direction & Styling",
    category: "Art Direction · Styling",
    description: "Curating a 'LookBook' bridging the gap between comfort and Gen-Z street style aesthetics.",
    color: "bg-bubblegum/40",
    tagline: "Curating a 'LookBook' bridging the gap between comfort and Gen-Z street style aesthetics.",
    overview: "A comprehensive styling project creating an aspirational yet accessible LookBook for H&M, focusing on contemporary street style.",
    objective: "Curate a visually striking LookBook that bridges the gap between everyday comfort and Gen-Z street style aesthetics.",
    pillars: ["Art Direction", "Styling", "LookBook Curation"],
    process: [
      "Moodboard development focusing on relaxed fits and bold layering",
      "Sourcing and pairing garments to highlight H&M's seasonal strengths",
      "On-set styling and creative direction during photography",
      "Final selection and sequence planning for the LookBook"
    ],
    visualIdentity: "Youthful, energetic, street-ready"
  },
  {
    slug: "lifestyle-pop",
    title: "Lifestyle Store POP & Window Display",
    category: "Commercial Styling · Retail Design",
    description: "Designing a robust operational retail structure to promote brand visibility.",
    color: "bg-lavender/40",
    tagline: "Designing a robust operational retail structure to promote brand visibility.",
    overview: "End-to-end POP (Point of Purchase) design project created specifically for Lifestyle Stores, managing everything from ideation to final installation.",
    objective: "Increase brand visibility and product engagement through strategic physical retail design.",
    pillars: ["Retail Design", "Commercial Styling", "Production"],
    process: [
      "Conceptual sketches for window displays and in-store focal points",
      "Material selection and vendor coordination for robust structural builds",
      "Print file preparation and quality control for large-scale graphics",
      "On-site installation and final styling adjustments"
    ],
    visualIdentity: "Bold, commercial, structurally sound"
  },
  {
    slug: "post-apocalyptic-diorama",
    title: "Post-Apocalyptic 3D Diorama",
    category: "3D & Space",
    description: "Blender environment design exploring decay, resilience, and storytelling through atmospheric lighting and detailed texturing.",
    color: "bg-navy/60"
  },
  {
    slug: "space-materiality-study",
    title: "Space & Materiality Study",
    category: "3D & Space",
    description: "Conceptual spatial exploration observing how light interacts with raw materials like concrete, glass, and brushed metal.",
    color: "bg-ivory/20"
  }
]
