import { useState, useEffect } from 'react';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

export const useLaCasaliaImage = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'lacasalia/tatlisu_10 - Photo copy.webp');
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        setLoading(false);
      } catch (error) {
        console.error('La Casalia resmi yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return { imageUrl, loading };
}; 