'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.isAdmin) {
      router.push('/blog');
    }
  }, [status, session, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/blog'
      });
    } catch (error) {
      console.error('Giriş hatası:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#061E4F]">
            Yönetici Girişi
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Devam etmek için giriş yapın
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {status === 'unauthenticated' && (
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#061E4F] transform transition duration-150 hover:scale-[1.02]"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google ile Devam Et
            </button>
          )}
          {status === 'authenticated' && (
            <button
              onClick={() => signOut({ callbackUrl: '/admin' })}
              className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition duration-150 hover:scale-[1.02]"
            >
              <FiLogOut className="h-5 w-5 mr-2" />
              Çıkış Yap
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 