"use client";

import {
  Timestamp,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";
import {
  normalizeEmail,
  normalizePhone,
  normalizePromoId,
  type PromoCampaignPublic,
  type PromoClaimInput,
  type PromoClaimResult,
} from "@/lib/promos";

function toDate(value: unknown): Date | null {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function toIso(value: unknown): string | null {
  return toDate(value)?.toISOString() ?? null;
}

function safeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function campaignIsActive(data: Record<string, unknown>) {
  if (data.active !== true) return false;

  const now = new Date();
  const start = toDate(data.startDate);
  const end = toDate(data.endDate);

  if (start && start > now) return false;
  if (end && end < now) return false;
  return true;
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getPromoCampaign(idPromo: string): Promise<PromoCampaignPublic | null> {
  const campaignId = normalizePromoId(idPromo);
  if (!campaignId) return null;

  const campaignRef = doc(db, FS_PATHS.promoCampaigns, campaignId);

  return runTransaction(db, async (tx) => {
    const snapshot = await tx.get(campaignRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data() as Record<string, unknown>;
    if (!campaignIsActive(data)) return null;

    return {
      id: campaignId,
      name: safeText(data.name, 120) || campaignId,
      headline: safeText(data.headline, 180) || "Special offer",
      description: safeText(data.description, 600),
      rewardName: safeText(data.rewardName, 120) || "Promotion",
      successMessage: safeText(data.successMessage, 600) || null,
      redemptionInstructions: safeText(data.redemptionInstructions, 600) || null,
      terms: safeText(data.terms, 1200) || null,
      locations: Array.isArray(data.locations)
        ? data.locations.map((item) => String(item))
        : [],
      imageUrl: safeText(data.imageUrl, 1000) || null,
      startDate: toIso(data.startDate),
      endDate: toIso(data.endDate),
    };
  });
}

export async function claimPromoCampaign(
  idPromo: string,
  input: PromoClaimInput,
): Promise<PromoClaimResult> {
  const campaignId = normalizePromoId(idPromo);
  const fullName = safeText(input.fullName, 120);
  const phone = normalizePhone(safeText(input.phone, 40));
  const email = normalizeEmail(safeText(input.email, 160));

  if (!campaignId || !fullName || !phone || input.acceptedTerms !== true) {
    throw new Error("invalid_fields");
  }

  // Phone is always the primary identity key. If the guest provides an email,
  // keep using it as an additional duplicate check without requiring it.
  const phoneHash = await sha256(phone);
  const emailHash = email ? await sha256(email) : null;

  const campaignRef = doc(db, FS_PATHS.promoCampaigns, campaignId);
  const phoneKeyRef = doc(db, FS_PATHS.promoClaimKeys, `${campaignId}_phone_${phoneHash}`);
  const emailKeyRef = emailHash
    ? doc(db, FS_PATHS.promoClaimKeys, `${campaignId}_email_${emailHash}`)
    : null;

  return runTransaction(db, async (tx) => {
    const campaignSnap = await tx.get(campaignRef);
    const phoneKeySnap = await tx.get(phoneKeyRef);
    const emailKeySnap = emailKeyRef ? await tx.get(emailKeyRef) : null;

    if (!campaignSnap.exists()) throw new Error("campaign_not_found");

    const campaign = campaignSnap.data() as Record<string, unknown>;
    if (!campaignIsActive(campaign)) throw new Error("campaign_inactive");

    const toastPromoCode = safeText(campaign.toastPromoCode, 80);
    const rewardName = safeText(campaign.rewardName, 120) || "Promotion";

    if (!toastPromoCode) throw new Error("campaign_misconfigured");

    if (phoneKeySnap.exists() || emailKeySnap?.exists()) {
      return {
        status: "already_claimed" as const,
        toastPromoCode,
        rewardName,
      };
    }

    const claimRef = doc(collection(db, FS_PATHS.promoClaims));
    const utm = input.utm ?? {};

    tx.set(claimRef, {
      campaignId,
      fullName,
      phone,
      email: email || null,
      acceptedTerms: true,
      acceptedTermsAt: serverTimestamp(),
      marketingConsent: input.marketingConsent === true,
      marketingConsentVersion: "2026-09",
      marketingConsentAt: input.marketingConsent === true ? serverTimestamp() : null,
      locale: input.locale === "en" ? "en" : "es",
      toastPromoCode,
      rewardName,
      utmSource: safeText(utm.source, 120) || null,
      utmMedium: safeText(utm.medium, 120) || null,
      utmCampaign: safeText(utm.campaign, 160) || null,
      utmContent: safeText(utm.content, 160) || null,
      utmTerm: safeText(utm.term, 160) || null,
      source: "website_promo",
      status: "issued",
      createdAt: serverTimestamp(),
    });

    const keyPayload = {
      campaignId,
      claimId: claimRef.id,
      createdAt: serverTimestamp(),
    };

    tx.set(phoneKeyRef, keyPayload);
    if (emailKeyRef) tx.set(emailKeyRef, keyPayload);

    return {
      status: "created" as const,
      toastPromoCode,
      rewardName,
    };
  });
}
