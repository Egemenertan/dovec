'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { storage } from '@/firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ImageSliderProps {
  folderPath: string;
  alt: string;
}

export const ImageSlider = ({ folderPath, alt }: ImageSliderProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, folderPath);
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        setImages(urls);
        setLoading(false);
      } catch (error) {
        console.error('Resimler yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [folderPath]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-12 bg-gradient-to-b from-white via-gray-50 to-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-12 bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500">Resim bulunamadı</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-12 group">
        <div 
          onClick={() => setShowFullScreen(true)}
          className="cursor-pointer relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={alt}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent" />
        </div>
        
        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white/20"
          aria-label="Önceki resim"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white/20"
          aria-label="Sonraki resim"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {(() => {
            // Her zaman 5 nokta göster
            let dots = [];
            let start = Math.max(0, Math.min(currentIndex - 2, images.length - 5));
            let end = Math.min(start + 5, images.length);
            
            // Başlangıç noktasını ayarla
            if (end - start < 5 && start > 0) {
              start = Math.max(0, end - 5);
            }

            for (let i = start; i < end; i++) {
              dots.push(
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    i === currentIndex 
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

      {/* Full Screen Gallery */}
      {showFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Close Button */}
              <button
                onClick={() => setShowFullScreen(false)}
                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Galeriyi kapat"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                <Image
                  src={images[currentIndex]}
                  alt={alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Önceki resim"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Sonraki resim"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 font-light tracking-wider">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 