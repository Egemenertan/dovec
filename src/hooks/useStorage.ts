import { useState, useEffect } from 'react';
import { storage } from '@/firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const useStorage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const heroFolderRef = ref(storage, 'hero');
        const result = await listAll(heroFolderRef);
        
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
  }, []);

  return { images, loading };
}; 