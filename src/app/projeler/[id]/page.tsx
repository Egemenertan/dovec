'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Örnek proje detay verisi
const projectDetails = {
  id: 1,
  title: 'Modern Yaşam Kompleksi',
  category: 'Konut',
  location: 'Lefkoşa, KKTC',
  area: '25.000 m²',
  year: '2024',
  client: 'DOVEC İnşaat',
  status: 'Devam Ediyor',
  description: `
    Modern Yaşam Kompleksi, sürdürülebilir ve yenilikçi yaşam alanları sunan lüks bir konut projesidir. 
    Proje, çevre dostu malzemeler ve akıllı bina teknolojileri kullanılarak tasarlanmıştır.

    Kompleks içerisinde:
    - 150 adet lüks daire
    - Kapalı ve açık yüzme havuzları
    - Fitness merkezi ve SPA
    - Çocuk oyun alanları
    - Yeşil alanlar ve yürüyüş parkurları
    - 24 saat güvenlik
    - Kapalı otopark

    bulunmaktadır.
  `,
  images: [
    '/projects/project1-detail1.jpg',
    '/projects/project1-detail2.jpg',
    '/projects/project1-detail3.jpg',
    '/projects/project1-detail4.jpg',
  ],
  features: [
    'LEED Sertifikalı Yeşil Bina',
    'Akıllı Ev Sistemleri',
    'Güneş Enerjisi Sistemleri',
    'Yağmur Suyu Toplama Sistemi',
    'Elektrikli Araç Şarj İstasyonları',
    'Fiber Optik Altyapı',
  ],
  // Lokasyon ve mesafeler verisi
  distances: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Hastane',
      distance: '13.7 KM',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.5c0-2.485-4.03-4.5-9-4.5s-9 2.015-9 4.5m18 0v3c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5v-3m18 0c0-2.485-4.03-4.5-9-4.5s-9 2.015-9 4.5m9-4.5v-3c0-2.485 4.03-4.5 9-4.5s9 2.015 9 4.5v3" />
        </svg>
      ),
      title: 'Restaurant',
      distance: 'Sitede',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'ATM & Banka',
      distance: '5.7 KM',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Spor Salonu',
      distance: 'Sitede',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      title: 'Üniversite',
      distance: '26.9 KM',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      title: 'Sahil',
      distance: 'Sitede',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
      title: 'Market',
      distance: '2.0 KM',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      title: 'Havaalanı',
      distance: '52.2 KM',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      title: 'AVM',
      distance: '26.4 KM',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      ),
      title: 'Kafe',
      distance: 'Sitede',
    },
  ],
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectDetails.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectDetails.images.length) % projectDetails.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-screen w-full flex items-center justify-center">
        <Image
          src={projectDetails.images[0]}
          alt={projectDetails.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6">
              Geleceği İnşa Ediyoruz
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
              Modern mimari anlayışı ve yenilikçi yaklaşımlarla, Kuzey Kıbrıs'ın en prestijli yaşam alanlarını inşa ediyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Full Ekran Görsel Slider */}
      <div className="relative h-screen w-full bg-black">
        <div className="relative h-full w-full">
          {projectDetails.images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`${projectDetails.title} - Görsel ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}

          {/* Slider Kontrolleri */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slider İndikatörler */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {projectDetails.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Proje Detayları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sol Kolon - Proje Bilgileri */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">ŞEHİR</h3>
                    <p className="text-2xl font-light text-[#061E4F]">GİRNE</p>
                    <div className="h-[1px] bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">BÖLGE</h3>
                    <p className="text-2xl font-light text-[#061E4F]">Alsancak</p>
                    <div className="h-[1px] bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">PROJE BİTİŞ TARİHİ</h3>
                    <p className="text-2xl font-light text-[#061E4F]">2026</p>
                    <div className="h-[1px] bg-gray-200 mt-2"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">KONUT TİPLERİ</h3>
                    <p className="text-2xl font-light text-[#061E4F]">1 Yatak Odalı Rezidanslar</p>
                    <div className="h-[1px] bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">BAŞLANGIÇ FİYATI</h3>
                    <p className="text-2xl font-light text-[#061E4F]">£ 195.000</p>
                    <div className="h-[1px] bg-gray-200 mt-2"></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">KONUM AVANTAJLARI</h3>
                <p className="text-lg font-light text-[#061E4F] leading-relaxed">
                  Gave and Natura SPA'ya yürüme mesafesinde, plaja, restoranlara, süpermarkete, sağlık hizmetlerine ve günlük ihtiyaçlara yakın, Uluslararası okul ve üniversitelere yakın
                </p>
                <div className="h-[1px] bg-gray-200 mt-4"></div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {projectDetails.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Sağ Kolon - Proje Özellikleri */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-light text-[#061E4F] mb-8">Proje Özellikleri</h3>
              <div className="space-y-4">
                {projectDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#061E4F]/5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#061E4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lokasyon ve Mesafeler */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-light text-center text-[#061E4F] mb-16">
            Lokasyon & Mesafeler
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {projectDetails.distances.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group"
              >
                <div className="text-[#061E4F] mb-4 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.distance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Proje Görselleri */}
        <div className="mt-16">
          <h2 className="text-2xl font-light text-[#061E4F] mb-8">
            Proje Görselleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectDetails.images.map((image, index) => (
              <div
                key={index}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={image}
                  alt={`${projectDetails.title} - Görsel ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Geri Dön Butonu */}
        <div className="mt-16">
          <Link
            href="/projeler"
            className="inline-flex items-center space-x-2 text-[#061E4F] hover:text-[#061E4F]/80 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Tüm Projeler</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 