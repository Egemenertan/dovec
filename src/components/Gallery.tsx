'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export function Gallery({ projectId }: { projectId: string }) {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    console.log('Gallery bileşeni - Gelen projectId:', projectId);
    
    const fetchImages = async () => {
      try {
        if (!storage) {
          throw new Error('Firebase Storage is not initialized');
        }

        console.log('Firebase Storage bağlantısı başarılı');
        console.log('Storage referansı oluşturuluyor:', projectId);
        
        const storageRef = ref(storage, projectId);
        console.log('Storage referansı oluşturuldu:', storageRef);
        
        const result = await listAll(storageRef);
        console.log('Klasördeki öğeler:', result.items.length);
        
        const urls = await Promise.all(
          result.items.map(async (item) => {
            try {
              console.log('Resim yükleniyor:', item.fullPath);
              const url = await getDownloadURL(item);
              console.log('Resim URL\'i alındı:', url);
              return url;
            } catch (error) {
              console.error(`Resim yüklenemedi: ${item.fullPath}`, error);
              return null;
            }
          })
        );

        const validUrls = urls.filter((url): url is string => url !== null);

        if (validUrls.length > 0) {
          const shuffledUrls = [...validUrls].sort(() => Math.random() - 0.5);
          setImages(shuffledUrls);
          console.log(`${projectId} klasöründen ${validUrls.length} adet resim yüklendi`);
        } else {
          console.error('Hiç geçerli resim URL\'i bulunamadı');
          setError('Bu proje için görsel bulunamadı');
        }
      } catch (error) {
        console.error('Resimler yüklenirken detaylı hata:', error);
        setError('Görseller yüklenirken bir hata oluştu');
      }
    };

    if (projectId) {
      fetchImages();
    } else {
      console.error('projectId tanımlı değil');
    }
  }, [projectId]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center text-gray-500">{error}</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-3 w-3 bg-[#061E4F]/40 rounded-full"></div>
            <div className="h-3 w-3 bg-[#061E4F]/40 rounded-full"></div>
            <div className="h-3 w-3 bg-[#061E4F]/40 rounded-full"></div>
          </div>
          <span className="ml-4 text-[#061E4F]/60">Görseller yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="px-0 py-16 md:py-24">
        <div className="flex items-center space-x-4 justify-center mb-20">
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
          <h2 className="text-sm font-light tracking-[.3em] uppercase text-[#061E4F]/60">Proje Görselleri</h2>
          <div className="w-20 h-[1px] bg-gradient-to-l from-[#061E4F] to-transparent"></div>
        </div>

        <div className="relative">
          <div className="relative h-[80vh] overflow-hidden">
            {images[currentSlide] && (
              <Image
                src={images[currentSlide]}
                alt={`Proje Görseli ${currentSlide + 1}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={90}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3">
            {(() => {
              // Her zaman 5 nokta göster
              let dots = [];
              let start = Math.max(0, Math.min(currentSlide - 2, images.length - 5));
              let end = Math.min(start + 5, images.length);
              
              // Başlangıç noktasını ayarla
              if (end - start < 5 && start > 0) {
                start = Math.max(0, end - 5);
              }

              for (let i = start; i < end; i++) {
                dots.push(
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1 transition-all duration-300 rounded-full ${
                      i === currentSlide 
                        ? 'w-8 bg-white' 
                        : 'w-4 bg-white/50'
                    }`}
                    aria-label={`Görsel ${i + 1}`}
                  />
                );
              }

              return dots;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
} 