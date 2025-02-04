'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

export default function ProjectsPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState('devam-eden');
  const [projects, setProjects] = useState([
    {
      name: 'La Casalia',
      type: 'KONUT PROJESİ',
      description: 'Modern mimari ve lüks yaşamın buluştuğu özel bir proje.',
      image: '',
      storagePath: 'lacasalia/tatlisu_23 copy_11zon.webp',
      location: 'İSKELE, KKTC',
      slug: 'la-casalia',
      status: 'devam-eden'
    },
    {
      name: 'Natulux',
      type: 'KONUT PROJESİ',
      description: 'Doğa ile iç içe, lüks yaşam standartları.',
      image: '',
      storagePath: 'natulux/Natulux Out View 1 (1)_11zon.webp',
      location: 'TATLISU, KKTC',
      slug: 'natulux',
      status: 'devam-eden'
    },
    {
      name: 'La Isla',
      type: 'KONUT PROJESİ',
      description: 'Ada yaşamının tüm ayrıcalıklarını sunan özel proje.',
      image: '',
      storagePath: 'laisla/DRONE01E.webp',
      location: 'GAZİMAĞUSA, KKTC',
      slug: 'la-isla',
      status: 'devam-eden'
    },
    {
      name: 'Querencia',
      type: 'KONUT PROJESİ',
      description: 'Huzur ve konforun buluştuğu yaşam alanları.',
      image: '',
      storagePath: 'querencia/r imaj_3 kopya_11_11zon.webp',
      location: 'GİRNE, KKTC',
      slug: 'querencia',
      status: 'devam-eden'
    },
    {
      name: 'Four Seasons Life',
      type: 'KONUT PROJESİ',
      description: 'Dört mevsim ayrıcalıklı yaşam deneyimi.',
      image: '',
      storagePath: 'fsl/7.webp',
      location: 'LEFKOŞA, KKTC',
      slug: 'four-seasons-life',
      status: 'devam-eden'
    },
    {
      name: 'Courtyard Platinum',
      type: 'KONUT PROJESİ',
      description: 'Premium yaşam standartlarını sunan seçkin proje.',
      image: '',
      storagePath: 'platinum/7.webp',
      location: 'GİRNE, KKTC',
      slug: 'courtyard-platinum',
      status: 'devam-eden'
    },
    {
      name: 'Sky Sakarya',
      type: 'KONUT PROJESİ',
      description: 'Gökyüzüyle buluşan modern yaşam alanları.',
      image: '',
      storagePath: 'skysakarya/WhatsApp Image 2021-08-24 at 11.08.54 (1).webp',
      location: 'SAKARYA, TÜRKİYE',
      slug: 'sky-sakarya',
      status: 'tamamlanan'
    },
    {
      name: 'Courtyard',
      type: 'KONUT PROJESİ',
      description: 'Şehrin merkezinde huzurlu bir yaşam.',
      image: '',
      storagePath: 'courtyard/1.webp',
      location: 'GİRNE, KKTC',
      slug: 'courtyard',
      status: 'tamamlanan'
    },
    {
      name: 'Panorama',
      type: 'KONUT PROJESİ',
      description: 'Eşsiz manzarasıyla öne çıkan yaşam projesi.',
      image: '',
      storagePath: 'panorama/1_50 - Foto (1).webp',
      location: 'GİRNE, KKTC',
      slug: 'panorama',
      status: 'tamamlanan'
    }
  ]);

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
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        
        if (isInView) {
          section.classList.add('opacity-100');
          section.classList.remove('opacity-0');
        } else {
          section.classList.add('opacity-0');
          section.classList.remove('opacity-100');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Bölümü */}
      <div className="relative w-full aspect-video md:h-screen overflow-hidden">
        {/* Video Arkaplan */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <iframe
              src="https://www.youtube.com/embed/KWXpYwfkWbA?autoplay=1&mute=1&loop=1&playlist=KWXpYwfkWbA&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=0&end=89"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute w-full h-full md:w-[120%] md:h-[120%] md:-top-[10%] md:-left-[10%] object-cover"
              style={{ 
                pointerEvents: 'none',
                border: 'none'
              }}
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
        </div>

        {/* Merkez Başlık */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <div className="text-center space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <span className="inline-block text-xs md:text-sm font-light tracking-[0.5em] text-white/80 relative">
                DOVEC GROUP
                <div className="absolute -bottom-2 left-1/2 w-8 h-[1px] bg-white/40 transform -translate-x-1/2"></div>
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extralight tracking-[.15em] text-white uppercase">
                Projelerimiz
              </h1>
            </div>
            <p className="text-white/70 text-sm sm:text-base md:text-xl font-extralight tracking-wider max-w-3xl mx-auto leading-relaxed">
              Modern mimari ve lüks yaşamın buluştuğu özel projelerimiz ile 
              <br className="hidden md:block" />
              yaşam standartlarınızı yükseltiyoruz
            </p>
            
            {/* Filtre Butonları */}
            <div className="flex items-center justify-center space-x-4 pt-8">
              <button
                onClick={() => setActiveFilter('devam-eden')}
                className={`px-6 py-2.5 text-sm tracking-wider transition-all duration-300 border ${
                  activeFilter === 'devam-eden'
                    ? 'bg-white text-[#061E4F] border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white'
                }`}
              >
                DEVAM EDEN
              </button>
              <button
                onClick={() => setActiveFilter('tamamlanan')}
                className={`px-6 py-2.5 text-sm tracking-wider transition-all duration-300 border ${
                  activeFilter === 'tamamlanan'
                    ? 'bg-white text-[#061E4F] border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white'
                }`}
              >
                TAMAMLANAN
              </button>
            </div>
          </div>
        </div>

        {/* Scroll İndikatörü */}
        <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-16 md:w-24 h-16 md:h-24 flex items-center justify-center group cursor-pointer">
              <svg 
                className="w-full h-full text-white/30 group-hover:text-white/50 transition-all duration-700" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 4 L12 20 M12 20 L5 13 M12 20 L19 13" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Proje Sectionları */}
      <div className="relative">
        {projects
          .filter(project => project.status === activeFilter)
          .map((project, index) => (
          <Link 
            key={index} 
            href={`/projeler/${project.slug}`}
            className="block cursor-pointer"
          >
            <div
              ref={(el) => {
                sectionsRef.current[index] = el;
              }}
              className="relative h-screen transition-opacity duration-1000 group"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 text-center transform transition-transform duration-500 group-hover:scale-[1.02]">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full mb-4">
                    {project.type}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                    {project.name}
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-white/90">
                    <span>{project.location}</span>
                    <svg 
                      className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 