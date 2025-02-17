'use client';

import React, { useState } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import VideoCallForm from './VideoCallForm';

const FloatingContactButtons = () => {
  const [isVideoFormOpen, setIsVideoFormOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 sm:bottom-16 right-8 flex flex-col gap-4 z-50">
        <a
          href="https://wa.me/905488370015"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white/90 backdrop-blur-sm border border-neutral-200 hover:border-[#061E4F] text-[#061E4F] p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-[#061E4F]/30"
          aria-label="Whatsapp ile iletişime geçin"
        >
          <FaWhatsapp className="w-6 h-6 transition-transform group-hover:scale-110" />
        </a>
        
        <a
          href="tel:+905488370015"
          className="group bg-white/90 backdrop-blur-sm border border-neutral-200 hover:border-[#061E4F] text-[#061E4F] p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-[#061E4F]/30"
          aria-label="Bizi arayın"
        >
          <FaPhone className="w-6 h-6 transition-transform group-hover:scale-110" />
        </a>
      </div>
    </>
  );
};

export default FloatingContactButtons; 