import React from 'react'
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import ClientLayout from '../components/ClientLayout'

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Dovec Group',
  description: 'Dovec Group - İnşaat ve Gayrimenkul Geliştirme',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="h-full overflow-x-hidden">
      <body className={`${inter.className} ${playfair.variable} min-h-[100dvh] flex flex-col overflow-x-hidden`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 