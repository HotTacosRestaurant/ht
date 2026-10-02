"use client";

import { useState } from "react";
import Image from "next/image";

const MAIN_IMAGE = "/screenshots/HTFT Image.jpeg";
const FALLBACK_IMAGE = "/icons/HTFT.png";

type FoodTruckImageProps = {
  className?: string;
  alt?: string;
};

export default function FoodTruckImage({
  className = "",
  alt = "Hot Tacos Food Truck",
}: FoodTruckImageProps) {
  const [src, setSrc] = useState(MAIN_IMAGE);

  return (
    <Image
      src={src}
      alt={alt}
      width={1254}
      height={965}
      sizes="(max-width: 768px) 100vw, 560px"
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => {
        if (src !== FALLBACK_IMAGE) {
          setSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}