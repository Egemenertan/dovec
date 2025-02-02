'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

// Örnek projeler verisi
const projects = [
  {
    id: 1,
    title: 'Modern Yaşam Kompleksi',
    category: 'Konut',
    location: 'Lefkoşa, KKTC',
    image: '/projects/project1.jpg',
    description: 'Sürdürülebilir ve modern yaşam alanları sunan lüks konut projesi.',
  },
  {
    id: 2,
    title: 'Teknoloji Merkezi',
    category: 'Ticari',
    location: 'Girne, KKTC',
    image: '/projects/project2.jpg',
    description: 'Yenilikçi ofis alanları ve teknoloji şirketleri için modern iş merkezi.',
  },
  {
    id: 3,
    title: 'Endüstri Parkı',
    category: 'Endüstriyel',
    location: 'Gazimağusa, KKTC',
    image: '/projects/project3.jpg',
    description: 'Sürdürülebilir üretim tesisleri ve lojistik merkezi.',
  },
];

export default function ProjectsPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    handleScroll(); // İlk yüklemede çalıştır

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Bölümü */}
      <div className="relative h-screen">
        <Image
          src="/projects-hero.jpg"
          alt="Projeler"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            Projeler
          </h1>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Proje Sectionları */}
      {projects.map((project, index) => (
        <Link href={`/projeler/${project.id}`} key={project.id}>
          <div
            ref={(el) => {
              sectionsRef.current[index] = el;
            }}
            className="relative h-screen transition-opacity duration-1000"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full mb-4">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-6">
                  {project.description}
                </p>
                <span className="text-white/90">
                  {project.location}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 