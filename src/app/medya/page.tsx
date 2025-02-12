'use client';

import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { getFirestore, collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'
import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/LoadingSpinner'

interface MediaPost {
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

interface VideoPost {
  id: string
  title: string
  videoUrl: string
  thumbnail: string
  category: string
  createdAt: any
}

export default function MediaPage() {
  const { data: session, status } = useSession()
  const isAdmin = status === "authenticated"
  const [mediaPosts, setMediaPosts] = useState<MediaPost[]>([])
  const [videoPosts, setVideoPosts] = useState<VideoPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'medya' | 'video'>('medya')
  const [heroImage, setHeroImage] = useState<string>('')

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const imageRef = ref(storage, 'DSC01200_11zon.webp')
        const url = await getDownloadURL(imageRef)
        setHeroImage(url)
      } catch (error) {
        console.error('Hero görsel yüklenirken hata:', error)
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

  // Medya silme fonksiyonu
  const handleDelete = async (id: string) => {
    if (window.confirm('Bu medya içeriğini silmek istediğinize emin misiniz?')) {
      try {
        const db = getFirestore()
        await deleteDoc(doc(db, 'media', id))
        // Silinen medyayı state'den kaldır
        setMediaPosts(prevPosts => prevPosts.filter(post => post.id !== id))
      } catch (error) {
        console.error('Medya silinirken hata:', error)
        alert('Medya silinirken bir hata oluştu')
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const db = getFirestore()
        
        // Medya içeriklerini getir
        const mediaRef = collection(db, 'media')
        const mediaQuery = query(mediaRef, orderBy('createdAt', 'desc'))
        const mediaSnapshot = await getDocs(mediaQuery)
        const mediaPosts = mediaSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MediaPost[]
        
        // Video içeriklerini getir
        const videoRef = collection(db, 'videos')
        const videoQuery = query(videoRef, orderBy('createdAt', 'desc'))
        const videoSnapshot = await getDocs(videoQuery)
        const videoPosts = videoSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as VideoPost[]

        setMediaPosts(mediaPosts)
        setVideoPosts(videoPosts)
      } catch (error) {
        console.error('İçerikler yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
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
        {heroImage && (
          <Image
            src={heroImage}
            alt="Medya"
            fill
            className="object-cover object-[center_35%]"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-white mb-6">
              Medya
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide text-white/90 max-w-2xl mx-auto px-4">
              DOVEC İnşaat'tan en güncel haberler ve duyurular
            </p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex justify-center space-x-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('medya')}
            className={`pb-4 px-4 text-lg font-extralight tracking-wider transition-colors duration-200 ${
              activeTab === 'medya'
                ? 'text-[#061E4F] border-b-2 border-[#061E4F]'
                : 'text-gray-500 hover:text-[#061E4F]'
            }`}
          >
            Haber Bülteni
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`pb-4 px-4 text-lg font-extralight tracking-wider transition-colors duration-200 ${
              activeTab === 'video'
                ? 'text-[#061E4F] border-b-2 border-[#061E4F]'
                : 'text-gray-500 hover:text-[#061E4F]'
            }`}
          >
            Video Galerisi
          </button>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Artı butonu - Sadece admin için görünür */}
          {isAdmin && (
            <Link
              href={`/admin/${activeTab === 'medya' ? 'medya' : 'video'}/new`}
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
                {activeTab === 'medya' ? 'Yeni Medya Ekle' : 'Yeni Video Ekle'}
              </span>
            </Link>
          )}

          {activeTab === 'medya' ? (
            // Medya Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group overflow-hidden shadow-lg"
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
                          className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg py-2 z-30"
                        >
                          <Link
                            href={`/admin/medya/edit/${post.id}`}
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

                  <Link href={`/medya/${post.id}`} className="block w-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-light tracking-wider mb-2">{post.title}</h3>
                        <p className="text-sm text-white/90 line-clamp-2 font-light">{post.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            // Video Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Video 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative pb-[56.25%] overflow-hidden">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/JaM2Auoc6f4"
                    title="DOVEC İnşaat Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">DOVEC İnşaat Tanıtım</h3>
                  <p className="text-gray-600 text-sm">DOVEC İnşaat'ın kurumsal tanıtım videosu</p>
                </div>
              </div>

              {/* Video 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative pb-[56.25%] overflow-hidden">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/oZPvn69p3s8"
                    title="DOVEC İnşaat Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">DOVEC İnşaat Projeler</h3>
                  <p className="text-gray-600 text-sm">Tamamlanan ve devam eden projelerimiz</p>
                </div>
              </div>

              {/* Video 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative pb-[56.25%] overflow-hidden">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/x2vRXdWaznA"
                    title="DOVEC İnşaat Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">DOVEC İnşaat Kalite</h3>
                  <p className="text-gray-600 text-sm">Kalite standartlarımız ve iş süreçlerimiz</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 