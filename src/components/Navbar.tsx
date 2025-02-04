'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('TR')
  const [logoUrl, setLogoUrl] = useState('')

  // Mouse pozisyonunu takip etmek için
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const nav = document.querySelector('nav')
    if (nav) {
      const rect = nav.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      nav.style.setProperty('--mouse-x', `${x}px`)
      nav.style.setProperty('--mouse-y', `${y}px`)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const logoRef = ref(storage, 'logo/dovec.webp')
        const url = await getDownloadURL(logoRef)
        setLogoUrl(url)
      } catch (error) {
        console.error('Logo yüklenemedi:', error)
      }
    }

    loadLogo()
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${
      isScrolled 
        ? 'backdrop-blur-sm bg-white/30 after:absolute after:inset-0 after:bg-[radial-gradient(800px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.04),transparent_45%)] after:transition-opacity after:duration-500' 
        : 'bg-black/10 backdrop-blur-sm'
    }`}>
      <div className={`relative w-screen max-w-[100vw] ${isScrolled ? 'after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/5 after:to-transparent' : ''}`}>
        {/* Language Selection - Ekranın En Solunda */}
        <div className="absolute left-0 top-0 bottom-0 hidden md:flex items-center pl-8 z-20">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`relative group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${
                isScrolled 
                  ? 'bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-zinc-300'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40'
              }`}
            >
              <span className={`text-sm font-light tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-zinc-700' : 'text-white'
              }`}>{currentLang}</span>
              <div className="flex items-center justify-center w-4 h-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className={`w-3 h-3 transition-all duration-300 ${isScrolled ? 'text-zinc-700' : 'text-white'} ${isLangOpen ? 'rotate-180' : ''}`}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Dil Seçim Dropdown */}
            {isLangOpen && (
              <div className={`absolute top-full left-0 mt-2 py-2 rounded-xl shadow-lg transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white/80 backdrop-blur-sm border border-zinc-200'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}>
                <button
                  onClick={() => {
                    setCurrentLang('TR')
                    setIsLangOpen(false)
                  }}
                  className={`w-full px-6 py-2 text-left text-sm font-light tracking-wider transition-all duration-300 ${
                    isScrolled 
                      ? 'text-zinc-700 hover:bg-zinc-100/50'
                      : 'text-white hover:bg-white/20'
                  } ${currentLang === 'TR' ? 'bg-white/20' : ''}`}
                >
                  TR
                </button>
                <button
                  onClick={() => {
                    setCurrentLang('EN')
                    setIsLangOpen(false)
                  }}
                  className={`w-full px-6 py-2 text-left text-sm font-light tracking-wider transition-all duration-300 ${
                    isScrolled 
                      ? 'text-zinc-700 hover:bg-zinc-100/50'
                      : 'text-white hover:bg-white/20'
                  } ${currentLang === 'EN' ? 'bg-white/20' : ''}`}
                >
                  EN
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 360 Derece Butonu - Ekranın En Sağında */}
        <div className="absolute right-0 top-0 bottom-0 hidden md:flex items-center pr-8 z-20">
          <a 
            href="https://360.dovecconstruction.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`relative group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${
              isScrolled 
                ? 'bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-zinc-300'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40'
            }`}
          >
            <span className={`text-sm font-light tracking-wider transition-colors duration-300 ${
              isScrolled ? 'text-zinc-700' : 'text-white'
            }`}>360°</span>
            <div className="flex items-center justify-center w-6 h-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className={`w-4 h-4 transition-all duration-500 ${isScrolled ? 'text-zinc-700' : 'text-white'} group-hover:rotate-[360deg]`}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
          </a>
        </div>

        <div className={`flex justify-between items-center h-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto transition-colors duration-500 relative z-10`}>
          {/* Sol menü */}
          <div className="hidden md:flex items-center justify-end space-x-3 lg:space-x-6 xl:space-x-8 flex-1 pr-4 lg:pr-8 xl:pr-16">
            <NavLink href="/hakkimizda" label="Biz Kimiz" />
            <NavLink href="/projeler" label="Projeler" />
            <NavLink href="/medya" label="Medya" />
          </div>

          {/* Logo - Ortada */}
          <div className="flex items-center justify-center mx-4">
            <Link href="/" className="relative w-32 h-12">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="DOVEC Logo"
                  fill
                  className={`object-contain transition-all duration-500 ${isScrolled ? 'brightness-0' : 'brightness-0 invert'}`}
                  priority
                />
              )}
            </Link>
          </div>

          {/* Sağ menü */}
          <div className="hidden md:flex items-center justify-start space-x-3 lg:space-x-6 xl:space-x-8 flex-1 pl-4 lg:pl-8 xl:pl-16">
            <NavLink href="/blog" label="Blog" />
            <NavLink href="/kariyer" label="Kariyer" />
            <NavLink href="/iletisim" label="İletişim" />
          </div>

          {/* Mobil menü butonu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex items-center justify-center focus:outline-none"
              aria-label="Ana menüyü aç"
            >
              <div className="relative flex items-center justify-center">
                <div className={`flex flex-col justify-between w-7 h-5 transform transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <span className={`block h-0.5 w-7 transform transition-all duration-300 ${
                    isScrolled ? 'bg-[#061E4F]' : 'bg-white'
                  } ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                  <span className={`block h-0.5 w-5 ml-auto transform transition-all duration-300 ${
                    isScrolled ? 'bg-[#061E4F]' : 'bg-white'
                  } ${isOpen ? 'opacity-0 translate-x-3' : ''}`} />
                  <span className={`block h-0.5 w-7 transform transition-all duration-300 ${
                    isScrolled ? 'bg-[#061E4F]' : 'bg-white'
                  } ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] xl:w-[calc(100%-8rem)]">
            <div className={`h-[1px] w-full transition-all duration-500 ${
              isScrolled 
                ? 'bg-gradient-to-r from-transparent via-black/[0.02] to-transparent scale-95' 
                : 'bg-gradient-to-r from-transparent via-white/40 to-transparent scale-100'
            }`} />
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div 
        className={`fixed inset-0 w-screen h-screen bg-white z-[100] transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
          {/* Menü İçeriği */}
          <div className="flex flex-col min-h-full pb-8">
            {/* Logo - Navbar ile aynı pozisyonda */}
            <div className="flex items-center h-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="flex items-center mx-4">
                {logoUrl && (
                  <div className="relative w-32 h-12">
                    <Image
                      src={logoUrl}
                      alt="DOVEC Logo"
                      fill
                      className="object-contain brightness-0"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center w-full">
              <div className="w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] xl:w-[calc(100%-8rem)]">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/[0.02] to-transparent scale-95" />
              </div>
            </div>

            {/* Menü Linkleri */}
            <div className="flex-1 flex flex-col space-y-7 items-start w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12">
              <div className="w-full mx-4">
                <div className="flex flex-col space-y-7">
                  <MobileNavLink href="/hakkimizda" label="Biz Kimiz" setIsOpen={setIsOpen} />
                  <MobileNavLink href="/projeler" label="Projeler" setIsOpen={setIsOpen} />
                  <MobileNavLink href="/medya" label="Medya" setIsOpen={setIsOpen} />
                  <MobileNavLink href="/blog" label="Blog" setIsOpen={setIsOpen} />
                  <MobileNavLink href="/iletisim" label="İletişim" setIsOpen={setIsOpen} />

                  {/* Dil Seçenekleri */}
                  <div className="w-full pt-4 border-t border-zinc-100">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setCurrentLang('TR')}
                        className={`px-4 py-2 rounded-lg text-lg font-light tracking-wider transition-all duration-300 ${
                          currentLang === 'TR' 
                            ? 'bg-zinc-100 text-zinc-900' 
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        TR
                      </button>
                      <div className="w-px h-6 bg-zinc-200" />
                      <button
                        onClick={() => setCurrentLang('EN')}
                        className={`px-4 py-2 rounded-lg text-lg font-light tracking-wider transition-all duration-300 ${
                          currentLang === 'EN' 
                            ? 'bg-zinc-100 text-zinc-900' 
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>

                  {/* 360 Linki */}
                  <a 
                    href="https://360.dovecconstruction.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden w-full flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative inline-block text-xl font-light text-zinc-800/90 tracking-wider transition-transform duration-300 group-hover:translate-x-2">
                      360°
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      className="w-5 h-5 text-zinc-800/90 transition-all duration-500 group-hover:rotate-[360deg]"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Alt Bilgi */}
            <div className="mt-auto pt-8 border-t border-zinc-200 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="mx-4">
                <div className="flex flex-col space-y-4">
                  <a href="tel:+90123456789" className="text-zinc-800/90 hover:text-zinc-900 text-sm font-light tracking-wider transition-colors duration-300">
                    +90 123 456 789
                  </a>
                  <a href="mailto:info@dovec.com" className="text-zinc-800/90 hover:text-zinc-900 text-sm font-light tracking-wider transition-colors duration-300">
                    info@dovec.com
                  </a>
                  <p className="text-zinc-600 text-xs font-light tracking-wider">
                    © 2024 DOVEC İnşaat. Tüm hakları saklıdır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hamburger Menü Butonu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-6 right-4 w-12 h-12 flex items-center justify-center focus:outline-none"
          aria-label="Ana menüyü aç/kapat"
        >
          <div className="relative flex items-center justify-center">
            <div className={`flex flex-col justify-between w-7 h-5 transform transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <span className={`block h-0.5 w-7 transform transition-all duration-300 bg-zinc-800 ${
                isOpen ? 'rotate-45 translate-y-2.5' : ''
              }`} />
              <span className={`block h-0.5 w-5 ml-auto transform transition-all duration-300 bg-zinc-800 ${
                isOpen ? 'opacity-0 translate-x-3' : ''
              }`} />
              <span className={`block h-0.5 w-7 transform transition-all duration-300 bg-zinc-800 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </div>
        </button>
      </div>
    </nav>
  )
}

function NavLink({ href, label, isMobile = false }: { href: string; label: string; isMobile?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)

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

  if (isMobile) {
    return (
      <Link 
        href={href} 
        className="relative text-white/90 hover:text-white text-4xl font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.3em] group"
      >
        <span className="relative z-10">{label}</span>
        <div className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></div>
      </Link>
    )
  }

  return (
    <Link 
      href={href} 
      className={`relative font-light tracking-wider group py-2 transition-all duration-300 ${
        isScrolled ? 'text-zinc-700 hover:text-black' : 'text-white hover:text-white'
      }`}
    >
      <span className="relative z-10 text-sm uppercase">{label}</span>
      
      {/* Hover efekti için alt çizgi */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] ${
        isScrolled 
          ? 'bg-gradient-to-r from-transparent via-zinc-600 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-white to-transparent'
      } scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`}></div>
      
      {/* Hover efekti için blur */}
      <div className={`absolute bottom-0 left-0 w-full h-1 ${
        isScrolled ? 'bg-zinc-800/10' : 'bg-white/20'
      } scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center blur-sm`}></div>
    </Link>
  )
}

function MobileNavLink({ href, label, setIsOpen }: { href: string; label: string; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden w-full"
      onClick={() => setIsOpen(false)}
    >
      <span className="relative inline-block text-xl font-light text-zinc-800/90 tracking-wider transition-transform duration-300 group-hover:translate-x-2">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-zinc-600/60 to-transparent transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
} 