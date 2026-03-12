import Hero from "@/components/Hero";
import QuickActions from "@/components/QuickActions";
import SectionTitle from "@/components/SectionTitle";
import LocationCard from "@/components/LocationCard";
import { BRANCHES, FEATURED_ITEMS } from "@/app/lib/site-data";

export default function HomePage() {
  return (
    <>
      <Hero />

      <QuickActions />

      <section className="ht-section">
        <div className="ht-shell">
          <SectionTitle
            eyebrow="Locations"
            title="Choose your branch fast"
            description="Most visitors already know what they want: food, price, location, and a quick way to order. Make that obvious."
          />

          <div className="ht-grid-2">
            <LocationCard branch={BRANCHES.leamington} />
            <LocationCard branch={BRANCHES.windsor} />
          </div>
        </div>
      </section>

      <section className="ht-section bg-white">
        <div className="ht-shell">
          <SectionTitle
            eyebrow="Menus"
            title="Different menu in each branch"
            description="Keep that distinction visible. Do not force users to guess which menu belongs to which location."
          />

          <div className="ht-grid-2">
            <div className="ht-card p-6">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
                Leamington
              </div>
              <h3 className="mt-2 text-2xl font-black">Popular items</h3>
              <ul className="mt-4 grid gap-2 text-sm text-neutral-700">
                {FEATURED_ITEMS.leamington.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-5 flex gap-3">
                <a
                  href={BRANCHES.leamington.orderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn ht-btn-primary"
                >
                  Order Leamington
                </a>
                <a href="/menu" className="ht-btn border border-black/10">
                  View Menu
                </a>
              </div>
            </div>

            <div className="ht-card p-6">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
                Windsor
              </div>
              <h3 className="mt-2 text-2xl font-black">Popular items</h3>
              <ul className="mt-4 grid gap-2 text-sm text-neutral-700">
                {FEATURED_ITEMS.windsor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-5 flex gap-3">
                <a
                  href={BRANCHES.windsor.orderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn ht-btn-primary"
                >
                  Order Windsor
                </a>
                <a href="/menu" className="ht-btn border border-black/10">
                  View Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ht-section">
        <div className="ht-shell">
          <div className="ht-card bg-[#111111] p-8 text-white">
            <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#f4d000]">
              Raffle + reviews
            </div>
            <h2 className="mt-3 text-3xl font-black">
              Keep the website useful, not noisy
            </h2>
            <p className="mt-3 max-w-2xl text-white/80">
              Reviews build trust. Raffles give people a reason to share their
              data. Both matter, but neither should get in the way of ordering.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/reviews" className="ht-btn ht-btn-secondary">
                See Reviews
              </a>
              <a href="/raffle" className="ht-btn ht-btn-primary">
                Enter Raffle
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="ht-sticky-spacer" />
    </>
  );
}