"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { normalizePromoId } from "@/lib/promos";

export default function PromoCodeEntryPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const [code, setCode] = useState("");

  const labels =
    locale === "en"
      ? {
          eyebrow: "Hot Tacos Promotions",
          title: "Have a campaign code?",
          description: "Enter it below to see and claim your offer.",
          placeholder: "Example: TACO26",
          button: "See my offer",
        }
      : {
          eyebrow: "Promociones Hot Tacos",
          title: "¿Tienes un código de campaña?",
          description: "Ingresa el código para ver y reclamar tu promoción.",
          placeholder: "Ejemplo: TACO26",
          button: "Ver mi promoción",
        };

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizePromoId(code);
    if (!normalized) return;
    router.push(`/promo/${encodeURIComponent(normalized)}`);
  }

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-2xl">
        <div className="ht-card p-7 text-center md:p-10">
          <div className="text-sm font-black uppercase tracking-[0.16em] text-[#d81920]">
            {labels.eyebrow}
          </div>
          <div className="mt-4 text-6xl">🌮</div>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">{labels.title}</h1>
          <p className="mx-auto mt-3 max-w-lg text-neutral-600">{labels.description}</p>

          <form className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={submit}>
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder={labels.placeholder}
              className="min-h-12 flex-1 rounded-xl border border-black/10 px-4 text-center font-bold uppercase tracking-[0.08em] outline-none focus:border-black/30"
            />
            <button className="ht-btn ht-btn-primary" type="submit">
              {labels.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
