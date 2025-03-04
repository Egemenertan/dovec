'use client';

import { useStorage } from '@/hooks/useStorage';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import 'swiper/css';
import 'swiper/css/effect-fade';

export const Hero = () => {
  const { images, loading } = useStorage();
  const [activeImageName, setActiveImageName] = useState('');
  const { t } = useLanguage();

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
        <div className="text-2xl text-red-600">{t('components.hero.image_not_loaded')}</div>
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
      {/* Başlıklar ve Keşfet Butonu - Ortada ve Aşağıda */}
      <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-8">
        {/* Başlıklar */}
        {activeImageName.includes('imaj_3') && (
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-light text-white tracking-wider">
              {t('components.hero.projects.querencia.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mt-2 sm:mt-3 font-light tracking-wide">
              {t('components.hero.projects.querencia.description')}
            </p>
          </div>
        )}
        {activeImageName.includes('tatlisu_35') && (
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-light text-white tracking-wider">
              {t('components.hero.projects.laCasalia.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mt-2 sm:mt-3 font-light tracking-wide">
              {t('components.hero.projects.laCasalia.description')}
            </p>
          </div>
        )}
        {activeImageName.includes('Natulux') && (
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-light text-white tracking-wider">
              {t('components.hero.projects.natulux.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mt-2 sm:mt-3 font-light tracking-wide">
              {t('components.hero.projects.natulux.description')}
            </p>
          </div>
        )}

        {/* Keşfet Butonu */}
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
            <div className="relative flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full overflow-hidden transition-all duration-700 ease-in-out group">
              {/* Arka plan efekti */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md opacity-90 group-hover:opacity-0 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 transition-all duration-700"></div>
              
              {/* Border efekti */}
              <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-white/40 transition-all duration-700"></div>
              
              {/* İç border efekti */}
              <div className="absolute inset-[1px] border border-black/5 rounded-full group-hover:border-white/10 transition-all duration-700"></div>

              {/* Metin */}
              <span className="relative text-xs sm:text-sm font-light tracking-[0.2em] text-black/90 transition-all duration-700 group-hover:text-white uppercase">
                {t('components.hero.cta.text')}
              </span>

              {/* Ok tasarımı */}
              <div className="relative flex items-center justify-center w-4 sm:w-5">
                <svg 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative text-black/80 group-hover:text-white transition-all duration-700 transform translate-x-0 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
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
                  {/* imaj_3 için özel karartma - Sadece üst kısım */}
                  {imageName.includes('imaj_3') && (
                    <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black/50 to-transparent" />
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