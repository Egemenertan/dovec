'use client';

import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const [textureError, setTextureError] = useState(false);
  
  // Texture işleme - sadece TextureLoader kullanıyorum ve hata yönetimi ekliyorum
  const processedTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    
    // Hata durumunda basit bir texture oluştur
    if (textureError) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Basit bir dünya haritası çiz
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        
        // Kıtaları temsil eden basit şekiller
        context.beginPath();
        context.ellipse(canvas.width / 2, canvas.height / 2, 200, 100, 0, 0, 2 * Math.PI);
        context.fill();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    }
    
    // Normal texture yükleme işlemi
    return loader.load(
      '/earth-day.jpg',
      (texture) => {
        // Başarılı yükleme
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!texture.image || !context) return;
        
        canvas.width = texture.image.width;
        canvas.height = texture.image.height;
        
        context.drawImage(texture.image, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        if (imageData) {
          for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            
            // Mavi renkleri (okyanusları) siyah yap
            if (b > r && b > g) {
              imageData.data[i] = 0;
              imageData.data[i + 1] = 0;
              imageData.data[i + 2] = 0;
              imageData.data[i + 3] = 255;
            } else {
              // Karaları beyaz yap
              imageData.data[i] = 255;
              imageData.data[i + 1] = 255;
              imageData.data[i + 2] = 255;
              imageData.data[i + 3] = 255;
            }
          }
          context.putImageData(imageData, 0, 0);
        }
        
        texture.image = canvas;
        texture.needsUpdate = true;
      },
      undefined, // Progress callback
      () => {
        // Hata durumunda
        console.error('Earth texture yüklenemedi');
        setTextureError(true);
      }
    );
  }, [textureError]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  // Primary color: #061E4F
  return (
    <mesh ref={earthRef} rotation={[0, -1.5, 0]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial
        map={processedTexture}
        transparent={true}
        color="#ffffff"
      />
    </mesh>
  );
}

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-40 h-40 sm:w-64 sm:h-64 relative">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <directionalLight intensity={5} position={[0, 0, 5]} color="#ffffff" />
            <Earth />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default LoadingSpinner; 