'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { storage } from '../../../firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Gallery } from '../../../components/Gallery';

export default function QuerenciaPage() {
  const [images, setImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState('');
  const [typeImages, setTypeImages] = useState<string[]>([]);
  const [aboutImage, setAboutImage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!storage) {
          throw new Error('Storage bulunamadı');
        }

        // Hero image'ı yükle
        const heroImageRef = ref(storage, 'querencia/r imaj_3 kopya_11_11zon.webp');
        const heroUrl = await getDownloadURL(heroImageRef);
        setHeroImage(heroUrl);
        console.log('Hero image yüklendi:', heroUrl);

        // Diğer görselleri yükle
        const storageRef = ref(storage, 'querencia');
        const result = await listAll(storageRef);
        
        const urls = await Promise.all(
          result.items
            .filter(item => item.name !== 'r imaj_3 kopya_11_11zon.webp')
            .map(async (item) => {
              const url = await getDownloadURL(item);
              return url;
            })
        );

        if (urls.length > 0) {
          const shuffledUrls = [...urls].sort(() => Math.random() - 0.5);
          setImages(shuffledUrls);
          setTypeImages([shuffledUrls[0], shuffledUrls[1], shuffledUrls[2]]);
          setAboutImage(shuffledUrls[3]);
          console.log('Diğer görseller yüklendi:', urls.length, 'adet');
        }
      } catch (error) {
        console.error('Görseller yüklenirken hata:', error);
        setError('Görseller yüklenirken bir hata oluştu');
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt="QUERENCIA"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            QUERENCIA
          </h1>
        </div>
      </div>

      {/* Proje Detayları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Sol Kolon - Proje Bilgileri */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-16">
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Şehir</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">GİRNE</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Bölge</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">Çatalköy</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Proje Bitiş</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">2024</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
              </div>
              <div className="space-y-16">
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Konut Tipleri</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">1+1, 2+1, 3+1 Rezidanslar</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Başlangıç Fiyatı</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">£ 185.000</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Konum Avantajları</h3>
              <p className="text-2xl font-extralight tracking-wider text-[#061E4F] leading-relaxed">
                Şehir merkezine yakın, deniz manzaralı, sosyal olanaklar
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
            </div>
          </div>

          {/* Sağ Kolon - Proje Özellikleri */}
          <div className="space-y-12">
            <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Proje Özellikleri</h3>
            <div className="space-y-8">
              {[
                'Panoramik Manzara',
                'Akıllı Ev Sistemleri',
                'Infinity Havuz',
                'Wellness Merkezi',
                'Özel Şef Hizmeti',
                'Helipad'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-6 group">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#061E4F]/20 group-hover:w-3 group-hover:bg-[#061E4F]/40 transition-all duration-300"></div>
                  <span className="text-xl font-extralight tracking-wider text-[#061E4F] group-hover:translate-x-2 transition-transform duration-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Proje Tanıtım */}
      <div className="relative py-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Sol Taraf - Proje Bilgisi */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Yeni bir çağ</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  QUERENCIA
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  Huzur ve konforun buluştuğu yaşam alanları.
                </p>
              </div>
            </div>

            {/* Sağ Taraf - Proje Görseli */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              {aboutImage && (
                <Image
                  src={aboutImage}
                  alt="QUERENCIA"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Galeri */}
      <Gallery />

      {/* Lokasyon ve Mesafeler */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center space-x-4 justify-center mb-20">
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
          <h2 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Lokasyon & Mesafeler</h2>
          <div className="w-20 h-[1px] bg-gradient-to-l from-[#061E4F] to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              title: 'Hastane',
              distance: '4.1 KM'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
              title: 'Merkez',
              distance: '2.8 KM'
            }
          ].map((item, index) => (
            <div key={index} className="group">
              <div className="flex flex-col items-center space-y-6">
                <div className="text-[#061E4F]/40 group-hover:text-[#061E4F] transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-sm font-light tracking-[.2em] text-[#061E4F]/60 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-extralight tracking-wider text-[#061E4F]">
                    {item.distance}
                  </p>
                  <div className="h-[1px] w-8 mx-auto bg-gradient-to-r from-[#061E4F]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 