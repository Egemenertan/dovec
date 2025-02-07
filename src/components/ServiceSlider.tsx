'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'

const initialServices = [
  {
    title: 'Auto Trend',
    description: 'Premium araç kiralama ve satış hizmetleri.',
    image: '',
    storagePath: 'logo/auto-trend.webp',
    link: '/faaliyet/auto-trend'
  },
  {
    title: 'Alfam Dormitory',
    description: 'Modern öğrenci yaşam alanları.',
    image: '',
    storagePath: 'logo/alfam.webp',
    link: '/faaliyet/alfam-dormitory'
  },
  {
    title: 'Arredo',
    description: 'Lüks mobilya ve iç tasarım çözümleri.',
    image: '',
    storagePath: 'logo/arredo.webp',
    link: '/faaliyet/arredo'
  },
  {
    title: 'Dovec Fitness',
    description: 'Profesyonel spor ve yaşam merkezi.',
    image: '',
    storagePath: 'logo/fitness.webp',
    link: '/faaliyet/dovec-fitness'
  }
]

export const ServiceSlider = () => {
  const [services, setServices] = useState(initialServices)

  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedServices = await Promise.all(
          services.map(async (service) => {
            try {
              const imageRef = ref(storage, service.storagePath)
              const url = await getDownloadURL(imageRef)
              return { ...service, image: url }
            } catch (error) {
              console.error(`Error loading image for ${service.title}:`, error)
              return service
            }
          })
        )
        setServices(updatedServices)
      } catch (error) {
        console.error('Error loading service images:', error)
      }
    }

    loadImages()
  }, [])

  return (
    <div className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="block text-sm font-light tracking-[0.4em] text-zinc-400 mb-4">
            DÖVEÇ GROUP
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-zinc-800 mb-6 relative inline-block">
            Faaliyet Alanlarımız
            <div className="absolute -bottom-4 left-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent transform -translate-x-1/2"></div>
          </h2>
          <p className="text-lg md:text-xl font-light tracking-wide text-zinc-500 max-w-2xl mx-auto mt-8">
            Farklı sektörlerde kalite ve güven odaklı hizmetler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.link}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-xl font-light tracking-wide text-zinc-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-zinc-800 text-sm group/link">
                    <span className="relative">
                      Detayları Gör
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-800 group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 left-6">
                <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-light tracking-wider text-zinc-800">
                  {`0${index + 1}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 