import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type OpportunityType = "sponsorship" | "vendor" | "advertising";
export type OpportunityBranchKey = "leamington" | "windsor";
export type OpportunityLocale = "es" | "en";

export type CreateBusinessOpportunityInput = {
  type: OpportunityType;
  branchKey: OpportunityBranchKey;
  organization: string;
  contactName: string;
  email: string;
  phone?: string;
  eventDate?: string;
  expectedAttendance?: string;
  message: string;
  locale: OpportunityLocale;
  source?: string;
};

export async function createBusinessOpportunity(
  input: CreateBusinessOpportunityInput
) {
  const payload = {
    type: input.type,
    branchKey: input.branchKey,
    organization: input.organization.trim(),
    contactName: input.contactName.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    eventDate: input.eventDate || null,
    expectedAttendance: input.expectedAttendance?.trim() || null,
    message: input.message.trim(),
    locale: input.locale,
    source: input.source || "website",
    status: "new",
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, FS_PATHS.businessOpportunities), payload);
}
