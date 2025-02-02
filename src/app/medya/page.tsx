'use client';

import { useState } from 'react';
import Image from 'next/image';

// Örnek medya içerikleri
const medyaIcerikleri = {
  basinBultenleri: [
    {
      id: 1,
      baslik: "DOVEC İnşaat'tan Yeni Yatırım Hamlesi",
      tarih: "15 Mart 2024",
      ozet: "DOVEC İnşaat, Kuzey Kıbrıs'ta yeni bir yaşam kompleksi projesini hayata geçiriyor.",
      resim: "/tatlisu_35 copy 2-1.webp"
    },
    {
      id: 2,
      baslik: "Sürdürülebilir Yapılaşma İlkelerimiz",
      tarih: "10 Mart 2024",
      ozet: "Çevre dostu yapılaşma ve sürdürülebilir mimari ilkelerimizle geleceğe yatırım yapıyoruz.",
      resim: "/tatlisu_23 copy_11zon.webp"
    }
  ],
  fotograflar: [
    {
      id: 1,
      baslik: "Palm Residence Dış Görünüm",
      kategori: "Projeler",
      resim: "/tatlisu_35 copy 2-1.webp"
    },
    {
      id: 2,
      baslik: "Modern Yaşam Alanları",
      kategori: "İç Mekan",
      resim: "/tatlisu_23 copy_11zon.webp"
    },
    {
      id: 3,
      baslik: "Deniz Manzaralı Teraslar",
      kategori: "Dış Mekan",
      resim: "/Natulux Out View 1 (1)_11zon.jpg"
    },
    {
      id: 4,
      baslik: "Lüks Villa Projesi",
      kategori: "Projeler",
      resim: "/tatlisu_35 copy 2-1.webp"
    },
    {
      id: 5,
      baslik: "Modern Mutfak Tasarımı",
      kategori: "İç Mekan",
      resim: "/tatlisu_23 copy_11zon.webp"
    },
    {
      id: 6,
      baslik: "Havuzlu Villa",
      kategori: "Dış Mekan",
      resim: "/Natulux Out View 1 (1)_11zon.jpg"
    }
  ],
  videolar: [
    {
      id: 1,
      baslik: "Palm Residence Tanıtım Filmi",
      kategori: "Projeler",
      thumbnail: "/tatlisu_35 copy 2-1.webp",
      videoUrl: "#"
    },
    {
      id: 2,
      baslik: "DOVEC İnşaat Kurumsal",
      kategori: "Kurumsal",
      thumbnail: "/tatlisu_23 copy_11zon.webp",
      videoUrl: "#"
    },
    {
      id: 3,
      baslik: "Sürdürülebilir Yapılar",
      kategori: "Kurumsal",
      thumbnail: "/Natulux Out View 1 (1)_11zon.jpg",
      videoUrl: "#"
    }
  ]
};

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'basin' | 'foto' | 'video'>('basin');
  const [selectedImage, setSelectedImage] = useState<null | {
    resim: string;
    baslik: string;
    kategori?: string;
  }>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <Image
          src="/tatlisu_35 copy 2-1.webp"
          alt="Medya"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            Medya
          </h1>
        </div>
      </div>

      {/* Tab Menü */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16">
          <button
            onClick={() => setActiveTab('basin')}
            className={`px-6 py-3 rounded-lg font-light tracking-wider transition-all ${
              activeTab === 'basin'
                ? 'bg-[#061E4F] text-white'
                : 'bg-[#061E4F]/5 text-[#061E4F] hover:bg-[#061E4F]/10'
            }`}
          >
            Basın Bültenleri
          </button>
          <button
            onClick={() => setActiveTab('foto')}
            className={`px-6 py-3 rounded-lg font-light tracking-wider transition-all ${
              activeTab === 'foto'
                ? 'bg-[#061E4F] text-white'
                : 'bg-[#061E4F]/5 text-[#061E4F] hover:bg-[#061E4F]/10'
            }`}
          >
            Fotoğraf Galerisi
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-6 py-3 rounded-lg font-light tracking-wider transition-all ${
              activeTab === 'video'
                ? 'bg-[#061E4F] text-white'
                : 'bg-[#061E4F]/5 text-[#061E4F] hover:bg-[#061E4F]/10'
            }`}
          >
            Video Galeri
          </button>
        </div>

        {/* Basın Bültenleri */}
        {activeTab === 'basin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {medyaIcerikleri.basinBultenleri.map((bulten) => (
              <article
                key={bulten.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64">
                  <Image
                    src={bulten.resim}
                    alt={bulten.baslik}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white/80 text-sm mb-2">{bulten.tarih}</div>
                    <h3 className="text-xl font-light text-white mb-2">{bulten.baslik}</h3>
                    <p className="text-white/90 font-light">{bulten.ozet}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Fotoğraf Galerisi */}
        {activeTab === 'foto' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {medyaIcerikleri.fotograflar.map((foto) => (
              <div
                key={foto.id}
                onClick={() => setSelectedImage(foto)}
                className="group cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <Image
                  src={foto.resim}
                  alt={foto.baslik}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white/80 text-sm mb-2">{foto.kategori}</span>
                  <h3 className="text-white font-light">{foto.baslik}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Galeri */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medyaIcerikleri.videolar.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer relative aspect-video rounded-xl overflow-hidden"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.baslik}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-white/80 text-sm mb-2 block">{video.kategori}</span>
                  <h3 className="text-white font-light">{video.baslik}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImage?.resim && (
              <Image
                src={selectedImage.resim}
                alt={selectedImage.baslik || ''}
                fill
                className="object-contain"
              />
            )}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-xl font-light mb-1">
                {selectedImage?.baslik || ''}
              </h3>
              {selectedImage?.kategori && (
                <span className="text-white/80 text-sm">
                  {selectedImage.kategori}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 