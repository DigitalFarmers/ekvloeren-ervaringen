import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { JsonLd } from "@/components/json-ld"
import "../../globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "EK Vloeren Ervaringen | Meld je ervaring",
  description:
    "Een onafhankelijk meldpunt voor ervaringen met EK Vloeren. Deel je ervaring vertrouwelijk en help anderen een geïnformeerde keuze te maken.",
  keywords: ["EK Vloeren", "Erwin Kooistra", "Opgelicht", "Aanbetaling kwijt", "Ervaringen", "Klachten", "Meldpunt"],
  openGraph: {
    title: "EK Vloeren Ervaringen",
    description: "Meld je ervaring met EK Vloeren. Vertrouwelijk en gestructureerd.",
    type: "website",
    locale: "nl_NL",
    siteName: "EK Vloeren Ervaringen",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          <SiteHeader />
          <div className="flex-1">
            {children}
          </div>
          {/* Mobile Sticky CTA */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur border-t border-border z-50">
            <a href="/meld-je-ervaring" className="flex items-center justify-center w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors">
              Meld nu je ervaring
            </a>
          </div>
          <div className="h-0 md:h-0 pb-20 md:pb-0" /> {/* Spacer for sticky footer */}
          <Analytics />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-V6BT9X7YQP"} />
        </ThemeProvider>
      </body>
    </html>
  );
}
