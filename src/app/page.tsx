"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/logo/skytex_hero_banner_option2 (1).png"
            alt="Skytex Georgia Factory"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={(e) => {
              // Try alternative banner names
              const img = e.currentTarget as HTMLImageElement;
              if (img.src.includes('skytex_hero_banner')) {
                img.src = '/factory/hero-banner.jpg';
              } else {
                img.style.display = 'none';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-amber-900/50" />
        </div>
        
        {/* Fallback gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              {t.home.title}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-amber-300 font-medium drop-shadow-md">
              {t.home.subtitle}
            </p>
            <p className="mt-6 text-lg text-slate-100 leading-relaxed drop-shadow-md">
              {t.home.description}
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25"
            >
              {t.home.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-50">
              <span className="text-4xl font-bold text-amber-600">8-9M</span>
              <p className="mt-2 text-slate-600">{t.about.annual}</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50">
              <span className="text-4xl font-bold text-amber-600">17-18</span>
              <p className="mt-2 text-slate-600">{t.about.machines}</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50">
              <span className="text-4xl font-bold text-amber-600">30+</span>
              <p className="mt-2 text-slate-600">{t.about.title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
