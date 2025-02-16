'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Bölümü */}
      <div className="relative pt-32 pb-16 bg-gradient-to-b from-[#061E4F]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-light tracking-[.15em] text-[#061E4F]">
              Gizlilik Politikası
            </h1>
            <p className="mt-4 text-lg text-gray-600 tracking-wide font-light">
              Kişisel verilerinizin güvenliği bizim için önemlidir
            </p>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">1. Genel Bakış</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bu Gizlilik Politikası, DÖVEÇ GROUP ("biz", "bizim" veya "Şirket") tarafından yönetilen web sitesini kullanımınız sırasında toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklar.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Bu politika, hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu, ve sizin gizlilik haklarınızı açıklar.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">2. Toplanan Bilgiler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aşağıdaki türde kişisel bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>İsim, e-posta adresi, telefon numarası gibi iletişim bilgileri</li>
              <li>IP adresi, tarayıcı türü, cihaz bilgileri gibi teknik veriler</li>
              <li>Web sitemizi nasıl kullandığınıza dair kullanım verileri</li>
              <li>Pazarlama tercihleriniz ve iletişim seçenekleriniz</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">3. Bilgilerin Kullanımı</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Topladığımız bilgileri şu amaçlarla kullanırız:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Size hizmetlerimiz hakkında bilgi sağlamak</li>
              <li>Sorularınızı ve taleplerinizi yanıtlamak</li>
              <li>Web sitemizi ve hizmetlerimizi geliştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              <li>Sizinle iletişime geçmek ve güncellemeler sağlamak</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">4. Bilgilerin Korunması</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemler alıyoruz. Bu önlemler şunları içerir:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Güvenli SSL şifreleme kullanımı</li>
              <li>Düzenli güvenlik değerlendirmeleri</li>
              <li>Çalışanlar için veri koruma eğitimi</li>
              <li>Fiziksel ve elektronik güvenlik önlemleri</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">5. Çerezler ve İzleme</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Web sitemiz, deneyiminizi geliştirmek için çerezler kullanır. Çerezler şu amaçlarla kullanılır:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Web sitesi işlevselliğini sağlamak</li>
              <li>Kullanıcı tercihlerini hatırlamak</li>
              <li>Site trafiğini analiz etmek</li>
              <li>Güvenliği sağlamak</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">6. Haklarınız</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerinizin düzeltilmesini isteme</li>
              <li>Verilerinizin silinmesini talep etme</li>
              <li>Veri işlemeye itiraz etme</li>
              <li>Veri taşınabilirliği talep etme</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">7. İletişim</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-2">E-posta: info@dovec.com</p>
              <p className="text-gray-600 mb-2">Telefon: +90 548 837 0015</p>
              <p className="text-gray-600">Adres: Kuzey Kıbrıs Türk Cumhuriyeti</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-light text-[#061E4F] mb-4 tracking-wide">8. Güncellemeler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda sizi bilgilendireceğiz.
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