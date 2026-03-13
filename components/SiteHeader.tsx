"use client";

import Link from "next/link";
import Image from "next/image";
import { SOCIALS } from "@/lib/site-data";
import { useLanguage } from "@/components/LanguageProvider";
import { trackEvent } from "@/lib/analytics";

export default function SiteHeader() {
  const { messages, toggleLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f4d000]">
      <div className="ht-shell flex min-h-[72px] items-center justify-between gap-2 py-2 md:min-h-[110px] md:gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 md:gap-3">
          <div className="flex shrink-0 items-center justify-center overflow-visible">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FLogotipo%20HT%20sin%20contorno%201024%201024.png?alt=media&token=72adc113-58fe-4f15-8d32-9bb6c4744872"
              alt="Hot Tacos"
              width={88}
              height={88}
              priority
              className="h-[42px] w-[42px] object-contain sm:h-[48px] sm:w-[48px] md:h-[84px] md:w-[84px]"
            />
          </div>

          <div className="min-w-0 leading-none">
            <div className="truncate text-[16px] font-black tracking-tight sm:text-[18px] md:text-[34px]">
              HOT TACOS
            </div>
            <div className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.22em] md:block md:text-[16px]">
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

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => {
              trackEvent("locale_toggle", {
                cta_location: "header",
              });
              toggleLocale();
            }}
            className="rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-bold"
          >
            {messages.nav.language}
          </button>

          <Link
            href="/locations"
            className="hidden md:inline-flex ht-btn ht-btn-dark text-sm"
            onClick={() =>
              trackEvent("nav_click", {
                cta_location: "header",
                cta_label: "order_now",
                destination: "/locations",
              })
            }
          >
            {messages.nav.orderNow}
          </Link>
        </div>
      </div>
    </header>
  );
}