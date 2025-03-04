'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'
import { useRouter, usePathname } from 'next/navigation'
import { Cormorant } from 'next/font/google'
import { IconMenu2 } from '@tabler/icons-react'
import Sidebar from './Sidebar'

// Navbar görünürlük olayı
const NAVBAR_VISIBILITY_EVENT = 'navbar-visibility-change';

const cormorant = Cormorant({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('TR')
  const [logoUrl, setLogoUrl] = useState('')
  const [isVisible, setIsVisible] = useState(true) // Navbar görünürlüğü için yeni state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

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

  // Sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    // Menü açıksa kapat
    if (isOpen) {
      setIsOpen(false)
    }
    if (isProjectsMenuOpen) {
      setIsProjectsMenuOpen(false)
    }
  }, [pathname, isOpen])

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

  // ProjectsShowcase bileşeninden gelen olayları dinle
  useEffect(() => {
    // Her sayfa yüklendiğinde navbar'ı görünür yap
    setIsVisible(true);
    
    const handleNavbarVisibility = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.visible === 'boolean') {
        setIsVisible(customEvent.detail.visible);
      }
    };

    // Olayı dinle
    window.addEventListener(NAVBAR_VISIBILITY_EVENT, handleNavbarVisibility);

    // Temizleme işlevi
    return () => {
      window.removeEventListener(NAVBAR_VISIBILITY_EVENT, handleNavbarVisibility);
    };
  }, []);

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
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <nav className={`${cormorant.className} fixed w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'backdrop-blur-sm bg-white shadow-sm after:absolute after:inset-0 after:bg-[radial-gradient(800px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.04),transparent_45%)] after:transition-opacity after:duration-500' 
          : ''
      } ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`} suppressHydrationWarning>
        <div className={`grid grid-cols-3 items-center h-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto transition-colors duration-500 relative z-10`}>
          {/* Sidebar Toggle Button */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`group flex items-center space-x-3 transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white hover:text-white/80'
              } ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Toggle Sidebar"
            >
              <div className="flex flex-col space-y-1.5">
                <span className={`block h-0.5 w-8 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700 group-hover:bg-gray-900' : 'bg-white'
                }`} />
                <span className={`block h-0.5 w-4 transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700 group-hover:bg-gray-900' : 'bg-white'
                }`} />
              </div>
              <span className={`text-sm uppercase tracking-wider font-light ${
                isScrolled ? 'text-gray-700 group-hover:text-gray-900' : 'text-white'
              }`}>
                Menü
              </span>
            </button>

            {/* Projeler Linki - Mobilde Gizli */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProjectsMenuOpen(!isProjectsMenuOpen)}
                onMouseEnter={() => setIsProjectsMenuOpen(true)}
                onMouseLeave={() => setIsProjectsMenuOpen(false)}
                className={`relative font-scandia tracking-wider py-2 transition-all duration-300 ${
                  isScrolled ? 'text-zinc-800' : 'text-white'
                } group`}
              >
                <span className="relative z-10 text-sm uppercase">Projeler</span>
                <div className={`absolute bottom-0 left-0 w-full h-[1px] ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-transparent via-zinc-600 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-white to-transparent'
                } scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`}></div>
              </button>

              {/* Projeler Dropdown Menu */}
              <div
                onMouseEnter={() => setIsProjectsMenuOpen(true)}
                onMouseLeave={() => setIsProjectsMenuOpen(false)}
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-300 ${
                  isProjectsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link
                  href="/projeler"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsProjectsMenuOpen(false)}
                >
                  Tüm Projeler
                </Link>
                <Link
                  href="/projeler?filter=devam-eden"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsProjectsMenuOpen(false)}
                >
                  Devam Eden Projeler
                </Link>
                <Link
                  href="/projeler?filter=tamamlanan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsProjectsMenuOpen(false)}
                >
                  Tamamlanan Projeler
                </Link>
              </div>
            </div>
          </div>

          {/* Logo - Tam Ortada */}
          <div className="flex items-center justify-center">
            <Link href="/" className="relative w-24 h-10">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="DOVEC Logo"
                  fill
                  className={`object-contain transition-all duration-500 ${isScrolled ? '' : 'brightness-0 invert'}`}
                  priority
                />
              )}
            </Link>
          </div>
          
          {/* Sağ taraf - İletişim linki */}
          <div className="flex justify-end">
            <Link
              href="/iletisim"
              className={`relative font-scandia tracking-wider py-2 transition-all duration-300 ${
                isScrolled ? 'text-zinc-800' : 'text-white'
              }`}
            >
              <span className="relative z-10 text-sm uppercase">DÖVEÇ'E BAĞLAN</span>
              <div className={`absolute bottom-0 left-0 w-full h-[1px] ${
                isScrolled 
                  ? 'bg-gradient-to-r from-transparent via-zinc-600 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-white to-transparent'
              } scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center`}></div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

function NavLink({ href, label, isMobile = false }: { href: string; label: string; isMobile?: boolean }) {
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsActive(true)
      } else {
        setIsActive(false)
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
        isActive ? 'text-zinc-700 hover:text-black' : 'text-white hover:text-white'
      }`}
    >
      <span className="relative z-10 text-sm uppercase">{label}</span>
      <div className={`absolute bottom-0 left-0 w-full h-[1px] ${
        isActive 
          ? 'bg-gradient-to-r from-transparent via-zinc-600 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-white to-transparent'
      } scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${
        isActive ? 'bg-zinc-800/10' : 'bg-white/20'
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
      <span className="relative inline-block text-xl font-light text-[#061E4F] tracking-wider transition-transform duration-300 group-hover:translate-x-2">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#061E4F]/60 to-transparent transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
} 