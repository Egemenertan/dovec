import React from 'react'
import type { Metadata } from "next"
import { Inter, Cormorant } from "next/font/google"
import "./globals.css"
import ClientLayout from '../components/ClientLayout'

const inter = Inter({ subsets: ["latin"] })
const cormorant = Cormorant({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
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
      <body className={`${inter.className} ${cormorant.variable} min-h-[100dvh] flex flex-col overflow-x-hidden`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 