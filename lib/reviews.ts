import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { FS_PATHS } from "@/lib/firestore.paths";

export type ReviewBranchKey = "leamington" | "windsor";
export type ReviewLocale = "es" | "en";

export type CreateReviewInput = {
  fullName: string;
  phone?: string;
  email?: string;
  branchKey: ReviewBranchKey;
  rating: number;
  message: string;
  locale: ReviewLocale;
};

export async function createReviewInboxEntry(input: CreateReviewInput) {
  const payload = {
    fullName: input.fullName.trim(),
    phone: input.phone?.trim() || null,
    email: input.email?.trim() || null,
    branchKey: input.branchKey,
    rating: input.rating,
    message: input.message.trim(),
    locale: input.locale,
    source: "website",
    status: "new",
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, FS_PATHS.reviewsInbox), payload);
}