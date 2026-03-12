import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type RaffleBranchKey = "leamington" | "windsor";
export type RaffleLocale = "es" | "en";

export type CreateRaffleEntryInput = {
  fullName: string;
  phone: string;
  email?: string;
  acceptedTerms: boolean;
  branchKey: RaffleBranchKey;
  locale: RaffleLocale;
};

export async function createRaffleEntry(input: CreateRaffleEntryInput) {
  const payload = {
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    acceptedTerms: input.acceptedTerms,
    branchKey: input.branchKey,
    locale: input.locale,
    source: "website",
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, FS_PATHS.raffleEntries), payload);
}