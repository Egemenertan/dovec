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
    <div className="relative py-32 md:py-40">
      {/* Elegant arka plan */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_50%)]"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="block text-sm font-light tracking-[0.4em] text-zinc-400 mb-4">DOVEC İNŞAAT</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-zinc-800 mb-6 relative inline-block">
            Projelerimiz
            <div className="absolute -bottom-4 left-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent transform -translate-x-1/2"></div>
          </h2>
          <p className="text-lg md:text-xl font-light tracking-wide text-zinc-500 max-w-2xl mx-auto mt-8">
            Tamamlanan ve devam eden projelerimiz
          </p>
        </div>
        
        <div className="relative group">
          {/* Özel Navigasyon Okları */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 -translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 swiper-prev">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-zinc-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 swiper-next">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 text-zinc-700">
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
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              prevEl: '.swiper-prev',
              nextEl: '.swiper-next',
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="project-swiper !overflow-visible !pt-12 !pb-20"
          >
            {/* Proje Kartı 1 */}
            <SwiperSlide className="!w-[300px] sm:!w-[600px] md:!w-[800px] lg:!w-[1000px]">
              <div className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)]">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/tatlisu_35 copy 2-1.webp"
                    alt="Proje 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* İçerik */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-sm font-light tracking-[0.2em] text-white/80 mb-2">KONUT PROJESİ</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">Tatlısu Villaları</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">Modern tasarım, konforlu yaşam alanları ve muhteşem deniz manzarası.</p>
                    <Link href="/projeler/tatlisu" className="inline-flex items-center text-lg text-white/90 hover:text-white font-light tracking-wide group/link">
                      <span className="relative">
                        Detayları Gör
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 2 */}
            <SwiperSlide className="!w-[300px] sm:!w-[600px] md:!w-[800px] lg:!w-[1000px]">
              <div className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)]">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/tatlisu_23 copy_11zon.webp"
                    alt="Proje 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* İçerik */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-sm font-light tracking-[0.2em] text-white/80 mb-2">KONUT PROJESİ</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">Sahil Rezidans</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">Lüks yaşamın yeni adresi, şehrin merkezinde ayrıcalıklı bir yaşam.</p>
                    <Link href="/projeler/sahil-rezidans" className="inline-flex items-center text-lg text-white/90 hover:text-white font-light tracking-wide group/link">
                      <span className="relative">
                        Detayları Gör
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 3 */}
            <SwiperSlide className="!w-[300px] sm:!w-[600px] md:!w-[800px] lg:!w-[1000px]">
              <div className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)]">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/Natulux Out View 1 (1)_11zon.jpg"
                    alt="Proje 3"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* İçerik */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-sm font-light tracking-[0.2em] text-white/80 mb-2">KONUT PROJESİ</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">Natulux Residence</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">Doğayla iç içe, modern mimarinin en güzel örneği.</p>
                    <Link href="/projeler/natulux" className="inline-flex items-center text-lg text-white/90 hover:text-white font-light tracking-wide group/link">
                      <span className="relative">
                        Detayları Gör
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 4 */}
            <SwiperSlide className="!w-[300px] sm:!w-[600px] md:!w-[800px] lg:!w-[1000px]">
              <div className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)]">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/tatlisu_35 copy 2-1.webp"
                    alt="Proje 4"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* İçerik */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-sm font-light tracking-[0.2em] text-white/80 mb-2">KONUT PROJESİ</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">Kıbrıs Modern Evleri</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">Modern mimarinin en güzel örnekleri ile tasarlanmış yaşam alanları.</p>
                    <Link href="/projeler/kibris-modern" className="inline-flex items-center text-lg text-white/90 hover:text-white font-light tracking-wide group/link">
                      <span className="relative">
                        Detayları Gör
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 5 */}
            <SwiperSlide className="!w-[300px] sm:!w-[600px] md:!w-[800px] lg:!w-[1000px]">
              <div className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)]">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/tatlisu_23 copy_11zon.webp"
                    alt="Proje 5"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* İçerik */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-sm font-light tracking-[0.2em] text-white/80 mb-2">KONUT PROJESİ</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">Deniz Konakları</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">Deniz manzaralı lüks yaşam alanları ve özel peyzaj düzenlemesi.</p>
                    <Link href="/projeler/deniz-konaklari" className="inline-flex items-center text-lg text-white/90 hover:text-white font-light tracking-wide group/link">
                      <span className="relative">
                        Detayları Gör
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Proje Kartı 6 */}
            <SwiperSlide className="!w-[300px] sm:!w-[600px] md:!w-[800px] lg:!w-[1000px]">
              <div className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)]">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/Natulux Out View 1 (1)_11zon.jpg"
                    alt="Proje 6"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* İçerik */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-sm font-light tracking-[0.2em] text-white/80 mb-2">KONUT PROJESİ</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">Palm Residence</h3>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">Palmiyelerle çevrili, modern ve lüks yaşam kompleksi.</p>
                    <Link href="/projeler/palm-residence" className="inline-flex items-center text-lg text-white/90 hover:text-white font-light tracking-wide group/link">
                      <span className="relative">
                        Detayları Gör
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}; 