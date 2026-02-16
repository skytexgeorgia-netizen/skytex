"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            {t.home.title}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-amber-600 font-medium">
            {t.home.subtitle}
          </p>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            {t.home.description}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25"
          >
            {t.home.cta}
          </Link>
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
