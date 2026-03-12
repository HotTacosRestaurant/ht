import SectionTitle from "@/components/SectionTitle";

export default function CateringPage() {
  return (
    <section className="ht-section">
      <div className="ht-shell max-w-4xl">
        <SectionTitle
          eyebrow="Catering"
          title="Food for groups, parties, and events"
          description="Simple page for now. Enough to open a secondary sales path without making the site heavy."
        />

        <div className="ht-card p-6 md:p-8">
          <p className="text-neutral-700">
            Ask about catering for birthdays, family gatherings, work events,
            and celebrations.
          </p>

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