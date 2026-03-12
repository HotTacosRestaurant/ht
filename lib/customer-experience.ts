import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type ExperienceBranchKey = "leamington" | "windsor";
export type ExperienceLocale = "es" | "en";

export type CreateCustomerExperienceInput = {
  fullName: string;
  phone?: string;
  email?: string;
  branchKey: ExperienceBranchKey;
  visitType: "dine_in" | "takeout" | "delivery" | "other";
  message: string;
  locale: ExperienceLocale;
};

export async function createCustomerExperienceEntry(
  input: CreateCustomerExperienceInput
) {
  const payload = {
    fullName: input.fullName.trim(),
    phone: input.phone?.trim() || null,
    email: input.email?.trim() || null,
    branchKey: input.branchKey,
    visitType: input.visitType,
    message: input.message.trim(),
    locale: input.locale,
    source: "website",
    status: "new",
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, FS_PATHS.customerExperience), payload);
}