'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
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
  { 
    name: 'Projeler', 
    href: '/projeler',
    submenu: [
      { name: 'Tüm Projeler', href: '/projeler' },
      { name: 'Devam Eden Projeler', href: '/projeler?filter=devam-eden' },
      { name: 'Tamamlanan Projeler', href: '/projeler?filter=tamamlanan' }
    ]
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Kariyer', href: 'https://www.linkedin.com/company/dovecgroup/', external: true },
  { name: 'DÖVEÇ\'E BAĞLAN', href: '/iletisim' }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || '';
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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

  // Projeler sayfasında ve alt sayfalarında olup olmadığımızı kontrol et
  useEffect(() => {
    if (pathname.startsWith('/projeler')) {
      setExpandedItem('Projeler');
    }
  }, [pathname]);

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
            <Suspense fallback={null}>
              <SidebarContent 
                pathname={pathname}
                logoUrl={logoUrl}
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
                onClose={onClose}
                mounted={mounted}
              />
            </Suspense>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarContent({ 
  pathname, 
  logoUrl, 
  expandedItem, 
  setExpandedItem, 
  onClose,
  mounted 
}: { 
  pathname: string;
  logoUrl: string;
  expandedItem: string | null;
  setExpandedItem: (item: string | null) => void;
  onClose: () => void;
  mounted: boolean;
}) {
  const searchParams = useSearchParams();
  const filterParam = searchParams?.get('filter');

  if (!mounted) return null;

  return (
    <>
      {/* Logo */}
      <div className="flex justify-between items-center p-8">
        <Link href="/" onClick={onClose}>
          <div className="relative w-32 h-8">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="DÖVEÇ Logo"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </Link>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <IconX size={24} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-12 px-8">
        <ul className="space-y-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.submenu && pathname.startsWith(item.href)) ||
              (item.submenu && item.submenu.some(subItem => 
                subItem.href === pathname + (filterParam ? `?filter=${filterParam}` : '')
              ));
            const isExpanded = expandedItem === item.name;
            
            return (
              <li key={item.href}>
                {item.submenu ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.name)}
                      className={`group relative flex items-center justify-between w-full py-2 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl font-light tracking-wide">{item.name}</span>
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 pl-4"
                        >
                          {item.submenu.map((subItem) => {
                            const isSubItemActive = subItem.href === pathname + (filterParam ? `?filter=${filterParam}` : '');
                            return (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={`group relative flex items-center py-2 transition-all duration-300 ${
                                    isSubItemActive ? 'text-white' : 'text-white/60 hover:text-white'
                                  }`}
                                  onClick={onClose}
                                >
                                  <span className="text-xl font-light tracking-wide">{subItem.name}</span>
                                  <motion.div 
                                    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-300"
                                    whileHover={{ width: '100%' }}
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`group relative flex items-center py-2 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                    onClick={onClose}
                  >
                    <span className="text-2xl font-light tracking-wide">{item.name}</span>
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: '100%' }}
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
} 