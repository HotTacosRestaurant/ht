"use client";

import { useMemo, useState } from "react";
import { useQueryInitialState } from "@/lib/use-query-initial-state";
import SectionTitle from "@/components/SectionTitle";
import FoodTruckImage from "@/components/FoodTruckImage";
import { useLanguage } from "@/components/LanguageProvider";
import {
  createBusinessOpportunity,
  type OpportunityBranchKey,
} from "@/lib/business-opportunities";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function FoodTruckPage() {
  const { locale } = useLanguage();
  const [branchKey, setBranchKey] = useQueryInitialState<OpportunityBranchKey>("branch", "leamington", ["leamington", "windsor"]);
  const [contactName, setContactName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [expectedAttendance, setExpectedAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const labels = useMemo(() => locale === "en" ? {
    eyebrow: "Hot Tacos Food Truck",
    title: "Bring Hot Tacos to your event",
    description: "Weddings, graduations, sports events, corporate gatherings, private parties and more.",
    contactName: "Contact name",
    organization: "Company / organization (optional)",
    email: "Email (optional)",
    phone: "Phone (optional)",
    eventType: "Type of event",
    eventTypePlaceholder: "Select an event type",
    wedding: "Wedding",
    graduation: "Graduation",
    sports: "Sports event",
    corporate: "Corporate event",
    festival: "Festival / community event",
    privateParty: "Private party",
    other: "Other",
    eventDate: "Event date (if known)",
    eventLocation: "Event city / location",
    attendance: "Estimated guests",
    message: "Tell us anything else about your event",
    submit: "Request the Food Truck",
    sending: "Sending...",
    success: "Thanks. Your Food Truck request was submitted.",
    error: "Could not submit your request. Please try again.",
    required: "Contact name, event type, event location and at least one contact method are required.",
  } : {
    eyebrow: "Hot Tacos Food Truck",
    title: "Lleva Hot Tacos a tu evento",
    description: "Bodas, graduaciones, eventos deportivos, eventos corporativos, fiestas privadas y más.",
    contactName: "Nombre de contacto",
    organization: "Empresa / organización (opcional)",
    email: "Email (opcional)",
    phone: "Teléfono (opcional)",
    eventType: "Tipo de evento",
    eventTypePlaceholder: "Selecciona el tipo de evento",
    wedding: "Boda",
    graduation: "Graduación",
    sports: "Evento deportivo",
    corporate: "Evento corporativo",
    festival: "Festival / evento comunitario",
    privateParty: "Fiesta privada",
    other: "Otro",
    eventDate: "Fecha del evento (si la conoces)",
    eventLocation: "Ciudad / lugar del evento",
    attendance: "Invitados estimados",
    message: "Cuéntanos cualquier otro detalle de tu evento",
    submit: "Solicitar el Food Truck",
    sending: "Enviando...",
    success: "Gracias. Tu solicitud del Food Truck fue enviada.",
    error: "No se pudo enviar tu solicitud. Intenta de nuevo.",
    required: "Nombre, tipo de evento, ubicación y al menos un medio de contacto son obligatorios.",
  }, [locale]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (
      !contactName.trim() ||
      !eventType.trim() ||
      !eventLocation.trim() ||
      (!email.trim() && !phone.trim())
    ) {
      setError(labels.required);
      return;
    }

    try {
      setStatus("loading");
      const params = new URLSearchParams(window.location.search);

      await createBusinessOpportunity({
        type: "food-truck",
        branchKey,
        organization,
        contactName,
        email,
        phone,
        eventDate,
        expectedAttendance,
        eventType,
        eventLocation,
        message,
        locale,
        source: params.get("source") || "website",
      });

      setStatus("success");
      setContactName("");
      setOrganization("");
      setEmail("");
      setPhone("");
      setEventType("");
      setEventDate("");
      setEventLocation("");
      setExpectedAttendance("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(labels.error);
    }
  }

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-5xl">
        <div className="mb-8 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionTitle eyebrow={labels.eyebrow} title={labels.title} description={labels.description} />
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <FoodTruckImage className="aspect-square w-full object-cover" />
          </div>
        </div>

        <div className="ht-card p-6 md:p-8">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <select value={branchKey} onChange={(e) => setBranchKey(e.target.value as OpportunityBranchKey)} className="rounded-xl border border-black/10 px-4 py-3 outline-none">
                <option value="leamington">Leamington</option>
                <option value="windsor">Windsor</option>
              </select>
              <input type="text" placeholder={labels.contactName} value={contactName} onChange={(e) => setContactName(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder={labels.organization} value={organization} onChange={(e) => setOrganization(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none">
                <option value="">{labels.eventTypePlaceholder}</option>
                <option value="wedding">{labels.wedding}</option>
                <option value="graduation">{labels.graduation}</option>
                <option value="sports">{labels.sports}</option>
                <option value="corporate">{labels.corporate}</option>
                <option value="festival">{labels.festival}</option>
                <option value="private-party">{labels.privateParty}</option>
                <option value="other">{labels.other}</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input type="email" placeholder={labels.email} value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
              <input type="tel" placeholder={labels.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">{labels.eventDate}<input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 font-normal outline-none" /></label>
              <input type="text" placeholder={labels.eventLocation} value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />
            </div>

            <input type="number" min="1" placeholder={labels.attendance} value={expectedAttendance} onChange={(e) => setExpectedAttendance(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />

            <textarea rows={5} placeholder={labels.message} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl border border-black/10 px-4 py-3 outline-none" />

            <button type="submit" disabled={status === "loading"} className="ht-btn ht-btn-primary">
              {status === "loading" ? labels.sending : labels.submit}
            </button>
          </form>

          {status === "success" ? <p className="mt-4 text-sm text-green-700">{labels.success}</p> : null}
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
