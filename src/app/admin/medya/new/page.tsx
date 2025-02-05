'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import 'react-quill/dist/quill.snow.css'

// React-Quill'i dinamik olarak import et
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl" />
})

interface Paragraph {
  title: string;
  content: string;
  image?: string;
  imageFile?: File;
}

export default function NewMediaPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  })
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([])

  // Admin değilse ana sayfaya yönlendir
  if (status === 'unauthenticated') {
    router.push('/admin')
    return null
  }

  // Quill editör için görsel yükleme fonksiyonu
  const imageHandler = useCallback(async () => {
    try {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/jpeg, image/png, image/gif, image/webp')
      input.click()

      input.onchange = async () => {
        const file = input.files?.[0]
        if (file) {
          try {
            if (file.size > 10 * 1024 * 1024) {
              alert('Dosya boyutu 10MB\'dan küçük olmalıdır')
              return
            }

            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            if (!validTypes.includes(file.type)) {
              alert('Lütfen geçerli bir görsel formatı yükleyin (JPEG, PNG, GIF, WEBP)')
              return
            }

            const timestamp = Date.now()
            const storageRef = ref(storage, `media/content/${timestamp}_${file.name}`)
            const uploadResult = await uploadBytes(storageRef, file)
            const imageUrl = await getDownloadURL(uploadResult.ref)

            const editor = document.querySelector('.ql-editor')
            if (editor && (editor as any).__quill) {
              const quill = (editor as any).__quill
              const range = quill.getSelection(true)
              quill.insertEmbed(range.index, 'image', imageUrl)
              quill.setSelection(range.index + 1)
            }

          } catch (error: any) {
            console.error('Görsel yükleme hatası:', error)
            alert(`Görsel yüklenirken bir hata oluştu: ${error.message}`)
          }
        }
      }
    } catch (error: any) {
      console.error('Görsel seçme hatası:', error)
      alert(`Görsel seçilirken bir hata oluştu: ${error.message}`)
    }
  }, [])

  // Quill editör ayarları
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }

  const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ]

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Dosya boyutu 10MB\'dan küçük olmalıdır')
        return
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Lütfen geçerli bir görsel formatı yükleyin (JPEG, PNG, GIF, WEBP)')
        return
      }

      try {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Görsel yükleme hatası:', error)
        alert('Görsel yüklenirken bir hata oluştu')
      }
    }
  }

  // Yeni paragraf ekleme fonksiyonu
  const addParagraph = () => {
    setParagraphs([...paragraphs, { title: '', content: '' }])
  }

  // Paragraf güncelleme fonksiyonu
  const updateParagraph = (index: number, field: keyof Paragraph, value: string | File) => {
    const newParagraphs = [...paragraphs]
    if (field === 'imageFile' && value instanceof File) {
      const reader = new FileReader()
      reader.onloadend = () => {
        newParagraphs[index].image = reader.result as string
        newParagraphs[index].imageFile = value
        setParagraphs(newParagraphs)
      }
      reader.readAsDataURL(value)
    } else {
      // @ts-ignore
      newParagraphs[index][field] = value
      setParagraphs(newParagraphs)
    }
  }

  // Paragraf silme fonksiyonu
  const removeParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index))
  }

  // Paragraf görselini kaldırma fonksiyonu
  const removeParagraphImage = (index: number) => {
    const newParagraphs = [...paragraphs]
    delete newParagraphs[index].image
    delete newParagraphs[index].imageFile
    setParagraphs(newParagraphs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedImage) {
      alert('Lütfen bir kapak resmi seçin')
      return
    }

    setIsLoading(true)
    try {
      const timestamp = Date.now()
      const storageRef = ref(storage, `media/covers/${timestamp}_${selectedImage.name}`)
      const uploadResult = await uploadBytes(storageRef, selectedImage)
      const imageUrl = await getDownloadURL(uploadResult.ref)

      let additionalContent = ''
      for (const para of paragraphs) {
        let paraImageUrl = ''
        if (para.imageFile) {
          const paraImageRef = ref(storage, `media/paragraphs/${timestamp}_${para.imageFile.name}`)
          const paraUploadResult = await uploadBytes(paraImageRef, para.imageFile)
          paraImageUrl = await getDownloadURL(paraUploadResult.ref)
        }

        if (para.title || para.content || paraImageUrl) {
          additionalContent += `
            ${para.title ? `<h2 class="text-3xl font-light mb-4 mt-8">${para.title}</h2>` : ''}
            ${para.content ? `<p class="text-lg leading-relaxed mb-6">${para.content}</p>` : ''}
            ${paraImageUrl ? `<img src="${paraImageUrl}" alt="${para.title || 'Medya görseli'}" class="rounded-xl shadow-lg my-8 w-full" loading="lazy">` : ''}
          `
        }
      }

      const cleanContent = (formData.content + additionalContent)
        .replace(/<p><br><\/p>/g, '')
        .replace(/<h1>/g, '<h1 class="text-4xl font-light mb-6 mt-12">')
        .replace(/<h2>/g, '<h2 class="text-3xl font-light mb-4 mt-8">')
        .replace(/<p>/g, '<p class="text-lg leading-relaxed mb-6">')
        .replace(/<img/g, '<img class="rounded-xl shadow-lg my-8" loading="lazy"')

      const db = getFirestore()
      await addDoc(collection(db, 'media'), {
        ...formData,
        content: cleanContent,
        coverImage: imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        excerpt: formData.content.slice(0, 200).replace(/<[^>]*>/g, ''),
        author: {
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image
        }
      })

      router.push('/medya')
    } catch (error) {
      console.error('Medya ekleme hatası:', error)
      alert('Medya eklenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extralight tracking-wider text-[#061E4F] mb-4">
            Yeni Medya İçeriği
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Kapak Görseli */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <div className="space-y-6">
              <label className="block text-lg font-light tracking-wide text-[#061E4F] mb-4">
                Kapak Görseli
              </label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-full h-[400px] rounded-xl overflow-hidden group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null)
                            setImagePreview('')
                          }}
                          className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>Görseli Kaldır</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-[#061E4F]/10 rounded-xl p-12 transition-all duration-300 hover:border-[#061E4F]/20">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                    <div className="text-center">
                      <svg className="mx-auto h-16 w-16 text-[#061E4F]/20" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-4 text-lg font-light text-[#061E4F]/60">
                        Görseli buraya sürükleyin veya seçmek için tıklayın
                      </p>
                      <p className="mt-2 text-sm text-[#061E4F]/40">
                        PNG, JPG veya GIF • Maksimum 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Başlık ve Kategori */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
                <label className="block text-lg font-light tracking-wide text-[#061E4F] mb-4">
                  Başlık
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#061E4F]/20 font-light text-lg tracking-wide text-[#061E4F] placeholder-[#061E4F]/30"
                  placeholder="Medya başlığını girin..."
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
                <label className="block text-lg font-light tracking-wide text-[#061E4F] mb-4">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#061E4F]/20 font-light text-lg tracking-wide text-[#061E4F] placeholder-[#061E4F]/30"
                >
                  <option value="">Kategori Seçin</option>
                  <option value="Basın Bülteni">Basın Bülteni</option>
                  <option value="Haberler">Haberler</option>
                  <option value="Duyurular">Duyurular</option>
                  <option value="Etkinlikler">Etkinlikler</option>
                  <option value="Röportajlar">Röportajlar</option>
                </select>
              </div>
            </div>
          </div>

          {/* İçerik Editörü */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <label className="block text-lg font-light tracking-wide text-[#061E4F] mb-4">
              İçerik
            </label>
            <div className="prose max-w-none">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                formats={formats}
                className="h-96 mb-12 [&_.ql-editor]:text-lg [&_.ql-editor]:font-light [&_.ql-editor]:tracking-wide [&_.ql-editor]:text-[#061E4F]/80"
              />
            </div>
          </div>

          {/* Ek Paragraflar */}
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-light tracking-wide text-[#061E4F]">
                  Ek Paragraf {index + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeParagraph(index)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <input
                  type="text"
                  value={paragraph.title}
                  onChange={(e) => updateParagraph(index, 'title', e.target.value)}
                  placeholder="Paragraf başlığı..."
                  className="w-full px-6 py-4 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#061E4F]/20 font-light text-lg tracking-wide text-[#061E4F] placeholder-[#061E4F]/30"
                />
                <textarea
                  value={paragraph.content}
                  onChange={(e) => updateParagraph(index, 'content', e.target.value)}
                  placeholder="Paragraf içeriği..."
                  rows={4}
                  className="w-full px-6 py-4 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#061E4F]/20 font-light text-lg tracking-wide text-[#061E4F] placeholder-[#061E4F]/30 resize-none"
                />
                
                {/* Paragraf Görseli */}
                <div className="relative">
                  {paragraph.image ? (
                    <div className="relative w-full h-[300px] rounded-xl overflow-hidden group">
                      <Image
                        src={paragraph.image}
                        alt="Paragraf görseli"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeParagraphImage(index)}
                            className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                          >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Görseli Kaldır</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-[#061E4F]/10 rounded-xl p-8 transition-all duration-300 hover:border-[#061E4F]/20">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('Dosya boyutu 10MB\'dan küçük olmalıdır')
                              return
                            }
                            updateParagraph(index, 'imageFile', file)
                          }
                        }}
                      />
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-[#061E4F]/20" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-[#061E4F]/40">
                          Paragraf için görsel ekle (opsiyonel)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Paragraf Ekleme Butonu */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addParagraph}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-[#061E4F] rounded-xl transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="font-light tracking-wide">Yeni Paragraf Ekle</span>
            </button>
          </div>

          {/* Gönder Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`relative px-12 py-4 bg-[#061E4F] text-white rounded-xl hover:bg-[#061E4F]/90 transition-all duration-300 group ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative flex items-center justify-center space-x-3">
                <span className="text-lg font-light tracking-wider">
                  {isLoading ? 'Yükleniyor...' : 'Yayınla'}
                </span>
                {!isLoading && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 