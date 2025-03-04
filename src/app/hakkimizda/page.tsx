'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { ShieldCheckIcon, LightBulbIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline'

// Animasyon varyantları
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Ekip üyeleri verisi
const teamMembers = [
  {
    name: 'Burçin Döveç',
    role: 'Yönetim Kurulu Başkanı',
    image: '/team/ahmet.jpg',
  },
  {
    name: 'Ayşe Kaya',
    role: 'Genel Müdür',
    image: '/team/ayse.jpg',
  },
  {
    name: 'Mehmet Demir',
    role: 'Teknik Direktör',
    image: '/team/mehmet.jpg',
  },
  {
    name: 'Zeynep Yıldız',
    role: 'Proje Müdürü',
    image: '/team/zeynep.jpg',
  },
];

export default function AboutPage() {
  const [chairmanImage, setChairmanImage] = useState('')
  const [signatureImage, setSignatureImage] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [visionImage, setVisionImage] = useState('')
  const [missionImage, setMissionImage] = useState('')
  const [manifestoImage, setManifestoImage] = useState('')
  const { t } = useLanguage()

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Hero görseli
        const heroRef = ref(storage, 'bizkimiz/DSC04004_11zon.webp')
        const heroUrl = await getDownloadURL(heroRef)
        setHeroImage(heroUrl)

        // Başkan resmi
        const imageRef = ref(storage, 'bd.webp')
        const url = await getDownloadURL(imageRef)
        setChairmanImage(url)

        // İmza resmi
        const signatureRef = ref(storage, 'bdsign.webp')
        const signatureUrl = await getDownloadURL(signatureRef)
        setSignatureImage(signatureUrl)

        // Vizyon görseli
        const visionRef = ref(storage, 'bizkimiz/r imaj_5 kopya_11zon.webp')
        const visionUrl = await getDownloadURL(visionRef)
        setVisionImage(visionUrl)

        // Misyon görseli
        const missionRef = ref(storage, 'bizkimiz/DJI_0266.00_00_01_23.Still001_11zon.webp')
        const missionUrl = await getDownloadURL(missionRef)
        setMissionImage(missionUrl)

        // Manifesto görseli
        const manifestoRef = ref(storage, 'bizkimiz/33.webp')
        const manifestoUrl = await getDownloadURL(manifestoRef)
        setManifestoImage(manifestoUrl)
      } catch (error) {
        console.error('Resimler yüklenemedi:', error)
      }
    }

    loadImages()
  }, [])

  const values = [
    {
      title: t('about.values.items.0.title'),
      description: t('about.values.items.0.description'),
      icon: <ShieldCheckIcon className="w-12 h-12 text-[#061E4F]" />,
    },
    {
      title: t('about.values.items.1.title'),
      description: t('about.values.items.1.description'),
      icon: <LightBulbIcon className="w-12 h-12 text-[#061E4F]" />,
    },
    {
      title: t('about.values.items.2.title'),
      description: t('about.values.items.2.description'),
      icon: <GlobeAltIcon className="w-12 h-12 text-[#061E4F]" />,
    },
    {
      title: t('about.values.items.3.title'),
      description: t('about.values.items.3.description'),
      icon: <UserGroupIcon className="w-12 h-12 text-[#061E4F]" />,
    },
  ]

  const milestones = t('about.history.milestones', { returnObjects: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[50vh] sm:h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt="Biz Kimiz"
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Navbar'dan başlayan hilal şeklinde gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent"></div>
        
        {/* Merkez Başlık */}
        <div className="absolute bottom-32 sm:bottom-36 left-0 right-0 flex justify-center">
          <div className="text-center">
            <span className="block text-[10px] tracking-[0.3em] text-white/60 uppercase mb-2">
              {t('about.hero.company')}
            </span>
            <div className="flex flex-row sm:flex-col items-center justify-center">
              <span className="text-xs font-light tracking-wider text-white/80 pr-2 sm:pr-0 sm:mb-1.5 border-r sm:border-r-0 border-white/20">
                {t('about.hero.founderTitle')}
              </span>
              <span className="text-xs font-light tracking-wider text-white pl-2 sm:pl-0">
                {t('about.hero.founderName')}
              </span>
            </div>
          </div>
        </div>

        {/* Alt Başlık */}
        <div className="absolute bottom-12 sm:bottom-12 left-0 right-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase text-center">
            {t('about.hero.title')}
          </h1>
        </div>
      </div>

      {/* Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">
                  {t('about.director.role')}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                {t('about.director.title')}
              </h2>
              <div className="text-xl font-light leading-relaxed text-gray-600 space-y-8">
                {t('about.director.message', { returnObjects: true }).map((paragraph: string, index: number) => (
                  <p key={index} className="block">{paragraph}</p>
                ))}
              </div>
              {signatureImage && (
                <div className="relative w-48 h-24 mt-4">
                  <Image
                    src={signatureImage}
                    alt={t('about.director.signatureAlt')}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chairmanImage || '/consultant.jpg'}
                alt="Yönetim Kurulu Başkanı"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* İkinci Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-1">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chairmanImage || '/consultant.jpg'}
                alt={t('about.vicePresident1.imageAlt')}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="space-y-8 order-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">
                  {t('about.vicePresident1.role')}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                {t('about.vicePresident1.title')}
              </h2>
              <div className="text-xl font-light leading-relaxed text-gray-600 space-y-8">
                {t('about.vicePresident1.message', { returnObjects: true }).map((paragraph: string, index: number) => (
                  <p key={index} className="block">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Üçüncü Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">
                  {t('about.vicePresident2.role')}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                {t('about.vicePresident2.title')}
              </h2>
              <div className="text-xl font-light leading-relaxed text-gray-600 space-y-8">
                {t('about.vicePresident2.message', { returnObjects: true }).map((paragraph: string, index: number) => (
                  <p key={index} className="block">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chairmanImage || '/consultant.jpg'}
                alt={t('about.vicePresident2.imageAlt')}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Vizyon ve Misyon */}
      <div className="relative py-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Sol Taraf - Vizyon */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">
                    {t('about.vision.sectionTitle')}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  {t('about.vision.title')}
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  {t('about.vision.description')}
                </p>
              </div>

              <div className="relative aspect-[4/3]  overflow-hidden shadow-2xl group">
                {visionImage && (
                  <Image
                    src={visionImage}
                    alt="Vizyon Görüntüsü"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Sağ Taraf - Misyon */}
            <div className="space-y-16 lg:mt-32">
              <div className="relative aspect-[4/3]  overflow-hidden shadow-2xl group lg:order-first order-last">
                {missionImage && (
                  <Image
                    src={missionImage}
                    alt="Misyon Görüntüsü"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">
                    {t('about.mission.sectionTitle')}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  {t('about.mission.title')}
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  {t('about.mission.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Dekoratif Çizgiler */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
            <div className="absolute inset-0 border border-[#061E4F]/10 rounded-full"></div>
            <div className="absolute inset-4 border border-[#061E4F]/10 rounded-full"></div>
            <div className="absolute inset-8 border border-[#061E4F]/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Dekoratif elementler */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        {/* Başlık */}
        <div className="relative text-center z-10 w-full px-4 mb-16 md:mb-24">
          <div className="flex items-center space-x-4 justify-center mb-4">
            <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
            <span className="text-sm md:text-base font-light tracking-[.5em] text-[#071E51] uppercase">
              {t('about.values.title')}
            </span>
            <div className="w-20 h-[1px] bg-gradient-to-l from-[#061E4F] to-transparent"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-[#061E4F]">
            {t('about.values.title')}
          </h2>
        </div>

        {/* Artı İşareti ve Değerler */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Dikey Çizgi */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#061E4F]/20 to-transparent">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#061E4F]/5 rounded-full blur-lg"></div>
            </div>
            
            {/* Yatay Çizgi */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#061E4F]/5 rounded-full blur-lg"></div>
            </div>

            {/* Değerler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-lg shadow-lg space-y-4"
                >
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-medium text-center text-[#061E4F]">{value.title}</h3>
                  <p className="text-gray-600 text-center font-light">{value.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Merkez Kesişim Efekti */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 h-24 md:h-32">
              <div className="absolute inset-0 bg-[#061E4F]/5 rounded-full blur-2xl"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Dekoratif Çemberler */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute inset-0 border border-[#061E4F]/5 rounded-full animate-pulse"></div>
          <div className="absolute inset-8 border border-[#061E4F]/5 rounded-full animate-pulse delay-150"></div>
          <div className="absolute inset-16 border border-[#061E4F]/5 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Manifesto */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative min-h-screen bg-[#C4C1B4] text-[#071E51] overflow-hidden"
      >
        {/* Arka plan desenleri */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#C4C1B4]"></div>
          
          {/* Geometrik desenler */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
            </div>
          </div>

          {/* Gradient katmanları */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C4C1B4] via-[#C4C1B4] to-[#C4C1B4]"></div>
          
          {/* Işık efektleri */}
          <motion.div 
            animate={{ 
              rotate: 360,
              transition: { duration: 50, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]">
              <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 bg-[#071E51]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 bg-[#071E51]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-[#071E51]/5 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* İnce çizgiler */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full rotate-12 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#071E51] to-transparent transform"
                  style={{
                    top: `${i * 20}%`,
                    opacity: 0.1 + (i * 0.05)
                  }}
                ></motion.div>
              ))}
            </div>
          </div>

          {/* Dekoratif daireler */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                transition: { duration: 5, repeat: Infinity }
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#071E51]/10 rounded-full"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 6, repeat: Infinity, delay: 0.5 }
              }}
              className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-[#071E51]/10 rounded-full"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                transition: { duration: 7, repeat: Infinity, delay: 1 }
              }}
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-[#071E51]/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
          </div>
        </div>

        {/* Ana içerik */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.div 
                variants={fadeInUp}
                className="space-y-8"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#071E51] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#071E51]">Dovec</span>
                </div>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-[.2em] uppercase leading-tight text-[#071E51]">
                  Manifesto
                </h2>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="prose prose-lg"
              >
                <p className="text-xl font-light leading-relaxed text-[#071E51]">
                  {t('about.manifesto.description1')}
                </p>
                <p className="text-xl font-light leading-relaxed text-[#071E51]">
                  {t('about.manifesto.description2')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {[
                  { title: t('about.manifesto.items.0.title'), desc: t('about.manifesto.items.0.description') },
                  { title: t('about.manifesto.items.1.title'), desc: t('about.manifesto.items.1.description') },
                  { title: t('about.manifesto.items.2.title'), desc: t('about.manifesto.items.2.description') },
                  { title: t('about.manifesto.items.3.title'), desc: t('about.manifesto.items.3.description') },
                  { title: t('about.manifesto.items.4.title'), desc: t('about.manifesto.items.4.description') },
                  { title: t('about.manifesto.items.5.title'), desc: t('about.manifesto.items.5.description') }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-[#071E51] rounded-full"></div>
                      <h3 className="text-xl font-light text-[#071E51]">{item.title}</h3>
                    </div>
                    <p className="text-[#071E51]/70 pl-6">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                {manifestoImage && (
                  <Image
                    src={manifestoImage}
                    alt="DOVEC Manifesto"
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E51] via-transparent to-transparent"></div>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                  transition: { duration: 5, repeat: Infinity }
                }}
                className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#071E51]/10 rounded-full blur-3xl"
              ></motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                  transition: { duration: 5, repeat: Infinity, delay: 0.5 }
                }}
                className="absolute -top-8 -left-8 w-64 h-64 bg-[#071E51]/10 rounded-full blur-3xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* History */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F]">
              {t('about.history.title')}
            </h2>
            <p className="mt-8 text-gray-600 font-light text-lg max-w-4xl mx-auto">
              {t('about.history.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg space-y-4"
              >
                <div className="text-3xl font-light text-[#061E4F]">{milestone.year}</div>
                <p className="text-gray-600 font-light">{milestone.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 