import React from 'react'
import type { Metadata } from "next"
import { Cormorant, Inter, Raleway } from "next/font/google"
import "./globals.css"
import ClientLayout from '../components/ClientLayout'
import FloatingContactButtons from '../components/FloatingContactButtons'
import { LanguageProvider } from '@/context/LanguageContext'

const cormorant = Cormorant({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400'],
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400'],
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
      <body className={`${cormorant.className} ${cormorant.variable} ${inter.variable} ${raleway.variable} min-h-[100dvh] flex flex-col overflow-x-hidden font-light`}>
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
        <FloatingContactButtons />
      </body>
    </html>
  )
} 