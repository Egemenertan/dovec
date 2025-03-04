'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsShowcase } from '@/components/ProjectsShowcase'
import ProjectSection from '@/components/ProjectSection'
import { Facilities } from '@/components/Facilities'
import VirtualTour from '@/components/VirtualTour'
import { Awards } from '@/components/awards'
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
      <div className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#DFD8CF] relative overflow-hidden">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[.15em] text-[#061E4F] mb-6 "
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
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-[#D8D6CD] backdrop-blur-xl p-8 lg:p-10 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-[#D8D6CD] hover:to-[#D8D6CD]/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative font-inter">53</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative ">Ülkeden Çözüm Ortakları</span>
              </div>
            </motion.div>
            
            {/* Çalışan Sayısı */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-[#D8D6CD] backdrop-blur-xl p-8 lg:p-10 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-[#D8D6CD] hover:to-[#D8D6CD]/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative font-inter">550+</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative ">Çalışan Sayısı</span>
              </div>
            </motion.div>
            
            {/* Çalışan Çeşitliliği */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-[#D8D6CD] backdrop-blur-xl p-8 lg:p-10 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-[#D8D6CD] hover:to-[#D8D6CD]/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative font-inter">24</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative ">Milletten Çalışan Çeşitliliği</span>
              </div>
            </motion.div>
            
            {/* Ciro */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="col-span-12 md:col-span-6 bg-[#D8D6CD] backdrop-blur-xl p-8 lg:p-10 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-[#D8D6CD] hover:to-[#D8D6CD]/80"
            >
              <div className="flex flex-col items-start relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <span className="text-6xl lg:text-7xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative font-inter">5 Milyar £</span>
                <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative ">İştirakler ve bağlı ortaklıklar dahildir</span>
              </div>
            </motion.div>
            
            {/* Alan İstatistikleri */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="col-span-12 md:col-span-6 bg-[#D8D6CD] backdrop-blur-xl p-8 lg:p-10 shadow-sm hover:shadow-xl group transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:from-[#D8D6CD] hover:to-[#D8D6CD]/80"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-start relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  <span className="text-4xl lg:text-5xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative font-inter">3.7M m²</span>
                  <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative ">Proje Alanı</span>
                </div>
                <div className="flex flex-col items-start relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#061E4F]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  <span className="text-4xl lg:text-5xl font-light text-[#061E4F] mb-4 transition-all group-hover:scale-110 origin-left relative font-inter">5000+</span>
                  <span className="text-[#061E4F]/80 text-lg font-light tracking-wide relative ">Yaşam Alanı</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hakkımızda Bölümü */}
      <AboutSection />

      {/* Projeler Bölümü */}
      <ProjectsShowcase />

      {/* Projelerimiz Bölümü */}
      <ProjectSection 
        backgroundImage="/earth-day.jpg"
        title="PROJELERİMİZ"
        description='"Her konut, bu muhteşem manzarayı en üst düzeye çıkaracak şekilde stratejik olarak konumlandırılmış olup, konut sakinlerinin günlük yaşamlarına büyüleyici bir fon oluşturan masmavi denizleri, yemyeşil doğayı ve parlak plajları hayranlıkla seyretmelerine olanak tanımaktadır."'
        additionalText="Tesisin her noktasından, sakinlere gökyüzünün ve mevsimlerin değişen renkleriyle sürekli gelişen doğanın güzelliğinin görsel bir senfonisi sunulmaktadır. Önünüzde uzanan hayranlık uyandırıcı manzaraların tadını çıkarırken, şehir rahatlığı ve dağ huzurunun uyumlu karışımını kucaklayın."
      />

    

      {/* 360 Sanal Tur Bölümü */}
      <div className=" ">
        <div className=" mx-auto ">
          <div className="text-center ">
          </div>
          <VirtualTour />
        </div>
      </div>

      <Awards />
      

  S
      {/* Faaliyet Alanları */}
      <div className="py-16 sm:py-24 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="block text-sm font-light tracking-[0.4em] text-zinc-400 mb-4">
              DÖVEÇ GROUP
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-[#061E4F] mb-6 relative inline-block">
              GRUP ŞİRKETLERİMİZ
              <div className="absolute -bottom-4 left-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent transform -translate-x-1/2"></div>
            </h2>
          </div>
          
          <div className="overflow-hidden py-8">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30,
                ease: "linear",
                repeat: Infinity
              }}
              className="flex gap-16 lg:gap-20 items-center min-h-[200px] whitespace-nowrap"
            >
              {[...services, ...services].map((service, index) => (
                <div key={index} className="group flex-shrink-0">
                  <div className="relative">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={180}
                        height={180}
                        className="w-44 h-44 object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                      />
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 