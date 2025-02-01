import { useState, useEffect } from 'react';

export const useStorage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Public klasöründeki görsellerin listesi
    const publicImages = [
      '/tatlisu_35 copy 2-1.webp',
      '/tatlisu_23 copy_11zon.webp',
      '/Natulux Out View 1 (1)_11zon.jpg'
    ];

    setImages(publicImages);
    setLoading(false);
  }, []);

  return { images, loading };
}; 