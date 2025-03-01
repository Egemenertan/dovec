'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Biz Kimiz', href: '/hakkimizda' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kariyer', href: 'https://www.linkedin.com/company/dovecgroup/', external: true },
  { name: 'DÖVEÇ\'E BAĞLAN', href: '/iletisim' }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const imageRef = ref(storage, 'dovec.webp');
        const url = await getDownloadURL(imageRef);
        setLogoUrl(url);
      } catch (error) {
        console.error('Logo yüklenirken hata:', error);
      }
    };

    fetchLogo();
  }, []);

  // Scroll engelleme için useEffect
  useEffect(() => {
    if (isOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Scroll pozisyonunu geri yükle
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed top-0 left-0 h-screen w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-black/90 backdrop-blur-md shadow-2xl z-[70]"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="relative w-24 h-10">
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt="DOVEC Logo"
                      fill
                      className="object-contain brightness-0 invert"
                      priority
                    />
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                  aria-label="Menüyü Kapat"
                >
                  <IconX size={24} className="text-white/70 hover:text-white transition-colors duration-200" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-12 px-8">
                <ul className="space-y-8">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className={`group relative flex items-center py-2 transition-all duration-300 ${
                            isActive 
                              ? 'text-white' 
                              : 'text-white/70 hover:text-white'
                          }`}
                          onClick={() => {
                            if (!item.external) {
                              onClose();
                            }
                          }}
                        >
                          <span className="text-2xl font-light tracking-wide">{item.name}</span>
                          <motion.div 
                            className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-300"
                            whileHover={{ width: '100%' }}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* İletişim Bilgileri */}
              <div className="px-8 py-6 border-t border-white/10">
                <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider mb-4">DÖVEÇ'E BAĞLAN</h3>
                <div className="space-y-4">
                  <a 
                    href="tel:+905338577858" 
                    className="flex items-center group text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-lg font-light">+90 533 857 78 58</span>
                  </a>
                  <a 
                    href="mailto:info@dovec.com.tr" 
                    className="flex items-center group text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg font-light">info@dovec.com.tr</span>
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto p-8 border-t border-white/10">
                <div className="text-center text-sm text-white/50">
                  © {new Date().getFullYear()} DOVEC. Tüm hakları saklıdır.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 