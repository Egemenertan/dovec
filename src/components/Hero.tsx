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
    <div className="relative h-screen w-full z-10 bg-black">
      <div className="absolute top-24 sm:top-24 md:top-32 w-full px-4 sm:px-8 z-50">
        <div className="flex flex-col items-start w-full">
          {/* Sol Başlık */}
          <div className="flex flex-col items-start">
            <div className="flex flex-col gap-2 md:gap-3 md:max-w-xl lg:max-w-3xl xl:max-w-4xl">
              <h2 className="w-full text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-white tracking-tight leading-tight">
                FELSEFEMİZ HAYALLER<br className="hidden md:block lg:block xl:hidden" /> İNŞA ETMEK,<br className="md:hidden" /> GELECEĞİ YAZMAK
              </h2>
            </div>
            <p className="text-white/70 text-base sm:text-lg mt-4 sm:mt-6 w-[200px] xs:w-[220px] sm:w-[260px] md:w-[320px] lg:w-[460px] xl:w-[720px]">
              Döveç Group, Kuzey Kıbrıs'ta birçok sektöre yön veren,fonksiyonel açıdan trend ve teknolojik çözümlerle farklı tasarımlar oluşturmaktadır.
            </p>
          </div>
        </div>
      </div>

      {/* Sağ Alt Buton */}
      <div className="absolute bottom-12 sm:bottom-16 right-8 sm:right-16 z-50">
        <Link 
          href="/iletisim" 
          className="group inline-flex"
        >
          <div className="relative flex items-center justify-center">
            {/* Ana buton container */}
            <div className="relative flex border border-white/20 sm:border-2 items-center gap-2 sm:gap-4 bg-black/80 backdrop-blur-md px-5 sm:px-8 py-3 sm:py-5 rounded-lg overflow-hidden transition-all duration-700 hover:bg-black hover:border-white/40">
              {/* Metin */}
              <span className="relative text-sm sm:text-lg font-light tracking-[0.2em] text-white/80 transition-all duration-700 group-hover:text-white uppercase">
                Döveç'e Bağlan
              </span>

              {/* Ok tasarımı */}
              <div className="relative flex items-center justify-center w-5 sm:w-7">
                <svg 
                  className="w-4 h-4 sm:w-6 sm:h-6 relative text-white/80 group-hover:text-white transition-all duration-700 transform translate-x-1 group-hover:translate-x-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="square" 
                    strokeLinejoin="miter" 
                    strokeWidth={1.5} 
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
        <div className="absolute bottom-0 left-0 w-full h-[70vh] bg-black z-10" />
        
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
            className="h-[92vh] w-full [clip-path:polygon(84%_25%,100%_25%,100%_100%,0_100%,0_70%)] sm:[clip-path:polygon(84%_15%,100%_15%,100%_100%,0_100%,0_85%)] md:[clip-path:polygon(84%_10%,100%_10%,100%_100%,0_100%,0_60%)] lg:[clip-path:polygon(90%_0,100%_0,100%_100%,0_100%,0_60%)]"
          >
            {images.map((imageUrl: string, index: number) => (
              <SwiperSlide key={index} className="relative h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Hero Image ${index + 1}`}
                    fill
                    priority={index === 0}
                    quality={100}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    className="transition-opacity duration-500"
                  />
                  {/* Overlay */}
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}; 