"use client";

import { useEffect, useMemo, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/components/LanguageProvider";
import {
  createBusinessOpportunity,
  type OpportunityBranchKey,
  type OpportunityType,
} from "@/lib/business-opportunities";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function OpportunitiesPage() {
  const { locale } = useLanguage();
  const [type, setType] = useState<OpportunityType>("sponsorship");
  const [branchKey, setBranchKey] = useState<OpportunityBranchKey>("leamington");
  const [organization, setOrganization] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [expectedAttendance, setExpectedAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type");
    const b = params.get("branch");
    if (t === "sponsorship" || t === "vendor" || t === "advertising") setType(t);
    if (b === "leamington" || b === "windsor") setBranchKey(b);
  }, []);

  const labels = useMemo(() => locale === "en" ? {
    eyebrow: "Work with Hot Tacos",
    title: "Tell us about the opportunity",
    description: "Sponsorships, vendor invitations and local advertising opportunities are reviewed by our team.",
    sponsorship: "Request sponsorship",
    vendor: "Invite Hot Tacos as a vendor",
    advertising: "Advertise with Hot Tacos",
    organization: "Organization / business",
    contactName: "Contact name",
    email: "Email",
    phone: "Phone (optional)",
    eventDate: "Event date (if applicable)",
    attendance: "Expected attendance / audience (optional)",
    message: "Describe the project, event or advertising opportunity",
    submit: "Send request",
    sending: "Sending...",
    success: "Thanks. Your request was submitted for review.",
    error: "Could not submit your request. Please try again.",
  } : {
    eyebrow: "Colabora con Hot Tacos",
    title: "Cuéntanos sobre la oportunidad",
    description: "Nuestro equipo revisa solicitudes de sponsorship, invitaciones como vendor y oportunidades de publicidad local.",
    sponsorship: "Solicitar sponsorship",
    vendor: "Invitar a Hot Tacos como vendor",
    advertising: "Anunciarte con Hot Tacos",
    organization: "Organización / negocio",
    contactName: "Nombre de contacto",
    email: "Email",
    phone: "Teléfono (opcional)",
    eventDate: "Fecha del evento (si aplica)",
    attendance: "Asistencia / audiencia estimada (opcional)",
    message: "Describe el proyecto, evento u oportunidad publicitaria",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    success: "Gracias. Tu solicitud fue enviada para revisión.",
    error: "No se pudo enviar la solicitud. Intenta de nuevo.",
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!organization.trim() || !contactName.trim() || !email.trim() || !message.trim()) {
      setError(locale === "en" ? "Organization, contact, email and description are required." : "Organización, contacto, email y descripción son obligatorios.");
      return;
    }
    try {
      setStatus("loading");
      const params = new URLSearchParams(window.location.search);
      await createBusinessOpportunity({
        type, branchKey, organization, contactName, email, phone, eventDate,
        expectedAttendance, message, locale, source: params.get("source") || "website",
      });
      setStatus("success");
      setOrganization(""); setContactName(""); setEmail(""); setPhone("");
      setEventDate(""); setExpectedAttendance(""); setMessage("");
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
              <select value={type} onChange={(e) => setType(e.target.value as OpportunityType)} className="rounded-xl border border-black/10 px-4 py-3 outline-none">
                <option value="sponsorship">{labels.sponsorship}</option>
                <option value="vendor">{labels.vendor}</option>
                <option value="advertising">{labels.advertising}</option>
              </select>
              <select value={branchKey} onChange={(e) => setBranchKey(e.target.value as OpportunityBranchKey)} className="rounded-xl border border-black/10 px-4 py-3 outline-none">
                <option value="leamington">Leamington</option>
                <option value="windsor">Windsor</option>
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder={labels.organization} value={organization} onChange={(e) => setOrganization(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
              <input type="text" placeholder={labels.contactName} value={contactName} onChange={(e) => setContactName(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input type="email" placeholder={labels.email} value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
              <input type="tel" placeholder={labels.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">{labels.eventDate}<input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 font-normal outline-none" /></label>
              <input type="number" min="1" placeholder={labels.attendance} value={expectedAttendance} onChange={(e) => setExpectedAttendance(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>
            <textarea rows={6} placeholder={labels.message} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            <button type="submit" disabled={status === "loading"} className="ht-btn ht-btn-primary">{status === "loading" ? labels.sending : labels.submit}</button>
          </form>
          {status === "success" ? <p className="mt-4 text-sm text-green-700">{labels.success}</p> : null}
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
