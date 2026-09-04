"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { BRANCHES, type BranchKey } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import styles from "./EngageStation.module.css";
import {
  FaArrowRight,
  FaBullhorn,
  FaCalendarCheck,
  FaCommentDots,
  FaGift,
  FaHandshake,
  FaHandPointer,
  FaTicketAlt,
  FaTrophy,
  FaUtensils,
  FaUsers,
} from "react-icons/fa";

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FLogotipo%20HT%20sin%20contorno%201024%201024.png?alt=media&token=72adc113-58fe-4f15-8d32-9bb6c4744872";

const IDLE_MS = 90_000;
const PROMO_MS = 8_000;

type Tone = "red" | "yellow" | "dark";

type Action = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  tone: Tone;
};

type Promo = {
  kicker: string;
  title: string;
  body: string;
};

export default function EngageStation({ branchKey }: { branchKey: BranchKey }) {
  const { locale, toggleLocale } = useLanguage();
  const branch = BRANCHES[branchKey];
  const [attractMode, setAttractMode] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useMemo(
    () =>
      locale === "en"
        ? {
            touch: "Touch to explore",
            heading: "What would you like to do?",
            helper: "Tap any option to get started",
            gift: "Gift Cards",
            giftSub: "Buy or check your balance",
            rewards: "Rewards",
            rewardsSub: "Join and earn rewards",
            feedback: "Tell us how we did",
            feedbackSub: "Share your experience",
            order: "Order Online",
            orderSub: "Pickup or delivery",
            catering: "Catering",
            cateringSub: "Food for your next event",
            raffle: "Enter to Win",
            raffleSub: "Join our current giveaway",
            sponsor: "Sponsorship",
            sponsorSub: "Tell us about your project",
            vendor: "Invite us as a Vendor",
            vendorSub: "Bring Hot Tacos to your event",
            advertise: "Advertise with Us",
            advertiseSub: "Reach our local community",
            attractTitle: "More than great tacos.",
            attractSubtitle:
              "Rewards, gift cards, catering, community opportunities and more — all in one place.",
            media: "Hot Tacos highlights",
            footer: "Hot Tacos · Party in Every Bite",
            promos: [
              { kicker: "Hot Tacos Rewards", title: "Eat. Earn. Enjoy.", body: "Join Rewards and make every visit count." },
              { kicker: "Gift Cards", title: "Give a little more Hot Tacos.", body: "Buy an eGift Card or check an existing balance." },
              { kicker: "Order Online", title: "Your favorites, ready when you are.", body: "Order ahead for pickup or delivery." },
              { kicker: "Catering", title: "Bring the party to your event.", body: "Tell us what you are planning and let Hot Tacos handle the food." },
            ] as Promo[],
          }
        : {
            touch: "Toca para explorar",
            heading: "¿Qué quieres hacer?",
            helper: "Toca cualquier opción para comenzar",
            gift: "Gift Cards",
            giftSub: "Compra o consulta tu saldo",
            rewards: "Rewards",
            rewardsSub: "Regístrate y acumula beneficios",
            feedback: "Cuéntanos cómo lo hicimos",
            feedbackSub: "Comparte tu experiencia",
            order: "Ordenar en línea",
            orderSub: "Pickup o delivery",
            catering: "Catering",
            cateringSub: "Comida para tu próximo evento",
            raffle: "Participa y gana",
            raffleSub: "Entra a nuestra rifa vigente",
            sponsor: "Sponsorship",
            sponsorSub: "Cuéntanos sobre tu proyecto",
            vendor: "Invítanos como Vendor",
            vendorSub: "Lleva Hot Tacos a tu evento",
            advertise: "Anúnciate con nosotros",
            advertiseSub: "Llega a nuestra comunidad local",
            attractTitle: "Mucho más que buenos tacos.",
            attractSubtitle:
              "Rewards, gift cards, catering, oportunidades con la comunidad y más, todo en un mismo lugar.",
            media: "Lo destacado en Hot Tacos",
            footer: "Hot Tacos · Fiesta en cada mordisco",
            promos: [
              { kicker: "Hot Tacos Rewards", title: "Come. Acumula. Disfruta.", body: "Únete a Rewards y haz que cada visita cuente." },
              { kicker: "Gift Cards", title: "Regala un poco más de Hot Tacos.", body: "Compra una eGift Card o consulta el saldo de la que ya tienes." },
              { kicker: "Ordena en línea", title: "Tus favoritos, listos cuando tú quieras.", body: "Ordena con anticipación para pickup o delivery." },
              { kicker: "Catering", title: "Lleva la fiesta a tu evento.", body: "Cuéntanos qué estás organizando y nosotros ponemos la comida." },
            ] as Promo[],
          },
    [locale]
  );

  const actions = useMemo<Action[]>(
    () => [
      { id: "gift", title: copy.gift, subtitle: copy.giftSub, href: branch.giftCardPurchaseUrl, icon: <FaGift />, tone: "red" },
      { id: "rewards", title: copy.rewards, subtitle: copy.rewardsSub, href: branch.rewardsSignupUrl, icon: <FaTrophy />, tone: "yellow" },
      { id: "feedback", title: copy.feedback, subtitle: copy.feedbackSub, href: `/customer-experience?branch=${branchKey}&source=engage`, icon: <FaCommentDots />, tone: "dark" },
      { id: "order", title: copy.order, subtitle: copy.orderSub, href: branch.orderUrl, icon: <FaUtensils />, tone: "red" },
      { id: "catering", title: copy.catering, subtitle: copy.cateringSub, href: `/catering?branch=${branchKey}&source=engage`, icon: <FaUsers />, tone: "yellow" },
      { id: "raffle", title: copy.raffle, subtitle: copy.raffleSub, href: `/raffle?branch=${branchKey}&source=engage`, icon: <FaTicketAlt />, tone: "dark" },
      { id: "sponsorship", title: copy.sponsor, subtitle: copy.sponsorSub, href: `/opportunities?type=sponsorship&branch=${branchKey}&source=engage`, icon: <FaHandshake />, tone: "red" },
      { id: "vendor", title: copy.vendor, subtitle: copy.vendorSub, href: `/opportunities?type=vendor&branch=${branchKey}&source=engage`, icon: <FaCalendarCheck />, tone: "yellow" },
      { id: "advertising", title: copy.advertise, subtitle: copy.advertiseSub, href: `/opportunities?type=advertising&branch=${branchKey}&source=engage`, icon: <FaBullhorn />, tone: "dark" },
    ],
    [branch, branchKey, copy]
  );

  const promo = copy.promos[promoIndex % copy.promos.length];

  function armIdleTimer() {
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setAttractMode(true), IDLE_MS);
  }

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        if (idleRef.current) clearTimeout(idleRef.current);
        setPromoIndex(0);
        setAttractMode(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (attractMode) return;

    armIdleTimer();
    const reset = () => armIdleTimer();
    window.addEventListener("pointerdown", reset, { passive: true });
    window.addEventListener("touchstart", reset, { passive: true });
    window.addEventListener("keydown", reset);

    return () => {
      window.removeEventListener("pointerdown", reset);
      window.removeEventListener("touchstart", reset);
      window.removeEventListener("keydown", reset);
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [attractMode]);

  useEffect(() => {
    if (attractMode) return;
    const interval = setInterval(() => {
      setPromoIndex((current) => (current + 1) % copy.promos.length);
    }, PROMO_MS);
    return () => clearInterval(interval);
  }, [attractMode, copy.promos.length]);

  function wake() {
    setAttractMode(false);
    setPromoIndex(0);
  }

  const toneClass = (tone: Tone) => {
    if (tone === "red") return styles.cardRed;
    if (tone === "yellow") return styles.cardYellow;
    return styles.cardDark;
  };

  if (attractMode) {
    return (
      <button
        type="button"
        className={styles.attract}
        onPointerDown={wake}
        onClick={wake}
        aria-label={copy.touch}
      >
        <img className={styles.attractImage} src={branch.imageUrl} alt="" aria-hidden="true" />
        <div className={styles.attractOverlay} />
        <div className={styles.attractInner}>
          <div className={styles.attractBrand}>
            <span className={styles.attractLogo}>
              <img src={LOGO_URL} alt="Hot Tacos" />
            </span>
            <span className={styles.attractBrandText}>
              <strong>HOT TACOS</strong>
              <span>{branch.shortName}</span>
            </span>
          </div>

          <div className={styles.attractCopy}>
            <span className={styles.attractEyebrow}>Hot Tacos Experience</span>
            <h1 className={styles.attractTitle}>{copy.attractTitle}</h1>
            <p className={styles.attractSubtitle}>{copy.attractSubtitle}</p>
          </div>

          <span className={styles.touch}>
            <span className={styles.touchIcon}><FaHandPointer /></span>
            {copy.touch}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brandWrap}>
          <span className={styles.logoMark}>
            <img src={LOGO_URL} alt="Hot Tacos" />
          </span>
          <span className={styles.brandText}>
            <strong className={styles.brand}>HOT TACOS</strong>
            <span className={styles.location}>{branch.shortName}</span>
          </span>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.language}
            onClick={() => {
              toggleLocale();
              armIdleTimer();
            }}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.promo} aria-label={copy.media}>
          <img className={styles.promoImage} src={branch.imageUrl} alt="" aria-hidden="true" />
          <div className={styles.promoOverlay} />
          <div className={styles.promoTop}>
            <span className={styles.locationBadge}>{branch.shortName}</span>
            <span className={styles.mediaBadge}>{copy.media}</span>
          </div>
          <div className={styles.promoCopy}>
            <span className={styles.promoKicker}>{promo.kicker}</span>
            <h2 className={styles.promoTitle}>{promo.title}</h2>
            <p className={styles.promoBody}>{promo.body}</p>
            <div className={styles.dots} aria-hidden="true">
              {copy.promos.map((_, index) => (
                <span key={index} className={`${styles.dot} ${index === promoIndex ? styles.dotActive : ""}`} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.actionsPanel}>
          <div className={styles.panelHeading}>
            <div>
              <h1>{copy.heading}</h1>
              <p>{copy.helper}</p>
            </div>
            <span className={styles.touchHint}>{locale === "en" ? "Touchscreen" : "Pantalla táctil"}</span>
          </div>

          <div className={styles.grid}>
            {actions.map((action) => {
              const cardContent = (
                <>
                  <span className={styles.cardTop}>
                    <span className={styles.icon}>{action.icon}</span>
                    <span className={styles.arrow}><FaArrowRight /></span>
                  </span>
                  <span className={styles.cardCopy}>
                    <strong className={styles.cardTitle}>{action.title}</strong>
                    <small className={styles.cardSubtitle}>{action.subtitle}</small>
                  </span>
                </>
              );

              const trackAction = () =>
                trackEvent("engage_action_click", {
                  action: action.id,
                  branch: branchKey,
                  locale,
                });

              if (action.href.startsWith("/")) {
                return (
                  <Link
                    key={action.id}
                    href={action.href}
                    className={`${styles.card} ${toneClass(action.tone)}`}
                    onClick={trackAction}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <a
                  key={action.id}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.card} ${toneClass(action.tone)}`}
                  onClick={trackAction}
                >
                  {cardContent}
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>{copy.footer}</span>
        <span><strong>{branch.shortName}</strong> · {branch.address}</span>
      </footer>
    </div>
  );
}
