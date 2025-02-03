import Image from 'next/image';

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
    title: 'Yenilikçilik',
    description: 'Sürekli gelişim ve inovasyona odaklanarak, sektörde öncü çözümler üretiyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Sürdürülebilirlik',
    description: 'Çevresel ve sosyal sorumluluklarımızı göz önünde bulundurarak, sürdürülebilir çözümler sunuyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: 'Kalite',
    description: 'En yüksek kalite standartlarını benimseyerek, müşterilerimize mükemmel hizmet sunuyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Güven',
    description: 'Şeffaf ve dürüst iş ilişkileri kurarak, paydaşlarımızın güvenini kazanıyoruz.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <Image
          src="/about-hero.jpg"
          alt="Biz Kimiz"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            Biz Kimiz
          </h1>
        </div>
      </div>

      {/* Direktör Mesajı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/consultant.jpg"
                alt="Yönetim Kurulu Başkanı"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Başkan</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                Yönetim Kurulu Başkanı
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600">
                "DOVEC olarak, inşaat sektöründe sadece yapılar değil, yaşamlar inşa ediyoruz. Her projemizde mükemmelliği arıyor, her detayda zarafeti yakalıyoruz."
              </p>
            </div>
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
                <Image
                  src="/interior-1.jpg"
                  alt="Vizyon Görüntüsü"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Sağ Taraf - Misyon */}
            <div className="space-y-16 lg:mt-32">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group lg:order-first order-last">
                <Image
                  src="/exterior-1.jpg"
                  alt="Misyon Görüntüsü"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
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
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Dekoratif elementler */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        {/* Başlık */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="flex items-center space-x-4 justify-center mb-4">
            <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
            <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Dovec</span>
            <div className="w-20 h-[1px] bg-gradient-to-l from-[#061E4F] to-transparent"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-[#061E4F]">
            Değerlerimiz
          </h2>
        </div>

        {/* Artı İşareti ve Değerler */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Dikey Çizgi */}
          <div className="absolute w-[1px] h-[70vh] bg-gradient-to-b from-transparent via-[#061E4F]/20 to-transparent">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#061E4F]/5 rounded-full blur-lg"></div>
          </div>
          
          {/* Yatay Çizgi */}
          <div className="absolute h-[1px] w-[70vw] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#061E4F]/5 rounded-full blur-lg"></div>
          </div>

          {/* Değerler */}
          <div className="relative w-[70vw] h-[70vh]">
            {/* Sol Üst */}
            <div className="absolute top-0 left-0 w-[calc(50%-2rem)] h-[calc(50%-2rem)] flex items-center justify-center lg:group hover:lg:bg-white/50 transition-all duration-500 rounded-3xl">
              <div className="text-center p-4 lg:p-8 transform lg:group-hover:scale-110 transition-all duration-500">
                <div className="text-[#061E4F] mb-4">{values[0].icon}</div>
                <h3 className="text-2xl font-light tracking-wider text-[#061E4F] mb-3">{values[0].title}</h3>
                <p className="text-gray-600 font-light text-sm lg:text-base">{values[0].description}</p>
              </div>
            </div>

            {/* Sağ Üst */}
            <div className="absolute top-0 right-0 w-[calc(50%-2rem)] h-[calc(50%-2rem)] flex items-center justify-center lg:group hover:lg:bg-white/50 transition-all duration-500 rounded-3xl">
              <div className="text-center p-4 lg:p-8 transform lg:group-hover:scale-110 transition-all duration-500">
                <div className="text-[#061E4F] mb-4">{values[1].icon}</div>
                <h3 className="text-2xl font-light tracking-wider text-[#061E4F] mb-3">{values[1].title}</h3>
                <p className="text-gray-600 font-light text-sm lg:text-base">{values[1].description}</p>
              </div>
            </div>

            {/* Sol Alt */}
            <div className="absolute bottom-0 left-0 w-[calc(50%-2rem)] h-[calc(50%-2rem)] flex items-center justify-center lg:group hover:lg:bg-white/50 transition-all duration-500 rounded-3xl">
              <div className="text-center p-4 lg:p-8 transform lg:group-hover:scale-110 transition-all duration-500">
                <div className="text-[#061E4F] mb-4">{values[2].icon}</div>
                <h3 className="text-2xl font-light tracking-wider text-[#061E4F] mb-3">{values[2].title}</h3>
                <p className="text-gray-600 font-light text-sm lg:text-base">{values[2].description}</p>
              </div>
            </div>

            {/* Sağ Alt */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-2rem)] h-[calc(50%-2rem)] flex items-center justify-center lg:group hover:lg:bg-white/50 transition-all duration-500 rounded-3xl">
              <div className="text-center p-4 lg:p-8 transform lg:group-hover:scale-110 transition-all duration-500">
                <div className="text-[#061E4F] mb-4">{values[3].icon}</div>
                <h3 className="text-2xl font-light tracking-wider text-[#061E4F] mb-3">{values[3].title}</h3>
                <p className="text-gray-600 font-light text-sm lg:text-base">{values[3].description}</p>
              </div>
            </div>

            {/* Merkez Kesişim Efekti */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
              <div className="absolute inset-0 bg-[#061E4F]/5 rounded-full blur-2xl"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Dekoratif Çemberler */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] pointer-events-none">
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
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:w-4 transition-all duration-300"></div>
                      <h3 className="text-xl font-light">Yenilikçi düşünüyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Sektörde öncü ve yenilikçi çözümler üretiyoruz</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:w-4 transition-all duration-300"></div>
                      <h3 className="text-xl font-light">Sürdürülebilir üretiyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Çevreye duyarlı ve sürdürülebilir projeler geliştiriyoruz</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:w-4 transition-all duration-300"></div>
                      <h3 className="text-xl font-light">Kaliteden ödün vermiyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">En yüksek kalite standartlarını benimsiyoruz</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:w-4 transition-all duration-300"></div>
                      <h3 className="text-xl font-light">Çevreye saygı duyuyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Doğal kaynakları koruyarak gelecek nesillere aktarıyoruz</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:w-4 transition-all duration-300"></div>
                      <h3 className="text-xl font-light">Güvenle inşa ediyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">En yüksek güvenlik standartlarını uyguluyoruz</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:w-4 transition-all duration-300"></div>
                      <h3 className="text-xl font-light">Geleceği planlıyoruz</h3>
                    </div>
                    <p className="text-white/70 pl-6">Uzun vadeli ve sürdürülebilir çözümler sunuyoruz</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/exterior-1.jpg"
                  alt="DOVEC Manifesto"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F] via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Scroll İndikatörü */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm font-light tracking-wider mb-2">Aşağı Kaydır</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 