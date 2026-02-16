"use client";

import Image from "next/image";

const SOCK_IMAGES = [
  "/portfolio/socks/sock-1.png",
  "/portfolio/socks/sock-2.png",
  "/portfolio/socks/sock-3.png",
  "/portfolio/socks/sock-4.png",
  "/portfolio/socks/sock-5.png",
  "/portfolio/socks/sock-6.png",
] as const;

export default function SockCard({
  imageIndex,
  alt,
}: {
  imageIndex: number;
  alt: string;
}) {
  const src = SOCK_IMAGES[imageIndex % SOCK_IMAGES.length];
  return (
    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 50vw, 33vw"
        unoptimized
      />
    </div>
  );
}
