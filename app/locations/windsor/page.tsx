import SectionTitle from "@/components/SectionTitle";
import { BRANCHES, FEATURED_ITEMS, SOCIALS } from "@/app/lib/site-data";

export default function WindsorPage() {
  const branch = BRANCHES.windsor;

  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow="Windsor"
          title={branch.name}
          description="Fast path for customers who already know they want this branch."
        />

        <div className="ht-grid-2">
          <div className="ht-card overflow-hidden">
            <div className="aspect-16/10">
              <img
                src={branch.imageUrl}
                alt={branch.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="ht-card p-6">
            <h2 className="text-2xl font-black">{branch.address}</h2>
            <p className="mt-2 text-neutral-700">{branch.phoneDisplay}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={branch.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="ht-btn ht-btn-primary"
              >
                Order Online
              </a>
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="ht-btn ht-btn-secondary"
              >
                Directions
              </a>
              <a href={branch.phoneHref} className="ht-btn border border-black/10">
                Call
              </a>
              <a href="/menu" className="ht-btn border border-black/10">
                View Menu
              </a>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
                Social
              </div>
              <div className="mt-3 flex gap-3">
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  Facebook
                </a>
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 ht-card p-6">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
            Windsor Menu Highlights
          </div>
          <div className="mt-4 grid gap-2 text-sm text-neutral-700 md:grid-cols-2">
            {FEATURED_ITEMS.windsor.map((item) => (
              <div key={item}>• {item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}