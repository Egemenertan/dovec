'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

export default function ContactPage() {
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    const loadHeroImage = async () => {
      try {
        const imageRef = ref(storage, 'querencia/r imaj_9 kopya_16_11zon.webp');
        const url = await getDownloadURL(imageRef);
        setHeroImage(url);
      } catch (error) {
        console.error('Hero resmi yüklenemedi:', error);
      }
    };

    loadHeroImage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt="İletişim"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            İletişim
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Sol Taraf - İletişim Bilgileri */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-[#061E4F] mb-6">
                Bize Ulaşın
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>

            <div className="space-y-8">
              {/* Adres */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#061E4F]/5 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-[#061E4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Adres</h3>
                  <p className="text-gray-600">Döveç Head Quaters Uluçam yolu, No.2, Sakarya, Gazimağusa, KKTC</p>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#061E4F]/5 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-[#061E4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Telefon</h3>
                  <p className="text-gray-600">+90 548 837 0015</p>
                </div>
              </div>

              {/* E-posta Adresleri */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#061E4F]/5 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-[#061E4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">E-posta</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">info@dovecconstruction.com</p>
                    <p className="text-gray-600">info@dovecgroup.com</p>
                    <p className="text-gray-600">ik@dovecgroup.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sosyal Medya</h3>
              <div className="flex space-x-6">
                <Link 
                  href="https://www.facebook.com/DovecConstruction/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#061E4F]/5 p-3 rounded-lg hover:bg-[#061E4F]/10 transition-colors"
                >
                  <svg className="w-6 h-6 text-[#061E4F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.instagram.com/dovecconstruction/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#061E4F]/5 p-3 rounded-lg hover:bg-[#061E4F]/10 transition-colors"
                >
                  <svg className="w-6 h-6 text-[#061E4F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/dovecconstruction/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#061E4F]/5 p-3 rounded-lg hover:bg-[#061E4F]/10 transition-colors"
                >
                  <svg className="w-6 h-6 text-[#061E4F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Harita */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-[#061E4F]/5 to-transparent pointer-events-none z-10"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1629.7295509169574!2d33.90673591523173!3d35.20559598031037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfe3c6b9455555%3A0x777d89f70a3333!2zRMO2dmXDpyBIZWFkIFF1YXRlcnM!5e0!3m2!1str!2str!4v1625123456789!5m2!1str!2str"
              className="absolute inset-0 w-full h-full border-0 filter contrast-125"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#061E4F]/5 rounded-lg">
                    <svg className="w-6 h-6 text-[#061E4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#061E4F]">Döveç Head Quaters</h4>
                    <p className="text-sm text-gray-600">Uluçam yolu, No.2, Sakarya, Gazimağusa, KKTC</p>
                  </div>
                </div>
                <a 
                  href="https://www.google.com/maps/dir//D%C3%B6ve%C3%A7+Head+Quaters+Ulu%C3%A7am+yolu,+No.2,+Sakarya,+Gazima%C4%9Fusa,+KKTC" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#061E4F]/5 hover:bg-[#061E4F]/10 text-[#061E4F] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-sm font-medium">Yol Tarifi Al</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 