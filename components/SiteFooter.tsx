import { SOCIALS } from "@/app/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-[#111111] pb-24 pt-10 text-white md:pb-10">
      <div className="ht-shell grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-xl font-black">Hot Tacos Restaurant</div>
          <p className="mt-3 max-w-sm text-sm text-white/75">
            Authentic Mexican food, festive atmosphere, and fast ordering in
            Leamington and Windsor.
          </p>
        </div>

        <div>
          <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#f4d000]">
            Quick Links
          </div>
          <div className="mt-3 grid gap-2 text-sm text-white/85">
            <a href="/menu">Menu</a>
            <a href="/locations">Locations</a>
            <a href="/reviews">Reviews</a>
            <a href="/raffle">Raffle</a>
            <a href="/catering">Catering</a>
          </div>
        </div>

        <div>
          <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#f4d000]">
            Social
          </div>
          <div className="mt-3 grid gap-2 text-sm text-white/85">
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}