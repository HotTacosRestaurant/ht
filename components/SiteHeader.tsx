"use client";

import Link from "next/link";
import { SOCIALS } from "@/app/lib/site-data";
import { useLanguage } from "@/components/LanguageProvider";

export default function SiteHeader() {
  const { messages, toggleLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f4d000]">
      <div className="ht-shell flex min-h-72px items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-[#d81920] px-3 py-2 text-sm font-black text-white">
            HOT
          </div>
          <div className="leading-none">
            <div className="text-lg font-black tracking-tight">HOT TACOS</div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em]">
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
          <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
            Instagram
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