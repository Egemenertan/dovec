'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll hook
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : ''}`}>
      <div>
        <div className={`flex justify-between items-center h-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto transition-colors duration-500`}>
          {/* Sol menü */}
          <div className="hidden md:flex items-center justify-end space-x-12 flex-1 pr-16">
            <Link href="/hakkimizda" className={`${isScrolled ? 'text-[#061E4F]' : 'text-white'} hover:text-[#061E4F]/80 px-3 py-2 text-base font-extralight tracking-wider transition-colors uppercase`}>
              Hakkımızda
            </Link>
            <Link href="/projeler" className={`${isScrolled ? 'text-[#061E4F]' : 'text-white'} hover:text-[#061E4F]/80 px-3 py-2 text-base font-extralight tracking-wider transition-colors uppercase`}>
              Projeler
            </Link>
            <Link href="/medya" className={`${isScrolled ? 'text-[#061E4F]' : 'text-white'} hover:text-[#061E4F]/80 px-3 py-2 text-base font-extralight tracking-wider transition-colors uppercase`}>
              Medya
            </Link>
          </div>

          {/* Logo - Ortada */}
          <div className="flex items-center justify-center mx-4">
            <Link href="/" className="relative w-32 h-12">
              <Image
                src="/dovec.webp"
                alt="DOVEC Logo"
                fill
                className={`object-contain transition-all duration-500 ${isScrolled ? '' : 'brightness-0 invert'}`}
                priority
              />
            </Link>
          </div>

          {/* Sağ menü */}
          <div className="hidden md:flex items-center justify-start space-x-12 flex-1 pl-16">
            <Link href="/blog" className={`${isScrolled ? 'text-[#061E4F]' : 'text-white'} hover:text-[#061E4F]/80 px-3 py-2 text-base font-extralight tracking-wider transition-colors uppercase`}>
              Blog
            </Link>
            <Link href="/yatirim" className={`${isScrolled ? 'text-[#061E4F]' : 'text-white'} hover:text-[#061E4F]/80 px-3 py-2 text-base font-extralight tracking-wider transition-colors uppercase`}>
              Yatırım
            </Link>
            <Link href="/iletisim" className={`${isScrolled ? 'text-[#061E4F]' : 'text-white'} hover:text-[#061E4F]/80 px-3 py-2 text-base font-extralight tracking-wider transition-colors uppercase`}>
              İletişim
            </Link>
          </div>

          {/* Mobil menü butonu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 focus:outline-none"
            >
              <span className="sr-only">Ana menüyü aç</span>
              <span className={`absolute top-1/2 left-1/2 w-6 h-[2px] ${isScrolled ? 'bg-[#061E4F]' : 'bg-white'} transform -translate-x-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
              <span className={`absolute top-1/2 left-1/2 w-6 h-[2px] ${isScrolled ? 'bg-[#061E4F]' : 'bg-white'} transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute top-1/2 left-1/2 w-6 h-[2px] ${isScrolled ? 'bg-[#061E4F]' : 'bg-white'} transform -translate-x-1/2 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-1'}`}></span>
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)]">
            <div className={`h-[1px] w-full transition-colors duration-500 ${isScrolled ? 'bg-gray-200' : 'bg-white'}`} />
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div className={`fixed inset-0 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-lg transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden`}>
        {/* Exit Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-7 right-8 w-10 h-10 flex items-center justify-center group"
        >
          <div className="relative w-8 h-8 transform transition-transform duration-500 group-hover:rotate-180">
            <span className="absolute top-1/2 left-1/2 w-8 h-[1px] bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
            <span className="absolute top-1/2 left-1/2 w-8 h-[1px] bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
          </div>
        </button>
        
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="mb-12">
            <Image
              src="/dovec.webp"
              alt="DOVEC Logo"
              width={120}
              height={45}
              className="object-contain brightness-0 invert"
            />
          </div>
          <Link
            href="/hakkimizda"
            className="relative text-white/80 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
          >
            Hakkımızda
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/projeler"
            className="relative text-white/80 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
          >
            Projeler
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/medya"
            className="relative text-white/80 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
          >
            Medya
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/blog"
            className="relative text-white/80 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
          >
            Blog
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/yatirim"
            className="relative text-white/80 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
          >
            Yatırım
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/iletisim"
            className="relative text-white/80 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
          >
            İletişim
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </nav>
  )
} 