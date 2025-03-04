'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconPhone, IconMail } from '@tabler/icons-react';
import Image from 'next/image';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { Raleway } from 'next/font/google';
import { useLanguage } from '@/context/LanguageContext';

type Language = 'tr' | 'en';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400'],
});

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || '';
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

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
            <Suspense fallback={null}>
              <SidebarContent 
                pathname={pathname}
                logoUrl={logoUrl}
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
                onClose={onClose}
                mounted={mounted}
                language={language}
                setLanguage={setLanguage}
                t={t}
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
  mounted,
  language,
  setLanguage,
  t
}: { 
  pathname: string;
  logoUrl: string;
  expandedItem: string | null;
  setExpandedItem: (item: string | null) => void;
  onClose: () => void;
  mounted: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}) {
  const searchParams = useSearchParams();
  const filterParam = searchParams?.get('filter');

  // Projeler sayfasında ve alt sayfalarında olup olmadığımızı kontrol et
  useEffect(() => {
    if (pathname.startsWith('/projeler')) {
      setExpandedItem(t('sidebar.menu.projects.title'));
    }
  }, [pathname, t]);

  const menuItems = [
    { name: t('sidebar.menu.home'), href: '/' },
    { name: t('sidebar.menu.about'), href: '/hakkimizda' },
    { 
      name: t('sidebar.menu.projects.title'), 
      href: '/projeler',
      submenu: [
        { name: t('sidebar.menu.projects.all'), href: '/projeler' },
        { name: t('sidebar.menu.projects.ongoing'), href: '/projeler?filter=devam-eden' },
        { name: t('sidebar.menu.projects.completed'), href: '/projeler?filter=tamamlanan' }
      ]
    },
    { name: t('sidebar.menu.blog'), href: '/blog' },
    { name: t('sidebar.menu.career'), href: 'https://www.linkedin.com/company/dovecgroup/', external: true },
    { name: t('sidebar.menu.contact'), href: '/iletisim' }
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Logo */}
      <div className="flex justify-between items-center py-8 px-12">
        <Link href="/" onClick={onClose}>
          <div className="relative w-32 h-8">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="DÖVEÇ Logo"
                fill
                className="object-contain brightness-0 invert"
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
      <nav className="flex-1 overflow-y-auto py-12 px-12">
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
                      className={`group relative flex items-center justify-between w-full py-2 transition-all duration-300 ease-out ${
                        isActive 
                          ? 'text-white translate-x-1' 
                          : 'text-white/70 hover:text-white hover:translate-x-1'
                      } ${raleway.className} active:translate-x-0 active:transition-none`}
                    >
                      <span className="text-2xl font-light tracking-wide">{item.name}</span>
                      <svg
                        className={`w-5 h-5 transform transition-all duration-300 ease-out ${isExpanded ? 'rotate-180 text-white' : 'text-white/70'}`}
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
                          initial={{ height: 0, opacity: 0, x: -20 }}
                          animate={{ height: 'auto', opacity: 1, x: 0 }}
                          exit={{ height: 0, opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="space-y-4 pl-4"
                        >
                          {item.submenu.map((subItem) => {
                            const isSubItemActive = subItem.href === pathname + (filterParam ? `?filter=${filterParam}` : '');
                            return (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={`group relative flex items-center py-2 transition-all duration-300 ease-out ${
                                    isSubItemActive ? 'text-white translate-x-1' : 'text-white/60 hover:text-white hover:translate-x-1'
                                  } ${raleway.className} active:translate-x-0 active:transition-none`}
                                  onClick={onClose}
                                >
                                  <span className="text-xl font-light tracking-wide">{subItem.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) :
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`group relative flex items-center py-2 transition-all duration-300 ease-out ${
                      isActive ? 'text-white translate-x-1' : 'text-white/70 hover:text-white hover:translate-x-1'
                    } ${raleway.className} active:translate-x-0 active:transition-none`}
                    onClick={onClose}
                  >
                    <span className="text-2xl font-light tracking-wide">{item.name}</span>
                  </Link>
                }
              </li>
            );
          })}
        </ul>
      </nav>

      {/* İletişim Bilgileri */}
      <div className="absolute bottom-0 left-0 right-0 px-12 py-8 border-t border-white/10">
        <div className="space-y-4">
          {/* Dil Seçici */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setLanguage('tr')}
              className={`text-2xl font-light tracking-wide transition-colors duration-200 ${
                language === 'tr' ? 'text-white' : 'text-white/50 hover:text-white/70'
              } ${raleway.className}`}
            >
              Türkçe
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-2xl font-light tracking-wide transition-colors duration-200 ${
                language === 'en' ? 'text-white' : 'text-white/50 hover:text-white/70'
              } ${raleway.className}`}
            >
              English
            </button>
          </div>
          <a 
            href="tel:+902165359300" 
            className={`flex items-center space-x-3 text-white/70 hover:text-white transition-colors ${raleway.className} group`}
          >
            <IconPhone size={24} className="transition-colors duration-200 group-hover:text-white text-white/70" />
            <span className="text-xl font-light tracking-wide">+90 216 535 93 00</span>
          </a>
          <a 
            href="mailto:info@dovec.com.tr" 
            className={`flex items-center space-x-3 text-white/70 hover:text-white transition-colors ${raleway.className} group`}
          >
            <IconMail size={24} className="transition-colors duration-200 group-hover:text-white text-white/70" />
            <span className="text-xl font-light tracking-wide">info@dovec.com.tr</span>
          </a>
        </div>
      </div>
    </>
  );
} 