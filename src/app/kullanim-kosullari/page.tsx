'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Bölümü */}
      <div className="relative pt-32 pb-16 bg-gradient-to-b from-[#061E4F]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-light tracking-[.15em] text-[#061E4F]">
              Kullanım Koşulları
            </h1>
            <p className="mt-4 text-lg text-gray-600 tracking-wide font-light">
              Web sitemizi kullanırken uymanız gereken kurallar ve koşullar
            </p>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">1. Kabul Edilen Koşullar</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bu web sitesini kullanarak, bu kullanım koşullarını kabul etmiş olursunuz. Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayın.
            </p>
            <p className="text-gray-600 leading-relaxed">
              DÖVEÇ GROUP, bu koşulları herhangi bir zamanda değiştirme hakkını saklı tutar. Değişiklikler web sitesinde yayınlandığı anda yürürlüğe girer.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">2. Hizmet Kullanımı</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Web sitemizi kullanırken:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Tüm yerel, ulusal ve uluslararası yasalara uymalısınız</li>
              <li>Başkalarının haklarını ihlal etmemelisiniz</li>
              <li>Sistemlerimize zarar verecek faaliyetlerde bulunmamalısınız</li>
              <li>Hizmetlerimizi kötüye kullanmamalısınız</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">3. Fikri Mülkiyet Hakları</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Web sitemizdeki tüm içerik (metin, görseller, logolar, tasarımlar vb.) DÖVEÇ GROUP'un fikri mülkiyetidir ve telif hakları ile korunmaktadır.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>İçeriği kopyalayamaz veya çoğaltamazsınız</li>
              <li>İçeriği ticari amaçla kullanamazsınız</li>
              <li>İçeriği değiştiremez veya uyarlayamazsınız</li>
              <li>İçeriği yazılı izin olmadan başka yerde kullanamazsınız</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">4. Sorumluluk Reddi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Web sitemizdeki bilgiler "olduğu gibi" sunulmaktadır ve:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Bilgilerin doğruluğu için garanti verilmez</li>
              <li>Web sitesinin kesintisiz çalışacağı garanti edilmez</li>
              <li>Virüs veya zararlı içerik bulunmadığı garanti edilmez</li>
              <li>Kullanıcıların kararlarından şirketimiz sorumlu tutulamaz</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">5. Üçüncü Taraf Bağlantıları</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Bu sitelerin içeriğinden sorumlu değiliz</li>
              <li>Bu sitelerin güvenliğini garanti etmiyoruz</li>
              <li>Bağlantılar tavsiye niteliği taşımaz</li>
              <li>Üçüncü taraf siteler kendi kullanım koşullarına tabidir</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">6. Hesap Güvenliği</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Eğer bir hesap oluşturursanız:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Hesap bilgilerinizi güvende tutmalısınız</li>
              <li>Hesabınızın tüm aktivitelerinden siz sorumlusunuz</li>
              <li>Şüpheli aktivite durumunda bizi bilgilendirmelisiniz</li>
              <li>Hesabınızı başkalarıyla paylaşmamalısınız</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">7. Fesih</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DÖVEÇ GROUP aşağıdaki durumlarda hizmetleri sonlandırma hakkını saklı tutar:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Kullanım koşullarının ihlali durumunda</li>
              <li>Yasadışı faaliyetler tespit edildiğinde</li>
              <li>Sistemin güvenliğini tehdit eden durumlar oluştuğunda</li>
              <li>Teknik veya operasyonel nedenlerle gerekli görüldüğünde</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">8. İletişim</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bu kullanım koşulları hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-2">E-posta: info@dovec.com</p>
              <p className="text-gray-600 mb-2">Telefon: +90 548 837 0015</p>
              <p className="text-gray-600">Adres: Kuzey Kıbrıs Türk Cumhuriyeti</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">9. Güncellemeler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bu kullanım koşullarını zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda sizi bilgilendireceğiz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Son güncelleme tarihi: {new Date().toLocaleDateString('tr-TR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 