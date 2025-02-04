'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Açık pozisyonlar için örnek veri
const positions = [
  {
    id: 1,
    title: 'Kıdemli İnşaat Mühendisi',
    location: 'Girne, KKTC',
    type: 'Tam Zamanlı',
    experience: '5+ yıl',
    department: 'Mühendislik'
  },
  {
    id: 2,
    title: 'Mimar',
    location: 'Lefkoşa, KKTC',
    type: 'Tam Zamanlı',
    experience: '3+ yıl',
    department: 'Tasarım'
  },
  {
    id: 3,
    title: 'Proje Yöneticisi',
    location: 'İskele, KKTC',
    type: 'Tam Zamanlı',
    experience: '7+ yıl',
    department: 'Yönetim'
  }
];

// Şirket değerleri
const values = [
  {
    title: 'İnovasyon',
    description: 'Sürekli gelişim ve yenilikçi çözümler üretme tutkusu',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    )
  },
  {
    title: 'Sürdürülebilirlik',
    description: 'Çevreye ve geleceğe duyarlı projeler geliştirme misyonu',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.25 12.733M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
      </svg>
    )
  },
  {
    title: 'Mükemmellik',
    description: 'Her detayda kusursuzluğu hedefleyen çalışma prensibi',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    )
  }
];

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null as File | null
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src="/career-hero.jpg"
          alt="Kariyer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-white mb-8">
              Geleceği Birlikte İnşa Edelim
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide text-white/90 mb-12 max-w-2xl mx-auto">
              DOVEC ailesine katılın, yenilikçi projelerde yeteneklerinizi gösterin ve kariyerinizde yeni bir sayfa açın.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('career-content');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              Kariyer Fırsatları
            </button>
          </div>
        </div>
      </div>

      {/* Kariyer İçeriği */}
      <div id="career-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl font-light tracking-wider text-[#061E4F] mb-6">
              Döveç'te Kariyer
            </h2>
            <p className="text-lg font-light leading-relaxed text-gray-600">
              Döveç İnşaat olarak, yalnızca binalar değil, aynı zamanda kariyerler de inşa ediyoruz. Yenilikçi projelerimiz, güçlü değerlerimiz ve dinamik çalışma ortamımız ile sektörün öncülerinden biri olmanın gururunu yaşıyoruz. Eğer siz de bu büyük ailenin bir parçası olmak istiyorsanız, doğru yerdesiniz.
            </p>
          </div>

          {/* Aradığımız Nitelikler */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-light tracking-wider text-[#061E4F] mb-4">
                Sizin de bir Döveç hikayeniz olsun istiyorsanız hemen bize ulaşın!
              </h3>
              <p className="text-lg font-light text-gray-600 mb-10">
                Döveç İnşaat olarak, ekibimize katılacak adaylarda aşağıdaki nitelikleri arıyoruz:
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: 'Yenilikçilik ve Yaratıcılık',
                  desc: 'Farklı ve yaratıcı çözümler üretebilme yeteneği.'
                },
                {
                  title: 'Takım Çalışması',
                  desc: 'Ekip içinde uyumlu ve etkin bir şekilde çalışabilme.'
                },
                {
                  title: 'Liderlik',
                  desc: 'Projeleri yönetme ve ekibi yönlendirme becerisi.'
                },
                {
                  title: 'Profesyonellik',
                  desc: 'İş etiğine bağlılık ve profesyonel çalışma anlayışı.'
                },
                {
                  title: 'Sürekli Öğrenme',
                  desc: 'Kendini geliştirme ve yenilikleri takip etme isteği.'
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-center space-x-8 mb-2">
                    <h4 className="text-lg font-light tracking-wider text-[#061E4F] group-hover:text-[#061E4F]/80 transition-colors duration-300 w-56 shrink-0">
                      {item.title}
                    </h4>
                    <div className="flex-1 h-[1px] bg-[#061E4F]/10 group-hover:bg-[#061E4F]/20 transition-colors duration-300" />
                  </div>
                  <p className="text-base font-light text-gray-600 pl-64">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Başvuru Formu */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light tracking-wider text-[#061E4F] mb-6">
                Başvuru Formu
              </h2>
              <p className="text-lg font-light text-gray-600">
                Kariyerinizde yeni bir adım atmak için formu doldurun, size en kısa sürede dönüş yapalım.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-light text-gray-600 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#061E4F] focus:ring-1 focus:ring-[#061E4F] transition-colors duration-300"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-600 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#061E4F] focus:ring-1 focus:ring-[#061E4F] transition-colors duration-300"
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-light text-gray-600 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#061E4F] focus:ring-1 focus:ring-[#061E4F] transition-colors duration-300"
                    placeholder="Telefon numaranız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-600 mb-2">
                    Pozisyon
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#061E4F] focus:ring-1 focus:ring-[#061E4F] transition-colors duration-300"
                  >
                    <option value="">Pozisyon seçin</option>
                    {positions.map((position) => (
                      <option key={position.id} value={position.title}>
                        {position.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-gray-600 mb-2">
                  Mesaj
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#061E4F] focus:ring-1 focus:ring-[#061E4F] transition-colors duration-300"
                  placeholder="Kendinizden bahsedin"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-600 mb-2">
                  CV Yükle
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                  />
                  <div className="w-full px-4 py-3 rounded-lg border border-dashed border-gray-300 hover:border-[#061E4F] transition-colors duration-300 text-center">
                    <span className="text-gray-500">
                      PDF veya Word dosyası yükleyin
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#061E4F] text-white rounded-lg hover:bg-[#061E4F]/90 transition-colors duration-300"
              >
                Başvuruyu Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 