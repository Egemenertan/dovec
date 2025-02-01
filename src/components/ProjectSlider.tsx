'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';

// Swiper stilleri
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export const ProjectSlider = () => {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-[.2em] text-[#061E4F] mb-8 uppercase">
            Projelerimiz
          </h2>
          <p className="text-xl font-light tracking-wider text-gray-600">
            Tamamlanan ve devam eden projelerimiz
          </p>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-8"></div>
        </div>
        
        <div className="relative group">
          {/* Özel Navigasyon Okları */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 swiper-prev">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 swiper-next">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 200,
              modifier: 1.5,
              slideShadows: true,
            }}
            navigation={{
              prevEl: '.swiper-prev',
              nextEl: '.swiper-next',
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="project-swiper !overflow-visible !pt-12 !pb-20"
          >
            {/* Proje Kartı 1 */}
            <SwiperSlide className="!w-[1000px]">
              <div className="rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <div className="relative h-[600px]">
                  <Image
                    src="/tatlisu_35 copy 2-1.webp"
                    alt="Proje 1"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 left-0 right-0 text-white">
                  <h3 className="text-3xl font-semibold mb-4">Tatlısu Villaları</h3>
                  <p className="text-gray-100 mb-8 text-xl">Modern tasarım, konforlu yaşam alanları ve muhteşem deniz manzarası.</p>
                  <Link href="/projeler/tatlisu" className="inline-flex items-center text-white hover:text-gray-200 font-medium text-xl group">
                    Detayları Gör 
                    <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 2 */}
            <SwiperSlide className="!w-[1000px]">
              <div className="rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <div className="relative h-[600px]">
                  <Image
                    src="/tatlisu_23 copy_11zon.webp"
                    alt="Proje 2"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 left-0 right-0 text-white">
                  <h3 className="text-3xl font-semibold mb-4">Sahil Rezidans</h3>
                  <p className="text-gray-100 mb-8 text-xl">Lüks yaşamın yeni adresi, şehrin merkezinde ayrıcalıklı bir yaşam.</p>
                  <Link href="/projeler/sahil-rezidans" className="inline-flex items-center text-white hover:text-gray-200 font-medium text-xl group">
                    Detayları Gör
                    <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 3 */}
            <SwiperSlide className="!w-[1000px]">
              <div className="rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <div className="relative h-[600px]">
                  <Image
                    src="/Natulux Out View 1 (1)_11zon.jpg"
                    alt="Proje 3"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 left-0 right-0 text-white">
                  <h3 className="text-3xl font-semibold mb-4">Natulux Residence</h3>
                  <p className="text-gray-100 mb-8 text-xl">Doğayla iç içe, modern mimarinin en güzel örneği.</p>
                  <Link href="/projeler/natulux" className="inline-flex items-center text-white hover:text-gray-200 font-medium text-xl group">
                    Detayları Gör
                    <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}; 