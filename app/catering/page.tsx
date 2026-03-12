"use client";

import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/components/LanguageProvider";

export default function CateringPage() {
  const { messages } = useLanguage();

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-4xl">
        <SectionTitle
          eyebrow={messages.cateringPage.eyebrow}
          title={messages.cateringPage.title}
          description={messages.cateringPage.description}
        />

        <div className="ht-card p-6 md:p-8">
          <p className="text-neutral-700">{messages.cateringPage.body}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/locations/leamington" className="ht-btn ht-btn-primary">
              Leamington
            </a>
            <a href="/locations/windsor" className="ht-btn ht-btn-secondary">
              Windsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}