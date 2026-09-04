"use client";

import { useEffect, useMemo, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { createRaffleEntry, type RaffleBranchKey } from "@/lib/raffles";
import { trackRaffleSubmit } from "@/lib/analytics";
import { useLanguage } from "@/components/LanguageProvider";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function RafflePage() {
  const { locale } = useLanguage();

  const [branchKey, setBranchKey] = useState<RaffleBranchKey>("leamington");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const branch = params.get("branch");
    if (branch === "leamington" || branch === "windsor") {
      setBranchKey(branch as RaffleBranchKey);
    }
  }, []);

  const labels = useMemo(() => {
    if (locale === "en") {
      return {
        eyebrow: "Raffle",
        title: "Enter the raffle",
        description:
          "",
        branch: "Branch",
        leamington: "Leamington",
        windsor: "Windsor",
        fullName: "Full name",
        phone: "Phone number",
        email: "Email (optional)",
        terms: "I accept the terms and conditions",
        marketing: "Yes, I would like to receive Hot Tacos promotions and offers by email or text. I can unsubscribe at any time.",
        submit: "Enter raffle",
        loading: "Sending...",
        success: "Done. Your entry was registered.",
        error: "Could not save your entry. Please try again.",
        invalidName: "Please enter your name.",
        invalidPhone: "Please enter a phone number.",
        invalidTerms: "You must accept the terms.",
      };
    }

    return {
      eyebrow: "Rifa",
      title: "Participa en la rifa",
      description:
        "",
      branch: "Sucursal",
      leamington: "Leamington",
      windsor: "Windsor",
      fullName: "Nombre completo",
      phone: "Teléfono",
      email: "Email (opcional)",
      terms: "Acepto términos y condiciones",
      marketing: "Sí, quiero recibir promociones y ofertas de Hot Tacos por email o SMS. Puedo darme de baja en cualquier momento.",
      submit: "Participar",
      loading: "Enviando...",
      success: "Listo. Tu registro fue guardado.",
      error: "No se pudo guardar tu registro. Intenta de nuevo.",
      invalidName: "Ingresa tu nombre.",
      invalidPhone: "Ingresa un teléfono.",
      invalidTerms: "Debes aceptar los términos.",
    };
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage(labels.invalidName);
      return;
    }

    if (!phone.trim()) {
      setErrorMessage(labels.invalidPhone);
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage(labels.invalidTerms);
      return;
    }

    try {
      setStatus("loading");

      await createRaffleEntry({
        fullName,
        phone,
        email,
        acceptedTerms,
        marketingConsent,
        branchKey,
        locale,
      });

      trackRaffleSubmit(branchKey, locale);

      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setAcceptedTerms(false);
      setMarketingConsent(false);
      setBranchKey("leamington");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(labels.error);
    }
  }

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-3xl">
        <SectionTitle
          eyebrow={labels.eyebrow}
          title={labels.title}
          description={labels.description}
        />

        <div className="ht-card p-6 md:p-8">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">{labels.branch}</span>
              <select
                value={branchKey}
                onChange={(e) => setBranchKey(e.target.value as RaffleBranchKey)}
                className="rounded-xl border border-black/10 px-4 py-3 outline-none"
              >
                <option value="leamington">{labels.leamington}</option>
                <option value="windsor">{labels.windsor}</option>
              </select>
            </label>

            <input
              type="text"
              placeholder={labels.fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />

            <input
              type="tel"
              placeholder={labels.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />

            <input
              type="email"
              placeholder={labels.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span>{labels.terms}</span>
            </label>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5"
              />
              <span>{labels.marketing}</span>
            </label>

            <button
              type="submit"
              className="ht-btn ht-btn-primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? labels.loading : labels.submit}
            </button>
          </form>

          {status === "success" ? (
            <p className="mt-4 text-sm text-green-700">{labels.success}</p>
          ) : null}

          {errorMessage ? (
            <p className="mt-4 text-sm text-red-700">{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}