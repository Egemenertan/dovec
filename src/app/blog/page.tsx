import Image from 'next/image';
import Link from 'next/link';

// Blog yazıları için örnek veri
const blogPosts = [
  {
    id: 1,
    title: 'Sürdürülebilir Enerji Çözümleri',
    excerpt: 'Günümüzde sürdürülebilir enerji çözümleri, çevresel etkileri minimize ederken enerji verimliliğini maksimize etmeyi hedefliyor.',
    image: '/blog/sustainable-energy.jpg',
    date: '15 Mart 2024',
    category: 'Enerji',
    readTime: '5 dk'
  },
  {
    id: 2,
    title: 'Modern Şehir Planlaması',
    excerpt: 'Akıllı şehir konseptleri ve modern şehir planlaması yaklaşımları, yaşam kalitesini artırırken sürdürülebilirliği de gözetiyor.',
    image: '/blog/city-planning.jpg',
    date: '10 Mart 2024',
    category: 'Şehircilik',
    readTime: '4 dk'
  },
  {
    id: 3,
    title: 'Yenilikçi Yapı Teknolojileri',
    excerpt: 'İnşaat sektöründeki son teknolojik gelişmeler, yapıların dayanıklılığını ve enerji verimliliğini artırıyor.',
    image: '/blog/construction-tech.jpg',
    date: '5 Mart 2024',
    category: 'Teknoloji',
    readTime: '6 dk'
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <Image
          src="/blog-hero.jpg"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-white mb-6">
              Blog
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide text-white/90 max-w-2xl mx-auto px-4">
              DOVEC İnşaat'tan en güncel blog yazıları
            </p>
          </div>
        </div>
      </div>

      {/* Blog Yazıları Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#061E4F]/5 text-[#061E4F] text-sm rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readTime}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-[#061E4F] font-medium hover:text-[#061E4F]/80 transition-colors">
                      Devamını Oku →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 