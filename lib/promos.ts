export type PromoCampaignPublic = {
  id: string;
  name: string;
  headline: string;
  description: string;
  rewardName: string;
  successMessage: string | null;
  redemptionInstructions: string | null;
  terms: string | null;
  locations: string[];
  imageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
};

export type PromoClaimInput = {
  fullName: string;
  phone: string;
  email?: string;
  acceptedTerms: boolean;
  marketingConsent: boolean;
  locale: "en" | "es";
  utm: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
    content?: string | null;
    term?: string | null;
  };
};

export type PromoClaimResult = {
  status: "created" | "already_claimed";
  toastPromoCode: string;
  rewardName: string;
};

export function normalizePromoId(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length >= 8 && digits.length <= 15) return `+${digits}`;

  return "";
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}
