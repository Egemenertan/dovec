import React from 'react'
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "DOVEC İnşaat",
  description: "Modern yaşam alanları tasarlıyor, geleceği inşa ediyoruz.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="h-full overflow-x-hidden">
      <body className={`${inter.className} ${playfair.variable} min-h-screen flex flex-col overflow-x-hidden`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
} 