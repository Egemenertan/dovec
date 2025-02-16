'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'

// Ekip üyeleri verisi
const teamMembers = [
  {
    name: 'Burçin Döveç',
    role: 'Yönetim Kurulu Başkanı',
    image: '/team/ahmet.jpg',
  },
  {
    name: 'Ayşe Kaya',
    role: 'Genel Müdür',
    image: '/team/ayse.jpg',
  },
  {
    name: 'Mehmet Demir',
    role: 'Teknik Direktör',
    image: '/team/mehmet.jpg',
  },
  {
    name: 'Zeynep Yıldız',
    role: 'Proje Müdürü',
    image: '/team/zeynep.jpg',
  },
];

// Şirket değerleri
const values = [
  {
    title: 'Dayanıklılık',
    description: 'Sağlam temeller üzerine inşa edilmiş, uzun ömürlü ve kaliteli yapılar sunuyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Denge',
    description: 'Estetik ve fonksiyonellik arasında mükemmel dengeyi yakalıyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'Düzen',
    description: 'Planlı, sistematik ve organize çalışma prensibiyle hareket ediyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Deneyim',
    description: 'Uzun yılların getirdiği bilgi ve tecrübeyle, en iyi hizmeti sunuyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const [chairmanImage, setChairmanImage] = useState('')
  const [signatureImage, setSignatureImage] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [visionImage, setVisionImage] = useState('')
  const [missionImage, setMissionImage] = useState('')
  const [manifestoImage, setManifestoImage] = useState('')

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Hero görseli
        const heroRef = ref(storage, 'bizkimiz/DSC04004_11zon.webp')
        const heroUrl = await getDownloadURL(heroRef)
        setHeroImage(heroUrl)

        // Başkan resmi
        const imageRef = ref(storage, 'bd.webp')
        const url = await getDownloadURL(imageRef)
        setChairmanImage(url)

        // İmza resmi
        const signatureRef = ref(storage, 'bdsign.webp')
        const signatureUrl = await getDownloadURL(signatureRef)
        setSignatureImage(signatureUrl)

        // Vizyon görseli
        const visionRef = ref(storage, 'bizkimiz/r imaj_5 kopya_11zon.webp')
        const visionUrl = await getDownloadURL(visionRef)
        setVisionImage(visionUrl)

        // Misyon görseli
        const missionRef = ref(storage, 'bizkimiz/DJI_0266.00_00_01_23.Still001_11zon.webp')
        const missionUrl = await getDownloadURL(missionRef)
        setMissionImage(missionUrl)

        // Manifesto görseli
        const manifestoRef = ref(storage, 'bizkimiz/33.webp')
        const manifestoUrl = await getDownloadURL(manifestoRef)
        setManifestoImage(manifestoUrl)
      } catch (error) {
        console.error('Resimler yüklenemedi:', error)
      }
    }

    loadImages()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[50vh] sm:h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt="Biz Kimiz"
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Navbar'dan başlayan hilal şeklinde gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent"></div>
        
        {/* Merkez Başlık */}
        <div className="absolute bottom-32 sm:bottom-36 left-0 right-0 flex justify-center">
          <div className="text-center">
            <span className="block text-[10px] tracking-[0.3em] text-white/60 uppercase mb-2">
              Döveç Group
            </span>
            <div className="flex flex-row sm:flex-col items-center justify-center">
              <span className="text-xs font-light tracking-wider text-white/80 pr-2 sm:pr-0 sm:mb-1.5 border-r sm:border-r-0 border-white/20">
                Kurucu Başkanı
              </span>
              <span className="text-xs font-light tracking-wider text-white pl-2 sm:pl-0">
                Muharrem Döveç
              </span>
            </div>
          </div>
        </div>

        {/* Alt Başlık */}
        <div className="absolute bottom-12 sm:bottom-12 left-0 right-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase text-center">
            Biz Kimiz
          </h1>
        </div>
      </div>

      {/* Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Direktör</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                Yönetim Kurulu Başkanı
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600 space-y-8">
                <span className="block">"Değerli Müşterilerimiz ve İş Ortaklarımız,</span>

                <span className="block">Döveç İnşaat olarak, kurulduğumuz günden bu yana her projede kalite, güven ve müşteri memnuniyetini en üst düzeyde tutmayı amaçladık. Her adımımızda, modern ve sürdürülebilir yaşam alanları yaratmayı, topluma ve çevreye duyarlı projeler geliştirmeyi ilke edindik.</span>

                <span className="block">İnşaat sektöründe öncü olmanın getirdiği sorumluluğun bilincindeyiz. Bu sorumlulukla, yenilikçi ve estetik açıdan üstün yapılar inşa ederken, aynı zamanda fonksiyonelliği ve dayanıklılığı da ön planda tutuyoruz. Her projemizde, yüksek kaliteli malzemeler ve en son teknolojileri kullanarak, siz değerli müşterilerimize güvenli ve konforlu yaşam alanları sunmayı hedefliyoruz.</span>

                <span className="block">Döveç İnşaat ailesi olarak, sizlerin desteği ve güveni ile her geçen gün daha da büyüyerek, sadece Kuzey Kıbrıs'ta değil, uluslararası arenada da ses getiren projelere imza atıyoruz. Müşteri odaklı yaklaşımımızla, sizlere en iyi hizmeti sunmak için var gücümüzle çalışmaya devam edeceğiz.</span>

                <span className="block">Bize olan güveniniz ve desteğiniz için teşekkür eder, sizlerle birlikte daha nice başarılı projelere imza atmayı temenni ederim.</span>

                <span className="block">Saygılarımla,"</span>
              </p>
              {signatureImage && (
                <div className="relative w-48 h-24 mt-4">
                  <Image
                    src={signatureImage}
                    alt="Yönetim Kurulu Başkanı İmzası"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chairmanImage || '/consultant.jpg'}
                alt="Yönetim Kurulu Başkanı"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* İkinci Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-1">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chairmanImage || '/consultant.jpg'}
                alt="Yönetim Kurulu Başkan Yardımcısı"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="space-y-8 order-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Direktör</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                Yönetim Kurulu Başkan Yardımcısı
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600 space-y-8">
                <span className="block">"Değerli Paydaşlarımız,</span>

                <span className="block">Döveç İnşaat'ın yenilikçi vizyonu ve sürdürülebilir yaklaşımı ile sektörde öncü olmaya devam ediyoruz. Müşterilerimizin beklentilerini aşan projeler geliştirirken, çevreye ve topluma olan sorumluluğumuzu da unutmuyoruz.</span>

                <span className="block">Saygılarımla,"</span>
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Üçüncü Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Direktör</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
              Yönetim Kurulu Başkan Yardımcısı
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600 space-y-8">
                <span className="block">"Sevgili Müşterilerimiz,</span>

                <span className="block">Döveç İnşaat olarak, her projemizde mükemmelliği hedefliyor ve müşterilerimizin hayallerini gerçeğe dönüştürüyoruz. Operasyonel mükemmellik ve müşteri memnuniyeti odaklı yaklaşımımızla, sektörde fark yaratmaya devam ediyoruz.</span>

                <span className="block">Saygılarımla,"</span>
              </p>
             
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={chairmanImage || '/consultant.jpg'}
                alt="Genel Müdür"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Vizyon ve Misyon */}
      <div className="relative py-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Sol Taraf - Vizyon */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Vizyon</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  Geleceği İnşa Ediyoruz
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  Sürdürülebilir ve yenilikçi çözümlerle, yaşam kalitesini artıran projelere imza atarak, 
                  sektörde öncü bir rol üstlenmek ve global ölçekte tanınan bir marka olmak.
                </p>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                {visionImage && (
                  <Image
                    src={visionImage}
                    alt="Vizyon Görüntüsü"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Sağ Taraf - Misyon */}
            <div className="space-y-16 lg:mt-32">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group lg:order-first order-last">
                {missionImage && (
                  <Image
                    src={missionImage}
                    alt="Misyon Görüntüsü"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Misyon</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  Değer Katıyoruz
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  Müşterilerimize en yüksek kalitede hizmet sunarak, çevreye duyarlı ve sürdürülebilir 
                  projeler geliştirmek, çalışanlarımızın gelişimine katkıda bulunmak ve topluma değer katmak.
                </p>
              </div>
            </div>
          </div>

          {/* Dekoratif Çizgiler */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
            <div className="absolute inset-0 border border-[#061E4F]/10 rounded-full"></div>
            <div className="absolute inset-4 border border-[#061E4F]/10 rounded-full"></div>
            <div className="absolute inset-8 border border-[#061E4F]/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Dekoratif elementler */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        {/* Başlık */}
        <div className="relative text-center z-10 w-full px-4 mb-16 md:mb-24">
          <div className="flex items-center space-x-4 justify-center mb-4">
            <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
            <span className="text-sm md:text-base font-light tracking-[.5em] text-[#061E4F]/80 uppercase">Dovec</span>
            <div className="w-20 h-[1px] bg-gradient-to-l from-[#061E4F] to-transparent"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-[#061E4F]">
            Değerlerimiz
          </h2>
        </div>

        {/* Artı İşareti ve Değerler */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Dikey Çizgi */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#061E4F]/20 to-transparent">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#061E4F]/5 rounded-full blur-lg"></div>
            </div>
            
            {/* Yatay Çizgi */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#061E4F]/5 rounded-full blur-lg"></div>
            </div>

            {/* Değerler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {values.map((value, index) => (
                <div key={index} className="p-6 lg:p-8 lg:group hover:lg:bg-white/50 transition-all duration-500 rounded-3xl">
                  <div className="text-center transform lg:group-hover:scale-110 transition-all duration-500">
                    <div className="text-[#061E4F] mb-3 md:mb-4 flex justify-center">{value.icon}</div>
                    <h3 className="text-lg md:text-xl font-light tracking-wider text-[#061E4F] mb-2 md:mb-3">{value.title}</h3>
                    <p className="text-gray-600 font-light text-sm md:text-base lg:text-lg">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Merkez Kesişim Efekti */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 h-24 md:h-32">
              <div className="absolute inset-0 bg-[#061E4F]/5 rounded-full blur-2xl"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Dekoratif Çemberler */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute inset-0 border border-[#061E4F]/5 rounded-full animate-pulse"></div>
          <div className="absolute inset-8 border border-[#061E4F]/5 rounded-full animate-pulse delay-150"></div>
          <div className="absolute inset-16 border border-[#061E4F]/5 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Manifesto */}
      <div className="relative min-h-screen bg-[#061E4F] text-white overflow-hidden">
        {/* Arka plan desenleri */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#061E4F]"></div>
          
          {/* Geometrik desenler */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
            </div>
          </div>

          {/* Gradient katmanları */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2A6B] via-[#061E4F] to-[#03112E]"></div>
          
          {/* Işık efektleri */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-slow-spin">
              <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* İnce çizgiler */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full rotate-12 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transform"
                  style={{
                    top: `${i * 20}%`,
                    left: '-100%',
                    right: '-100%',
                    opacity: 0.1 + (i * 0.05)
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Dekoratif daireler */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/10 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Ana içerik */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-white to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-white/80">Dovec</span>
                </div>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-[.2em] uppercase leading-tight">
                  Manifesto
                </h2>
              </div>

              <div className="prose prose-lg prose-invert">
                <p className="text-xl font-light leading-relaxed">
                  Biz, DOVEC olarak, inşaat sektöründe sadece yapılar değil, yaşamlar inşa ediyoruz. Her projemizde mükemmelliği arıyor, her detayda zarafeti yakalıyoruz.
                </p>
                <p className="text-xl font-light leading-relaxed">
                  İnanıyoruz ki, başarı sadece ne yaptığınızda değil, nasıl yaptığınızda gizlidir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <h3 className="text-xl font-light">Yenilikçi düşünüyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Sektörde öncü ve yenilikçi çözümler üretiyoruz</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <h3 className="text-xl font-light">Sürdürülebilir üretiyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Çevreye duyarlı ve sürdürülebilir projeler geliştiriyoruz</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <h3 className="text-xl font-light">Kaliteden ödün vermiyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">En yüksek kalite standartlarını benimsiyoruz</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <h3 className="text-xl font-light">Çevreye saygı duyuyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Doğal kaynakları koruyarak gelecek nesillere aktarıyoruz</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <h3 className="text-xl font-light">Güvenle inşa ediyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">En yüksek güvenlik standartlarını uyguluyoruz</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <h3 className="text-xl font-light">Geleceği planlıyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Uzun vadeli ve sürdürülebilir çözümler sunuyoruz</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                {manifestoImage && (
                  <Image
                    src={manifestoImage}
                    alt="DOVEC Manifesto"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F] via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 