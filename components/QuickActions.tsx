import Link from "next/link";

export default function QuickActions() {
  return (
    <section className="ht-section">
      <div className="ht-shell">
        <div className="ht-grid-3">
          <Link href="/menu" className="ht-card p-5">
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              Menu
            </div>
            <div className="mt-2 text-xl font-black">See both branch menus</div>
            <p className="mt-2 text-sm text-neutral-600">
              Leamington and Windsor have different menus.
            </p>
          </Link>

          <Link href="/locations" className="ht-card p-5">
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              Locations
            </div>
            <div className="mt-2 text-xl font-black">Call, map, order</div>
            <p className="mt-2 text-sm text-neutral-600">
              Fast actions for people on the go.
            </p>
          </Link>

          <Link href="/raffle" className="ht-card p-5">
            <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
              Raffle
            </div>
            <div className="mt-2 text-xl font-black">Win something real</div>
            <p className="mt-2 text-sm text-neutral-600">
              Good for customers who respond to direct benefits.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}