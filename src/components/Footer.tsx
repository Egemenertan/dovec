'use client'

import Image from 'next/image'
import Link from 'next/link'
import { storage } from '@/firebase/config'
import { useEffect, useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { motion } from 'framer-motion'

export function Footer() {
  const [logoUrl, setLogoUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)

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

    const loadImage = async () => {
      try {
        setLoading(true)
        const imageRef = ref(storage, 'natulux/Natulux Out View 2 (2).webp')
        const url = await getDownloadURL(imageRef)
        setImageUrl(url)
      } catch (error) {
        console.error('Resim yüklenirken hata oluştu:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLogo()
    loadImage()
  }, [])

  return (
    <footer className="relative">
      {/* Arkaplan rengi için katmanlar */}
      <div className="absolute inset-0 w-full h-full">
        <div className="h-[20%] bg-white"></div>
        <div className="h-[80%] bg-[#1E1E1E]"></div>
      </div>
      
      <div className="max-w-8xl items-center mx-auto px-6 sm:px-8 lg:px-12 relative flex flex-col">
        {/* Adres ve İletişim Bilgileri Alanı */}
        <div className="py-8 w-full">
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
            ) : imageUrl ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-6xl mx-auto overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <Image 
                    src={imageUrl} 
                    alt="Natulux Görünüm" 
                    width={1200} 
                    height={400}
                    className="w-full h-[400px] object-cover"
                    priority
                  />
                  
                  {/* Adres Kutuları - Görsel içinde alt kısımda */}
                  <div className="absolute bottom-6 left-0 right-0 flex flex-col md:flex-row justify-center gap-4 md:gap-8 px-2 md:px-4 w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="bg-[#f2efe9] p-4 md:p-6 w-full md:w-2/5 border-t border-gray-200 relative"
                    >
                      {/* Konum İkonu - Sağ Üst Köşe */}
                      <div className="absolute top-2 md:top-4 right-2 md:right-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#c8d4c5] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#061E4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
                            <path d="M12 21s-8-4.5-8-11a8 8 0 1 1 16 0c0 6.5-8 11-8 11z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-3xl font-light text-gray-800 mb-2 md:mb-4">Adresimiz</h3>
                      <p className="text-sm md:text-base text-gray-700">
                        Döveç Head Quarters Uluçam Yolu, No.2, Sakarya, <br />
                        Gazimağusa, KKTC
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="bg-[#f2efe9] p-4 md:p-6 w-full md:w-2/5 border-t border-gray-200 relative"
                    >
                      {/* İletişim İkonu - Sağ Üst Köşe */}
                      <div className="absolute top-2 md:top-4 right-2 md:right-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#c8d4c5] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#061E4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-3xl font-light text-gray-800 mb-2 md:mb-4">Satış Ve Müşteri Hizmetleri</h3>
                      <p className="text-sm md:text-base text-gray-700">
                      +90 548 837 0015 <br />
                      info@dovecconstruction.com
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-500">Resim yüklenemedi.</div>
            )}
          </div>
        </div>
        
        {/* Ana İçerik */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-12 gap-x-6 gap-y-6 py-4">
          {/* Sol Kısım - Logo ve Açıklama */}
          <div className="col-span-2 sm:col-span-4 space-y-4">
            <div className="relative w-24 h-8">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="DOVEC Logo"
                  fill
                  className="invert brightness-0"
                  priority
                />
              )}
            </div>
            <p className="text-base font-light tracking-wide text-white/90 leading-snug">
              Modern yaşam alanları tasarlıyor, geleceği inşa ediyoruz.
            </p>
            
            {/* Sosyal Medya */}
            <div className="mt-4">
              <div className="flex space-x-4 mt-3">
                <Link 
                  href="https://www.facebook.com/DovecConstruction/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.instagram.com/dovec_group/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/dovecgroup/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://www.youtube.com/c/dovecgroup" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
                <Link 
                  href="https://wa.me/905488370015" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Orta Kısım - Projelerimiz */}
          <div className="col-span-1 sm:col-span-4">
            <div className="text-left sm:text-right">
              <h3 className="text-base font-medium tracking-wide uppercase mb-4 relative inline-block text-white">
                Projelerimiz
                <div className="absolute -bottom-1.5 left-0 sm:left-auto sm:right-0 w-8 h-0.5 bg-white/80"></div>
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/projeler/la-casalia" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">La Casalia</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler/four-seasons-life" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Four Seasons Life</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler/querencia" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Querencia</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler/natulux" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Natulux</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler/la-isla" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">La Isla</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler/courtyard-platinum" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Courtyard Platinum</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Sağ Kısım - Hızlı Linkler ve Sosyal Medya */}
          <div className="col-span-1 sm:col-span-4">
            <div className="text-left sm:text-right">
              <h3 className="text-base font-medium tracking-wide uppercase mb-4 relative inline-block text-white">
                Hızlı Linkler
                <div className="absolute -bottom-1.5 left-0 sm:left-auto sm:right-0 w-8 h-0.5 bg-white/80"></div>
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/hakkimizda" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Biz Kimiz</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Projeler</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/medya" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Medya</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Blog</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/company/dovecgroup/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 relative group/link tracking-wide"
                  >
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">Kariyer</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </a>
                </li>
                <li>
                  <Link href="/iletisim" className="text-sm text-white/80 relative group/link tracking-wide">
                    <span className="relative inline-block transition-transform duration-300 group-hover/link:translate-x-2 sm:group-hover/link:-translate-x-2 text-left sm:text-right">İletişim</span>
                    <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Alt Kısım - Telif Hakkı */}
        <div className="py-4 border-t border-white/10 w-full">
          <p className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} DOVEC Group. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
} 