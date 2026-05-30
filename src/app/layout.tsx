import type { Metadata } from "next";
import { Syne, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Preloader } from "@/components/preloader";
import { PageTransition } from "@/components/page-transition";
import { AudioEasterEgg } from "@/components/audio-easter-egg";
import { GlobalBackground } from "@/components/global-background";

const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Shreya Shree | Communication Designer",
  description: "Portfolio of Shreya Shree, Communication Designer working at the crossroads of Art Direction, Product Styling, Visual Storytelling, and Experiential Retail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalBackground />
          <Preloader />
          <Cursor />
          <AudioEasterEgg />
          <SmoothScroll>
            <Navbar />
            <main className="flex-grow pt-24">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
