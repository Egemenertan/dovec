'use client';

import { useStorage } from '@/hooks/useStorage';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Hero = () => {
  const { images, loading } = useStorage();
  const [activeImageName, setActiveImageName] = useState('');

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-red-600">Görsel yüklenemedi</div>
      </div>
    );
  }

  const handleSlideChange = (swiper: any) => {
    const currentImageUrl = images[swiper.realIndex];
    const imageName = currentImageUrl.split('/').pop() || '';
    console.log("Current Image Name:", imageName);
    setActiveImageName(imageName);
  };

  return (
    <div className="relative h-screen w-full z-10 bg-black">
      <div className="absolute top-24 sm:top-24 md:top-32 w-full px-4 sm:px-8 z-50">
        <div className="flex flex-col items-start w-full">
          {/* Sol Başlık */}
          
        </div>
      </div>

      {/* Butonlar Container */}
      <div className="absolute bottom-20 sm:bottom-16 w-full flex flex-col sm:flex-row sm:justify-between px-8 sm:px-16 gap-4 sm:gap-0 z-50">
        {/* Sol Alt Keşfet Butonu */}
        <div>
          <Link 
            href={activeImageName.includes('imaj_3') 
              ? '/projeler/querencia' 
              : activeImageName.includes('tatlisu_35') 
              ? '/projeler/lacasalia'
              : activeImageName.includes('natulux')
              ? '/projeler/natulux'
              : '/projeler'}
            className="group inline-flex"
          >
            <div className="relative flex items-center justify-center">
              {/* Ana buton container */}
              <div className="relative flex border border-white/20 sm:border-2 items-center gap-2 sm:gap-4 bg-white/80 backdrop-blur-md px-5 sm:px-8 py-3 sm:py-5 rounded-full overflow-hidden transition-all duration-700 hover:bg-black hover:border-white group">
                {/* Metin */}
                <span className="relative text-sm sm:text-lg font-light tracking-[0.2em] text-black transition-all duration-700 group-hover:text-white uppercase">
                  Keşfet
                </span>

                {/* Ok tasarımı */}
                <div className="relative flex items-center justify-center w-5 sm:w-7">
                  <svg 
                    className="w-4 h-4 sm:w-6 sm:h-6 relative text-black group-hover:text-white transition-all duration-700 transform translate-x-1 group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Sağ Alt Buton */}
        <div>
          <Link 
            href="/iletisim" 
            className="group inline-flex"
          >
            <div className="relative flex items-center justify-center">
              {/* Ana buton container */}
              <div className="relative flex border border-white/20 sm:border-2 items-center gap-2 sm:gap-4 bg-white/80 backdrop-blur-md px-5 sm:px-8 py-3 sm:py-5 rounded-full overflow-hidden transition-all duration-700 hover:bg-black hover:border-white group">
                {/* Metin */}
                <span className="relative text-sm sm:text-lg font-light tracking-[0.2em] text-black transition-all duration-700 group-hover:text-white uppercase">
                  Döveç'e Bağlan
                </span>

                {/* Ok tasarımı */}
                <div className="relative flex items-center justify-center w-5 sm:w-7">
                  <svg 
                    className="w-4 h-4 sm:w-6 sm:h-6 relative text-black group-hover:text-white transition-all duration-700 transform translate-x-1 group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full">
        {/* Siyah Arka Plan */}
        <div className="absolute bottom-0 left-0 w-full h-screen bg-black z-10" />
        
        {/* Kırpılmış Swiper */}
        <div className="relative z-20">
          <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 30 }}>
            <defs>
              <clipPath id="diagonal-clip">
                <polygon points="20,0 100,0 100,100 0,100 0,50" />
              </clipPath>
            </defs>
          </svg>
          
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="h-[100vh] w-full"
            onSlideChange={handleSlideChange}
            onInit={handleSlideChange}
          >
            {images.map((imageUrl: string, index: number) => {
              const imageName = imageUrl.split('/').pop() || '';
              return (
              <SwiperSlide key={index} className="relative h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Hero Image ${index + 1}`}
                    fill
                    priority={index === 0}
                    quality={100}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    sizes="(max-width: 768px) 100vw, 100vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    unoptimized={true}
                    className="transition-opacity duration-500"
                  />
                  {/* Karartma Gradient - Sadece Alt Kısım */}
                  <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  {/* Özel Başlıklar */}
                  {imageName.includes('imaj_3') && (
                    <div className="absolute bottom-56 sm:bottom-40 left-8 sm:left-16 z-50">
                      <h2 className="text-4xl sm:text-6xl md:text-6xl lg:text-8xl font-light text-white tracking-wider">
                        QUERENCIA
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl text-white/80 mt-2 sm:mt-3 font-light tracking-wide">
                        Afrodit'in İzinde Efsanevi Yeni Yaşam Sanatı
                      </p>
                    </div>
                  )}
                  {imageName.includes('tatlisu_35') && (
                    <div className="absolute bottom-56 sm:bottom-40 left-8 sm:left-16 z-50">
                      <h2 className="text-4xl sm:text-6xl md:text-6xl lg:text-8xl font-light text-white tracking-wider">
                        LA CASALIA
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl text-white/80 mt-2 sm:mt-3 font-light tracking-wide">
                        Afrodit'in İzinde Efsanevi Yeni Yaşam Sanatı
                      </p>
                    </div>
                  )}
                  {imageName.includes('Natulux') && (
                    <div className="absolute bottom-56 sm:bottom-40 left-8 sm:left-16 z-50">
                      <h2 className="text-4xl sm:text-6xl md:text-6xl lg:text-8xl font-light text-white tracking-wider">
                        NATULUX
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl text-white/80 mt-2 sm:mt-3 font-light tracking-wide">
                        Doğanın Lüks ile Buluştuğu Yaşam Alanı
                      </p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}; 