import { useState, useEffect } from 'react';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const VirtualTour = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const tourUrl = "https://360.dovec.com"; // 360 sanal tur linki

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        const imageRef = ref(storage, 'lacasalia/01.webp');
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error('Resim yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-[500px] bg-gray-200 animate-pulse"></div>
      ) : imageUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full mx-auto overflow-hidden shadow-xl"
        >
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px]">
            <Image
              src={imageUrl}
              alt="360 Sanal Tur"
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            
            {/* Mavi dikey çizgi */}
            <div className="absolute h-full left-1/2 top-0 opacity-50"></div>
          </div>
          
          {/* Panorama yazısı */}
          <div className="absolute top-8 md:top-24 left-6 md:left-24">
            <h4 className="text-white text-lg md:text-xl font-light tracking-wider">LA CASALIA</h4>
          </div>
          
          {/* 360 SANAL TUR yazısı */}
          <div className="absolute bottom-32 md:bottom-40 left-6 md:left-24">
            <h2 className="text-white text-4xl md:text-7xl font-light tracking-wider">360° SANAL TUR</h2>
          </div>
          
          {/* Sağ alt köşedeki yuvarlak buton */}
          <Link 
            href={tourUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 md:bottom-40 md:right-24 bg-[#F5F5F5] text-[#071E51] rounded-full w-24 h-24 md:w-36 md:h-36 flex items-center justify-center transition-all duration-300 shadow-lg transform hover:scale-105 z-10"
            aria-label="360 Sanal Tur'a Git"
          >
            <div className="text-center font-light text-xs md:text-sm tracking-wider">TIKLAYIN</div>
          </Link>
        </motion.div>
      ) : (
        <div className="text-center text-red-500">Resim yüklenemedi</div>
      )}
    </div>
  );
};

export default VirtualTour;
