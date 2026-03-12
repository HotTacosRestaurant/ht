"use client";

import { SOCIALS } from "@/lib/site-data";
import { useLanguage } from "@/components/LanguageProvider";

export default function SiteFooter() {
  const { messages } = useLanguage();

  return (
    <footer className="mt-16 border-t border-black/10 bg-[#111111] pb-24 pt-10 text-white md:pb-10">
      <div className="ht-shell grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-xl font-black">Hot Tacos Restaurant</div>
          <p className="mt-3 max-w-sm text-sm text-white/75">
            {messages.footer.brandText}
          </p>
        </div>

        <div>
          <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#f4d000]">
            {messages.footer.quickLinks}
          </div>
          <div className="mt-3 grid gap-2 text-sm text-white/85">
            <a href="/menu">{messages.nav.menu}</a>
            <a href="/locations">{messages.nav.locations}</a>
            <a href="/reviews">{messages.nav.reviews}</a>
            <a href="/raffle">{messages.nav.raffle}</a>
            <a href="/catering">{messages.nav.catering}</a>
            <a href="/customer-experience">{messages.nav.experience}</a>
          </div>
        </div>

        <div>
          <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#f4d000]">
            {messages.footer.social}
          </div>
          <div className="mt-3 grid gap-2 text-sm text-white/85">
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
              {messages.nav.facebook}
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              {messages.nav.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}