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
      <div className="ht-shell flex min-h-[72px] items-center gap-2 px-2 py-2 md:min-h-[92px] lg:min-h-[104px] lg:gap-3 lg:px-3 xl:min-h-[112px] xl:px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 lg:gap-2.5 xl:gap-3">
          <div className="flex w-[34px] shrink-0 items-center justify-center overflow-hidden sm:w-[40px] lg:w-[44px] xl:w-[72px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FLogotipo%20HT%20sin%20contorno%201024%201024.png?alt=media&token=72adc113-58fe-4f15-8d32-9bb6c4744872"
              alt="Hot Tacos"
              width={88}
              height={88}
              priority
              className="h-[40px] w-[40px] object-contain sm:h-[44px] sm:w-[44px] lg:h-[44px] lg:w-[44px] xl:h-[72px] xl:w-[72px]"
            />
          </div>

          <div className="min-w-0 leading-none">
            <div className="whitespace-nowrap text-[14px] font-black tracking-tight sm:text-[16px] lg:text-[18px] xl:text-[34px]">
              HOT TACOS
            </div>
            <div className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px] lg:text-[11px] xl:text-[16px] xl:tracking-[0.18em]">
              RESTAURANT
            </div>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 text-[11px] font-semibold lg:flex xl:gap-5 xl:text-sm">
          <Link href="/" className="whitespace-nowrap">
            {messages.nav.home}
          </Link>
          <Link href="/menu" className="whitespace-nowrap">
            {messages.nav.menu}
          </Link>
          <Link href="/locations" className="whitespace-nowrap">
            {messages.nav.locations}
          </Link>
          <Link href="/reviews" className="whitespace-nowrap">
            {messages.nav.reviews}
          </Link>
          <Link href="/raffle" className="whitespace-nowrap">
            {messages.nav.raffle}
          </Link>
          <Link href="/catering" className="whitespace-nowrap">
            {messages.nav.catering}
          </Link>
          <Link href="/customer-experience" className="whitespace-nowrap">
            {messages.nav.experience}
          </Link>
          <a
            href={SOCIALS.facebook}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap"
          >
            {messages.nav.facebook}
          </a>
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap"
          >
            {messages.nav.instagram}
          </a>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:gap-2">
          <button
            type="button"
            onClick={() => {
              trackEvent("locale_toggle", {
                cta_location: "header",
              });
              toggleLocale();
            }}
            className="inline-flex h-7 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white px-2 text-[10px] font-bold lg:h-8 lg:px-2.5 lg:text-[11px] xl:h-10 xl:px-4 xl:text-xs"
          >
            {messages.nav.language}
          </button>

          <Link
            href="/locations"
            className="inline-flex h-7 shrink-0 items-center rounded-full bg-black px-2.5 text-[10px] font-bold no-underline lg:h-8 lg:px-3 lg:text-[11px] xl:h-10 xl:px-5 xl:text-sm"
            style={{ color: "#ffffff", textDecoration: "none" }}
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