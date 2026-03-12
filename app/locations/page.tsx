"use client";

import SectionTitle from "@/components/SectionTitle";
import LocationCard from "@/components/LocationCard";
import { BRANCHES } from "@/lib/site-data";
import { useLanguage } from "@/components/LanguageProvider";

export default function LocationsPage() {
  const { messages } = useLanguage();

  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow={messages.locationsPage.eyebrow}
          title={messages.locationsPage.title}
          description={messages.locationsPage.description}
        />

        <div className="ht-grid-2">
          <LocationCard branch={BRANCHES.leamington} />
          <LocationCard branch={BRANCHES.windsor} />
        </div>
      </div>
    </section>
  );
}