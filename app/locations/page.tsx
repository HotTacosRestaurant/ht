"use client";

import SectionTitle from "@/components/SectionTitle";
import { BRANCHES, FEATURED_ITEMS, SOCIALS } from "@/lib/site-data";
import { useLanguage } from "@/components/LanguageProvider";

export default function WindsorPage() {
  const branch = BRANCHES.windsor;
  const { messages, locale } = useLanguage();

  const links = {
    order:
      "https://order.toasttab.com/online/hot-tacos-windsor",
    rewardsSignup:
      "https://www.toasttab.com/hot-tacos-windsor/rewardsSignup",
    rewards:
      "https://www.toasttab.com/hot-tacos-windsor/rewards",
    giftCardPurchase:
      "https://order.toasttab.com/egiftcards/hot-tacos-windsor",
    giftCardBalance:
      "https://www.toasttab.com/hot-tacos-windsor/findcard",
    feedback:
      "https://www.toasttab.com/feedback/35a28d6f-51fb-497f-86eb-75e5dea67b80",
    instagram:
      "https://www.instagram.com/hottacoswindsor/",
  };

  const labels =
    locale === "es"
      ? {
          rewardsTitle: "Rewards y Gift Cards",
          joinRewards: "Únete a Rewards",
          checkRewards: "Consultar mis puntos",
          buyGiftCard: "Comprar Gift Card",
          checkGiftCardBalance: "Consultar saldo",
          feedbackTitle: "Tu experiencia",
          feedback: "Compartir comentarios",
        }
      : {
          rewardsTitle: "Rewards & Gift Cards",
          joinRewards: "Join Rewards",
          checkRewards: "Check My Rewards",
          buyGiftCard: "Buy a Gift Card",
          checkGiftCardBalance: "Check Gift Card Balance",
          feedbackTitle: "Your Experience",
          feedback: "Share Feedback",
        };

  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow={messages.branchPage.windsorEyebrow}
          title={branch.name}
          description={messages.branchPage.description}
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
                href={links.order}
                target="_blank"
                rel="noreferrer"
                className="ht-btn ht-btn-primary"
              >
                {messages.branchPage.orderOnline}
              </a>

              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="ht-btn ht-btn-secondary"
              >
                {messages.branchPage.directions}
              </a>

              <a
                href={branch.phoneHref}
                className="ht-btn border border-black/10"
              >
                {messages.branchPage.call}
              </a>

              <a
                href="/menu"
                className="ht-btn border border-black/10"
              >
                {messages.branchPage.viewMenu}
              </a>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
                {labels.rewardsTitle}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={links.rewardsSignup}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {labels.joinRewards}
                </a>

                <a
                  href={links.rewards}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {labels.checkRewards}
                </a>

                <a
                  href={links.giftCardPurchase}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {labels.buyGiftCard}
                </a>

                <a
                  href={links.giftCardBalance}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {labels.checkGiftCardBalance}
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
                {labels.feedbackTitle}
              </div>

              <div className="mt-3">
                <a
                  href={links.feedback}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {labels.feedback}
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
                {messages.branchPage.social}
              </div>

              <div className="mt-3 flex gap-3">
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {messages.nav.facebook}
                </a>

                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="ht-btn border border-black/10"
                >
                  {messages.nav.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 ht-card p-6">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
            {messages.branchPage.menuHighlightsWindsor}
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