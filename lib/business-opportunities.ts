import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type OpportunityType =
  | "sponsorship"
  | "vendor"
  | "advertising"
  | "food-truck";

export type OpportunityBranchKey = "leamington" | "windsor";
export type OpportunityLocale = "es" | "en";

export type CreateBusinessOpportunityInput = {
  type: OpportunityType;
  branchKey: OpportunityBranchKey;
  organization?: string;
  contactName: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  expectedAttendance?: string;
  eventType?: string;
  eventLocation?: string;
  message?: string;
  locale: OpportunityLocale;
  source?: string;
};

async function notifyAdmin(input: CreateBusinessOpportunityInput) {
  try {
    await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "lead-notification",
        leadType: input.type,
        branchKey: input.branchKey,
        contactName: input.contactName,
        organization: input.organization || "",
        email: input.email || "",
        phone: input.phone || "",
        eventDate: input.eventDate || "",
        expectedAttendance: input.expectedAttendance || "",
        eventType: input.eventType || "",
        eventLocation: input.eventLocation || "",
        message: input.message || "",
        source: input.source || "website",
      }),
    });
  } catch (error) {
    console.error("Could not send business opportunity admin notification:", error);
  }
}

export async function createBusinessOpportunity(
  input: CreateBusinessOpportunityInput
) {
  const payload = {
    type: input.type,
    branchKey: input.branchKey,
    organization: input.organization?.trim() || null,
    contactName: input.contactName.trim(),
    email: input.email?.trim() || null,
    phone: input.phone?.trim() || null,
    eventDate: input.eventDate || null,
    expectedAttendance: input.expectedAttendance?.trim() || null,
    eventType: input.eventType?.trim() || null,
    eventLocation: input.eventLocation?.trim() || null,
    message: input.message?.trim() || null,
    locale: input.locale,
    source: input.source || "website",
    status: "new",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(db, FS_PATHS.businessOpportunities),
    payload
  );

  await notifyAdmin(input);
  return docRef;
}
