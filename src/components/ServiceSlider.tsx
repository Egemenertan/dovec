'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function ServiceSlider() {
  return (
    <div className="mt-16 relative w-screen -mx-[calc((100vw-100%)/2)]">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Projeler</h2>
      <div className="w-full">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.8}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: false
          }}
          speed={800}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="service-slider !overflow-visible"
        >
          <SwiperSlide>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 mx-auto max-w-[1000px]">
              <div className="relative h-[500px] md:h-[600px]">
                <Image
                  src="/services/construction.jpg"
                  alt="İnşaat"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <div className="p-12 md:p-16">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">İnşaat</h3>
                <p className="text-xl md:text-2xl text-gray-600">Modern ve sürdürülebilir yapılar inşa ediyoruz.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 mx-auto max-w-[1000px]">
              <div className="relative h-[500px] md:h-[600px]">
                <Image
                  src="/services/energy.jpg"
                  alt="Enerji"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <div className="p-12 md:p-16">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Enerji</h3>
                <p className="text-xl md:text-2xl text-gray-600">Yenilenebilir enerji çözümleri sunuyoruz.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 mx-auto max-w-[1000px]">
              <div className="relative h-[500px] md:h-[600px]">
                <Image
                  src="/services/real-estate.jpg"
                  alt="Gayrimenkul"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <div className="p-12 md:p-16">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Gayrimenkul</h3>
                <p className="text-xl md:text-2xl text-gray-600">Prestijli gayrimenkul projeleri geliştiriyoruz.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 mx-auto max-w-[1000px]">
              <div className="relative h-[500px] md:h-[600px]">
                <Image
                  src="/services/healthcare.jpg"
                  alt="Sağlık"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <div className="p-12 md:p-16">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Sağlık</h3>
                <p className="text-xl md:text-2xl text-gray-600">Modern sağlık tesisleri inşa ediyoruz.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 mx-auto max-w-[1000px]">
              <div className="relative h-[500px] md:h-[600px]">
                <Image
                  src="/services/industry.jpg"
                  alt="Endüstri"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <div className="p-12 md:p-16">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Endüstri</h3>
                <p className="text-xl md:text-2xl text-gray-600">Endüstriyel tesisler ve altyapı projeleri.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
} 