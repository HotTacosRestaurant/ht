import type { Metadata } from "next";
import Link from "next/link";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { notFound, redirect } from "next/navigation";
import { adminDb } from "@/lib/firebase.admin";
import { normalizePromoId } from "@/lib/promos";

export const metadata: Metadata = {
  title: "Hot Tacos Management",
  robots: { index: false, follow: false, nocache: true },
};

type Props = {
  params: Promise<{ managementKey: string }>;
  searchParams: Promise<{ edit?: string; saved?: string; deleted?: string }>;
};

const COLLECTION = "ht_v2_promo_campaigns";

function assertManagementKey(value: string) {
  const expected = process.env.HOTTACOS_MANAGEMENT_KEY;
  if (!expected || value !== expected) notFound();
}

function asDateInput(value: unknown) {
  if (value instanceof Timestamp) return value.toDate().toISOString().slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  }
  return "";
}

function formText(formData: FormData, key: string, max = 1200) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

function dateOrNull(value: string) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : Timestamp.fromDate(date);
}

async function saveCampaign(formData: FormData) {
  "use server";

  const managementKey = formText(formData, "managementKey", 500);
  assertManagementKey(managementKey);

  const campaignId = normalizePromoId(formText(formData, "campaignId", 80));
  if (!campaignId) throw new Error("Campaign ID is required.");

  const locations = ["windsor", "leamington"].filter(
    (location) => formData.get(`location_${location}`) === "on",
  );

  const payload = {
    name: formText(formData, "name", 120) || campaignId,
    active: formData.get("active") === "on",
    headline: formText(formData, "headline", 180) || "Special offer",
    description: formText(formData, "description", 600),
    rewardName: formText(formData, "rewardName", 120) || "Promotion",
    toastPromoCode: formText(formData, "toastPromoCode", 80).toUpperCase(),
    successMessage: formText(formData, "successMessage", 600),
    redemptionInstructions: formText(formData, "redemptionInstructions", 600),
    terms: formText(formData, "terms", 1200),
    imageUrl: formText(formData, "imageUrl", 1000),
    locations,
    startDate: dateOrNull(formText(formData, "startDate", 20)),
    endDate: dateOrNull(formText(formData, "endDate", 20)),
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (!payload.toastPromoCode) throw new Error("Toast promo code is required.");

  const ref = adminDb.collection(COLLECTION).doc(campaignId);
  const existing = await ref.get();
  await ref.set(
    {
      ...payload,
      ...(existing.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true },
  );

  redirect(`/hottacosmanagement/${encodeURIComponent(managementKey)}?edit=${campaignId}&saved=1`);
}

async function deleteCampaign(formData: FormData) {
  "use server";

  const managementKey = formText(formData, "managementKey", 500);
  assertManagementKey(managementKey);

  const campaignId = normalizePromoId(formText(formData, "campaignId", 80));
  if (!campaignId) throw new Error("Campaign ID is required.");

  await adminDb.collection(COLLECTION).doc(campaignId).delete();
  redirect(`/hottacosmanagement/${encodeURIComponent(managementKey)}?deleted=1`);
}

export default async function ManagementPage({ params, searchParams }: Props) {
  const { managementKey } = await params;
  const query = await searchParams;
  assertManagementKey(managementKey);

  const snapshot = await adminDb.collection(COLLECTION).orderBy("name").get();
  const campaigns = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Array<
    Record<string, unknown> & { id: string }
  >;

  const editId = normalizePromoId(query.edit ?? "");
  const selected = editId ? campaigns.find((item) => item.id === editId) : undefined;

  const input =
    "min-h-11 w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/40";
  const label = "grid gap-1 text-sm font-bold";

  return (
    <section className="ht-section">
      <div className="ht-shell max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.16em] text-[#d81920]">
              Hot Tacos Management
            </div>
            <h1 className="mt-2 text-4xl font-black">Promo campaigns</h1>
            <p className="mt-2 text-neutral-600">Create and edit the campaigns used by /promo/[idPromo].</p>
          </div>
          <Link className="ht-btn" href={`/hottacosmanagement/${managementKey}`}>
            New campaign
          </Link>
        </div>

        {query.saved ? (
          <div className="mb-5 rounded-xl bg-green-50 p-4 font-bold text-green-800">Campaign saved.</div>
        ) : null}
        {query.deleted ? (
          <div className="mb-5 rounded-xl bg-amber-50 p-4 font-bold text-amber-800">Campaign deleted.</div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <div className="ht-card overflow-hidden">
            <div className="border-b border-black/10 p-5">
              <h2 className="text-xl font-black">Existing campaigns</h2>
            </div>
            <div className="divide-y divide-black/10">
              {campaigns.length === 0 ? (
                <p className="p-5 text-neutral-600">No campaigns yet.</p>
              ) : (
                campaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/hottacosmanagement/${managementKey}?edit=${campaign.id}`}
                    className="block p-5 hover:bg-black/[0.03]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-black">{String(campaign.name || campaign.id)}</div>
                        <div className="mt-1 text-sm text-neutral-500">
                          /promo/{campaign.id} · Toast: {String(campaign.toastPromoCode || "—")}
                        </div>
                      </div>
                      <span className={`ht-pill ${campaign.active === true ? "" : "opacity-50"}`}>
                        {campaign.active === true ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <form action={saveCampaign} className="ht-card p-5 md:p-7">
            <input type="hidden" name="managementKey" value={managementKey} />
            <h2 className="text-2xl font-black">{selected ? `Edit ${selected.id}` : "New campaign"}</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className={label}>
                Campaign ID
                <input
                  className={input}
                  name="campaignId"
                  defaultValue={selected?.id ?? ""}
                  placeholder="TACO26"
                  required
                  readOnly={Boolean(selected)}
                />
              </label>
              <label className={label}>
                Internal name
                <input className={input} name="name" defaultValue={String(selected?.name ?? "")} placeholder="Free Taco - Meta October" />
              </label>
              <label className={label}>
                Toast promo code
                <input className={input} name="toastPromoCode" defaultValue={String(selected?.toastPromoCode ?? "")} placeholder="FREETACO26" required />
              </label>
              <label className={label}>
                Reward name
                <input className={input} name="rewardName" defaultValue={String(selected?.rewardName ?? "")} placeholder="Free Taco" />
              </label>
            </div>

            <label className={`${label} mt-4`}>
              Customer headline
              <input className={input} name="headline" defaultValue={String(selected?.headline ?? "")} placeholder="Get a FREE Taco 🌮" />
            </label>

            <label className={`${label} mt-4`}>
              Offer description
              <textarea className={`${input} min-h-24`} name="description" defaultValue={String(selected?.description ?? "")} />
            </label>

            <label className={`${label} mt-4`}>
              Message after claim
              <textarea
                className={`${input} min-h-20`}
                name="successMessage"
                defaultValue={String(selected?.successMessage ?? "")}
                placeholder="Your free taco is ready!"
              />
            </label>

            <label className={`${label} mt-4`}>
              Redemption instructions
              <textarea
                className={`${input} min-h-20`}
                name="redemptionInstructions"
                defaultValue={String(selected?.redemptionInstructions ?? "")}
                placeholder="Show this code before paying. One redemption per guest."
              />
            </label>

            <label className={`${label} mt-4`}>
              Terms
              <textarea className={`${input} min-h-24`} name="terms" defaultValue={String(selected?.terms ?? "")} />
            </label>

            <label className={`${label} mt-4`}>
              Campaign image URL (optional)
              <input className={input} name="imageUrl" defaultValue={String(selected?.imageUrl ?? "")} placeholder="https://..." />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className={label}>
                Start date
                <input className={input} type="date" name="startDate" defaultValue={asDateInput(selected?.startDate)} />
              </label>
              <label className={label}>
                End date
                <input className={input} type="date" name="endDate" defaultValue={asDateInput(selected?.endDate)} />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-5">
              <label className="flex items-center gap-2 font-bold">
                <input type="checkbox" name="active" defaultChecked={selected ? selected.active === true : true} /> Active
              </label>
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="checkbox"
                  name="location_windsor"
                  defaultChecked={Array.isArray(selected?.locations) && selected.locations.includes("windsor")}
                /> Windsor
              </label>
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="checkbox"
                  name="location_leamington"
                  defaultChecked={Array.isArray(selected?.locations) && selected.locations.includes("leamington")}
                /> Leamington
              </label>
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="checkbox"
                  name="location_foodtruck"
                  defaultChecked={Array.isArray(selected?.locations) && selected.locations.includes("foodtruck")}
                /> Food Truck
              </label>
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="checkbox"
                  name="location_all"
                  defaultChecked={Array.isArray(selected?.locations) && selected.locations.includes("all")}
                /> Todas
              </label>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="ht-btn ht-btn-primary" type="submit">Save campaign</button>
            </div>
          </form>
        </div>

        {selected ? (
          <form action={deleteCampaign} className="mt-6 flex justify-end">
            <input type="hidden" name="managementKey" value={managementKey} />
            <input type="hidden" name="campaignId" value={selected.id} />
            <button className="rounded-xl border border-red-200 px-4 py-2 font-bold text-red-700" type="submit">
              Delete {selected.id}
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
