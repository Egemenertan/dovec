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
                quality={100}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
              <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Sol Alt Başlık */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] sm:w-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-3 sm:mb-4 tracking-[.15em] font-manrope leading-tight text-center whitespace-nowrap">
            Geleceği İnşa Ediyoruz
          </h2>
          <div className="h-[2px] bg-white w-full opacity-50" />
          <p className="max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light tracking-wider mt-4 sm:mt-4 md:mt-6 text-center">
            Modern mimari anlayışı ve yenilikçi yaklaşımlarla, Kuzey Kıbrıs'ın en prestijli yaşam alanlarını inşa ediyoruz.
          </p>
          
          {/* İletişim Butonu */}
          <div className="mt-12">
            <Link 
              href="/iletisim" 
              className="group inline-flex"
            >
              <div className="relative flex items-center justify-center">
                {/* Ana buton container */}
                <div className="relative flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-3xl border border-white/20 overflow-hidden transition-all duration-700 group-hover:border-white/40 group-hover:bg-white/15 group-hover:gap-4 group-hover:pr-7">
                  {/* Arka plan efektleri */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                  {/* Metin */}
                  <span className="relative text-md font-light tracking-[0.2em] text-white/80 transition-all duration-700 group-hover:text-white group-hover:tracking-[0.25em]">
                    İLETİŞİME GEÇ
                  </span>

                  {/* Yeni ok tasarımı */}
                  <div className="relative flex items-center justify-center w-6">
                    <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                    <svg 
                      className="w-5 h-5 relative text-white/70 group-hover:text-white transition-all duration-700 transform translate-x-1 group-hover:translate-x-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover efektleri */}
                <div className="absolute -inset-2 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute -inset-3 bg-gradient-to-r from-[#061E4F]/0 via-[#061E4F]/20 to-[#061E4F]/0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 