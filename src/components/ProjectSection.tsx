'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectSectionProps {
  backgroundImage?: string;
  title?: string;
  description?: string;
  additionalText?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  backgroundImage = '/images/project-background.jpg',
  title = 'PROJELERİMİZ',
  description = '"Her konut, bu muhteşem manzarayı en üst düzeye çıkaracak şekilde stratejik olarak konumlandırılmış olup, konut sakinlerinin günlük yaşamlarına büyüleyici bir fon oluşturan masmavi denizleri, yemyeşil doğayı ve parlak plajları hayranlıkla seyretmelerine olanak tanımaktadır."',
  additionalText = 'Tesisin her noktasından, sakinlere gökyüzünün ve mevsimlerin değişen renkleriyle sürekli gelişen doğanın güzelliğinin görsel bir senfonisi sunulmaktadır. Önünüzde uzanan hayranlık uyandırıcı manzaraların tadını çıkarırken, şehir rahatlığı ve dağ huzurunun uyumlu karışımını kucaklayın.'
}) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#DFD8CF]">
      {/* Arka plan görseli */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="relative w-full h-full">
          <Image
            src={imageError ? '/images/project-background.jpg' : backgroundImage}
            alt="Proje Arka Plan"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="opacity-20"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#DFD8CF]/90 to-[#DFD8CF]/70" />
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col items-start justify-center py-20">
        <div className="flex flex-col md:flex-row w-full">
          {/* Sol taraf - Başlık */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-blue-900 text-base md:text-lg tracking-wider uppercase font-light"
            >
              {title}
            </motion.h2>
          </div>

          {/* Sağ taraf - İçerik */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-3/4"
          >
            <div className="mb-12">
              <p className="text-gray-800 text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8 font-cormorant">
                {description}
              </p>
              
              <p className="text-gray-700 text-sm md:text-base font-light leading-relaxed font-inter mt-6">
                {additionalText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dövec logosu */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-3xl md:text-4xl font-light text-blue-900 italic"
        >
          Dövec
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection; 