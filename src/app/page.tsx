import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { ProjectSlider } from '@/components/ProjectSlider'

// Swiper stilleri
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* İstatistikler Bölümü */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-[#061E4F] mb-4 sm:mb-6 md:mb-8 uppercase">Rakamlarla Dovec</h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <p className="text-lg sm:text-xl font-light tracking-wider text-gray-600 mt-4 sm:mt-6">Devam eden inşaat işleri 8 milyar euro.</p>
          </div>
          
          <div className="grid grid-cols-12 gap-4">
            {/* Ülke Sayısı */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">53</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Ülkeden Çözüm Ortakları</div>
            </div>
            
            {/* Çalışan Sayısı */}
            <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">550+</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Çalışan Sayısı</div>
            </div>
            
            {/* Çalışan Çeşitliliği */}
            <div className="col-span-12 sm:col-span-3 md:col-span-3 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">64</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Milletten Çalışan Çeşitliliği</div>
            </div>
            
            {/* ENR Sıralaması */}
            <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500 flex justify-between items-center">
              <div>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">#53</div>
                <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">ENR Dünyanın En Büyük<br />250 Müteahhiti</div>
              </div>
              
            </div>
            
            {/* Ciro */}
            <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#061E4F] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white tracking-tight transition-colors">3 Milyar €</div>
              <div className="text-[#061E4F] text-lg sm:text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">İştirakler ve bağlı ortaklıklar dahildir.</div>
            </div>
            
            {/* Hastane İstatistikleri */}
            <div className="col-span-12 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-lg sm:text-xl font-light tracking-wider text-[#061E4F] mb-2 group-hover:text-white/90 transition-colors">Projelerde</div>
                  <div className="text-3xl sm:text-4xl font-extralight text-[#061E4F] group-hover:text-white tracking-tight transition-colors">3.700.000 m² Alanda</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-light tracking-wider text-[#061E4F] mb-2 group-hover:text-white/90 transition-colors">Yaşam Alanı</div>
                  <div className="text-3xl sm:text-4xl font-extralight text-[#061E4F] group-hover:text-white tracking-tight transition-colors">5000+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yatırım Fırsatları Bölümü */}
      <div className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Sol Taraf - Başlık ve Metin */}
            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-tight tracking-[.2em] text-[#061E4F] animate-fade-in uppercase">
                  <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Kuzey Kıbrıs yalnızca 
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                   bir yatırım alanı
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 bg-clip-text text-transparent">
                    değildir
                  </span>
                 
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src="/interior-1.jpg"
                    alt="İç Mekan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src="/consultant.jpg"
                    alt="Danışman"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Görsel */}
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
              <Image
                src="/exterior-1.jpg"
                alt="Dış Mekan"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
                <span className="text-sm sm:text-base font-medium text-gray-900">• Kuzey Kıbrıs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projeler Bölümü */}
      <ProjectSlider />

      {/* Faaliyet Alanları */}
      <div className="py-16 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-[#061E4F] mb-4 sm:mb-6 md:mb-8 uppercase">
              Faaliyet Alanları
            </h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* İnşaat */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/insaat.png"
                  alt="İnşaat"
                  width={80}
                  height={80}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">İnşaat</h3>
              </div>
            </div>
            
            {/* Enerji */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/enerji.png"
                  alt="Enerji"
                  width={80}
                  height={80}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Enerji</h3>
              </div>
            </div>
            
            {/* Sağlık */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/saglik.png"
                  alt="Sağlık"
                  width={80}
                  height={80}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Sağlık</h3>
              </div>
            </div>
            
            {/* Turizm */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/turizm.png"
                  alt="Turizm"
                  width={80}
                  height={80}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Turizm</h3>
              </div>
            </div>

            {/* Teknoloji */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/teknoloji.png"
                  alt="Teknoloji"
                  width={80}
                  height={80}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Teknoloji</h3>
              </div>
            </div>
            
            {/* Madencilik */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/madencilik.png"
                  alt="Madencilik"
                  width={80}
                  height={80}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Madencilik</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegance Bölümü */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol Taraf - Görsel */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/interior-1.jpg"
                  alt="Elegant İç Mekan"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#061E4F]/10 rounded-full blur-3xl"></div>
            </div>

            {/* Sağ Taraf - İçerik */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] uppercase">
                  Zarafet ve
                  <br />
                  Mükemmellik
                </h2>
                <div className="w-32 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                <p className="text-lg sm:text-xl font-light leading-relaxed text-gray-600 mt-6">
                  Her detayda mükemmelliği arayan yaklaşımımızla, yaşam alanlarınıza değer katıyoruz. Modern mimari ve zarif tasarım anlayışımızla, sizin için en iyisini sunuyoruz.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-extralight text-[#061E4F]">15+</div>
                  <div className="text-gray-600 font-light">Yıllık Deneyim</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-extralight text-[#061E4F]">100%</div>
                  <div className="text-gray-600 font-light">Müşteri Memnuniyeti</div>
                </div>
              </div>

              <Link href="/projeler" className="inline-flex items-center px-8 py-3 border border-[#061E4F] text-[#061E4F] rounded-full hover:bg-[#061E4F] hover:text-white transition-all duration-300 group">
                <span className="text-lg font-light">Projelerimizi Keşfedin</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ödüller Bölümü */}
      {/* ... existing code ... */}
    </div>
  )
} 