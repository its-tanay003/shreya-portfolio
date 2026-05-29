export interface Project {
  slug: string
  title: string
  category: string
  description: string
  color: string
}

export const projects: Project[] = [
  {
    slug: "h-and-m-styling",
    title: "H&M Art Direction & Styling",
    category: "Styling",
    description: "Conceptual persona-based styling for H&M's seasonal campaign, bridging high fashion with everyday streetwear.",
    color: "bg-bubblegum/40"
  },
  {
    slug: "chocolate-food-styling",
    title: "Chocolate Food Styling",
    category: "Visual Narrative",
    description: "A high-end visual narrative catalogue focusing on the decadent textures and rich colors of artisanal chocolate.",
    color: "bg-gold/40"
  },
  {
    slug: "paperboat-window-display",
    title: "Paperboat Window Display",
    category: "Retail Design",
    description: "Zero-brief to execution for Paperboat, evoking childhood nostalgia through a playful, handcrafted window installation.",
    color: "bg-mint/40"
  },
  {
    slug: "lifestyle-store-pop",
    title: "Lifestyle Store P.O.P. Design",
    category: "Retail Design",
    description: "Operational retail installation for Lifestyle Stores focusing on point-of-purchase engagement and bold visual merchandising.",
    color: "bg-lavender/40"
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
