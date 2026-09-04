"use client";

import { useEffect, useMemo, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { createCateringLead, type CateringBranchKey } from "@/lib/catering";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function CateringPage() {
  const { locale } = useLanguage();
  const [branchKey, setBranchKey] = useState<CateringBranchKey>("leamington");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const branch = params.get("branch");
    if (branch === "leamington" || branch === "windsor") setBranchKey(branch);
  }, []);

  const labels = useMemo(() => locale === "en" ? {
    eyebrow: "Catering",
    title: "Plan your event with Hot Tacos",
    description: "Tell us what you need and our team can follow up with a catering proposal.",
    fullName: "Contact name",
    organization: "Company / organization (optional)",
    email: "Email",
    phone: "Phone",
    eventDate: "Event date",
    guestCount: "Estimated guests",
    eventType: "Type of event",
    message: "Anything else we should know?",
    submit: "Request catering",
    sending: "Sending...",
    success: "Thanks. Your catering request was submitted.",
    error: "Could not submit your request. Please try again.",
  } : {
    eyebrow: "Catering",
    title: "Planea tu evento con Hot Tacos",
    description: "Cuéntanos qué necesitas y nuestro equipo podrá dar seguimiento con una propuesta de catering.",
    fullName: "Nombre de contacto",
    organization: "Empresa / organización (opcional)",
    email: "Email",
    phone: "Teléfono",
    eventDate: "Fecha del evento",
    guestCount: "Invitados estimados",
    eventType: "Tipo de evento",
    message: "¿Algo más que debamos saber?",
    submit: "Solicitar catering",
    sending: "Enviando...",
    success: "Gracias. Tu solicitud de catering fue enviada.",
    error: "No se pudo enviar tu solicitud. Intenta de nuevo.",
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError(locale === "en" ? "Name, email and phone are required." : "Nombre, email y teléfono son obligatorios.");
      return;
    }

    try {
      setStatus("loading");
      const params = new URLSearchParams(window.location.search);
      await createCateringLead({
        branchKey, fullName, organization, email, phone, eventDate, guestCount,
        eventType, message, locale, source: params.get("source") || "website",
      });
      setStatus("success");
      setFullName(""); setOrganization(""); setEmail(""); setPhone("");
      setEventDate(""); setGuestCount(""); setEventType(""); setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(labels.error);
    }
  }

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-4xl">
        <SectionTitle eyebrow={labels.eyebrow} title={labels.title} description={labels.description} />
        <div className="ht-card p-6 md:p-8">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <select value={branchKey} onChange={(e) => setBranchKey(e.target.value as CateringBranchKey)} className="rounded-xl border border-black/10 px-4 py-3 outline-none">
                <option value="leamington">Leamington</option>
                <option value="windsor">Windsor</option>
              </select>
              <input type="text" placeholder={labels.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder={labels.organization} value={organization} onChange={(e) => setOrganization(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
              <input type="text" placeholder={labels.eventType} value={eventType} onChange={(e) => setEventType(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input type="email" placeholder={labels.email} value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
              <input type="tel" placeholder={labels.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">{labels.eventDate}<input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 font-normal outline-none" /></label>
              <input type="number" min="1" placeholder={labels.guestCount} value={guestCount} onChange={(e) => setGuestCount(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <textarea rows={5} placeholder={labels.message} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            <button type="submit" disabled={status === "loading"} className="ht-btn ht-btn-primary">{status === "loading" ? labels.sending : labels.submit}</button>
          </form>
          {status === "success" ? <p className="mt-4 text-sm text-green-700">{labels.success}</p> : null}
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
