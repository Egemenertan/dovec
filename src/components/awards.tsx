import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

export const Awards = () => {
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    const loadHeroImage = async () => {
      try {
        const imageRef = ref(storage, 'hero/r imaj_3 kopya_11_11zon.webp');
        const url = await getDownloadURL(imageRef);
        setHeroImage(url);
      } catch (error) {
        console.error('Hero image yüklenirken hata:', error);
      }
    };

    loadHeroImage();
  }, []);

  return (
    <section className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Awards Başlık */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
          {/* Sol taraf - Hero Image */}
          <div className="w-full md:w-1/2 relative aspect-[4/3]">
            {heroImage && (
              <>
                <Image
                  src={heroImage}
                  alt="Awards Hero"
                  fill
                  className="object-cover "
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/3 to-transparent" />
              </>
            )}
          </div>

          {/* Sağ taraf - Başlık ve Açıklama */}
          <div className="w-full md:w-1/2 text-left md:text-right">
            <h1 className="text-6xl sm:text-9xl font-light mb-4">ÖDÜLLER</h1>
            <div className="max-w-2xl ml-auto">
              <h2 className="text-2xl mb-2">A LEGACY OF DISTINCTION</h2>
              <p className="text-gray-400">
                We are proud to showcase the recognition we&apos;ve earned for our dedication, innovation, and excellence
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Bölümü */}
        <div className="mt-16">
          <h2 className="text-5xl mb-8">ACHIEVEMENTS</h2>
          <p className="max-w-2xl text-gray-400 mb-10">
            Our commitment to excellence has been recognized with prestigious awards across various categories, highlighting our dedication to creating exceptional living spaces and innovative designs.
          </p>

          {/* Awards Timeline */}
          <div className="space-y-4">
            {/* 2024 Ödülleri */}
            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Excellence Award</p>
                <h3 className="text-2xl">2024</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Construction Company of the Year in Northern Cyprus</p>
              </div>
            </div>

            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Excellence Award</p>
                <h3 className="text-2xl">2024</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Construction Company Platinum Award</p>
              </div>
            </div>

            {/* 2023 Proje Ödülleri */}
            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Project Award</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best New Project Design - Courtyard Longbeach</p>
              </div>
            </div>

            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Project Award</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Apartment Complex Platinum Award - Terrace Park</p>
              </div>
            </div>

            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Project Award</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Residence Project - Golden Residence</p>
              </div>
            </div>

            {/* 2023 Tasarım Ödülleri */}
            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Design Award</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Building Renovation - Döveç Group Long Beach Office</p>
              </div>
            </div>

            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Design Award</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Kitchen Design - Arredo Design</p>
              </div>
            </div>

            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Design Award</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Industrial Building Design - Arredo Design</p>
              </div>
            </div>

            {/* 2023 Özel Ödüller */}
            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300">
              <div>
                <p className="text-gray-400 text-sm">Special Recognition</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Investment Project - Alfam Dormitories</p>
              </div>
            </div>

            <div className="border-t border-gray-800 py-4 flex justify-between items-center hover:bg-gray-900/30 transition-all duration-300 border-b">
              <div>
                <p className="text-gray-400 text-sm">Special Recognition</p>
                <h3 className="text-2xl">2023</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-200">Best Beachfront Residential Complex - Four Seasons Life</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
