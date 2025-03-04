'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    // LocalStorage'dan dil tercihini al
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // JSON dosyasını yükle
    const loadTranslations = async () => {
      const response = await import('@/data/homepage-content.json');
      setTranslations(response.default);
    };

    loadTranslations();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Nested key'leri handle eden translation fonksiyonu
  const t = (key: string, options?: { returnObjects: boolean }) => {
    if (!translations) return options?.returnObjects ? [] : '';

    const keys = key.split('.');
    let current = translations[language];

    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return options?.returnObjects ? [] : key;
      }
      current = current[k];
    }

    // returnObjects true ise ve sonuç bir dizi değilse, tek elemanlı dizi olarak dön
    if (options?.returnObjects && !Array.isArray(current)) {
      return [current];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 