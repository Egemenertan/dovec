import Image from 'next/image';
import Link from 'next/link';

const haberler = [
  {
    id: 1,
    baslik: "DOVEC İnşaat'tan Yeni Yatırım Hamlesi",
    tarih: "15 Mart 2024",
    kategori: "Yatırım",
    ozet: "DOVEC İnşaat, Kuzey Kıbrıs'ta yeni bir yaşam kompleksi projesini hayata geçiriyor.",
    resim: "/tatlisu_35 copy 2-1.webp"
  },
  {
    id: 2,
    baslik: "Sürdürülebilir Yapılaşma İlkelerimiz",
    tarih: "10 Mart 2024",
    kategori: "Kurumsal",
    ozet: "Çevre dostu yapılaşma ve sürdürülebilir mimari ilkelerimizle geleceğe yatırım yapıyoruz.",
    resim: "/tatlisu_23 copy_11zon.webp"
  },
  {
    id: 3,
    baslik: "2024 İnşaat Sektörü Değerlendirmesi",
    tarih: "5 Mart 2024",
    kategori: "Sektör",
    ozet: "İnşaat sektöründeki son gelişmeler ve DOVEC İnşaat'ın yeni dönem stratejileri.",
    resim: "/Natulux Out View 1 (1)_11zon.jpg"
  },
  {
    id: 4,
    baslik: "Yeni Projemiz: Palm Residence",
    tarih: "1 Mart 2024",
    kategori: "Projeler",
    ozet: "Modern mimarinin en güzel örneklerinden biri olacak Palm Residence projemizin detayları.",
    resim: "/tatlisu_35 copy 2-1.webp"
  },
  {
    id: 5,
    baslik: "Kıbrıs'ta Gayrimenkul Yatırımı",
    tarih: "25 Şubat 2024",
    kategori: "Yatırım",
    ozet: "Kuzey Kıbrıs'ta gayrimenkul yatırımının avantajları ve fırsatları.",
    resim: "/tatlisu_23 copy_11zon.webp"
  }
];

export default function Haberler() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-zinc-900">
        <Image
          src="/tatlisu_35 copy 2-1.webp"
          alt="Haberler"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-white mb-6">
              Haberler
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide text-white/90 max-w-2xl mx-auto px-4">
              DOVEC İnşaat'tan en güncel haberler ve gelişmeler
            </p>
          </div>
        </div>
      </div>

      {/* Haberler Listesi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {haberler.map((haber) => (
            <article 
              key={haber.id}
              className="group bg-white rounded-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <Link href={`/yatirim/${haber.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={haber.resim}
                    alt={haber.baslik}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs tracking-wider text-white bg-black/30 backdrop-blur-sm rounded-full">
                      {haber.kategori}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-light tracking-wider text-zinc-400 mb-3">
                    {haber.tarih}
                  </div>
                  <h3 className="text-xl font-light tracking-wide text-zinc-800 mb-3 group-hover:text-zinc-600 transition-colors">
                    {haber.baslik}
                  </h3>
                  <p className="text-zinc-500 font-light leading-relaxed mb-4">
                    {haber.ozet}
                  </p>
                  <div className="inline-flex items-center text-sm text-zinc-600 font-light group/link">
                    <span className="relative">
                      Devamını Oku
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-400 group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                    <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 