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
          className="group bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-black/30 hover:scale-105"
          aria-label="Whatsapp ile iletişime geçin"
        >
          <FaWhatsapp className="w-6 h-6 transition-transform group-hover:scale-110" />
        </a>
        
        <a
          href="tel:+905488370015"
          className="group bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-black/30 hover:scale-105"
          aria-label="Bizi arayın"
        >
          <FaPhone className="w-6 h-6 transition-transform group-hover:scale-110" />
        </a>
      </div>
    </>
  );
};

export default FloatingContactButtons; 