'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL, listAll, ListResult } from 'firebase/storage'

export const Facilities = () => {
  const [images, setImages] = useState({
    spa: '',
    gym: ''
  })
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Firebase Storage'dan rastgele görsel almak için klasörleri tanımlayalım
        const folders = [
          'querencia',
          'natulux',
          'lacasalia'
        ]
        
        // Rastgele klasör seçimi
        const getRandomFolder = () => folders[Math.floor(Math.random() * folders.length)]
        
        // Spa için rastgele bir klasör seçelim
        const spaFolder = getRandomFolder()
        // Spor salonu için farklı bir klasör seçelim
        let gymFolder
        do {
          gymFolder = getRandomFolder()
        } while (gymFolder === spaFolder) // Farklı klasör olmasını sağlayalım
        
        // Klasördeki tüm görselleri listeleme
        const spaFolderRef = ref(storage, spaFolder)
        const gymFolderRef = ref(storage, gymFolder)
        
        const spaFiles = await listAll(spaFolderRef)
        const gymFiles = await listAll(gymFolderRef)
        
        // Klasörlerden rastgele görsel seçme
        const getRandomImage = async (files: ListResult) => {
          if (files.items.length === 0) return null
          
          const randomFile = files.items[Math.floor(Math.random() * files.items.length)]
          return await getDownloadURL(randomFile)
        }
        
        // Rastgele görselleri alma
        const spaUrl = await getRandomImage(spaFiles) || 'querencia/r imaj_8 kopya_15_11zon.webp'
        const gymUrl = await getRandomImage(gymFiles) || 'natulux/Natulux Out View 1 (1)_11zon.webp'
        
        // Eğer rastgele görsel alınamazsa, varsayılan görselleri kullan
        if (!spaUrl) {
          const defaultSpaRef = ref(storage, 'querencia/r imaj_8 kopya_15_11zon.webp')
          const defaultSpaUrl = await getDownloadURL(defaultSpaRef)
          setImages(prev => ({ ...prev, spa: defaultSpaUrl }))
        } else {
          setImages(prev => ({ ...prev, spa: spaUrl }))
        }
        
        if (!gymUrl) {
          const defaultGymRef = ref(storage, 'natulux/Natulux Out View 1 (1)_11zon.webp')
          const defaultGymUrl = await getDownloadURL(defaultGymRef)
          setImages(prev => ({ ...prev, gym: defaultGymUrl }))
        } else {
          setImages(prev => ({ ...prev, gym: gymUrl }))
        }
      } catch (error: any) {
        console.error('Görseller yüklenirken hata oluştu:', error.message)
        
        // Hata durumunda varsayılan görselleri yüklemeyi deneyelim
        try {
          const defaultSpaRef = ref(storage, 'querencia/r imaj_8 kopya_15_11zon.webp')
          const defaultGymRef = ref(storage, 'natulux/Natulux Out View 1 (1)_11zon.webp')
          
          const defaultSpaUrl = await getDownloadURL(defaultSpaRef)
          const defaultGymUrl = await getDownloadURL(defaultGymRef)
          
          setImages({
            spa: defaultSpaUrl,
            gym: defaultGymUrl
          })
        } catch (fallbackError) {
          console.error('Varsayılan görseller de yüklenemedi:', fallbackError)
        }
      }
    }
    
    loadImages()
  }, [])
  
  return (
    <div className="w-full bg-white">
      {/* MÜKEMMEL OLANAKLAR Başlık */}
      <div className="w-full pt-32  flex justify-center items-center">
        <h1 className="text-6xl font-extralight tracking-widest text-[#DFD8CF]">
          MÜKEMMEL OLANAKLAR
        </h1>
      </div>

      {/* SPA Bölümü */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Sol taraf - SPA Görseli */}
        <div className="w-full md:w-1/2 h-[500px] relative">
          {images.spa ? (
            <Image 
              src={images.spa} 
              alt="Spa Alanı" 
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-400">Görsel yükleniyor...</p>
            </div>
          )}
        </div>
        
        {/* Sağ taraf - SPA Açıklaması */}
        <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-start p-12 md:p-16 lg:p-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-light mb-8"
          >
            SPA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-light leading-relaxed"
          >
            Mükemmel bir canlanma deneyimi için geniş alanımızda ve bilişimdeki dinlenme odalarımızda gevşeyin.
          </motion.p>
        </div>
      </div>

      {/* OLANAKLARI KEŞFEDİN ve SPOR SALONU Bölümü */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Sol taraf - OLANAKLARI KEŞFEDİN */}
        <div className="w-full md:w-1/2 bg-white text-black flex flex-col justify-center items-start p-12 md:p-16 lg:p-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-light mb-8"
          >
            OLANAKLARI<br />KEŞFEDİN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-light leading-relaxed"
          >
            Deniz manzaralı fitness merkezlerimizde egzersiz yapın, spalarımızda rahatlayın.
          </motion.p>
        </div>
        
        {/* Sağ taraf - SPOR SALONU Görseli ve Açıklaması */}
        <div className="w-full md:w-1/2 relative">
          {/* Görsel */}
          <div className="w-full h-[500px] relative">
            {images.gym ? (
              <Image 
                src={images.gym} 
                alt="Spor Salonu" 
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-400">Görsel yükleniyor...</p>
              </div>
            )}
          </div>
          
          {/* Açıklama Kutusu */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-8 md:p-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-light mb-6"
            >
              SPOR SALONU
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-light leading-relaxed"
            >
              Birden fazla kardio, güç ve vücut geliştirme antrenman aletleriyle donatılmış, muhteşem deniz manzaralı geniş fitness salonlarımızda aktif kalın.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facilities 