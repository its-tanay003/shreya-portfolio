import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-foreground/10 text-center text-sm font-sans mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Shreya Shree. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="https://behance.net/shreyashree013" target="_blank" className="hover:text-bubblegum transition-colors" data-cursor-text="BEHANCE">Behance</Link>
          <a href="mailto:shreya.shree0013@gmail.com" className="hover:text-mint transition-colors" data-cursor-text="EMAIL">Email</a>
        </div>
        <p className="opacity-50">Designed & Directed by Shreya Shree</p>
      </div>
    </footer>
  )
}
