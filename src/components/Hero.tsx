'use client';

import { useStorage } from '@/hooks/useStorage';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Hero = () => {
  const { images, loading } = useStorage();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Yükleniyor...</div>
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

  return (
    <div className="relative h-screen w-full">
      <Image
        src="/hero.webp"
        alt="Hero Image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
      {/* Sol Alt Başlık */}
      <div className="absolute bottom-24 sm:bottom-32 md:bottom-36 left-4 sm:left-6 md:left-16 lg:left-24 z-10 w-[calc(100%-2rem)] sm:w-auto">
        <div className="flex flex-col items-start">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-3 sm:mb-4 tracking-[.15em] font-manrope leading-tight">
            Geleceği İnşa Ediyoruz
          </h2>
          <div className="h-[1px] bg-white w-full opacity-50" />
          <p className="max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-base md:text-xl lg:text-2xl text-white/80 leading-relaxed font-extralight tracking-wider mt-3 sm:mt-4 md:mt-6">
            Modern mimari anlayışı ve yenilikçi yaklaşımlarla, Kuzey Kıbrıs'ın en prestijli yaşam alanlarını inşa ediyoruz.
          </p>
        </div>
      </div>

      {/* İletişim Butonu */}
      <Link 
        href="/iletisim" 
        className="group absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 md:left-auto right-auto md:right-16 lg:right-24 -translate-x-1/2 md:translate-x-0 z-10 inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-light tracking-wider text-white transition-all duration-500 bg-transparent overflow-hidden whitespace-nowrap"
      >
        <span className="absolute inset-0 border border-white/30 group-hover:border-white/0 transition-all duration-500"></span>
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"></span>
        <span className="relative flex items-center">
          İletişime Geç
          <svg 
            className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </Link>
      </div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={`Hero Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}; 