# Reusable promo campaigns (V1 — Firebase Client SDK)

This version intentionally follows the site's existing Firebase architecture. It does **not** require Firebase Admin, Cloud Functions, or a new server-side service.

## Routes

- `/promo` — manual campaign-code entry.
- `/promo/[idPromo]` — dynamic campaign landing page, e.g. `/promo/TACO26`.

All campaign URLs use the same React landing component. A new campaign requires Firestore configuration, not a new page or deployment.

## Firestore collections

### `ht_v2_promo_campaigns/{CAMPAIGN_ID}`

Example document `TACO26`:

```json
{
  "name": "Free Taco Fall 2026",
  "active": true,
  "headline": "Get a FREE Taco 🌮",
  "description": "Register once and your taco is on us.",
  "rewardName": "Free Taco",
  "toastPromoCode": "FREETACO26",
  "locations": ["Windsor", "Leamington"],
  "terms": "New customers. One claim per person. Participating locations only.",
  "imageUrl": null,
  "startDate": null,
  "endDate": null
}
```

Prefer Firestore Timestamp values for `startDate` and `endDate` when dates are used.

### `ht_v2_promo_claims`

One document is created for every first successful claim. It stores the normalized phone/email, consent, campaign, Toast promo code, and UTM attribution.

### `ht_v2_promo_claim_keys`

Two deterministic hashed keys are created inside the same Firestore transaction:

- `{CAMPAIGN_ID}_phone_{sha256(normalizedPhone)}`
- `{CAMPAIGN_ID}_email_{sha256(normalizedEmail)}`

This blocks another website claim for the same campaign when either phone or email was already used. Phone is the primary identity because Toast's single-use workflow also identifies a guest by phone.

## Redemption model

There are two independent controls:

1. **Website / Firestore:** prevents the same phone/email from obtaining the campaign offer repeatedly from the landing page.
2. **Toast:** the associated Toast promo should be configured as **Single Use** so Toast prevents repeat redemption for the same guest.

Do not assume cross-location single-use behavior until it is tested in the actual Toast restaurant group. Before launch, redeem one test single-use promo in Windsor and try the same promo + same phone in Leamington.

## New campaigns

A campaign can have its own public URL and its own Toast code:

- `/promo/TACO26` → `FREETACO26`
- `/promo/BURRITO26` → `FREEBURRITO26`
- `/promo/STUDENT26` → `STUDENTTACO`

The same landing page renders all of them.

## QR codes and ads

A QR should point directly to the campaign URL:

`https://hottacos.ca/promo/TACO26`

Ads can append UTM parameters:

`https://hottacos.ca/promo/TACO26?utm_source=facebook&utm_medium=paid_social&utm_campaign=free_taco_fall_2026&utm_content=reel_01`

## Security note for V1

Because this version uses the Firebase Client SDK, a technically sophisticated user may be able to inspect Firestore/network traffic depending on the project's Firestore security rules. The Toast code should therefore **not be treated as a secret credential**; the real redemption protection remains Toast Single Use plus the Firestore claim check.

If future promotions have materially higher value or abuse becomes significant, move campaign claims to a trusted backend / Cloud Function at that point rather than adding that complexity pre-emptively.

## Firestore rules

This repo copy did not include the deployed Firestore security rules. Before production, confirm that the existing rules allow only the reads/writes required by this flow and do not unintentionally expose unrelated collections. Do not replace known-good production rules blindly.
