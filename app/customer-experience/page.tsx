"use client";

import { useMemo, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import {
  createCustomerExperienceEntry,
  type ExperienceBranchKey,
} from "@/lib/customer-experience";
import { useLanguage } from "@/components/LanguageProvider";
import { trackExperienceSubmit } from "@/lib/analytics";

type SubmitStatus = "idle" | "loading" | "success" | "error";
type VisitType = "dine_in" | "takeout" | "delivery" | "other";

export default function CustomerExperiencePage() {
  const { locale } = useLanguage();

  const [branchKey, setBranchKey] = useState<ExperienceBranchKey>("leamington");
  const [visitType, setVisitType] = useState<VisitType>("dine_in");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const labels = useMemo(() => {
    if (locale === "en") {
      return {
        eyebrow: "Customer Experience",
        title: "Tell us what happened",
        description:
          "This is for service feedback, issues, compliments, or suggestions. It writes into a separate V2 Firestore collection.",
        fullName: "Full name",
        phone: "Phone (optional)",
        email: "Email (optional)",
        branch: "Branch",
        visitType: "Visit type",
        message: "Message",
        dineIn: "Dine in",
        takeout: "Takeout",
        delivery: "Delivery",
        other: "Other",
        submit: "Send message",
        loading: "Sending...",
        success: "Thanks. Your message was submitted.",
        error: "Could not save your message. Please try again.",
        invalidName: "Please enter your name.",
        invalidMessage: "Please write a message.",
      };
    }

    return {
      eyebrow: "Experiencia del Cliente",
      title: "Cuéntanos qué pasó",
      description:
        "Esto es para feedback de servicio, problemas, felicitaciones o sugerencias.",
      fullName: "Nombre completo",
      phone: "Teléfono (opcional)",
      email: "Email (opcional)",
      branch: "Sucursal",
      visitType: "Tipo de visita",
      message: "Mensaje",
      dineIn: "Comer en sitio",
      takeout: "Para llevar",
      delivery: "Entrega",
      other: "Otro",
      submit: "Enviar mensaje",
      loading: "Enviando...",
      success: "Gracias. Tu mensaje fue enviado.",
      error: "No se pudo guardar tu mensaje. Intenta de nuevo.",
      invalidName: "Ingresa tu nombre.",
      invalidMessage: "Escribe un mensaje.",
    };
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage(labels.invalidName);
      return;
    }

    if (!message.trim()) {
      setErrorMessage(labels.invalidMessage);
      return;
    }

    try {
      setStatus("loading");

      await createCustomerExperienceEntry({
        fullName,
        phone,
        email,
        branchKey,
        visitType,
        message,
        locale,
      });
      trackExperienceSubmit(branchKey, visitType, locale);
      setStatus("success");
      setBranchKey("leamington");
      setVisitType("dine_in");
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
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
            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={branchKey}
                onChange={(e) =>
                  setBranchKey(e.target.value as ExperienceBranchKey)
                }
                className="rounded-xl border border-black/10 px-4 py-3 outline-none"
              >
                <option value="leamington">Leamington</option>
                <option value="windsor">Windsor</option>
              </select>

              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value as VisitType)}
                className="rounded-xl border border-black/10 px-4 py-3 outline-none"
              >
                <option value="dine_in">{labels.dineIn}</option>
                <option value="takeout">{labels.takeout}</option>
                <option value="delivery">{labels.delivery}</option>
                <option value="other">{labels.other}</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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
            </div>

            <input
              type="email"
              placeholder={labels.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />

            <textarea
              placeholder={labels.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none"
            />

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