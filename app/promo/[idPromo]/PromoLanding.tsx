"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { trackEvent } from "@/lib/analytics";
import type { PromoCampaignPublic, PromoClaimResult } from "@/lib/promos";
import { claimPromoCampaign, getPromoCampaign } from "@/lib/promos.client";

type Props = {
  idPromo: string;
};

type Status = "loading" | "ready" | "submitting" | "success" | "invalid" | "error";

export default function PromoLanding({ idPromo }: Props) {
  const { locale } = useLanguage();
  const [campaign, setCampaign] = useState<PromoCampaignPublic | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [result, setResult] = useState<PromoClaimResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const labels = useMemo(
    () =>
      locale === "en"
        ? {
            loading: "Loading offer...",
            invalidTitle: "This promotion is not available",
            invalidBody: "The campaign code is invalid, inactive, or has expired.",
            fullName: "Full name",
            phone: "Mobile phone",
            email: "Email (optional)",
            terms: "I accept the promotion terms and conditions.",
            marketing:
              "Yes, I want to receive Hot Tacos promotions and offers by email or text. I can unsubscribe at any time.",
            claim: "Claim my offer",
            claiming: "Checking your offer...",
            required: "Please complete all required fields and accept the terms.",
            genericError: "We could not process your request. Please try again.",
            yourCode: "Your Toast promo code",
            newClaim: "Your offer is ready!",
            duplicate: "You already claimed this campaign. Here is your promo code again.",
            showAtRestaurant: "Show this code at Hot Tacos when ordering.",
            copy: "Copy code",
            copied: "Copied",
            locations: "Participating locations",
            validUntil: "Valid until",
          }
        : {
            loading: "Cargando promoción...",
            invalidTitle: "Esta promoción no está disponible",
            invalidBody: "El código de campaña es inválido, está inactivo o ya venció.",
            fullName: "Nombre completo",
            phone: "Teléfono móvil",
            email: "Email (opcional)",
            terms: "Acepto los términos y condiciones de la promoción.",
            marketing:
              "Sí, quiero recibir promociones y ofertas de Hot Tacos por email o SMS. Puedo darme de baja en cualquier momento.",
            claim: "Obtener mi promoción",
            claiming: "Validando tu promoción...",
            required: "Completa todos los campos requeridos y acepta los términos.",
            genericError: "No pudimos procesar tu solicitud. Intenta de nuevo.",
            yourCode: "Tu código promocional de Toast",
            newClaim: "¡Tu promoción está lista!",
            duplicate: "Ya reclamaste esta campaña. Aquí tienes nuevamente tu código.",
            showAtRestaurant: "Muestra este código en Hot Tacos al ordenar.",
            copy: "Copiar código",
            copied: "Copiado",
            locations: "Sucursales participantes",
            validUntil: "Válido hasta",
          },
    [locale],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCampaign() {
      try {
        setStatus("loading");
        const promoCampaign = await getPromoCampaign(idPromo);

        if (!promoCampaign) {
          if (!cancelled) setStatus("invalid");
          return;
        }

        if (cancelled) return;

        setCampaign(promoCampaign);
        setStatus("ready");
        trackEvent("promo_view", {
          promo_id: promoCampaign.id,
          reward_name: promoCampaign.rewardName,
        });
      } catch (error) {
        console.error(error);
        if (!cancelled) setStatus("error");
      }
    }

    void loadCampaign();
    return () => {
      cancelled = true;
    };
  }, [idPromo]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !phone.trim() || !acceptedTerms) {
      setErrorMessage(labels.required);
      return;
    }

    try {
      setStatus("submitting");
      const params = new URLSearchParams(window.location.search);
      const data = await claimPromoCampaign(idPromo, {
        fullName,
        phone,
        email,
        acceptedTerms,
        marketingConsent,
        locale,
        utm: {
          source: params.get("utm_source"),
          medium: params.get("utm_medium"),
          campaign: params.get("utm_campaign"),
          content: params.get("utm_content"),
          term: params.get("utm_term"),
        },
      });

      setResult(data);
      setStatus("success");

      trackEvent("promo_claim", {
        promo_id: campaign?.id || idPromo,
        reward_name: data.rewardName,
        claim_status: data.status,
        marketing_consent: marketingConsent,
      });

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: campaign?.name || idPromo,
          content_category: "promotion",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus("ready");
      setErrorMessage(labels.genericError);
    }
  }

  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!result?.toastPromoCode) return;
    await navigator.clipboard.writeText(result.toastPromoCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (status === "loading") {
    return (
      <section className="ht-section">
        <div className="ht-shell max-w-3xl text-center">
          <p className="text-lg font-bold">{labels.loading}</p>
        </div>
      </section>
    );
  }

  if (status === "invalid" || status === "error" || !campaign) {
    return (
      <section className="ht-section">
        <div className="ht-shell max-w-3xl">
          <div className="ht-card p-8 text-center">
            <div className="text-5xl">🌮</div>
            <h1 className="mt-4 text-3xl font-black">{labels.invalidTitle}</h1>
            <p className="mt-3 text-neutral-600">{labels.invalidBody}</p>
            <a href="/promo" className="ht-btn ht-btn-primary mt-6">
              {locale === "en" ? "Enter another code" : "Ingresar otro código"}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-4xl">
        <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.10)]">
          {campaign.imageUrl ? (
            <div className="relative aspect-[16/7] w-full bg-neutral-100">
              <Image
                src={campaign.imageUrl}
                alt={campaign.rewardName}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center bg-[#f4d000] px-6 text-center">
              <div>
                <div className="text-6xl">🌮</div>
                <div className="mt-3 text-sm font-black uppercase tracking-[0.18em]">Hot Tacos</div>
              </div>
            </div>
          )}

          <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-10">
            <div>
              <span className="ht-pill">{campaign.rewardName}</span>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                {campaign.headline}
              </h1>
              {campaign.description ? (
                <p className="mt-4 text-lg leading-7 text-neutral-600">{campaign.description}</p>
              ) : null}

              {campaign.locations.length > 0 ? (
                <div className="mt-6 text-sm text-neutral-600">
                  <span className="font-bold text-neutral-900">{labels.locations}: </span>
                  {campaign.locations.join(", ")}
                </div>
              ) : null}

              {campaign.endDate ? (
                <div className="mt-2 text-sm text-neutral-600">
                  <span className="font-bold text-neutral-900">{labels.validUntil}: </span>
                  {new Intl.DateTimeFormat(locale === "en" ? "en-CA" : "es-MX", {
                    dateStyle: "medium",
                  }).format(new Date(campaign.endDate))}
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl bg-[#fff8dd] p-5 md:p-6">
              {status === "success" && result ? (
                <div className="text-center">
                  <div className="text-4xl">🎉</div>
                  <h2 className="mt-3 text-2xl font-black">
                    {result.status === "already_claimed" ? labels.duplicate : labels.newClaim}
                  </h2>
                  {campaign.successMessage ? (
                    <p className="mt-3 text-neutral-700">{campaign.successMessage}</p>
                  ) : null}
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-neutral-500">
                    {labels.yourCode}
                  </p>
                  <div className="mt-2 rounded-2xl border-2 border-dashed border-black/20 bg-white px-4 py-5 font-mono text-3xl font-black tracking-[0.12em]">
                    {result.toastPromoCode}
                  </div>
                  <p className="mt-4 text-sm text-neutral-600">
                    {campaign.redemptionInstructions || labels.showAtRestaurant}
                  </p>
                  <button type="button" onClick={copyCode} className="ht-btn ht-btn-dark mt-5 w-full">
                    {copied ? labels.copied : labels.copy}
                  </button>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder={labels.fullName}
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={labels.phone}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                  />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder={labels.email}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"
                  />

                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(event) => setAcceptedTerms(event.target.checked)}
                      className="mt-1"
                    />
                    <span>{labels.terms}</span>
                  </label>

                  <label className="flex items-start gap-3 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(event) => setMarketingConsent(event.target.checked)}
                      className="mt-1"
                    />
                    <span>{labels.marketing}</span>
                  </label>

                  <button
                    type="submit"
                    className="ht-btn ht-btn-primary mt-1 w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? labels.claiming : labels.claim}
                  </button>

                  {campaign.terms ? (
                    <p className="text-xs leading-5 text-neutral-500">{campaign.terms}</p>
                  ) : null}

                  {errorMessage ? <p className="text-sm font-semibold text-red-700">{errorMessage}</p> : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
