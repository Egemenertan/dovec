'use client'

import { SessionProvider } from 'next-auth/react'
import Navbar from "@/components/Navbar"
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <Providers>
        <Navbar />
        <div className="flex-grow pb-safe">
          {children}
        </div>
        <Footer />
      </Providers>
    </SessionProvider>
  )
} 