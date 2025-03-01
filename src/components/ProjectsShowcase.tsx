'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

// Proje tipi tanımı
interface Project {
  name: string;
  slug: string;
  image: string;
  storagePath: string;
  description: string;
  location: string;
}

// Navbar'ı gizlemek için özel bir olay
const NAVBAR_VISIBILITY_EVENT = 'navbar-visibility-change';

export const ProjectsShowcase = () => {
  // Projeler listesi
  const [projects, setProjects] = useState<Project[]>([
    {
      name: 'La Casalia',
      slug: 'la-casalia',
      image: '',
      storagePath: 'lacasalia/tatlisu_12 copy.webp',
      description: 'Akdeniz\'in kristal berraklığındaki sularına bakan, huzur ve yenilenmenin buluştuğu, Kıbrıs\'ın kuzeyinde yer alan bir cennet köşesidir.',
      location: 'Tatlısu, KKTC'
    },
    {
      name: 'Four Seasons III',
      slug: 'four-seasons-iii',
      image: '',
      storagePath: 'fsl/7.webp',
      description: 'Dört mevsim ayrıcalıklı yaşam deneyimi sunan rezidanslar.',
      location: 'İskele, KKTC'
    },
    {
      name: 'Natulux',
      slug: 'natulux',
      image: '',
      storagePath: 'natulux/Natulux Out View 1 (1)_11zon.webp',
      description: 'Doğa ile iç içe, lüks yaşam standartları.',
      location: 'Esentepe, KKTC'
    },
    {
      name: 'Courtyard Platinum',
      slug: 'courtyard-platinum',
      image: '',
      storagePath: 'platinum/7.webp',
      description: 'Premium yaşam standartlarını sunan seçkin proje.',
      location: 'Long Beach, KKTC'
    }
  ]);

  // Aktif proje indeksi
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  // Bileşen referansı
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Firebase'den görselleri yükleme
  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedProjects = await Promise.all(
          projects.map(async (project) => {
            if (!project.image) {
              try {
                const imageRef = ref(storage, project.storagePath);
                const url = await getDownloadURL(imageRef);
                return { ...project, image: url };
              } catch (error) {
                console.error(`${project.name} görseli yüklenemedi:`, error);
                return project;
              }
            }
            return project;
          })
        );
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Proje görselleri yüklenirken hata oluştu:', error);
      }
    };

    loadImages();
  }, []);

  // Navbar görünürlüğünü kontrol etme
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      // Özel olay oluştur
      const event = new CustomEvent(NAVBAR_VISIBILITY_EVENT, {
        detail: { visible: !entry.isIntersecting }
      });
      
      // Olayı tetikle
      window.dispatchEvent(event);
    };

    // Intersection Observer oluştur
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2 // Bileşenin %20'si görünür olduğunda tetikle
    });

    // Bileşeni gözlemle
    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    // Temizleme işlevi
    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
      
      // Navbar'ı tekrar göster
      const event = new CustomEvent(NAVBAR_VISIBILITY_EVENT, {
        detail: { visible: true }
      });
      window.dispatchEvent(event);
    };
  }, []);

  return (
    <div ref={showcaseRef} className="relative w-full h-screen overflow-hidden">
      {/* Arka plan görseli - Aktif proje veya varsayılan */}
      <div className="absolute inset-0 w-full h-full">
        {projects.map((project, index) => (
          <motion.div
            key={`bg-${project.slug}`}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeProject === index ? 1 : 0,
              scale: activeProject === index ? 1 : 1.1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={90}
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        ))}
        
        {/* Varsayılan arka plan (hiçbir proje aktif değilse) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: activeProject === null ? 1 : 0,
            scale: activeProject === null ? 1 : 1.1
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {projects[0]?.image && (
            <Image
              src={projects[0].image}
              alt="Projelerimiz"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>

      {/* Projeler - Tam Ekran Grid */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-10">
        {projects.map((project, index) => (
          <Link 
            key={project.slug} 
            href={`/projeler/${project.slug}`}
            className="relative w-full h-full"
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`
                relative w-full h-full flex flex-col items-center justify-center
                transition-all duration-500 group overflow-hidden
                border border-white/10
              `}
            >
              {/* Hover Efekti - Blur Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: activeProject === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 backdrop-blur-2xl z-0"
              />

              {/* Proje İçeriği */}
              <div className="text-center px-6 py-8 z-10 max-w-md flex flex-col h-full justify-center">
                {/* Lokasyon Etiketi */}
                <div className="min-h-[30px]">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: activeProject === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="uppercase tracking-widest text-sm font-light text-white/90 mb-2 opacity-0 group-hover:opacity-100"
                  >
                    {project.location.split(',')[0]}
                  </motion.div>
                </div>
                
                {/* Proje İsmi - Sabit Konumda */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wider drop-shadow-lg"
                >
                  {project.name}
                </motion.h3>
                
                {/* Proje Açıklaması - Hover'da Görünür */}
                <div className="h-[80px] overflow-hidden">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeProject === index ? 1 : 0, y: activeProject === index ? 0 : 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-white/90 font-light text-base md:text-lg tracking-wide opacity-0 group-hover:opacity-100 max-w-sm mx-auto leading-relaxed"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 