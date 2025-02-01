'use client';

import { useStorage } from '@/hooks/useStorage';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

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
      <div className="absolute bottom-16 left-8 z-10 md:left-16 lg:left-24">
        <div className="flex flex-col items-start">
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-4 tracking-[.2em] font-manrope">
            Geleceği İnşa Ediyoruz
          </h2>
          <div className="h-[1px] bg-white w-full" />
          <p className="max-w-2xl text-xl md:text-2xl text-white/90 leading-relaxed font-extralight tracking-wider mt-8">
            Modern mimari anlayışı ve yenilikçi yaklaşımlarla, Kuzey Kıbrıs'ın en prestijli yaşam alanlarını inşa ediyoruz.
          </p>
        </div>
      </div>
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