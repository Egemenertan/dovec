'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'

export const AboutSection = () => {
  const [aboutImage, setAboutImage] = useState('')

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imagePath = 'querencia/r imaj_9 kopya_16_11zon.webp'
        const imageRef = ref(storage, imagePath)
        const url = await getDownloadURL(imageRef)
        setAboutImage(url)
      } catch (error: any) {
        console.error('Hakkımızda görseli yüklenemedi:', error.message)
      }
    }

    loadImage()
  }, [])

  return (
    <div className="py-16 sm:py-24 md:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[1px] w-44 bg-gray-200 mb-8"
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-extralight leading-tight text-[#061E4F]"
            >
              Hayalleri, toplulukları ve <br />
              sürdürülebilir bir geleceği <br />
              <span className="block italic mt-2 text-gray-700">inşa ediyoruz.</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-gray-600 font-light text-lg"
            >
              <p>
                Döveç Group, bugüne dek hayata geçirdiği 100'den fazla projede, 2000'den
                fazla aileyi ev sahibi yapmıştır.
              </p>
              
              <p>
                En son 2019 yılında 6.sı düzenlenen Kuzey Kıbrıs'ın en prestijli ödül töreni
                Property NC emlak ödüllerinde yılın en iyi inşaat şirketi ödülü başta olmak
                üzere 13 ayrı kategoride ödüle layık görülen Döveç Group sektöründe öncü
                olduğunu kanıtladı.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[500px] lg:h-[600px]  overflow-hidden shadow-2xl"
          >
            <Image
              src={aboutImage || '/tatlisu_35 copy 2-1.webp'}
              alt="Döveç Group Projesi"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
} 