"use client";

import { useMemo, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { createReviewInboxEntry, type ReviewBranchKey } from "@/lib/reviews";
import { useLanguage } from "@/components/LanguageProvider";
import { trackReviewSubmit } from "@/lib/analytics";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ReviewsPage() {
  const { locale } = useLanguage();
  const { messages } = useLanguage();
  const [branchKey, setBranchKey] = useState<ReviewBranchKey>("leamington");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const labels = useMemo(() => {
    if (locale === "en") {
      return {
        eyebrow: "Reviews",
        title: "Tell us about your experience",
        description:
          "Visible reviews build trust.",
        fullName: "Full name",
        phone: "Phone (optional)",
        email: "Email (optional)",
        branch: "Branch",
        rating: "Rating",
        message: "Your review",
        submit: "Send review",
        loading: "Sending...",
        success: "Thanks. Your review was submitted.",
        error: "Could not save your review. Please try again.",
        invalidName: "Please enter your name.",
        invalidMessage: "Please enter your review.",
      };
    }

    return {
      eyebrow: "Reseñas",
      title: "Cuéntanos tu experiencia",
      description:
        "Las reseñas visibles generan confianza.",
      fullName: "Nombre completo",
      phone: "Teléfono (opcional)",
      email: "Email (opcional)",
      branch: "Sucursal",
      rating: "Calificación",
      message: "Tu reseña",
      submit: "Enviar reseña",
      loading: "Enviando...",
      success: "Gracias. Tu reseña fue enviada.",
      error: "No se pudo guardar tu reseña. Intenta de nuevo.",
      invalidName: "Ingresa tu nombre.",
      invalidMessage: "Escribe tu reseña.",
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

      await createReviewInboxEntry({
        fullName,
        phone,
        email,
        branchKey,
        rating,
        message,
        locale,
      });
      trackReviewSubmit(branchKey, rating, locale);
      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setRating(5);
      setMessage("");
      setBranchKey("leamington");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(labels.error);
    }
  }

  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow={labels.eyebrow}
          title={labels.title}
          description={labels.description}
        />

        <div className="ht-grid-3">
          <article className="ht-card p-6">
            <div className="text-[#d81920]">★★★★★</div>
            <p className="mt-3 text-sm text-neutral-700">
              {messages.reviewsPage.card1}
            </p>
          </article>

          <article className="ht-card p-6">
            <div className="text-[#d81920]">★★★★★</div>
            <p className="mt-3 text-sm text-neutral-700">
              {messages.reviewsPage.card2}
            </p>
          </article>

          <article className="ht-card p-6">
            <div className="text-[#d81920]">★★★★★</div>
            <p className="mt-3 text-sm text-neutral-700">
              {messages.reviewsPage.card3}
            </p>
          </article>
        </div>

        <div className="mt-10 ht-card p-6 md:p-8">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder={labels.fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 outline-none"
              />

              <select
                value={branchKey}
                onChange={(e) => setBranchKey(e.target.value as ReviewBranchKey)}
                className="rounded-xl border border-black/10 px-4 py-3 outline-none"
              >
                <option value="leamington">Leamington</option>
                <option value="windsor">Windsor</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">{labels.rating}</span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rounded-xl border border-black/10 px-4 py-3 outline-none"
              >
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </label>

            <textarea
              placeholder={labels.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
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