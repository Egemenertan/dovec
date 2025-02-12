'use client'

import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { getFirestore, collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'
import LoadingSpinner from '@/components/LoadingSpinner'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  createdAt: any
  author: {
    name: string
    image: string
  }
  content: string
}

export default function BlogPage() {
  const { data: session, status } = useSession()
  const isAdmin = status === "authenticated"
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [heroImage, setHeroImage] = useState<string>('')

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        console.log('Hero image yükleniyor...')
        const imageRef = ref(storage, 'lacasalia/tatlisu_26 copy.webp')
        const url = await getDownloadURL(imageRef)
        console.log('Hero image URL:', url)
        setHeroImage(url)
      } catch (error) {
        console.error('Hero image yüklenirken hata:', error)
      }
    }

    fetchHeroImage()
  }, [])

  // Menüyü kapatma fonksiyonu
  const closeMenu = useCallback((e: MouseEvent) => {
    // @ts-ignore - dataset type hatası için
    const clickedMenuId = e.target?.closest?.('button')?.dataset?.menuId
    if (!clickedMenuId) {
      setActiveMenu(null)
    }
  }, [])

  // Boşluğa tıklandığında menüyü kapatma
  useEffect(() => {
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [closeMenu])

  // Blog silme fonksiyonu
  const handleDelete = async (id: string) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      try {
        const db = getFirestore()
        await deleteDoc(doc(db, 'blogs', id))
        // Silinen blogu state'den kaldır
        setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== id))
      } catch (error) {
        console.error('Blog silinirken hata:', error)
        alert('Blog silinirken bir hata oluştu')
      }
    }
  }

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const db = getFirestore()
        const blogRef = collection(db, 'blogs')
        const q = query(blogRef, orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]

        setBlogPosts(posts)
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt="Blog"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
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
        <div className="relative">
          {/* Artı butonu - Sadece admin için görünür */}
          {isAdmin && (
            <Link
              href="/admin/blog/new"
              className="fixed bottom-8 right-8 w-14 h-14 bg-[#061E4F] hover:bg-[#061E4F]/90 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="absolute -top-10 bg-white text-[#061E4F] px-3 py-1 rounded-md text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Yeni Blog Ekle
              </span>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white overflow-hidden relative"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      data-menu-id={post.id}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveMenu(activeMenu === post.id ? null : post.id)
                      }}
                      className="w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === post.id && (
                      <div 
                        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-30"
                      >
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          Düzenle
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleDelete(post.id)
                          }}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                          Sil
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-[400px]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {post.category && (
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-sm mb-3">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 