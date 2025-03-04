'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState, Suspense } from 'react';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const { t } = useLanguage();
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const searchParams = useSearchParams();
  const filterParam = searchParams?.get('filter');
  const [activeFilter, setActiveFilter] = useState(filterParam || 'devam-eden');
  const [mobileVideoUrl, setMobileVideoUrl] = useState('');
  const [projects, setProjects] = useState([
    {
      name: 'La Casalia',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.laCasalia.description'),
      image: '',
      storagePath: 'lacasalia/tatlisu_12 copy.webp',
      location: t('projects.items.laCasalia.location'),
      slug: 'la-casalia',
      status: 'devam-eden',
      stats: {
        daireSayisi: '126',
        arsaAlani: '4,250m²',
        insaatAlani: '15,750m²',
        teslimTarihi: '2025'
      }
    },
    {
      name: 'Natulux',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.natulux.description'),
      image: '',
      storagePath: 'natulux/Natulux Out View 1 (1)_11zon.webp',
      location: t('projects.items.natulux.location'),
      slug: 'natulux',
      status: 'devam-eden',
      stats: {
        daireSayisi: '126',
        arsaAlani: '4,250m²',
        insaatAlani: '15,750m²',
        teslimTarihi: '2025'
      }
    },
    {
      name: 'La Isla',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.laIsla.description'),
      image: '',
      storagePath: 'laisla/DRONE01E.webp',
      location: t('projects.items.laIsla.location'),
      slug: 'la-isla',
      status: 'devam-eden',
      stats: {
        daireSayisi: '126',
        arsaAlani: '4,250m²',
        insaatAlani: '15,750m²',
        teslimTarihi: '2025'
      }
    },
    {
      name: 'Querencia',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.querencia.description'),
      image: '',
      storagePath: 'querencia/r imaj_3 kopya_11_11zon.webp',
      location: t('projects.items.querencia.location'),
      slug: 'querencia',
      status: 'devam-eden',
      stats: {
        daireSayisi: '126',
        arsaAlani: '4,250m²',
        insaatAlani: '15,750m²',
        teslimTarihi: '2025'
      }
    },
    {
      name: 'Four Seasons Life',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.fourSeasonsLife.description'),
      image: '',
      storagePath: 'fsl/7.webp',
      location: t('projects.items.fourSeasonsLife.location'),
      slug: 'four-seasons-life',
      status: 'devam-eden',
      stats: {
        daireSayisi: '126',
        arsaAlani: '4,250m²',
        insaatAlani: '15,750m²',
        teslimTarihi: '2025'
      }
    },
    {
      name: 'Courtyard Platinum',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.courtyardPlatinum.description'),
      image: '',
      storagePath: 'platinum/7.webp',
      location: t('projects.items.courtyardPlatinum.location'),
      slug: 'courtyard-platinum',
      status: 'devam-eden',
      stats: {
        daireSayisi: '126',
        arsaAlani: '4,250m²',
        insaatAlani: '15,750m²',
        teslimTarihi: '2025'
      }
    },
    {
      name: 'Sky Sakarya',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.skySakarya.description'),
      image: '',
      storagePath: 'skysakarya/WhatsApp Image 2021-08-24 at 11.08.54 (1).webp',
      location: t('projects.items.skySakarya.location'),
      slug: 'sky-sakarya',
      status: 'tamamlanan',
      stats: {
        daireSayisi: '156',
        arsaAlani: '3,850m²',
        insaatAlani: '18,250m²',
        teslimTarihi: '2022'
      }
    },
    {
      name: 'Courtyard',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.courtyard.description'),
      image: '',
      storagePath: 'courtyard/2 (1).webp',
      location: t('projects.items.courtyard.location'),
      slug: 'courtyard',
      status: 'tamamlanan',
      stats: {
        daireSayisi: '92',
        arsaAlani: '2,750m²',
        insaatAlani: '12,500m²',
        teslimTarihi: '2021'
      }
    },
    {
      name: 'Panorama',
      type: t('projects.projectTypes.residential'),
      description: t('projects.items.panorama.description'),
      image: '',
      storagePath: 'panorama/1_50 - Foto (1).webp',
      location: t('projects.items.panorama.location'),
      slug: 'panorama',
      status: 'tamamlanan',
      stats: {
        daireSayisi: '84',
        arsaAlani: '2,950m²',
        insaatAlani: '11,800m²',
        teslimTarihi: '2020'
      }
    }
  ]);

  // Navbar görünürlüğünü kontrol etmek için özel event
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const event = new CustomEvent('navbar-visibility-change', {
          detail: { visible: heroBottom > 0 }
        });
        window.dispatchEvent(event);
      }
    };

    // İlk yüklemede navbar'ı göster
    const event = new CustomEvent('navbar-visibility-change', {
      detail: { visible: true }
    });
    window.dispatchEvent(event);

    // Scroll event listener ekle
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Sayfadan çıkarken navbar'ı tekrar göster
      const event = new CustomEvent('navbar-visibility-change', {
        detail: { visible: true }
      });
      window.dispatchEvent(event);
    };
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedProjects = await Promise.all(
          projects.map(async (project) => {
            try {
              const imageRef = ref(storage, project.storagePath);
              const url = await getDownloadURL(imageRef);
              return { ...project, image: url };
            } catch (error: any) {
              console.error(`${project.name} kapak resmi yüklenemedi:`, error.message);
              return project;
            }
          })
        );
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Proje resimleri yüklenirken hata oluştu:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    const loadMobileVideo = async () => {
      try {
        const videoRef = ref(storage, 'skyfall.mp4');
        const url = await getDownloadURL(videoRef);
        setMobileVideoUrl(url);
      } catch (error) {
        console.error('Mobil video yüklenirken hata oluştu:', error);
      }
    };

    loadMobileVideo();
  }, []);

  useEffect(() => {
    if (filterParam) {
      setActiveFilter(filterParam);
    }
  }, [filterParam]);

  return (
    <div className="min-h-screen">
      {/* Hero Bölümü */}
      <div className="relative w-full h-screen overflow-hidden hero-section">
        {/* Video Arkaplan */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Mobil Video */}
            <div className="block md:hidden w-full h-full">
              <iframe
                src="https://www.youtube.com/embed/QfqJdJokpa4?autoplay=1&mute=1&loop=1&playlist=QfqJdJokpa4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=6"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute w-[300%] h-full -left-[100%] object-cover"
                style={{ 
                  pointerEvents: 'none',
                  border: 'none'
                }}
              />
            </div>
            
            {/* Desktop Video */}
            <div className="hidden md:block w-full h-full">
              <iframe
                src="https://www.youtube.com/embed/KWXpYwfkWbA?autoplay=1&mute=1&loop=1&playlist=KWXpYwfkWbA&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=0&end=89"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute w-[300%] h-full -left-[100%] object-cover"
                style={{ 
                  pointerEvents: 'none',
                  border: 'none'
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
        </div>

        {/* Merkez Başlık */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <div className="text-center space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <span className="inline-block text-xs md:text-sm font-light tracking-[0.5em] text-white/80 relative">
                {t('projects.hero.company')}
                <div className="absolute -bottom-2 left-1/2 w-8 h-[1px] bg-white/40 transform -translate-x-1/2"></div>
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extralight tracking-[.15em] text-white uppercase">
                {t('projects.hero.title')}
              </h1>
            </div>
            <p className="text-white/70 text-sm sm:text-base md:text-xl font-extralight tracking-wider max-w-3xl mx-auto leading-relaxed">
              {t('projects.hero.description')}
            </p>
            
           
          </div>
        </div>

        {/* Scroll İndikatörü */}
        <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Projeler Listesi */}
      <div className="relative bg-gradient-to-b from-white via-gray-50 to-white">
        {projects
          .filter(project => project.status === activeFilter)
          .map((project) => (
            <div 
              key={project.slug}
              className="min-h-screen flex flex-col items-center"
            >
              {/* Görsel Alanı */}
              <div className="w-full h-screen flex flex-col">
                {/* Ana Görsel */}
                <div className="relative h-[80vh]">
                  {project.image && (
                    <div className="relative h-full w-full">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Karartma Katmanları */}
                      <div className="absolute inset-0">
                        {/* Desktop Karartma - Soldan Sağa */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                        {/* Mobil Karartma - Üstten Alta */}
                        <div className="md:hidden absolute inset-0 h-[50%] bg-gradient-to-b from-black/95 via-black/80 to-transparent"></div>
                      </div>
                      {/* Proje Bilgileri */}
                      <div className="absolute top-12 left-4 md:left-12 z-10 max-w-2xl">
                        <span className="text-sm tracking-[0.3em] text-white">{project.type}</span>
                        <h3 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wider mt-4">
                          {project.name}
                        </h3>
                        <div className="w-24 h-[1px] bg-white/40 my-6 md:my-8"></div>
                        <p className="text-lg md:text-xl text-white font-light leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="text-base md:text-lg text-white font-light mb-8">
                          {project.location}
                        </div>
                        <Link
                          href={`/projeler/${project.slug}`}
                          className="inline-flex items-center space-x-4 text-white group"
                        >
                          <span className="text-lg tracking-wider">{t('projects.details.moreInfo')}</span>
                          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-[#061E4F] transition-all duration-300">
                            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      </div>

                      {/* Sağ Taraftaki Kutular - Desktop */}
                      <div className="absolute right-12 top-12 z-10 space-y-8 hidden md:block">
                        {/* Üst Kutu */}
                        <div className="w-96 h-56 bg-black/80 backdrop-blur-sm p-8 transform hover:scale-105 transition-transform duration-300">
                          <h4 className="text-white text-2xl font-light mb-6">{t('projects.details.projectDetails')}</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between text-white/80 text-lg">
                              <span>{t('projects.details.units')}:</span>
                              <span className="font-numeric">{project.stats?.daireSayisi}</span>
                            </div>
                            <div className="flex justify-between text-white/80 text-lg">
                              <span>{t('projects.details.delivery')}:</span>
                              <span className="font-numeric">{project.stats?.teslimTarihi}</span>
                            </div>
                          </div>
                        </div>

                        {/* Alt Kutu */}
                        <div className="w-96 h-56 bg-black/80 backdrop-blur-sm p-8 transform hover:scale-105 transition-transform duration-300">
                          <h4 className="text-white text-2xl font-light mb-6">{t('projects.details.areaInfo')}</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between text-white/80 text-lg">
                              <span>{t('projects.details.landArea')}:</span>
                              <span className="font-numeric">{project.stats?.arsaAlani}</span>
                            </div>
                            <div className="flex justify-between text-white/80 text-lg">
                              <span>{t('projects.details.constructionArea')}:</span>
                              <span className="font-numeric">{project.stats?.insaatAlani}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobil için Tek Kutu */}
                      <div className="absolute bottom-24 left-4 right-4 md:hidden z-10">
                        <div className="w-full bg-black/80 backdrop-blur-sm p-4 transform hover:scale-105 transition-transform duration-300">
                          <h4 className="text-white text-lg font-light mb-4">{t('projects.details.projectInfo')}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-white/80 text-sm">
                                <span>{t('projects.details.units')}:</span>
                                <span className="font-numeric">{project.stats?.daireSayisi}</span>
                              </div>
                              <div className="flex justify-between text-white/80 text-sm">
                                <span>{t('projects.details.delivery')}:</span>
                                <span className="font-numeric">{project.stats?.teslimTarihi}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-white/80 text-sm">
                                <span>{t('projects.details.landArea')}:</span>
                                <span className="font-numeric">{project.stats?.arsaAlani}</span>
                              </div>
                              <div className="flex justify-between text-white/80 text-sm">
                                <span>{t('projects.details.constructionArea')}:</span>
                                <span className="font-numeric">{project.stats?.insaatAlani}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sayısal Veriler */}
                <div className="h-[20vh] bg-[#DFD8CF] flex items-center justify-center">
                  <div className="w-full grid grid-cols-4 gap-4 px-8">
                    <div className="text-center">
                      <div className="text-3xl font-light mb-2 text-[#071E51]">{project.stats?.daireSayisi || '-'}</div>
                      <div className="text-sm tracking-wider text-[#071E51]/70">{t('projects.details.stats.units')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-light mb-2 text-[#071E51]">{project.stats?.arsaAlani || '-'}</div>
                      <div className="text-sm tracking-wider text-[#071E51]/70">{t('projects.details.stats.landArea')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-light mb-2 text-[#071E51]">{project.stats?.insaatAlani || '-'}</div>
                      <div className="text-sm tracking-wider text-[#071E51]/70">{t('projects.details.stats.constructionArea')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-light mb-2 text-[#071E51]">{project.stats?.teslimTarihi || '-'}</div>
                      <div className="text-sm tracking-wider text-[#071E51]/70">{t('projects.details.stats.delivery')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}