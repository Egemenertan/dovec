'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { storage } from '../firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!storage) {
          throw new Error('Firebase Storage is not initialized');
        }

        const storageRef = ref(storage, 'laisla');
        const result = await listAll(storageRef);
        
        const urls = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );

        if (urls.length > 0) {
          const shuffledUrls = [...urls].sort(() => Math.random() - 0.5);
          setImages(shuffledUrls);
        } else {
          setError('No images found in storage');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error loading images');
      }
    };

    fetchImages();
  }, []);

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
    return <div className="text-center text-gray-500">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="text-center text-gray-500">Loading images...</div>;
  }

  return (
    <div className={`relative ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className={`${isFullScreen ? 'h-screen' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'}`}>
        <div className={`flex items-center space-x-4 justify-center ${isFullScreen ? 'mb-8 pt-8' : 'mb-20'}`}>
          <div className={`w-20 h-[1px] ${isFullScreen ? 'bg-white/20' : 'bg-gradient-to-r from-[#061E4F] to-transparent'}`}></div>
          <h2 className={`text-sm font-light tracking-[.3em] uppercase ${isFullScreen ? 'text-white/60' : 'text-[#061E4F]/60'}`}>Proje Görselleri</h2>
          <div className={`w-20 h-[1px] ${isFullScreen ? 'bg-white/20' : 'bg-gradient-to-l from-[#061E4F] to-transparent'}`}></div>
        </div>

        <div className="relative">
          <div className={`relative ${isFullScreen ? 'h-[calc(100vh-12rem)]' : 'aspect-[16/9]'} rounded-2xl overflow-hidden`}>
            <Image
              src={images[currentSlide]}
              alt={`Proje Görseli ${currentSlide + 1}`}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            {isFullScreen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 20h-7m0 0v-7m0 7l7-7m-13-7H4m0 0v7m0-7l7 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h7m0 0v7m0-7L4 11m16-7h-7m0 0v7m0-7l7 7m-7 7h7m0 0v-7m0 7l-7-7m-6 7H4m0 0v-7m0 7l7-7" />
              </svg>
            )}
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 