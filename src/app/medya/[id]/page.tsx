'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

interface MediaPost {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  createdAt: any
  author: {
    name: string
    image: string
  }
}

export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const [mediaPost, setMediaPost] = useState<MediaPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMediaPost = async () => {
      try {
        const db = getFirestore()
        const docRef = doc(db, 'media', params.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setMediaPost({
            id: docSnap.id,
            ...docSnap.data()
          } as MediaPost)
        } else {
          console.log('Medya içeriği bulunamadı')
        }
      } catch (error) {
        console.error('Medya içeriği yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMediaPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        <LoadingSpinner />
      </div>
    )
  }

  if (!mediaPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Medya içeriği bulunamadı</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[60vh] lg:h-[70vh]">
        <Image
          src={mediaPost.coverImage}
          alt={mediaPost.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider text-white mb-6 leading-tight">
              {mediaPost.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-white/90 text-lg tracking-wide">
              <span>
                {new Date(mediaPost.createdAt.toDate()).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span>{Math.ceil(mediaPost.content.split(' ').length / 200)} dk okuma süresi</span>
              <span>•</span>
              <span>{mediaPost.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Medya İçeriği */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="blog-content font-['Times_New_Roman'] 
                       [&>h1]:text-4xl [&>h1]:font-normal [&>h1]:mb-4 [&>h1]:mt-8 
                       [&>h2]:text-3xl [&>h2]:font-normal [&>h2]:mb-3 [&>h2]:mt-6
                       [&>h3]:text-2xl [&>h3]:font-normal [&>h3]:mb-3 [&>h3]:mt-5
                       [&>p]:text-xl [&>p]:leading-[1.6] [&>p]:mb-4 [&>p]:text-gray-700
                       [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:text-gray-700 [&>ul]:leading-[1.6]
                       [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:text-gray-700 [&>ol]:leading-[1.6]
                       [&>blockquote]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#061E4F]/20 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6
                       [&>img]:rounded-xl [&>img]:shadow-lg [&>img]:my-6 [&>img]:mx-auto [&>img]:max-w-full
                       [&>*:first-child]:mt-0
                       [&>*:last-child]:mb-0
                       selection:bg-[#061E4F]/10"
            dangerouslySetInnerHTML={{ __html: mediaPost.content }}
          />
        </article>

        {/* Geri Dön Butonu */}
        <div className="mt-16">
          <Link
            href="/medya"
            className="inline-flex items-center space-x-3 text-[#061E4F] hover:text-[#061E4F]/80 transition-colors text-lg group font-['Times_New_Roman']"
          >
            <svg
              className="w-6 h-6 transform transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Tüm Medya İçerikleri</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 