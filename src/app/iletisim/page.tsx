'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        // Hero görseli
        const imageRef = ref(storage, 'querencia/r imaj_9 kopya_16_11zon.webp');
        const url = await getDownloadURL(imageRef);
        setHeroImage(url);

        // Logo
        const logoRef = ref(storage, 'logo/dovec.webp');
        const logoUrl = await getDownloadURL(logoRef);
        setLogoUrl(logoUrl);
      } catch (error) {
        console.error(t('errors.imageLoadError'), error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [t]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!heroImage) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="text-[#061E4F] text-lg font-light tracking-wider">{t('errors.imageNotLoaded')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={t('contact.hero.alt')}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            {t('contact.hero.title')}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Sol Taraf - İletişim Bilgileri */}
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-[#061E4F] mb-6 relative inline-block">
                {t('contact.sections.title')}
                <div className="absolute -bottom-3 left-0 w-12 h-[1px] bg-gradient-to-r from-[#061E4F]/40 to-transparent"></div>
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl">
                {t('contact.sections.description')}
              </p>
            </div>

            <div className="space-y-12">
              {/* Adres */}
              <div className="group flex items-start space-x-6">
                <div className="text-[#061E4F]">
                  <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#061E4F] mb-2 tracking-wide">
                    {t('contact.sections.items', { returnObjects: true }).find((item: any) => item.type === 'address')?.title}
                  </h3>
                  <a 
                    href={t('contact.sections.items', { returnObjects: true }).find((item: any) => item.type === 'address')?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-light leading-relaxed hover:text-[#061E4F] transition-colors"
                  >
                    {t('contact.sections.items', { returnObjects: true }).find((item: any) => item.type === 'address')?.content}
                  </a>
                </div>
              </div>

              {/* Telefon */}
              <div className="group flex items-start space-x-6">
                <div className="text-[#061E4F]">
                  <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#061E4F] mb-2 tracking-wide">
                    {t('contact.sections.items', { returnObjects: true }).find((item: any) => item.type === 'phone')?.title}
                  </h3>
                  <a 
                    href={t('contact.sections.items', { returnObjects: true }).find((item: any) => item.type === 'phone')?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-light leading-relaxed hover:text-[#061E4F] transition-colors"
                  >
                    <span className="font-numeric">
                      {t('contact.sections.items', { returnObjects: true }).find((item: any) => item.type === 'phone')?.content}
                    </span>
                  </a>
                </div>
              </div>

              {/* E-posta Adresleri */}
              <div className="group flex items-start space-x-6">
                <div className="text-[#061E4F]">
                  <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#061E4F] mb-2 tracking-wide">{t('contact.email.title')}</h3>
                  <div className="space-y-2">
                    {t('contact.sections.items', { returnObjects: true })
                      .find((item: any) => item.type === 'email')
                      ?.emails.map((email: { address: string; link: string }, index: number) => (
                        <a 
                          key={index}
                          href={email.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-600 font-light leading-relaxed hover:text-[#061E4F] transition-colors"
                        >
                          {email.address}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div className="pt-6">
              <h3 className="text-lg font-medium text-[#061E4F] mb-6 tracking-wide relative inline-block">
                {t('contact.socialMedia.title')}
                <div className="absolute -bottom-2 left-0 w-8 h-[1px] bg-gradient-to-r from-[#061E4F]/40 to-transparent"></div>
              </h3>
              <div className="flex space-x-8">
                {t('contact.socialMedia.links', { returnObjects: true }).map((social: { name: string; url: string; icon: string }, index: number) => (
                  <Link 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[#061E4F] hover:text-[#061E4F]/80 transition-colors"
                  >
                    <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: social.icon }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Harita */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            <iframe
              src={t('contact.map.embedUrl')}
              className="absolute inset-0 w-full h-full"
              style={{ 
                border: 0,
                filter: 'grayscale(10%) contrast(1.02) saturate(1.05)'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="relative">
                <div className="w-8 h-8 bg-[#061E4F] rounded-full animate-ping absolute -inset-4 opacity-75"></div>
                <div className="w-16 h-16 bg-[#061E4F]/20 rounded-full absolute -inset-8"></div>
                <div className="w-6 h-6 bg-[#061E4F] rounded-full relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#061E4F]">{t('contact.map.title')}</h4>
                    <p className="text-sm text-gray-600">{t('contact.map.address')}</p>
                  </div>
                </div>
                <a 
                  href={t('contact.map.directionsLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#061E4F] hover:text-[#061E4F]/80 transition-colors"
                >
                  <span className="text-sm font-medium">{t('contact.map.getDirections')}</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 