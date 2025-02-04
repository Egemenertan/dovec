'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { ProjectSlider } from '@/components/ProjectSlider'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'

// Swiper stilleri
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const initialServices = [
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
    description: 'Profesyonel danışmanlık hizmetleri.',
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
          'laisla/tatlisu_24 copy (1)_11zon.webp',
          'querencia/r imaj_8 kopya_15_11zon.webp',
          'natulux/Natulux Out View 1 (1)_11zon.webp'
        ]

        const loadedImages = await Promise.all(
          investmentImagePaths.map(async (path) => {
            try {
              const imageRef = ref(storage, path)
              return await getDownloadURL(imageRef)
            } catch (error: any) {
              console.error(`Resim yüklenemedi (${path}):`, error.message)
              return ''
            }
          })
        )

        setInvestmentImages({
          image1: loadedImages[0],
          image2: loadedImages[1],
          image3: loadedImages[2]
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
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-[#061E4F] mb-4 sm:mb-6 md:mb-8 uppercase">Rakamlarla Dovec</h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <p className="text-lg sm:text-xl font-light tracking-wider text-gray-600 mt-4 sm:mt-6">Devam eden inşaat işleri 8 milyar euro.</p>
          </div>
          
          <div className="grid grid-cols-12 gap-4">
            {/* Ülke Sayısı */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">53</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Ülkeden Çözüm Ortakları</div>
            </div>
            
            {/* Çalışan Sayısı */}
            <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">550+</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Çalışan Sayısı</div>
            </div>
            
            {/* Çalışan Çeşitliliği */}
            <div className="col-span-12 sm:col-span-3 md:col-span-3 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">64</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Milletten Çalışan Çeşitliliği</div>
            </div>
            
            {/* ENR Sıralaması */}
            <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500 flex justify-between items-center">
              <div>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">#53</div>
                <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">ENR Dünyanın En Büyük<br />250 Müteahhiti</div>
              </div>
              
            </div>
            
            {/* Ciro */}
            <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">3 Milyar €</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">İştirakler ve bağlı ortaklıklar dahildir.</div>
            </div>
            
            {/* Hastane İstatistikleri */}
            <div className="col-span-12 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-lg sm:text-xl font-light tracking-wider text-[#061E4F] mb-2 group-hover:text-white/90 transition-colors">Projelerde</div>
                  <div className="text-3xl sm:text-4xl font-extralight text-[#061E4F] group-hover:text-white tracking-tight transition-colors">3.700.000 m² Alanda</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-light tracking-wider text-[#061E4F] mb-2 group-hover:text-white/90 transition-colors">Yaşam Alanı</div>
                  <div className="text-3xl sm:text-4xl font-extralight text-[#061E4F] group-hover:text-white tracking-tight transition-colors">5000+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yatırım Fırsatları Bölümü */}
      <div className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Sol Taraf - Başlık ve Metin */}
            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-tight tracking-[.2em] text-[#061E4F] animate-fade-in uppercase">
                  <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Kuzey Kıbrıs yalnızca 
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                   bir yatırım alanı
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 bg-clip-text text-transparent">
                    değildir
                  </span>
                 
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src={investmentImages.image1 || '/interior-1.jpg'}
                    alt="Kuzey Kıbrıs Yatırım"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src={investmentImages.image2 || '/consultant.jpg'}
                    alt="Kuzey Kıbrıs Yatırım"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Görsel */}
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
              <Image
                src={investmentImages.image3 || '/exterior-1.jpg'}
                alt="Kuzey Kıbrıs Yatırım"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
                <span className="text-sm sm:text-base font-medium text-gray-900">• Kuzey Kıbrıs</span>
              </div>
            </div>
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
              DOVEC GROUP
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-[#061E4F] mb-6 relative inline-block">
              Faaliyet Alanlarımız
              <div className="absolute -bottom-4 left-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent transform -translate-x-1/2"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
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