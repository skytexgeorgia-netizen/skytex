"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const factoryImages = [
  { src: "/factory/skytex-building.png", alt: "Skytex - Fabrika binası" },
  { src: "/factory/IMG_5563.jpg", alt: "Skytex Georgia Factory", fallback: "/factory/factory-1.jpg" },
  { src: "/factory/skytex-embroidery-floor.png", alt: "Skytex - Nakış üretim alanı" },
  { src: "/factory/skytex-quality-control.png", alt: "Skytex - Kalite kontrol" },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
      const onEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxImage(null);
      };
      window.addEventListener("keydown", onEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onEscape);
      };
    }
  }, [lightboxImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          {t.about.title}
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          {t.about.description}
        </p>
      </div>

      {/* Factory Images - 2 üstte, 2 altta, büyük boyut, tıklanınca lightbox */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12 max-w-5xl mx-auto">
        {factoryImages.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxImage(img.src)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-slate-100 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
              onError={img.fallback ? (e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.src.includes(img.src.split("/").pop()!)) {
                  el.src = img.fallback;
                }
              } : undefined}
            />
          </button>
        ))}
      </div>

      {/* Lightbox - tıklanınca büyük görsel */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
          aria-label="Kapat"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl z-10"
            aria-label="Kapat"
          >
            ×
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="Büyük görünüm"
              width={1920}
              height={1080}
              className="object-contain w-full h-auto max-h-[90vh] rounded-lg"
              unoptimized
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl bg-sky-50 border border-sky-100">
          <h3 className="font-semibold text-sky-800 mb-2">{t.about.capacity}</h3>
          <p className="text-slate-600">{t.about.machines}</p>
          <p className="text-slate-600 mt-1">{t.about.annual}</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-2">{t.about.focus}</h3>
          <p className="text-slate-600">
            Lonati GE616F çorap makinesi ile nakışlı çorap üretimi ve son müşteriye satış odaklı yeni ürün gamı.
          </p>
        </div>
      </div>
    </div>
  );
}
