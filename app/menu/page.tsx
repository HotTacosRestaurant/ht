import SectionTitle from "@/components/SectionTitle";
import { BRANCHES, FEATURED_ITEMS } from "@/lib/site-data";

export default function MenuPage() {
  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow="Menu"
          title="Different menu by branch"
          description="Do not mix them. Keep each menu tied to its branch so users do not get confused."
        />

        <div className="ht-grid-2">
          <div className="ht-card p-6">
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              Leamington
            </div>
            <h2 className="mt-2 text-3xl font-black">
              {BRANCHES.leamington.name}
            </h2>
            <p className="mt-3 text-sm text-neutral-700">
              {BRANCHES.leamington.address}
            </p>

            <ul className="mt-5 grid gap-2 text-sm text-neutral-700">
              {FEATURED_ITEMS.leamington.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BRANCHES.leamington.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="ht-btn ht-btn-primary"
              >
                Full Menu / Order
              </a>
              <a href="/locations/leamington" className="ht-btn border border-black/10">
                Branch Details
              </a>
            </div>
          </div>

          <div className="ht-card p-6">
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              Windsor
            </div>
            <h2 className="mt-2 text-3xl font-black">{BRANCHES.windsor.name}</h2>
            <p className="mt-3 text-sm text-neutral-700">
              {BRANCHES.windsor.address}
            </p>

            <ul className="mt-5 grid gap-2 text-sm text-neutral-700">
              {FEATURED_ITEMS.windsor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BRANCHES.windsor.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="ht-btn ht-btn-primary"
              >
                Full Menu / Order
              </a>
              <a href="/locations/windsor" className="ht-btn border border-black/10">
                Branch Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}