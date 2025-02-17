'use client';

import React from 'react';

interface VideoCallFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoCallForm = ({ isOpen, onClose }: VideoCallFormProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-8 relative">
        {/* Kapatma Butonu */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-black/60 hover:text-black transition-colors"
          aria-label="Formu kapat"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-light text-center mb-6 tracking-wider">GÖRÜNTÜLÜ GÖRÜŞME</h2>
        <p className="text-sm text-center mb-8 font-light">
          Satış danışmanımıza bağlanmak için lütfen aşağıdaki bilgileri doldurun.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Adınız*"
              required
              className="w-full px-4 py-3 bg-white/80 border border-neutral-200 rounded focus:outline-none focus:border-[#061E4F] transition-colors"
            />
            <input
              type="text"
              placeholder="Soyadınız*"
              required
              className="w-full px-4 py-3 bg-white/80 border border-neutral-200 rounded focus:outline-none focus:border-[#061E4F] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="E-Mail Adresiniz*"
              required
              className="w-full px-4 py-3 bg-white/80 border border-neutral-200 rounded focus:outline-none focus:border-[#061E4F] transition-colors"
            />
            <input
              type="tel"
              placeholder="Telefonunuz*"
              required
              className="w-full px-4 py-3 bg-white/80 border border-neutral-200 rounded focus:outline-none focus:border-[#061E4F] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-start space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                required
                className="mt-1 border-neutral-300 rounded text-[#061E4F] focus:ring-[#061E4F]"
              />
              <span className="text-sm font-light">
                <a href="/kvkk" className="underline hover:text-[#061E4F] transition-colors">KVKK aydınlatma metnini</a> okudum.
              </span>
            </label>

            <label className="flex items-start space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-1 border-neutral-300 rounded text-[#061E4F] focus:ring-[#061E4F]"
              />
              <span className="text-sm font-light">
                Kampanyalardan haberdar olmak için tarafıma elektronik ileti gönderilmesini kabul ederim.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded hover:bg-black/90 transition-colors tracking-wider font-light"
          >
            BAĞLAN
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoCallForm; 