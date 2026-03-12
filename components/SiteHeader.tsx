"use client";

import Link from "next/link";
import Image from "next/image";
import { SOCIALS } from "@/lib/site-data";
import { useLanguage } from "@/components/LanguageProvider";

export default function SiteHeader() {
  const { messages, toggleLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f4d000]">
      <div className="ht-shell flex min-h-[96px] items-center justify-between gap-4 py-2 md:min-h-[110px]">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#d81920] shadow-sm md:h-[84px] md:w-[84px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FLogotipo%20HT%20sin%20contorno%201024%201024.png?alt=media&token=72adc113-58fe-4f15-8d32-9bb6c4744872"
              alt="Hot Tacos"
              width={140}
              height={140}
              priority
              className="h-[56px] w-[56px] object-contain md:h-[64px] md:w-[64px]"
            />
          </div>

          <div className="leading-none">
            <div className="text-[28px] font-black tracking-tight md:text-[34px]">
              HOT TACOS
            </div>
            <div className="mt-1 text-[14px] font-semibold uppercase tracking-[0.28em] md:text-[16px]">
              Restaurant
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
          <Link href="/">{messages.nav.home}</Link>
          <Link href="/menu">{messages.nav.menu}</Link>
          <Link href="/locations">{messages.nav.locations}</Link>
          <Link href="/reviews">{messages.nav.reviews}</Link>
          <Link href="/raffle">{messages.nav.raffle}</Link>
          <Link href="/catering">{messages.nav.catering}</Link>
          <Link href="/customer-experience">{messages.nav.experience}</Link>
          <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
            {messages.nav.facebook}
          </a>
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
            {messages.nav.instagram}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-bold"
          >
            {messages.nav.language}
          </button>

          <Link href="/locations" className="ht-btn ht-btn-dark text-sm">
            {messages.nav.orderNow}
          </Link>
        </div>
      </div>
    </header>
  );
}