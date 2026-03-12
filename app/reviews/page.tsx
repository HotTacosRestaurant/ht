import SectionTitle from "@/components/SectionTitle";

export default function ReviewsPage() {
  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow="Reviews"
          title="Why locals keep coming back"
          description="This page can later be connected to your existing review flow. For now, keep it simple and clear."
        />

        <div className="ht-grid-3">
          <article className="ht-card p-6">
            <div className="text-[#d81920]">★★★★★</div>
            <p className="mt-3 text-sm text-neutral-700">
              Great flavour, generous portions, and fast service.
            </p>
          </article>

          <article className="ht-card p-6">
            <div className="text-[#d81920]">★★★★★</div>
            <p className="mt-3 text-sm text-neutral-700">
              Tastes like home. Perfect spot for authentic Mexican food.
            </p>
          </article>

          <article className="ht-card p-6">
            <div className="text-[#d81920]">★★★★★</div>
            <p className="mt-3 text-sm text-neutral-700">
              Good value, strong portions, and a festive atmosphere.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}