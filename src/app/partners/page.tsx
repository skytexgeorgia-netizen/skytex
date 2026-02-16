"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const partners = [
  { id: "nike", nameKey: "nike" as const, image: "/partners/nike.svg" },
  { id: "adidas", nameKey: "adidas" as const, image: "/partners/adidas.svg" },
  { id: "erima", nameKey: "erima" as const, image: "/partners/erima.svg" },
  { id: "lotto", nameKey: "lotto" as const, image: "/partners/lotto.svg" },
  { id: "underarmour", nameKey: "underarmour" as const, image: "/partners/underarmour.svg" },
  { id: "newbalance", nameKey: "newbalance" as const, image: "/partners/newbalance.svg" },
];

function PartnerCard({
  partner,
  name,
}: {
  partner: (typeof partners)[0];
  name: string;
}) {
  return (
    <div className="group flex flex-col items-center justify-center p-8 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all min-h-[200px]">
      <div className="relative w-32 h-20 flex items-center justify-center">
        <Image
          src={partner.image}
          alt={name}
          width={128}
          height={80}
          className="object-contain max-h-20"
          unoptimized
        />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600 group-hover:text-amber-600 transition-colors">
        {name}
      </p>
    </div>
  );
}

export default function PartnersPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          {t.partners.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {t.partners.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            name={t.partners[partner.nameKey]}
          />
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-slate-500">
        Gerçek logo dosyalarınızı (PNG) /public/partners/ klasörüne ekleyerek mevcut placeholder&apos;ları değiştirebilirsiniz.
      </p>
    </div>
  );
}
