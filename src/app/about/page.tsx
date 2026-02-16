"use client";

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
