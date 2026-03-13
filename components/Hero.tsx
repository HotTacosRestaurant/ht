"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { messages } = useLanguage();

  return (
    <section className="ht-hero-bg">
      <div className="ht-shell grid min-h-[520px] items-center gap-8 py-12 text-white md:min-h-[560px] md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:py-20">
        <div className="max-w-3xl">
          <span className="ht-pill">{messages.hero.eyebrow}</span>

          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {messages.hero.title}
            <span className="mt-2 block text-[#f4d000]">
              {messages.hero.subtitle}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">
            {messages.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

        <div className="hidden items-center justify-center md:flex">
          <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full border border-white/10 bg-[#d81920]/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:h-[380px] lg:w-[380px] xl:h-[430px] xl:w-[430px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FLogotipo%20HT%20sin%20contorno%201024%201024.png?alt=media&token=72adc113-58fe-4f15-8d32-9bb6c4744872"
              alt="Hot Tacos logo"
              width={340}
              height={340}
              priority
              className="h-[220px] w-[220px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] lg:h-[270px] lg:w-[270px] xl:h-[320px] xl:w-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}