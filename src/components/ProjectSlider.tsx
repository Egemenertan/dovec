'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import { useState, useEffect } from 'react';
import { storage } from '@/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

// Swiper stilleri
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export const ProjectSlider = () => {
  const [projects, setProjects] = useState([
    {
      name: 'La Casalia',
      type: 'KONUT PROJESİ',
      description: 'Modern mimari ve lüks yaşamın buluştuğu özel bir proje.',
      price: '£175,000\'den başlayan',
      image: '',
      slug: 'la-casalia',
      storagePath: 'lacasalia/tatlisu_12 copy.webp'
    },
    {
      name: 'Natulux',
      type: 'KONUT PROJESİ',
      description: 'Doğa ile iç içe, lüks yaşam standartları.',
      price: '£190,000\'den başlayan',
      image: '',
      slug: 'natulux',
      storagePath: 'natulux/Natulux Out View 1 (1)_11zon.webp'
    },
    {
      name: 'La Isla',
      type: 'KONUT PROJESİ',
      description: 'Ada yaşamının tüm ayrıcalıklarını sunan özel proje.',
      price: '£165,000\'den başlayan',
      image: '',
      storagePath: 'laisla/DRONE01E.webp',
      location: 'GAZİMAĞUSA, KKTC',
      slug: 'la-isla'
    },
    {
      name: 'Querencia',
      type: 'KONUT PROJESİ',
      description: 'Huzur ve konforun buluştuğu yaşam alanları.',
      price: '£185,000\'den başlayan',
      image: '',
      slug: 'querencia',
      storagePath: 'querencia/r imaj_3 kopya_11_11zon.webp'
    },
    {
      name: 'Four Seasons Life',
      type: 'KONUT PROJESİ',
      description: 'Dört mevsim ayrıcalıklı yaşam deneyimi.',
      price: '£195,000\'den başlayan',
      image: '',
      slug: 'four-seasons-life',
      storagePath: 'fsl/7.webp'
    },
    {
      name: 'Courtyard Platinum',
      type: 'KONUT PROJESİ',
      description: 'Premium yaşam standartlarını sunan seçkin proje.',
      price: '£180,000\'den başlayan',
      image: '',
      slug: 'courtyard-platinum',
      storagePath: 'platinum/7.webp'
    },
    {
      name: 'Grand Studio',
      type: 'KONUT PROJESİ',
      description: 'Modern ve kompakt yaşam alanları.',
      price: '£155,000\'den başlayan',
      image: '',
      slug: 'grand-studio',
      storagePath: 'grandstudio/hero.webp'
    }
  ]);

  const [activeAward, setActiveAward] = useState(0);
  const [awardImage, setAwardImage] = useState('');

  const awards = [
    {
      id: 0,
      name: "European Property Awards",
      description: "2023 - 2024 Yılının En İyi Konut Geliştirme Projesi",
    },
    {
      id: 1,
      name: "International Property Awards",
      description: "2023 Yılı En İyi Mimari Tasarım Ödülü",
    },
    {
      id: 2,
      name: "Luxury Lifestyle Awards",
      description: "2023 Yılının En Lüks Konut Projesi",
    },
    {
      id: 3,
      name: "Best Design Award",
      description: "2023 En İyi Tasarım ve Yaşam Alanı Ödülü",
    },
    {
      id: 4,
      name: "Sustainable Architecture Award",
      description: "2023 Sürdürülebilir Mimari Ödülü",
    },
    {
      id: 5,
      name: "Quality Excellence Award",
      description: "2023 Kalite Mükemmellik Ödülü",
    },
    {
      id: 6,
      name: "Innovation in Construction Award",
      description: "2023 İnşaat Sektöründe İnovasyon Ödülü",
    }
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Resimler yüklenmeye başlıyor...');
        const updatedProjects = await Promise.all(
          projects.map(async (project) => {
            try {
              console.log(`${project.name} için resim yükleniyor: ${project.storagePath}`);
              const imageRef = ref(storage, project.storagePath);
              const url = await getDownloadURL(imageRef);
              console.log(`${project.name} resmi başarıyla yüklendi: ${url}`);
              return { ...project, image: url };
            } catch (error: any) {
              console.error(`${project.name} resmi yüklenirken hata:`, error.message);
              return { 
                ...project, 
                image: '/placeholders/project-placeholder.jpg'
              };
            }
          })
        );

        console.log('Güncellenen projeler:', updatedProjects.map(p => ({ name: p.name, image: p.image })));
        setProjects(updatedProjects);
      } catch (error: any) {
        console.error('Resimler yüklenirken genel hata:', error.message);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const loadAwardImage = async () => {
      try {
        const imageRef = ref(storage, 'awards.webp');
        const url = await getDownloadURL(imageRef);
        setAwardImage(url);
      } catch (error) {
        console.error('Ödül resmi yüklenemedi:', error);
      }
    };

    loadAwardImage();
  }, []);

  // Yükleme kontrolünü güncelliyoruz
  const loadedProjects = projects.filter(project => project.image);
  console.log('Yüklenen proje sayısı:', loadedProjects.length);

  if (loadedProjects.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Projeler Yükleniyor...</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative py-32 md:py-40"
    >
      {/* Elegant arka plan */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute inset-0 bg-white"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent_50%)]"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_50%)]"
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200/50 to-transparent origin-top"
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200/50 to-transparent origin-bottom"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="block text-sm font-light tracking-[0.4em] text-zinc-400 mb-4"
          >
            DOVEC İNŞAAT
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-zinc-800 mb-6 relative inline-block"
          >
            Projelerimiz
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-4 left-0 w-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent"
            />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl font-light tracking-wide text-zinc-500 max-w-2xl mx-auto mt-8"
          >
            Tamamlanan ve devam eden projelerimiz
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            navigation={{
              prevEl: '.swiper-prev',
              nextEl: '.swiper-next',
            }}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true 
            }}
            speed={1000}
            watchSlidesProgress={true}
            preventInteractionOnTransition={true}
            className="project-swiper !overflow-visible !pt-12 !pb-20 [&_.swiper-slide-prev]:opacity-50 [&_.swiper-slide-next]:opacity-50 [&_.swiper-slide-prev]:blur-sm [&_.swiper-slide-next]:blur-sm [&_.swiper-slide-prev]:scale-90 [&_.swiper-slide-next]:scale-90 [&_.swiper-slide]:transition-all [&_.swiper-slide]:duration-500 relative z-[50]"
          >
            {projects.map((project, index) => (
              project.image ? (
                <SwiperSlide key={index} className="!w-[500px] sm:!w-[800px] md:!w-[1100px] lg:!w-[1400px]">
                  <Link href={`/projeler/${project.slug}`}>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group rounded-xl overflow-hidden bg-white shadow-[0_8px_40px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_50px_-6px_rgba(0,0,0,0.15)] relative"
                    >
                      {/* Navigasyon Butonları */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="absolute bottom-8 right-8 flex items-center space-x-3 z-[60]"
                      >
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="swiper-prev w-12 h-12 rounded-full bg-gradient-to-br from-zinc-900 to-black hover:from-black hover:to-zinc-900 text-white flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transform transition-transform group-hover:-translate-x-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="swiper-next w-12 h-12 rounded-full bg-gradient-to-br from-zinc-900 to-black hover:from-black hover:to-zinc-900 text-white flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transform transition-transform group-hover:translate-x-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </motion.button>
                      </motion.div>

                      <div className="flex flex-col md:flex-row h-[700px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
                        {/* Sol taraf - Proje detayları */}
                        <motion.div 
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="w-full md:w-2/5 p-10 sm:p-12 md:p-16 flex flex-col justify-center bg-gradient-to-br from-white via-white to-zinc-50/50 relative z-10 overflow-hidden"
                        >
                          {/* Üst Kısım */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8 mb-16"
                          >
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                              <span className="inline-block text-sm font-light tracking-[0.2em] text-zinc-500 bg-zinc-100/50 backdrop-blur-sm px-6 py-2 rounded-full">{project.type}</span>
                            </motion.div>
                            <motion.h3 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                              className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-wide text-zinc-800 leading-tight"
                            >
                              {project.name}
                            </motion.h3>
                          </motion.div>

                          {/* Orta Kısım */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-16"
                          >
                            <p className="text-xl sm:text-2xl text-zinc-600 leading-relaxed font-light">{project.description}</p>
                          </motion.div>

                          {/* Alt Kısım */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="relative space-y-10"
                          >
                            {/* Fiyat */}
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="inline-block relative"
                            >
                              <span className="block text-sm font-light tracking-wider text-zinc-400 mb-3">Başlangıç Fiyatı</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl md:text-4xl font-light text-zinc-800">{project.price.split("'")[0]}</span>
                                <span className="text-lg text-zinc-500 font-light">ve üzeri</span>
                              </div>
                            </motion.div>

                            {/* Detay Butonu */}
                            <motion.div 
                              whileHover={{ x: 10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="flex items-center gap-8"
                            >
                              <div className="group/link inline-flex items-center gap-6 relative">
                                <span className="text-xl text-zinc-800 font-light tracking-wide">Detayları Gör</span>
                                <motion.div 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center transform transition-all duration-500 group-hover/link:bg-zinc-900"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white transform transition-transform duration-500 group-hover/link:translate-x-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                  </svg>
                                </motion.div>
                              </div>
                            </motion.div>
                          </motion.div>

                          {/* Dekoratif Elementler */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="absolute top-0 right-0 w-[120%] h-40 bg-gradient-to-br from-zinc-100/30 via-white/10 to-transparent rotate-12 transform -translate-y-1/2 blur-3xl"
                          />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="absolute bottom-0 left-0 w-[120%] h-40 bg-gradient-to-tr from-zinc-100/30 via-white/10 to-transparent -rotate-12 transform translate-y-1/2 blur-3xl"
                          />
                        </motion.div>

                        {/* Sağ taraf - Görsel */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className="relative w-full md:w-3/5 h-full"
                        >
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover will-change-transform"
                            priority={index === 0}
                            sizes="(max-width: 640px) 400px, (max-width: 768px) 700px, (max-width: 1024px) 900px, 1200px"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            quality={85}
                          />
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent md:bg-none"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ) : null
            ))}
          </Swiper>
        </motion.div>

        {/* Döveç Group Ödülleri */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 relative"
        >
          {/* Dekoratif Elementler */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#061E4F] rounded-full blur-[100px] -z-10"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#061E4F] rounded-full blur-[100px] -z-10"
          />

          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            {/* Sol Başlık Alanı */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-1/2 flex flex-col h-full"
            >
              {/* Başlık - Modern ve Sofistike */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative mb-8"
              >
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -top-6 left-0 h-[1px] bg-gradient-to-r from-zinc-300 via-zinc-500 to-transparent"
                />
                <div className="relative">
                  <span className="block text-sm font-light tracking-[0.4em] text-zinc-400 mb-6 relative">
                    BAŞARILARIMIZ
                    <motion.span 
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="absolute left-0 -bottom-2 h-[1px] bg-zinc-400"
                    />
                  </span>
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 0.05, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute -left-6 -right-6 top-1/2 -translate-y-1/2 h-full bg-[#061E4F] blur-2xl"
                    />
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider text-zinc-800 max-w-xl leading-tight relative">
                      Döveç Group 
                      <span className="block mt-2">Ödülleri</span>
                    </h3>
                  </div>
                </div>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="absolute -bottom-6 right-0 h-[1px] bg-gradient-to-l from-zinc-300 via-zinc-500 to-transparent"
                />
              </motion.div>

              {/* Ödül Görseli */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex-grow flex items-end -mt-8"
              >
                {awardImage && (
                  <div className="relative w-full aspect-square max-w-[600px]">
                    <Image
                      src={awardImage}
                      alt="Döveç Group Ödülleri"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Sağ Ödüller Listesi */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 space-y-4"
            >
              {awards.map((award, index) => (
                <motion.div 
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group/award border-b border-zinc-200 pb-4 cursor-pointer hover:border-zinc-400 transition-all duration-500"
                >
                  <div className="overflow-hidden">
                    <motion.h4 
                      whileHover={{ x: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl md:text-3xl font-extralight text-zinc-800 group-hover/award:text-zinc-600 transition-colors"
                    >
                      {award.name}
                    </motion.h4>
                  </div>
                  <p className="text-zinc-500 font-light mt-2 text-base group-hover/award:text-zinc-700 transition-colors">
                    {award.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 