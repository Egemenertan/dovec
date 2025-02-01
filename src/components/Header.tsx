'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Sol boşluk */}
          <div className="w-32 md:w-48" />

          {/* Logo - Ortada */}
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/dovec.webp"
              alt="DOVEC Logo"
              width={128}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation - Sağda */}
          <nav className="hidden md:flex space-x-8 w-32 md:w-48 justify-end">
            <Link href="/hakkimizda" className="text-white hover:text-gray-300 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/projeler" className="text-white hover:text-gray-300 transition-colors">
              Projeler
            </Link>
            <Link href="/yatirim" className="text-white hover:text-gray-300 transition-colors">
              Yatırım
            </Link>
            <Link href="/iletisim" className="text-white hover:text-gray-300 transition-colors">
              İletişim
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}; 