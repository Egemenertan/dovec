import Image from 'next/image';
import Link from 'next/link';

// Örnek blog yazısı verisi
const blogPost = {
  id: 1,
  title: 'Sürdürülebilir Enerji Çözümleri',
  content: `
    Günümüzde sürdürülebilir enerji çözümleri, çevresel etkileri minimize ederken enerji verimliliğini maksimize etmeyi hedefliyor. 
    
    Yenilenebilir enerji kaynaklarının kullanımı, fosil yakıtlara olan bağımlılığı azaltırken, çevre dostu bir geleceğin temellerini atıyor. Güneş enerjisi, rüzgar enerjisi ve hidroelektrik gibi yenilenebilir kaynaklar, enerji üretiminde önemli bir rol oynuyor.

    Enerji verimliliği çözümleri, binaların enerji tüketimini optimize ederken, işletme maliyetlerini de düşürüyor. Akıllı bina sistemleri, enerji yönetimini otomatikleştirerek maksimum verimlilik sağlıyor.

    Sürdürülebilir enerji projelerinin finansmanı ve teşvikler, sektörün gelişiminde önemli bir rol oynuyor. Devlet destekleri ve özel sektör yatırımları, yenilenebilir enerji projelerinin hayata geçirilmesini kolaylaştırıyor.
  `,
  image: '/blog/sustainable-energy.jpg',
  date: '15 Mart 2024',
  category: 'Enerji',
  readTime: '5 dk',
  author: {
    name: 'Ahmet Yılmaz',
    role: 'Enerji Uzmanı',
    image: '/team/ahmet.jpg'
  }
};

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[50vh] lg:h-[60vh]">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-white/80">
              <span>{blogPost.date}</span>
              <span>•</span>
              <span>{blogPost.readTime}</span>
              <span>•</span>
              <span>{blogPost.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Yazar Bilgisi */}
        <div className="flex items-center space-x-4 mb-8 p-6 bg-white rounded-xl shadow-lg">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={blogPost.author.image}
              alt={blogPost.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{blogPost.author.name}</h3>
            <p className="text-gray-600">{blogPost.author.role}</p>
          </div>
        </div>

        {/* Blog İçeriği */}
        <article className="prose prose-lg max-w-none">
          {blogPost.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Geri Dön Butonu */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-[#061E4F] hover:text-[#061E4F]/80 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Tüm Yazılar</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 