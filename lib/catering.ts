import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type CateringBranchKey = "leamington" | "windsor";
export type CateringLocale = "es" | "en";

export type CreateCateringLeadInput = {
  branchKey: CateringBranchKey;
  fullName: string;
  organization?: string;
  email: string;
  phone: string;
  eventDate?: string;
  guestCount?: string;
  eventType?: string;
  message?: string;
  locale: CateringLocale;
  source?: string;
};

export async function createCateringLead(input: CreateCateringLeadInput) {
  const payload = {
    branchKey: input.branchKey,
    fullName: input.fullName.trim(),
    organization: input.organization?.trim() || null,
    email: input.email.trim(),
    phone: input.phone.trim(),
    eventDate: input.eventDate || null,
    guestCount: input.guestCount?.trim() || null,
    eventType: input.eventType?.trim() || null,
    message: input.message?.trim() || null,
    locale: input.locale,
    source: input.source || "website",
    status: "new",
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, FS_PATHS.cateringLeads), payload);
}
