'use client'

import Image from 'next/image'

export default function InvestmentOpportunity() {
  return (
    <div className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol Taraf - Başlık ve Görseller */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Kuzey Kıbrıs'a
              <br />
              yatırım yapma
              <br />
              fırsatını
              <br />
              değerlendirin
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/cyprus/interior.jpg"
                  alt="Kuzey Kıbrıs İç Mekan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/cyprus/exterior.jpg"
                  alt="Kuzey Kıbrıs Dış Mekan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Büyük Görsel */}
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/cyprus/main.jpg"
              alt="Kuzey Kıbrıs"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 