'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { ProjectSlider } from '@/components/ProjectSlider'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'
import { motion } from 'framer-motion'

// Swiper stilleri
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const initialServices = [
  {
    title: 'Dovec Ventures',
    description: 'Yatırım ve girişim sermayesi hizmetleri.',
    image: '',
    storagePath: 'logo/dovecventures-logo-final-02-p-500.webp',
  },
  {
    title: 'Auto Trend',
    description: 'Premium araç kiralama ve satış hizmetleri.',
    image: '',
    storagePath: 'logo/autotrend.webp',
  },
  {
    title: 'Alfam Dormitory',
    description: 'Modern öğrenci yaşam alanları.',
    image: '',
    storagePath: 'logo/alfam yatay.webp',
  },
  {
    title: 'Arredo',
    description: 'Lüks mobilya ve iç tasarım çözümleri.',
    image: '',
    storagePath: 'logo/arredo.webp',
  },
  {
    title: 'Dovec Fitness',
    description: 'Profesyonel spor ve yaşam merkezi.',
    image: '',
    storagePath: 'logo/Dovec_Fitness.webp',
  },
  {
    title: 'DCS',
    description: 'DCS Profesyonel onarım hizmetleri.',
    image: '',
    storagePath: 'logo/DCS LOGO 2.webp',
  }
]

export default function Home() {
  const [services, setServices] = useState(initialServices)
  const [investmentImages, setInvestmentImages] = useState({
    image1: '',
    image2: '',
    image3: ''
  })

  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedServices = await Promise.all(
          initialServices.map(async (service) => {
            try {
              const imageRef = ref(storage, service.storagePath)
              const url = await getDownloadURL(imageRef)
              return { ...service, image: url }
            } catch (error: any) {
              console.error(`${service.title} logosu yüklenemedi:`, error.message)
              return service
            }
          })
        )
        setServices(updatedServices)

        // Yatırım bölümü resimlerini yükle
        const investmentImagePaths = [
          'querencia/r imaj_8 kopya_15_11zon.webp',
          'natulux/Natulux Out View 1 (1)_11zon.webp',
          'lacasalia/tatlisu__16 - Photo copy.webp'
        ]

        const loadedImages = await Promise.all(
          investmentImagePaths.map(async (path, index) => {
            try {
              const imageRef = ref(storage, path)
              const url = await getDownloadURL(imageRef)
              console.log(`Başarıyla yüklendi ${index + 1}:`, url)
              return url
            } catch (error: any) {
              console.error(`Resim ${index + 1} yüklenemedi (${path}):`, error.message)
              return '/interior-1.jpg'
            }
          })
        )

        setInvestmentImages({
          image1: loadedImages[0] || '/interior-1.jpg',
          image2: loadedImages[1] || '/interior-1.jpg',
          image3: loadedImages[2] || '/interior-1.jpg'
        })
      } catch (error) {
        console.error('Resimler yüklenirken hata oluştu:', error)
      }
    }

    loadImages()
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* İstatistikler Bölümü */}
      <div className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-light.png')] opacity-[0.02] pointer-events-none" />
        <div className="absolute -left-48 -top-48 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl" />
        <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm tracking-[0.4em] text-[#061E4F]/60 mb-4"
            >
              GLOBAL VARLIĞIMIZ
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[.15em] text-[#061E4F] mb-6"
            >
              RAKAMLARLA DÖVEÇ
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-48 h-[2px] bg-gradient-to-r from-[#061E4F]/10 via-[#061E4F] to-[#061E4F]/10 mb-8"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl font-light text-gray-600/90 max-w-2xl leading-relaxed"
            >
              Devam eden inşaat işleri 3 milyar £ değerinde olup, global ölçekte büyümeye devam ediyoruz.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Ülke Sayısı */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-[#061E4F]/20 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-white hover:to-gray-50/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative">53</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative">Ülkeden Çözüm Ortakları</span>
              </div>
            </motion.div>
            
            {/* Çalışan Sayısı */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-[#061E4F]/20 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-white hover:to-gray-50/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative">550+</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative">Çalışan Sayısı</span>
              </div>
            </motion.div>
            
            {/* Çalışan Çeşitliliği */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-[#061E4F]/20 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-white hover:to-gray-50/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative">24</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative">Milletten Çalışan Çeşitliliği</span>
              </div>
            </motion.div>
            
            {/* Ciro */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="col-span-12 md:col-span-6 bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-[#061E4F]/20 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-white hover:to-gray-50/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative">5 Milyar £</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative">İştirakler ve bağlı ortaklıklar dahildir</span>
              </div>
            </motion.div>
            
            {/* Alan İstatistikleri */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="col-span-12 md:col-span-6 bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-[#061E4F]/20 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-white hover:to-gray-50/80"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  <span className="text-4xl lg:text-5xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative">3.7M m²</span>
                  <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative">Proje Alanı</span>
                </div>
                <div className="flex flex-col items-start relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  <span className="text-4xl lg:text-5xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative">5000+</span>
                  <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative">Yaşam Alanı</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Yatırım Fırsatları Bölümü */}
      <div className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Sol Taraf - Başlık ve Metin */}
            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-4 relative">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extralight leading-tight tracking-[.2em] text-[#061E4F] animate-fade-in uppercase relative"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent"
                  >
                    BİR YATIRIMDAN DAHA FAZLASIDIR
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent"
                  >
                    KUZEY KIBRIS
                  </motion.div>
                  
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={investmentImages.image1}
                    alt="Kuzey Kıbrıs Yatırım"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={investmentImages.image2}
                    alt="Kuzey Kıbrıs Yatırım"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  />
                </motion.div>
              </div>
            </div>

            {/* Sağ Taraf - Görsel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={investmentImages.image3}
                alt="Kuzey Kıbrıs Yatırım"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.4 }}
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg"
              >
                <span className="text-sm sm:text-base font-medium text-gray-900">• Kuzey Kıbrıs</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Projeler Bölümü */}
      <ProjectSlider />

      {/* Faaliyet Alanları */}
      <div className="py-16 sm:py-24 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="block text-sm font-light tracking-[0.4em] text-zinc-400 mb-4">
              DÖVEÇ GROUP
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-[#061E4F] mb-6 relative inline-block">
              FAALİYET ALANLARIMIZ
              <div className="absolute -bottom-4 left-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent transform -translate-x-1/2"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 rtl">
            {services.map((service, index) => (
              <div key={index} className="group text-center">
                <div className="mb-6 relative">
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={120}
                      height={120}
                      className="mx-auto w-24 h-24 object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                    />
                  )}
                </div>
                <h3 className="text-lg font-light tracking-wide text-[#061E4F] mb-3 group-hover:text-[#061E4F]/80 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 