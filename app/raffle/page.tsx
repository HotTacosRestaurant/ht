"use client";

import SectionTitle from "@/components/SectionTitle";
import { trackRaffleClick } from "@/lib/analytics";

export default function RafflePage() {
  return (
    <section className="ht-section">
      <div className="ht-shell max-w-3xl">
        <SectionTitle
          eyebrow="Raffle"
          title="Enter the raffle"
          description="For this audience, asking for personal info only works when the benefit is obvious. Keep it direct."
        />

        <div className="ht-card p-6 md:p-8">
          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />

            <button
              type="submit"
              className="ht-btn ht-btn-primary"
              onClick={trackRaffleClick}
            >
              Enter Raffle
            </button>
          </form>

          <p className="mt-4 text-sm text-neutral-600">
            Keep the reward visible. The form alone is not enough.
          </p>
        </div>
      </div>
    </section>
  );
}