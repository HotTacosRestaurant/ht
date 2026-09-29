HOT TACOS - EMAIL HANDOFF + ADMIN ALERTS

REPLACE:
components/EngageStation.tsx
components/EngageStation.module.css
app/catering/page.tsx
app/opportunities/page.tsx
lib/catering.ts
lib/business-opportunities.ts

ADD / KEEP:
app/food-truck/page.tsx
app/api/email/route.ts

KEEP EXISTING IMAGE:
public/icons/HTFT.png

VERCEL ENVIRONMENT VARIABLES REQUIRED:
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM=Hot Tacos <notifications@hottacosrestaurant.com>

IMPORTANT:
The domain hottacosrestaurant.com must be verified in Resend before EMAIL_FROM can send to arbitrary customer emails.

BEHAVIOR:
- Catering, Sponsorship and Vendor cards on /engage show a modal.
- Customer can enter email and receive the target URL.
- Customer can also click Continue here.
- Catering, Sponsorship, Vendor, Advertising (when re-enabled), and Food Truck form submissions continue saving to Firestore.
- After Firestore save, an automatic email is sent to admin@hottacosrestaurant.com.
- Admin subject format:
  🚨 CLIENTE CONTACTO - CATERING - LEAMINGTON
  🚨 CLIENTE CONTACTO - SPONSORSHIP - WINDSOR
  etc.
- Reply-To uses the customer's email when available.

AFTER COPYING:
npm run build

If build succeeds:
git add .
git commit -m "Add engagement email handoff and lead alerts"
git push origin main
