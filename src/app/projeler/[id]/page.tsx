'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Gallery } from '@/components/Gallery';
import { storage } from '@/firebase/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ImageSlider } from '@/components/ImageSlider';
import ProjectMap from '@/components/ProjectMap';

// SVG Komponentleri
const HospitalIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const BeachIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
  </svg>
);

const MarketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const RestaurantIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
  </svg>
);

const UniversityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const MarinaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
  </svg>
);

const MallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
  </svg>
);

const ParkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
);

const SportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
);

const CenterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
);

// Mesafe tipi tanımı
interface Distance {
  icon: JSX.Element;
  title: string;
  distance: string;
}

// Proje verileri tipini genişlet
interface ProjectData {
  title: string;
  heroImage: string;
  city: string;
  region: string;
  completion: string;
  types: string;
  startingPrice: string;
  advantages: string;
  description: string;
  features: string[];
  distances: Distance[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Proje verileri
const projectsData: Record<string, ProjectData> = {
  'la-casalia': {
    title: 'La Casalia',
    heroImage: 'lacasalia/tatlisu_10 - Photo copy.webp',
    city: 'TATLISU',
    region: 'Tatlısu',
    completion: 'Aralık 2027',
    types: '1+1 Deluxe, 1+1 Deluxe 2, 2+1 Deluxe, 2+1 Deluxe 2, 3+1 Loft, 3+1 Villa, Grand Studio',
    startingPrice: '£ 195.000',
    advantages: 'Deniz manzarası, özel plaj, sosyal tesisler',
    description: 'Modern mimari ve lüks yaşamın buluştuğu özel bir proje.',
    features: [
      'Özel Plaj',
      'Deniz Manzarası',
      'Infinity Havuz',
      'Fitness Merkezi',
      'Spa & Wellness',
      'Concierge Hizmeti',
      'Özel Güvenlik',
      'Kapalı Otopark'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '13.7 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '5 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '52.2 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: 'Sitede'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '2 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: 'Sitede'
      },
      {
        icon: <MarinaIcon />,
        title: 'Marina',
        distance: '3 KM'
      }
    ],
    coordinates: {
      lat: 35.3297,
      lng: 33.9039
    }
  },
  'natulux': {
    title: 'Natulux',
    heroImage: 'natulux/Natulux Out View 1 (1)_11zon.webp',
    city: 'TATLISU',
    region: 'Sahil',
    completion: '2024',
    types: '1+1, 2+1, 3+1 Garden, 3+1 Penthouse, 3+1 Villa, 4+1 Villa',
    startingPrice: '£ 245.000',
    advantages: 'Deniz manzarası, doğayla iç içe, modern yaşam',
    description: 'Doğa ile iç içe, lüks yaşam standartları.',
    features: [
      'Deniz Manzarası',
      'Akıllı Ev Sistemleri',
      'Infinity Havuz',
      'Fitness Merkezi',
      'Özel Bahçe',
      '24/7 Güvenlik'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '8.3 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '3.5 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '35 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '0.1 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.8 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.4 KM'
      }
    ],
    coordinates: {
      lat: 35.3297,
      lng: 33.9039
    }
  },
  'la-isla': {
    title: 'La Isla',
    heroImage: 'laisla/DRONE01E.webp',
    city: 'GAZİMAĞUSA',
    region: 'Tatlısu',
    completion: '2025',
    types: '2+1, 3+1 Apart, 3+1 Villa, 4+1',
    startingPrice: '£ 225.000',
    advantages: 'Deniz manzarası, özel plaj, sosyal tesisler, marina yakınlığı',
    description: 'Ada yaşamının tüm ayrıcalıklarını sunan özel proje.',
    features: [
      'Özel Plaj',
      'Deniz Manzarası',
      'Infinity Havuz',
      'Fitness Merkezi',
      'Spa & Wellness',
      'Concierge Hizmeti',
      'Özel Güvenlik',
      'Kapalı Otopark'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '10.5 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '4.8 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '40 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '0.1 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.4 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.3 KM'
      },
      {
        icon: <MarinaIcon />,
        title: 'Marina',
        distance: '2.5 KM'
      }
    ],
    coordinates: {
      lat: 35.3297,
      lng: 33.9039
    }
  },
  'querencia': {
    title: 'Querencia',
    heroImage: 'querencia/r imaj_3 kopya_11_11zon.webp',
    city: 'GİRNE',
    region: 'Çatalköy',
    completion: '2024',
    types: 'A 1+1, A 2+1, A Studio, BCD 1+1, BCD 2+1, BCD 3+1, BCD Dublex, BCD Penthouse, BCD Studio',
    startingPrice: '£ 185.000',
    advantages: 'Şehir merkezine yakın, deniz manzaralı, sosyal olanaklar',
    description: 'Huzur ve konforun buluştuğu yaşam alanları.',
    features: [
      'Panoramik Manzara',
      'Akıllı Ev Sistemleri',
      'Infinity Havuz',
      'Wellness Merkezi',
      'Özel Şef Hizmeti',
      'Helipad',
      'Concierge Hizmeti',
      'Özel Güvenlik'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '4.1 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '2.8 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '45 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '0.3 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.2 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.1 KM'
      },
      {
        icon: <UniversityIcon />,
        title: 'Üniversite',
        distance: '5.5 KM'
      },
      {
        icon: <MarinaIcon />,
        title: 'Marina',
        distance: '3.2 KM'
      }
    ],
    coordinates: {
      lat: 35.3297,
      lng: 33.9039
    }
  },
  'la-perla': {
    title: 'La Perla',
    heroImage: 'laperala/DRONE01E.webp',
    city: 'GAZİMAĞUSA',
    region: 'Tatlısu',
    completion: '2025',
    types: '2+1, 3+1 Apart, 3+1 Villa, 4+1',
    startingPrice: '£ 225.000',
    advantages: 'Deniz manzarası, özel plaj, sosyal tesisler, marina yakınlığı',
    description: 'Ada yaşamının tüm ayrıcalıklarını sunan özel proje.',
    features: [
      'Özel Plaj',
      'Deniz Manzarası',
      'Infinity Havuz',
      'Fitness Merkezi',
      'Spa & Wellness',
      'Concierge Hizmeti',
      'Özel Güvenlik',
      'Kapalı Otopark'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '10.5 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '4.8 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '40 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '0.1 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.4 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.3 KM'
      },
      {
        icon: <MarinaIcon />,
        title: 'Marina',
        distance: '2.5 KM'
      }
    ],
    coordinates: {
      lat: 35.3297,
      lng: 33.9039
    }
  },
  'la-marina': {
    title: 'La Marina',
    heroImage: 'lamarina/DRONE01E.webp',
    city: 'GAZİMAĞUSA',
    region: 'Tatlısu',
    completion: '2025',
    types: '2+1, 3+1 Apart, 3+1 Villa, 4+1',
    startingPrice: '£ 225.000',
    advantages: 'Deniz manzarası, özel plaj, sosyal tesisler, marina yakınlığı',
    description: 'Ada yaşamının tüm ayrıcalıklarını sunan özel proje.',
    features: [
      'Özel Plaj',
      'Deniz Manzarası',
      'Infinity Havuz',
      'Fitness Merkezi',
      'Spa & Wellness',
      'Concierge Hizmeti',
      'Özel Güvenlik',
      'Kapalı Otopark'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '10.5 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '4.8 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '40 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '0.1 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.4 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.3 KM'
      },
      {
        icon: <MarinaIcon />,
        title: 'Marina',
        distance: '2.5 KM'
      }
    ],
    coordinates: {
      lat: 35.3297,
      lng: 33.9039
    }
  },
  'four-seasons-life': {
    title: 'Four Seasons Life',
    heroImage: 'fsl/7.webp',
    city: 'LEFKOŞA',
    region: 'Gönyeli',
    completion: '2025',
    types: '',
    startingPrice: '£ 215.000',
    advantages: 'Şehir merkezinde, üniversitelere yakın, modern yaşam',
    description: 'Dört mevsim ayrıcalıklı yaşam deneyimi.',
    features: [
      'Dört Mevsim Havuz',
      'Kapalı Otopark',
      'Çocuk Oyun Alanları',
      'Sosyal Tesisler',
      'Güvenlik',
      'Yeşil Alanlar'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '6.5 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '1.9 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '25 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.3 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.2 KM'
      },
      {
        icon: <UniversityIcon />,
        title: 'Üniversite',
        distance: '2.5 KM'
      },
      {
        icon: <MallIcon />,
        title: 'AVM',
        distance: '1.8 KM'
      },
      {
        icon: <ParkIcon />,
        title: 'Park',
        distance: '0.4 KM'
      }
    ],
    coordinates: {
      lat: 35.2288,
      lng: 33.3222
    }
  },
  'courtyard-platinum': {
    title: 'Courtyard Platinum',
    heroImage: 'platinum/7.webp',
    city: 'GİRNE',
    region: 'Alsancak',
    completion: '2024',
    types: 'Premium Rezidanslar',
    startingPrice: '£ 275.000',
    advantages: 'Lüks yaşam, deniz manzarası, özel mimari',
    description: 'Premium yaşam standartlarını sunan seçkin proje.',
    features: [
      'Özel Avlu',
      'Concierge',
      'Business Center',
      'Spa & Wellness',
      'Özel Şarap Mahzeni',
      'Sinema Salonu'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '7.2 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '4.6 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '42 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '0.4 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.3 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.2 KM'
      },
      {
        icon: <MarinaIcon />,
        title: 'Marina',
        distance: '5.5 KM'
      },
      {
        icon: <SportIcon />,
        title: 'Spor Tesisi',
        distance: '1.2 KM'
      }
    ],
    coordinates: {
      lat: 35.3384,
      lng: 33.3173
    }
  },
  'sky-sakarya': {
    title: 'Sky Sakarya',
    heroImage: 'skysakarya/WhatsApp Image 2021-08-24 at 11.08.54 (1).webp',
    city: 'SAKARYA',
    region: 'Merkez',
    completion: '2022',
    types: '2+1, 3+1, 4+1 Rezidanslar',
    startingPrice: '₺ 4.950.000',
    advantages: 'Şehir merkezinde, panoramik manzara, modern yaşam alanları',
    description: 'Gökyüzüyle buluşan modern yaşam alanları.',
    features: [
      'Panoramik Şehir Manzarası',
      'Akıllı Ev Sistemleri',
      'Kapalı Yüzme Havuzu',
      'Fitness Merkezi',
      'SPA & Wellness',
      'Kapalı Otopark',
      '7/24 Güvenlik',
      'Concierge Hizmeti'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '1.2 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '0.5 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '85 KM'
      },
      {
        icon: <UniversityIcon />,
        title: 'Üniversite',
        distance: '3.5 KM'
      },
      {
        icon: <MallIcon />,
        title: 'AVM',
        distance: '1.8 KM'
      },
      {
        icon: <ParkIcon />,
        title: 'Park',
        distance: '0.3 KM'
      }
    ],
    coordinates: {
      lat: 40.7568,
      lng: 30.3785
    }
  },
  'courtyard': {
    title: 'Courtyard',
    heroImage: 'courtyard/2 (1).webp',
    city: 'GİRNE',
    region: 'Merkez',
    completion: '2021',
    types: '1+1, 2+1, 3+1 Rezidanslar',
    startingPrice: '£ 185.000',
    advantages: 'Şehir merkezinde, deniz manzarası, sosyal olanaklar',
    description: 'Şehrin merkezinde huzurlu bir yaşam.',
    features: [
      'Deniz Manzarası',
      'Yüzme Havuzu',
      'Fitness Salonu',
      'Çocuk Oyun Alanı',
      'Kapalı Otopark',
      'Güvenlik',
      'Merkezi Konum',
      'Peyzaj Alanları'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '2.5 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '0.8 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '25 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '1.2 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.3 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '0.2 KM'
      }
    ],
    coordinates: {
      lat: 35.3384,
      lng: 33.3173
    }
  },
  'panorama': {
    title: 'Panorama',
    heroImage: 'panorama/1.webp',
    city: 'GİRNE',
    region: 'Alsancak',
    completion: '2020',
    types: '2+1, 3+1 Rezidanslar',
    startingPrice: '£ 165.000',
    advantages: 'Deniz ve dağ manzarası, geniş yaşam alanları',
    description: 'Eşsiz manzarasıyla öne çıkan yaşam projesi.',
    features: [
      'Panoramik Manzara',
      'Açık Yüzme Havuzu',
      'Fitness Merkezi',
      'Yeşil Alanlar',
      'Otopark',
      'Güvenlik',
      'Jeneratör',
      'Su Deposu'
    ],
    distances: [
      {
        icon: <HospitalIcon />,
        title: 'Hastane',
        distance: '4.5 KM'
      },
      {
        icon: <CenterIcon />,
        title: 'Merkez',
        distance: '3.2 KM'
      },
      {
        icon: <PlaneIcon />,
        title: 'Havalimanı',
        distance: '30 KM'
      },
      {
        icon: <BeachIcon />,
        title: 'Sahil',
        distance: '2.5 KM'
      },
      {
        icon: <MarketIcon />,
        title: 'Market',
        distance: '0.7 KM'
      },
      {
        icon: <RestaurantIcon />,
        title: 'Restoran',
        distance: '1.0 KM'
      }
    ],
    coordinates: {
      lat: 35.3384,
      lng: 33.3173
    }
  }
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState('');
  const [typeImages, setTypeImages] = useState<string[]>([]);
  const [aboutImage, setAboutImage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Proje klasör adını belirle
  const getFolderName = (id: string) => {
    switch (id) {
      case 'four-seasons-life': return 'fsl';
      case 'courtyard-platinum': return 'platinum';
      case 'la-casalia': return 'lacasalia';
      case 'natulux': return 'natulux';
      case 'querencia': return 'querencia';
      case 'la-isla': return 'laisla';
      case 'sky-sakarya': return 'skysakarya';
      case 'courtyard': return 'courtyard';
      case 'panorama': return 'panorama';
      default: return '';
    }
  };

  // URL'den gelen id'yi düzelt ve kontrol et
  const normalizedId = params.id.toLowerCase().trim();
  const projectData = projectsData[normalizedId];
  const folderName = getFolderName(normalizedId);

  useEffect(() => {
    console.log('Proje Detay - URL parametresi:', params.id);
    console.log('Proje Detay - Normalize edilmiş ID:', normalizedId);
    console.log('Proje Detay - Bulunan proje:', projectData);
    console.log('Proje Detay - Klasör adı:', folderName);

    const fetchImages = async () => {
      try {
        if (!storage || !folderName) {
          throw new Error('Storage veya klasör adı bulunamadı');
        }

        // La Casalia için özel görsel yükleme
        if (normalizedId === 'la-casalia') {
          // Hero image yükleme
          const heroImageRef = ref(storage, 'lacasalia/tatlisu_10 - Photo copy.webp');
          const heroUrl = await getDownloadURL(heroImageRef);
          setHeroImage(heroUrl);
          console.log('Hero image yüklendi:', heroUrl);
          
          // Indoor klasöründeki tüm alt klasörleri listele
          const indoorRef = ref(storage, 'lacasalia/indoor');
          const indoorResult = await listAll(indoorRef);
          
          // Her bir alt klasör için resimleri yükle
          for (const folder of indoorResult.prefixes) {
            const folderRef = ref(storage, folder.fullPath);
            const folderResult = await listAll(folderRef);
            
            // Grand klasörü için özel işlem
            if (folder.name === 'grand') {
              console.log('Grand klasörü bulundu:', folder.fullPath);
              const grandUrls = await Promise.all(
                folderResult.items.map(async (item) => {
                  try {
                    const url = await getDownloadURL(item);
                    console.log(`Grand klasöründen resim yüklendi: ${item.name} ->`, url);
                    return url;
                  } catch (error) {
                    console.error(`Resim yüklenirken hata: ${item.name}`, error);
                    return null;
                  }
                })
              ).then(urls => urls.filter(url => url !== null));
              
              // Grand resimlerini images state'ine ekle
              if (grandUrls.length > 0) {
                console.log(`Toplam ${grandUrls.length} adet grand resmi yüklendi`);
                setImages(prevImages => [...prevImages, ...grandUrls]);
              } else {
                console.warn('Grand klasöründe resim bulunamadı');
              }
              continue;
            }
            
            // Diğer klasörler için normal yükleme
            const urls = await Promise.all(
              folderResult.items.map(async (item) => {
                const url = await getDownloadURL(item);
                console.log(`${folder.name} klasöründen resim yüklendi:`, url);
                return url;
              })
            );
            
            setImages(prevImages => [...prevImages, ...urls]);
          }
          
          // Diğer görselleri yükle
          const storageRef = ref(storage, folderName);
          const result = await listAll(storageRef);
          
          const otherUrls = await Promise.all(
            result.items
              .filter(item => !item.fullPath.includes('indoor/') && item.fullPath !== 'lacasalia/tatlisu_10 - Photo copy.webp')
              .map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
              })
          );

          const shuffledUrls = [...otherUrls].sort(() => Math.random() - 0.5);
          if (shuffledUrls.length >= 4) {
            setTypeImages([shuffledUrls[0], shuffledUrls[1], shuffledUrls[2]]);
            setAboutImage(shuffledUrls[3]);
          }
          return;
        }

        // Sky Sakarya ve Panorama için özel görsel yükleme
        if (normalizedId === 'sky-sakarya' || normalizedId === 'panorama') {
          const storageRef = ref(storage, normalizedId === 'sky-sakarya' ? 'skysakarya' : 'panorama');
          const result = await listAll(storageRef);
          
          const urls = await Promise.all(
            result.items.map(async (item) => {
              const url = await getDownloadURL(item);
              return url;
            })
          );

          if (urls.length > 0) {
            // İlk görseli hero image olarak ayarla
            setHeroImage(urls[0]);
            
            // Diğer görselleri karıştır ve dağıt
            const remainingUrls = urls.slice(1);
            const shuffledUrls = [...remainingUrls].sort(() => Math.random() - 0.5);
            setImages(shuffledUrls);
            
            // Tip görselleri ve hakkında görseli için
            if (shuffledUrls.length >= 4) {
              setTypeImages([shuffledUrls[0], shuffledUrls[1], shuffledUrls[2]]);
              setAboutImage(shuffledUrls[3]);
            }
          }
          console.log(`${normalizedId} görselleri yüklendi:`, urls.length, 'adet');
        } else {
          // Diğer projeler için mevcut yükleme mantığı
          const heroImageRef = ref(storage, projectData.heroImage);
          const heroUrl = await getDownloadURL(heroImageRef);
          setHeroImage(heroUrl);
          console.log('Hero image yüklendi:', heroUrl);

          const storageRef = ref(storage, folderName);
          const result = await listAll(storageRef);
          
          const urls = await Promise.all(
            result.items
              .filter(item => !item.name.includes(projectData.heroImage))
              .map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
              })
          );

          if (urls.length > 0) {
            const shuffledUrls = [...urls].sort(() => Math.random() - 0.5);
            setImages(shuffledUrls);
            setTypeImages([shuffledUrls[0], shuffledUrls[1], shuffledUrls[2]]);
            setAboutImage(shuffledUrls[3]);
            console.log('Diğer görseller yüklendi:', urls.length, 'adet');
          }
        }
      } catch (error) {
        console.error('Görseller yüklenirken hata:', error);
        setError('Görseller yüklenirken bir hata oluştu');
      }
    };

    if (projectData) {
      fetchImages();
    }
  }, [folderName, projectData, normalizedId]);

  if (!projectData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="text-3xl font-light text-[#061E4F]/60 text-center">
          Proje bulunamadı
        </div>
        <Link 
          href="/projeler" 
          className="px-8 py-3 text-sm font-light tracking-[.2em] text-[#061E4F] border border-[#061E4F]/20 rounded-lg hover:bg-[#061E4F] hover:text-white transition-colors duration-300"
        >
          TÜM PROJELER
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Bölümü */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[.2em] text-white uppercase">
            {projectData.title}
          </h1>
        </div>
      </div>

      {/* Proje Detayları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Sol Kolon - Proje Bilgileri */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-16">
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Şehir</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.city}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Bölge</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.region}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Proje Bitiş</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.completion}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Başlangıç Fiyatı</h3>
                  <p className="text-4xl font-extralight tracking-wider text-[#061E4F]">{projectData.startingPrice}</p>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
                </div>
              </div>
              <div className="space-y-16">
                <div>
                  <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Konut Tipleri</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectData.types.split(',').map((type, index) => (
                      <div key={index} className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm px-6 py-4 rounded-xl group">
                        <span className="block text-sm font-light tracking-wider text-[#061E4F]/70 group-hover:text-[#061E4F] transition-all duration-300">{type.trim()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-8"></div>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase mb-6">Konum Avantajları</h3>
              <p className="text-2xl font-extralight tracking-wider text-[#061E4F] leading-relaxed">
                {projectData.advantages}
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/20 to-transparent mt-6"></div>
            </div>
          </div>

          {/* Sağ Kolon - Proje Özellikleri */}
          <div className="space-y-12">
            <h3 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Proje Özellikleri</h3>
            <div className="space-y-8">
              {projectData.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center space-x-6 group">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#061E4F]/20 group-hover:w-3 group-hover:bg-[#061E4F]/40 transition-all duration-300"></div>
                  <span className="text-xl font-extralight tracking-wider text-[#061E4F] group-hover:translate-x-2 transition-transform duration-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Proje Tanıtım */}
      <div className="relative py-32">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Sol Taraf - Proje Bilgisi */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Yeni bir çağ</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  {projectData.title}
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  {projectData.description}
                </p>
              </div>
            </div>

            {/* Sağ Taraf - Proje Görseli */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              {aboutImage && (
                <Image
                  src={aboutImage}
                  alt={projectData.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061E4F]/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Proje Görselleri Bölümü */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Gallery projectId={folderName} />
      </section>

      {/* Lokasyon ve Mesafeler */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center space-x-4 justify-center mb-20">
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
          <h2 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Lokasyon & Mesafeler</h2>
          <div className="w-20 h-[1px] bg-gradient-to-l from-[#061E4F] to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16">
          {projectData.distances.map((item: Distance, index: number) => (
            <div key={index} className="group">
              <div className="flex flex-col items-center space-y-6">
                <div className="text-[#061E4F]/40 group-hover:text-[#061E4F] transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-sm font-light tracking-[.2em] text-[#061E4F]/60 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-extralight tracking-wider text-[#061E4F]">
                    {item.distance}
                  </p>
                  <div className="h-[1px] w-8 mx-auto bg-gradient-to-r from-[#061E4F]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Konut Tipleri */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="flex items-center space-x-4 justify-center mb-32">
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent"></div>
          <h2 className="text-sm font-light tracking-[.3em] text-[#061E4F]/60 uppercase">Konut Tipleri</h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#061E4F]/20 to-transparent"></div>
        </div>
        
        {/* Konut Tipleri Bölümü - Proje bazlı özel düzenlemeler */}
        {normalizedId === 'querencia' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {/* 1+1 Deluxe */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/a1+1" alt="A 1+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">A 1+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">65m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1+1 Deluxe 2 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/a2+1" alt="A 2+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">A 2+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">85m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* A Studio */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/astudio" alt="A Studio" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">A Studio</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">45m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BCD 1+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/bcd1+1" alt="BCD 1+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">BCD 1+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">70m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BCD 2+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/bcd2+1" alt="BCD 2+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">BCD 2+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">90m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BCD 3+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/bcd3+1" alt="BCD 3+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">BCD 3+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">120m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BCD Dublex */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/bcddublex" alt="BCD Dublex" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">BCD Dublex</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">150m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BCD Penthouse */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/bcdpenthouse" alt="BCD Penthouse" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">BCD Penthouse</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">180m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BCD Studio */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="querencia/indoor/bcdstudio" alt="BCD Studio" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">BCD Studio</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">50m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {normalizedId === 'la-casalia' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {/* 1+1 Deluxe */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/1+1" alt="1+1 Deluxe" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">1+1 Deluxe</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">65m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1+1 Deluxe 2 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/1+1deluxe2" alt="1+1 Deluxe 2" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">1+1 Deluxe 2</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">70m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2+1 Deluxe */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/2+1" alt="2+1 Deluxe" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">2+1 Deluxe</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">85m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2+1 Deluxe 2 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/2+1deluxe2" alt="2+1 Deluxe 2" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">2+1 Deluxe 2</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">90m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Loft */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/3+1loft" alt="3+1 Loft" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Loft</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">120m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Villa */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/3+1villa" alt="3+1 Villa" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Villa</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">150m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grand Studio */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="lacasalia/indoor/grand" alt="Grand Studio" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">Grand Studio</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">55m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {normalizedId === 'natulux' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {/* 1+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="natulux/indoor/1+1" alt="1+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">1+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">65m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="natulux/indoor/2+1" alt="2+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">2+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">85m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Garden */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="natulux/indoor/3+1garden" alt="3+1 Garden" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Garden</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">120m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Penthouse */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="natulux/indoor/3+1penthouse" alt="3+1 Penthouse" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Penthouse</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">130m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Villa */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="natulux/indoor/3+1villa" alt="3+1 Villa" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Villa</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">150m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4+1 Villa */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="natulux/indoor/4+1villa" alt="4+1 Villa" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">4+1 Villa</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">180m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {normalizedId === 'la-isla' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {/* 2+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="laisla/indoor/2+1" alt="2+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">2+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">85m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Apart */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="laisla/indoor/3+1apart" alt="3+1 Apart" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Apart</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">120m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3+1 Villa */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="laisla/indoor/3+1villa" alt="3+1 Villa" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">3+1 Villa</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">150m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4+1 */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#061E4F]/5 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative">
                <ImageSlider folderPath="laisla/indoor/4+1" alt="4+1" />
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-3xl font-extralight tracking-wider text-[#061E4F]">4+1</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-extralight tracking-wider text-[#061E4F]/60">180m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tanıtım Alanı */}
      <div className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#061E4F]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-[#061E4F] to-transparent"></div>
                  <span className="text-xl font-light tracking-[.5em] uppercase text-[#061E4F]/80">Dovec</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extralight tracking-[.2em] text-[#061E4F] leading-tight">
                  1989'ten Bugüne
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                Dovec Group 1989 yılından bu yana Kuzey Kıbrıs Türk Cumhuriyeti'nde yenilikçi emlak çözümleriyle öncülük etmekten gurur duyar. Her projede kalite, güven ve yeniliği ön planda tutarak, adanın her köşesine modern ve sürdürülebilir çözümler sunar. 
                </p>
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  Her projemizde, müşterilerimizin hayallerini gerçeğe dönüştürmeyi ve onlara unutulmaz bir yaşam deneyimi sunmayı hedefliyoruz. Kalite ve güven bizim için sadece bir söz değil, bir yaşam biçimidir.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/iletisim"
                className="group relative inline-flex flex-col items-center"
              >
                <div className="absolute -inset-10 bg-gradient-to-br from-white via-[#061E4F]/5 to-[#061E4F]/10 rounded-full blur-2xl transition-all duration-500 group-hover:via-[#061E4F]/10 group-hover:to-[#061E4F]/20"></div>
                <div className="relative flex flex-col items-center space-y-8">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-white via-[#061E4F]/10 to-[#061E4F]/20 rounded-full opacity-20 group-hover:opacity-30 blur-md transition-all duration-500"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <EmailIcon />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <span className="block text-2xl tracking-[.4em] uppercase font-extralight text-[#061E4F] group-hover:tracking-[.5em] transition-all duration-500">İletişim</span>
                    <span className="block text-sm tracking-[.2em] font-extralight text-[#061E4F]/60">Hayalinizdeki Eve Ulaşın</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#061E4F]/60 group-hover:text-[#061E4F] transition-colors duration-500">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent"></div>
                    <ArrowIcon />
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Geri Dön Butonu */}
      <div className="py-24 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/projeler"
          className="group relative inline-flex items-center"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-[#061E4F]/5 via-[#061E4F]/10 to-[#061E4F]/5 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          <div className="relative flex items-center space-x-4">
            <BackIcon />
            <span className="text-base font-light tracking-[.2em] text-[#061E4F]/80 group-hover:text-[#061E4F] transition-colors duration-300">TÜM PROJELER</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#061E4F]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </Link>
      </div>

      {/* Konut Tipleri bölümünden sonra haritayı ekleyin */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Konum</h2>
        <div className="w-full">
          <ProjectMap 
            lat={projectData.coordinates.lat} 
            lng={projectData.coordinates.lng} 
          />
        </div>
      </div>
    </div>
  );
} 