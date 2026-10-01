"use client";
import { useState } from "react";
export default function FoodTruckImage({ className = "", alt = "Hot Tacos Food Truck" }: { className?: string; alt?: string }) {
  const [src, setSrc] = useState("/screenshots/HTFT Image.jpeg");
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={() => { if (src !== "/icons/HTFT.png") setSrc("/icons/HTFT.png"); }} />;
}
