"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { trackEvent } from "@/lib/analytics";

export default function QuickActions() {
  const { messages } = useLanguage();

  return (
    <section className="ht-section">
      <div className="ht-shell">
        <div className="ht-grid-3">
          <Link href="/menu" className="ht-card p-5"
            onClick={() =>
              trackEvent("quick_action_click", {
                cta_label: "menu",
                destination: "/menu",
              })
            }>
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              {messages.quick.menuTitle}
            </div>
            <div className="mt-2 text-xl font-black">{messages.quick.menuTitle}</div>
            <p className="mt-2 text-sm text-neutral-600">
              {messages.quick.menuBody}
            </p>
          </Link>

          <Link href="/locations" className="ht-card p-5"
          onClick={() =>
            trackEvent("quick_action_click", {
              cta_label: "locations",
              destination: "/locations",
            })
          }>
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              {messages.quick.locationsTitle}
            </div>
            <div className="mt-2 text-xl font-black">
              {messages.quick.locationsTitle}
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              {messages.quick.locationsBody}
            </p>
          </Link>

          <Link href="/raffle" className="ht-card p-5"
            onClick={() =>
              trackEvent("quick_action_click", {
                cta_label: "raffle",
                destination: "/raffle",
              })
            }>
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              {messages.quick.raffleTitle}
            </div>
            <div className="mt-2 text-xl font-black">{messages.quick.raffleTitle}</div>
            <p className="mt-2 text-sm text-neutral-600">
              {messages.quick.raffleBody}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}