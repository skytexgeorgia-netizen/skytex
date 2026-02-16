"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const embroideryImages = [
  "/portfolio/embroidery/embroidery-1.png",
  "/portfolio/embroidery/embroidery-2.png",
  "/portfolio/embroidery/embroidery-3.png",
  "/portfolio/embroidery/embroidery-4.png",
  "/portfolio/embroidery/embroidery-5.png",
  "/portfolio/embroidery/embroidery-6.png",
  "/portfolio/embroidery/embroidery-7.png",
  "/portfolio/embroidery/embroidery-8.png",
];

const sockImages = [
  "/portfolio/socks/sock-1.png",
  "/portfolio/socks/sock-2.png",
  "/portfolio/socks/sock-3.png",
  "/portfolio/socks/sock-4.png",
  "/portfolio/socks/sock-5.png",
  "/portfolio/socks/sock-6.png",
];

const machineImages = [
  "/factory/machine-1.jpg",
  "/factory/machine-2.jpg",
  "/factory/machine-3.jpg",
  "/factory/machine-4.jpg",
];

export default function PortfolioPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          {t.portfolio.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {t.portfolio.subtitle}
        </p>
      </div>

      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          {t.portfolio.embroidery}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {embroideryImages.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-md hover:shadow-lg transition-shadow group"
            >
              <Image
                src={src}
                alt={`${t.portfolio.embroidery} ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          {t.portfolio.socks}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sockImages.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow group"
            >
              <Image
                src={src}
                alt={`${t.portfolio.socks} ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          {t.portfolio.production}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {machineImages.map((src, i) => (
            <div
              key={i}
              className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 shadow-md hover:shadow-lg transition-shadow group"
            >
              <Image
                src={src}
                alt={`Production Facility ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200/80 z-10">
                <p className="text-slate-600 text-sm">Makine Görseli {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
