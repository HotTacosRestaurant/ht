"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { messages } = useLanguage();

  return (
    <section className="ht-hero-bg">
      <div className="ht-shell py-16 text-white md:py-24">
        <div className="max-w-3xl">
          <span className="ht-pill">{messages.hero.eyebrow}</span>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            {messages.hero.title}
            <span className="block text-[#f4d000]">{messages.hero.subtitle}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">
            {messages.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/locations/leamington" className="ht-btn ht-btn-primary">
              {messages.hero.orderLeamington}
            </Link>

            <Link href="/locations/windsor" className="ht-btn ht-btn-secondary">
              {messages.hero.orderWindsor}
            </Link>

            <Link
              href="/menu"
              className="ht-btn border border-white/30 bg-white/10 text-white"
            >
              {messages.hero.viewMenus}
            </Link>
          </div>

          <div className="mt-6 text-sm text-white/80">
            {messages.hero.helper}
          </div>
        </div>
      </div>
    </section>
  );
}