'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Gallery } from '@/components/Gallery';
import { storage } from '@/firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

// SVG Komponentleri
const HospitalIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// Mesafe tipi tanımı
interface Distance {
  icon: JSX.Element;
  title: string;
  distance: string;
}

// Proje verileri tipini genişlet
interface ProjectData {
  title: string;
  heroImage: string;
  city: string;
  region: string;
  completion: string;
  types: string;
  startingPrice: string;
  advantages: string;
  description: string;
  features: string[];
  distances: Distance[];
}

// Proje verileri
const projectsData: Record<string, ProjectData> = {
  'la-casalia': {
    title: 'La Casalia',
    heroImage: 'laisla/tatlisu_35 copy 2-1_11zon.webp',
    city: 'İSKELE',
    region: 'Long Beach',
    completion: '2025',
    types: '1+1, 2+1 Rezidanslar',
    startingPrice: '£ 195.000',
    advantages: 'Plaja yürüme mesafesinde, restoranlara, süpermarkete, sağlık hizmetlerine yakın',
    description: 'Modern mimari ve lüks yaşamın buluştuğu özel bir proje.',
    features: [
      'Akıllı Ev Sistemleri',
      'Özel Peyzaj',
      'Yüzme Havuzu',
      'Spor Salonu',
      'Güvenlik',
      'Kapalı Otopark'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '13.7 KM'
      },
      {
        icon: <HomeIcon />,
        title: 'Merkez',
        distance: '5.2 KM'
      }
    ]
  },
  'natulux': {
    title: 'Natulux',
    heroImage: 'natulux/Natulux Out View 1 (1)_11zon.webp',
    city: 'TATLISU',
    region: 'Sahil',
    completion: '2024',
    types: '2+1, 3+1 Rezidanslar',
    startingPrice: '£ 245.000',
    advantages: 'Deniz manzarası, doğayla iç içe, modern yaşam',
    description: 'Doğa ile iç içe, lüks yaşam standartları.',
    features: [
      'Deniz Manzarası',
      'Akıllı Ev Sistemleri',
      'Infinity Havuz',
      'Fitness Merkezi',
      'Özel Bahçe',
      '24/7 Güvenlik'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '8.3 KM'
      },
      {
        icon: <HomeIcon />,
        title: 'Merkez',
        distance: '3.5 KM'
      }
    ]
  },
  'querencia': {
    title: 'Querencia',
    heroImage: 'querencia/r imaj_3 kopya_11_11zon.webp',
    city: 'GİRNE',
    region: 'Çatalköy',
    completion: '2024',
    types: '1+1, 2+1, 3+1 Rezidanslar',
    startingPrice: '£ 185.000',
    advantages: 'Şehir merkezine yakın, deniz manzaralı, sosyal olanaklar',
    description: 'Huzur ve konforun buluştuğu yaşam alanları.',
    features: [
      'Panoramik Manzara',
      'Akıllı Ev Sistemleri',
      'Infinity Havuz',
      'Wellness Merkezi',
      'Özel Şef Hizmeti',
      'Helipad'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '4.1 KM'
      },
      {
        icon: <HomeIcon />,
        title: 'Merkez',
        distance: '2.8 KM'
      }
    ]
  },
  'four-seasons-life': {
    title: 'Four Seasons Life',
    heroImage: 'fsl/7.webp',
    city: 'LEFKOŞA',
    region: 'Gönyeli',
    completion: '2025',
    types: '2+1, 3+1 Rezidanslar',
    startingPrice: '£ 215.000',
    advantages: 'Şehir merkezinde, üniversitelere yakın, modern yaşam',
    description: 'Dört mevsim ayrıcalıklı yaşam deneyimi.',
    features: [
      'Dört Mevsim Havuz',
      'Kapalı Otopark',
      'Çocuk Oyun Alanları',
      'Sosyal Tesisler',
      'Güvenlik',
      'Yeşil Alanlar'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '6.5 KM'
      },
      {
        icon: <HomeIcon />,
        title: 'Merkez',
        distance: '1.9 KM'
      }
    ]
  },
  'courtyard-platinum': {
    title: 'Courtyard Platinum',
    heroImage: 'platinum/7.webp',
    city: 'GİRNE',
    region: 'Alsancak',
    completion: '2024',
    types: 'Premium Rezidanslar',
    startingPrice: '£ 275.000',
    advantages: 'Lüks yaşam, deniz manzarası, özel mimari',
    description: 'Premium yaşam standartlarını sunan seçkin proje.',
    features: [
      'Özel Avlu',
      'Concierge',
      'Business Center',
      'Spa & Wellness',
      'Özel Şarap Mahzeni',
      'Sinema Salonu'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '7.2 KM'
      },
      {
        icon: <HomeIcon />,
        title: 'Merkez',
        distance: '4.6 KM'
      }
    ]
  }
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState('');
  const [typeImages, setTypeImages] = useState<string[]>([]);
  const [aboutImage, setAboutImage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // URL'den gelen id'yi düzelt ve kontrol et
  const normalizedId = params.id.toLowerCase().trim();
  const projectData = projectsData[normalizedId];

  useEffect(() => {
    console.log('Gelen URL parametresi:', params.id);
    console.log('Normalize edilmiş ID:', normalizedId);
    console.log('Bulunan proje:', projectData);

    const fetchImages = async () => {
      try {
        if (!storage || !projectData) {
          throw new Error('Storage veya proje verisi bulunamadı');
        }

        // Hero image'ı yükle
        const heroImageRef = ref(storage, projectData.heroImage);
        const heroUrl = await getDownloadURL(heroImageRef);
        setHeroImage(heroUrl);
        console.log('Hero image yüklendi:', heroUrl);

        // Diğer görselleri yükle
        const folderPath = projectData.heroImage.split('/')[0];
        console.log('Klasör yolu:', folderPath);
        const storageRef = ref(storage, folderPath);
        const result = await listAll(storageRef);
        
        const urls = await Promise.all(
          result.items
            .filter(item => item.name !== projectData.heroImage.split('/').pop())
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

    if (projectData) {
      fetchImages();
    }
  }, [params.id, normalizedId, projectData]);

  if (!projectData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="text-3xl font-light text-[#061E4F]/60 text-center">
          Proje bulunamadı
        </div>
        <Link 
          href="/projeler" 
          className="px-8 py-3 text-sm font-light tracking-[.2em] text-[#061E4F] border border-[#061E4F]/20 rounded-lg hover:bg-[#061E4F] hover:text-white transition-colors duration-300"
        >
          TÜM PROJELER
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            {projectData.title}
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
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.city}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Bölge</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.region}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Proje Bitiş</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.completion}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
              </div>
              <div className="space-y-16">
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Konut Tipleri</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.types}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Başlangıç Fiyatı</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.startingPrice}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Konum Avantajları</h3>
              <p className="text-2xl font-extralight tracking-wider text-[#061E4F] leading-relaxed">
                {projectData.advantages}
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
            </div>
          </div>

          {/* Sağ Kolon - Proje Özellikleri */}
          <div className="space-y-12">
            <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Proje Özellikleri</h3>
            <div className="space-y-8">
              {projectData.features.map((feature: string, index: number) => (
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
                  {projectData.title}
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  {projectData.description}
                </p>
              </div>
            </div>

            {/* Sağ Taraf - Proje Görseli */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              {aboutImage && (
                <Image
                  src={aboutImage}
                  alt={projectData.title}
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
          {projectData.distances.map((item: Distance, index: number) => (
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

      {/* Konut Tipleri */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="flex items-center space-x-4 justify-center mb-32">
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent"></div>
          <h2 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Konut Tipleri</h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {/* 1+1 */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-12">
                {typeImages[0] && (
                  <Image
                    src={typeImages[0]}
                    alt="1+1 Konut Tipi"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="text-sm font-light tracking-[.3em] text-white/80 uppercase">Tip A</span>
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">1+1 Rezidans</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">65m² - 75m²</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#061E4F]/20"></div>
                    <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">Bahçe Katı</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#061E4F]/10 to-transparent"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">1 Yatak Odası</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">1 Banyo</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">Amerikan Mutfak</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">Geniş Balkon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2+1 */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-12">
                {typeImages[1] && (
                  <Image
                    src={typeImages[1]}
                    alt="2+1 Konut Tipi"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="text-sm font-light tracking-[.3em] text-white/80 uppercase">Tip B</span>
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">2+1 Rezidans</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">85m² - 95m²</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#061E4F]/20"></div>
                    <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">Ara Kat</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#061E4F]/10 to-transparent"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">2 Yatak Odası</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">2 Banyo</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">Kapalı Mutfak</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">Teras</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3+1 */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-12">
                {typeImages[2] && (
                  <Image
                    src={typeImages[2]}
                    alt="3+1 Konut Tipi"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="text-sm font-light tracking-[.3em] text-white/80 uppercase">Tip C</span>
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Rezidans</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">120m² - 135m²</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#061E4F]/20"></div>
                    <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">Üst Kat</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#061E4F]/10 to-transparent"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">3 Yatak Odası</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">2 Banyo</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">Kapalı Mutfak</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-[#061E4F]/20"></div>
                      <span className="text-lg font-extralight text-[#061E4F]">Geniş Teras</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tanıtım Alanı */}
      <div className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Dovec</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  1985'ten Bugüne
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  Dovec, 1985 yılından bu yana kişiye özel yaşam alanları inşa eden bir aile şirketidir. Lüks villanızı portföyümüze eklemekten mutluluk duyarız!
                </p>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  Her projemizde, müşterilerimizin hayallerini gerçeğe dönüştürmeyi ve onlara unutulmaz bir yaşam deneyimi sunmayı hedefliyoruz. Kalite ve güven bizim için sadece bir söz değil, bir yaşam biçimidir.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/iletisim"
                className="group relative inline-flex flex-col items-center"
              >
                <div className="absolute -inset-10 bg-gradient-to-br from-white via-[#061E4F]/5 to-[#061E4F]/10 rounded-full blur-2xl transition-all duration-500 group-hover:via-[#061E4F]/10 group-hover:to-[#061E4F]/20"></div>
                <div className="relative flex flex-col items-center space-y-8">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-white via-[#061E4F]/10 to-[#061E4F]/20 rounded-full opacity-20 group-hover:opacity-30 blur-md transition-all duration-500"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <EmailIcon />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <span className="block text-2xl tracking-[.4em] uppercase font-extralight text-[#061E4F] group-hover:tracking-[.5em] transition-all duration-500">İletişim</span>
                    <span className="block text-sm tracking-[.2em] font-extralight text-[#061E4F]/60">Hayalinizdeki Eve Ulaşın</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#061E4F]/60 group-hover:text-[#061E4F] transition-colors duration-500">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent"></div>
                    <ArrowIcon />
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Geri Dön Butonu */}
      <div className="mt-16 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/projeler"
          className="inline-flex items-center space-x-2 text-[#061E4F] hover:text-[#061E4F]/80 transition-colors"
        >
          <BackIcon />
          <span>Tüm Projeler</span>
        </Link>
      </div>
    </div>
  );
} 