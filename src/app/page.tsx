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
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-[.2em] text-[#061E4F] mb-8 uppercase">Rakamlarla Dovec</h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <p className="text-xl font-light tracking-wider text-gray-600 mt-6">Devam eden inşaat işleri 8 milyar euro.</p>
          </div>
          
          <div className="grid grid-cols-12 gap-4">
            {/* Ülke Sayısı */}
            <div className="col-span-12 md:col-span-3 bg-white p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-7xl font-extralight text-[#061E4F] mb-4 group-hover:text-white tracking-tight transition-colors">53</div>
              <div className="text-[#061E4F] text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Ülkeden Çözüm Ortakları</div>
            </div>
            
            {/* Çalışan Sayısı */}
            <div className="col-span-12 md:col-span-6 bg-white p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-7xl font-extralight text-[#061E4F] mb-4 group-hover:text-white tracking-tight transition-colors">550+</div>
              <div className="text-[#061E4F] text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Çalışan Sayısı</div>
            </div>
            
            {/* Çalışan Çeşitliliği */}
            <div className="col-span-12 md:col-span-3 bg-white p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-7xl font-extralight text-[#061E4F] mb-4 group-hover:text-white tracking-tight transition-colors">64</div>
              <div className="text-[#061E4F] text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">Milletten Çalışan Çeşitliliği</div>
            </div>
            
            {/* ENR Sıralaması */}
            <div className="col-span-12 md:col-span-6 bg-white p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500 flex justify-between items-center">
              <div>
                <div className="text-7xl font-extralight text-[#061E4F] mb-4 group-hover:text-white tracking-tight transition-colors">#53</div>
                <div className="text-[#061E4F] text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">ENR Dünyanın En Büyük<br />250 Müteahhiti</div>
              </div>
              
            </div>
            
            {/* Ciro */}
            <div className="col-span-12 md:col-span-6 bg-white p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="text-7xl font-extralight text-[#061E4F] mb-4 group-hover:text-white tracking-tight transition-colors">3 Milyar €</div>
              <div className="text-[#061E4F] text-xl font-light tracking-wider group-hover:text-white/90 transition-colors">İştirakler ve bağlı ortaklıklar dahildir.</div>
            </div>
            
            {/* Hastane İstatistikleri */}
            <div className="col-span-12 bg-white p-10 rounded-3xl shadow-lg group hover:bg-[#061E4F] transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-xl font-light tracking-wider text-[#061E4F] mb-2 group-hover:text-white/90 transition-colors">Projelerde</div>
                  <div className="text-4xl font-extralight text-[#061E4F] group-hover:text-white tracking-tight transition-colors">3.700.000 m² Alanda</div>
                </div>
                <div>
                  <div className="text-xl font-light tracking-wider text-[#061E4F] mb-2 group-hover:text-white/90 transition-colors">Yaşam Alanı</div>
                  <div className="text-4xl font-extralight text-[#061E4F] group-hover:text-white tracking-tight transition-colors">5000+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yatırım Fırsatları Bölümü */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol Taraf - Başlık ve Metin */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-7xl lg:text-8xl font-extralight leading-tight tracking-[.2em] text-[#061E4F] animate-fade-in uppercase">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src="/interior-1.jpg"
                    alt="İç Mekan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
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
            <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
              <Image
                src="/exterior-1.jpg"
                alt="Dış Mekan"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="text-base font-medium text-gray-900">• Kuzey Kıbrıs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projeler Bölümü */}
      <ProjectSlider />

      {/* Faaliyet Alanları */}
      <div className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-[.2em] text-[#061E4F] mb-8 uppercase">
              Faaliyet Alanları
            </h2>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* İnşaat */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/insaat.png"
                  alt="İnşaat"
                  width={120}
                  height={120}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">İnşaat</h3>
              </div>
            </div>
            
            {/* Enerji */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/enerji.png"
                  alt="Enerji"
                  width={120}
                  height={120}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Enerji</h3>
              </div>
            </div>
            
            {/* Sağlık */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/saglik.png"
                  alt="Sağlık"
                  width={120}
                  height={120}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Sağlık</h3>
              </div>
            </div>
            
            {/* Turizm */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/turizm.png"
                  alt="Turizm"
                  width={120}
                  height={120}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Turizm</h3>
              </div>
            </div>

            {/* Teknoloji */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/teknoloji.png"
                  alt="Teknoloji"
                  width={120}
                  height={120}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Teknoloji</h3>
              </div>
            </div>
            
            {/* Madencilik */}
            <div className="group">
              <div className="aspect-square bg-white/50 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center transform transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <Image
                  src="/logos/madencilik.png"
                  alt="Madencilik"
                  width={120}
                  height={120}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-light tracking-wider text-gray-800 group-hover:text-gray-900 transition-colors">Madencilik</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ödüller Bölümü */}
      {/* ... existing code ... */}

      {/* Modern Elegance Footer */}
      <footer className="bg-[#061E4F] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Logo ve Sosyal Medya */}
            <div className="md:col-span-4">
              <div className="relative w-48 h-16 mb-8">
                <Image
                  src="/dovec.webp"
                  alt="DOVEC Logo"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
              <p className="text-xl font-light tracking-wider mb-8 text-gray-300">
                Modern yaşam alanları tasarlıyor, geleceği inşa ediyoruz.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-extralight tracking-wider mb-6 uppercase">Hızlı Linkler</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/projeler" className="text-gray-300 hover:text-white transition-colors">
                    Projeler
                  </Link>
                </li>
                <li>
                  <Link href="/yatirim" className="text-gray-300 hover:text-white transition-colors">
                    Yatırım
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="text-gray-300 hover:text-white transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div className="md:col-span-3">
              <h3 className="text-2xl font-extralight tracking-wider mb-6 uppercase">İletişim</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">
                    Kuzey Kıbrıs Türk Cumhuriyeti
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">info@dovec.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+90 392 XXX XX XX</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3">
              <h3 className="text-2xl font-extralight tracking-wider mb-6 uppercase">Bültenimize Katılın</h3>
              <p className="text-gray-300 mb-4">
                En son gelişmelerden ve fırsatlardan haberdar olun.
              </p>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="bg-[#0A2A6B] text-white placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-[#061E4F] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="border-t border-gray-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 DOVEC. Tüm hakları saklıdır.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/gizlilik" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Gizlilik Politikası
                </Link>
                <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Kullanım Koşulları
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 