import Image from 'next/image';
import Link from 'next/link';

// Örnek haber detayları
const haberDetaylari = {
  1: {
    baslik: "DOVEC İnşaat'tan Yeni Yatırım Hamlesi",
    tarih: "15 Mart 2024",
    kategori: "Yatırım",
    resim: "/tatlisu_35 copy 2-1.webp",
    icerik: `
      <p>DOVEC İnşaat, Kuzey Kıbrıs'ın en prestijli bölgelerinden birinde yeni bir yaşam kompleksi projesini hayata geçiriyor. Modern mimari anlayışı ve çevre dostu yaklaşımıyla öne çıkan proje, bölgenin çehresini değiştirecek.</p>
      
      <p>Projede yer alacak özellikler:</p>
      <ul>
        <li>Akıllı ev sistemleri</li>
        <li>Geniş peyzaj alanları</li>
        <li>Sosyal tesisler</li>
        <li>Spor kompleksleri</li>
        <li>Çocuk oyun alanları</li>
      </ul>

      <p>Projenin 2025 yılının ilk çeyreğinde tamamlanması planlanıyor. DOVEC İnşaat Yönetim Kurulu Başkanı, projenin sadece bir konut projesi değil, aynı zamanda bir yaşam projesi olduğunu vurguladı.</p>

      <p>Sürdürülebilir yapılaşma ilkelerini benimseyen projede, güneş enerjisi sistemleri ve yağmur suyu toplama üniteleri gibi çevre dostu çözümler de yer alacak.</p>
    `
  }
};

export default function HaberDetay({ params }: { params: { id: string } }) {
  const haber = haberDetaylari[Number(params.id) as keyof typeof haberDetaylari];

  if (!haber) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-zinc-800 mb-4">Haber bulunamadı</h1>
          <Link 
            href="/yatirim"
            className="inline-flex items-center text-zinc-600 hover:text-zinc-800 transition-colors"
          >
            ← Haberlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] bg-zinc-900">
        <Image
          src={haber.resim}
          alt={haber.baslik}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-3 py-1 text-sm tracking-wider text-white bg-black/30 backdrop-blur-sm rounded-full">
                  {haber.kategori}
                </span>
                <span className="text-white/80 font-light">
                  {haber.tarih}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wider text-white">
                {haber.baslik}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/yatirim"
            className="inline-flex items-center text-zinc-500 hover:text-zinc-700 transition-colors mb-12 group"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            <span className="ml-2">Haberlere Dön</span>
          </Link>

          <div 
            className="prose prose-zinc max-w-none prose-p:font-light prose-p:text-zinc-600 prose-li:text-zinc-600 prose-headings:font-light"
            dangerouslySetInnerHTML={{ __html: haber.icerik }}
          />
        </div>
      </div>
    </main>
  );
} 