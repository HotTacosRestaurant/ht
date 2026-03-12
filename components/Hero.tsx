import Link from "next/link";
import { SITE } from "@/app/lib/site-data";

export default function Hero() {
  return (
    <section className="ht-hero-bg">
      <div className="ht-shell py-16 text-white md:py-24">
        <div className="max-w-3xl">
          <span className="ht-pill">Authentic Mexican Food</span>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            HOT TACOS
            <span className="block text-[#f4d000]">Party in Every Bite</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">
            {SITE.valueLine} Choose your location, order fast, and enjoy your
            favourites without the wait.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/locations/leamington" className="ht-btn ht-btn-primary">
              Order Leamington
            </Link>

            <Link href="/locations/windsor" className="ht-btn ht-btn-secondary">
              Order Windsor
            </Link>

            <Link
              href="/menu"
              className="ht-btn border border-white/30 bg-white/10 text-white"
            >
              View Menus
            </Link>
          </div>

          <div className="mt-6 text-sm text-white/80">
            Fast links for mobile users. No clutter. Just pick a branch and go.
          </div>
        </div>
      </div>
    </section>
  );
}