"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

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

      {/* Factory Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <Image
            src="/factory/IMG_5563.jpg"
            alt="Skytex Georgia Factory"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              // Try alternative factory image names
              const img = e.currentTarget as HTMLImageElement;
              if (img.src.includes('IMG_5563')) {
                img.src = '/factory/factory-1.jpg';
              } else {
                img.style.display = 'none';
              }
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200/80 z-10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-slate-600 text-sm">Fabrika Görseli 1</p>
          </div>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <Image
            src="/factory/factory-2.jpg"
            alt="Barudan Embroidery Machines"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200/80 z-10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-slate-600 text-sm">Fabrika Görseli 2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl bg-amber-50 border border-amber-100">
          <h3 className="font-semibold text-amber-800 mb-2">{t.about.capacity}</h3>
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
