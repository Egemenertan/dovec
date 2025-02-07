'use client';

import { useStorage } from '@/hooks/useStorage';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Hero = () => {
  const { images, loading } = useStorage();

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

  return (
    <div className="relative h-screen w-full z-10">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {images.map((imageUrl: string, index: number) => (
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
      
      {/* Sol Alt Başlık */}
      <div className="absolute bottom-32 sm:bottom-36 md:bottom-40 left-4 sm:left-6 md:left-16 lg:left-24 z-20 w-[calc(100%-2rem)] sm:w-auto">
        <div className="flex flex-col items-start">
          <h2 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-3 sm:mb-4 tracking-[.15em] font-manrope leading-tight">
            Geleceği İnşa Ediyoruz
          </h2>
          <div className="h-[1px] bg-white w-full opacity-50" />
          <p className="max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl text-base sm:text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light tracking-wider mt-4 sm:mt-4 md:mt-6">
            Modern mimari anlayışı ve yenilikçi yaklaşımlarla, Kuzey Kıbrıs'ın en prestijli yaşam alanlarını inşa ediyoruz.
          </p>
          
          {/* İletişim Butonu - Mobil */}
          <div className="block md:hidden mt-8">
            <Link 
              href="/iletisim" 
              className="group inline-flex"
            >
              <div className="relative flex items-center justify-center">
                {/* Ana buton container */}
                <div className="relative flex items-center gap-2 bg-white/5 backdrop-blur-md px-7 py-4 rounded-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:gap-3">
                  {/* Arka plan efektleri */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-transparent"></div>
                    <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"></div>
                  </div>

                  {/* Metin ve İkon */}
                  <span className="relative text-lg font-light tracking-wider text-white/90 transition-all duration-500 group-hover:text-white">
                    İletişime Geç
                  </span>

                  {/* Yeni ok tasarımı */}
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    <svg 
                      className="w-5 h-5 relative text-white/70 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-0.5" 
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

                {/* Hover efektleri */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/0 via-[#061E4F]/10 to-[#061E4F]/0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* İletişim Butonu - Tablet ve Desktop */}
      <div className="hidden md:block">
        <Link 
          href="/iletisim" 
          className="group absolute bottom-40 right-16 lg:right-24 z-20"
        >
          <div className="relative flex items-center justify-center">
            {/* Ana buton container */}
            <div className="relative flex items-center gap-2 bg-white/5 backdrop-blur-md px-6 py-3.5 rounded-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:gap-3">
              {/* Arka plan efektleri */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-transparent"></div>
                <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"></div>
              </div>

              {/* Metin ve İkon */}
              <span className="relative text-base sm:text-lg font-light tracking-wider text-white/90 transition-all duration-500 group-hover:text-white">
                İletişime Geç
              </span>

              {/* Yeni ok tasarımı */}
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                <svg 
                  className="w-5 h-5 relative text-white/70 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-0.5" 
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

            {/* Hover efektleri */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/0 via-[#061E4F]/10 to-[#061E4F]/0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}; 