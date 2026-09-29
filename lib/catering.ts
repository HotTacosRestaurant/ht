import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type CateringBranchKey = "leamington" | "windsor";
export type CateringLocale = "es" | "en";

export type CreateCateringLeadInput = {
  branchKey: CateringBranchKey;
  fullName: string;
  organization?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  guestCount?: string;
  eventType?: string;
  message?: string;
  locale: CateringLocale;
  source?: string;
};

async function notifyAdmin(input: CreateCateringLeadInput) {
  try {
    await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "lead-notification",
        leadType: "catering",
        branchKey: input.branchKey,
        contactName: input.fullName,
        organization: input.organization || "",
        email: input.email || "",
        phone: input.phone || "",
        eventDate: input.eventDate || "",
        expectedAttendance: input.guestCount || "",
        eventType: input.eventType || "",
        message: input.message || "",
        source: input.source || "website",
      }),
    });
  } catch (error) {
    console.error("Could not send catering admin notification:", error);
  }
}

export async function createCateringLead(input: CreateCateringLeadInput) {
  const payload = {
    branchKey: input.branchKey,
    fullName: input.fullName.trim(),
    organization: input.organization?.trim() || null,
    email: input.email?.trim() || null,
    phone: input.phone?.trim() || null,
    eventDate: input.eventDate || null,
    guestCount: input.guestCount?.trim() || null,
    eventType: input.eventType?.trim() || null,
    message: input.message?.trim() || null,
    locale: input.locale,
    source: input.source || "website",
    status: "new",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, FS_PATHS.cateringLeads), payload);
  await notifyAdmin(input);
  return docRef;
}
