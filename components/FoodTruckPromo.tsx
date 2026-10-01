"use client";
import Link from "next/link";
import FoodTruckImage from "@/components/FoodTruckImage";
import { useLanguage } from "@/components/LanguageProvider";
import type { BranchKey } from "@/lib/site-data";
export default function FoodTruckPromo({branch, source = "home"}: {branch?: BranchKey; source?: string}) {
 const {locale} = useLanguage(); const es = locale === "es";
 const href = `/food-truck?branch=${branch ?? "leamington"}&source=${source}`;
 return <section className="ht-section bg-white"><div className="ht-shell"><div className="ht-card grid overflow-hidden lg:grid-cols-2">
  <Link href={href} aria-label={es ? "Solicitar Food Truck para un evento" : "Book the Food Truck for an event"} className="block bg-neutral-100"><FoodTruckImage className="h-full w-full max-h-[430px] min-h-[250px] object-cover" /></Link>
  <div className="flex flex-col justify-center p-7 md:p-10"><p className="text-sm font-extrabold uppercase tracking-widest text-[#d81920]">Hot Tacos Food Truck</p><h2 className="mt-3 text-3xl font-black">{es ? "¡Llevamos Hot Tacos a tu evento!" : "Bring Hot Tacos to your event!"}</h2><p className="mt-4 text-neutral-700">{es ? "Bodas, graduaciones, fiestas privadas, festivales y eventos corporativos. Cuéntanos qué organizas y solicita información." : "Weddings, graduations, private celebrations, festivals and corporate events. Tell us what you are planning."}</p><Link href={href} className="ht-btn ht-btn-primary mt-6 self-start">{es ? "Solicita nuestro Food Truck →" : "Book our Food Truck →"}</Link></div>
 </div></div></section>;
}
