import React from 'react'
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "DOVEC",
  description: "Modern yaşam alanları tasarlıyor, geleceği inşa ediyoruz.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} ${playfair.variable}`}>
        <Navbar />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
} 