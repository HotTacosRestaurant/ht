import { NextRequest, NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const ADMIN_EMAIL = "admin@hottacosrestaurant.com";

type SendLinkBody = {
  action: "send-link";
  email: string;
  targetUrl: string;
  label?: string;
  locale?: "en" | "es";
};

type LeadNotificationBody = {
  action: "lead-notification";
  leadType: string;
  branchKey?: string;
  contactName?: string;
  organization?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  expectedAttendance?: string;
  eventType?: string;
  eventLocation?: string;
  message?: string;
  source?: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");
  if (!from) throw new Error("EMAIL_FROM is not configured.");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      reply_to: params.replyTo || undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error ${response.status}: ${detail}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SendLinkBody | LeadNotificationBody;

    if (body.action === "send-link") {
      const email = body.email?.trim();
      const targetUrl = body.targetUrl?.trim();

      if (!email || !isValidEmail(email) || !targetUrl?.startsWith("/")) {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
      }

      const absoluteUrl = new URL(targetUrl, request.nextUrl.origin).toString();
      const label = body.label?.trim() || "Hot Tacos";
      const spanish = body.locale === "es";

      const subject = spanish
        ? `HOT TACOS - CONTINÚA TU SOLICITUD DE ${label.toUpperCase()}`
        : `HOT TACOS - CONTINUE YOUR ${label.toUpperCase()} REQUEST`;

      const html = spanish
        ? `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
            <h2>Continúa tu solicitud con Hot Tacos</h2>
            <p>Solicitaste continuar <strong>${escapeHtml(label)}</strong> desde tu celular.</p>
            <p>
              <a href="${escapeHtml(absoluteUrl)}"
                 style="display:inline-block;background:#d81920;color:white;padding:14px 22px;border-radius:8px;text-decoration:none;font-weight:700">
                Continuar
              </a>
            </p>
            <p>También puedes copiar este enlace:</p>
            <p>${escapeHtml(absoluteUrl)}</p>
          </div>
        `
        : `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
            <h2>Continue your request with Hot Tacos</h2>
            <p>You asked to continue <strong>${escapeHtml(label)}</strong> on your phone.</p>
            <p>
              <a href="${escapeHtml(absoluteUrl)}"
                 style="display:inline-block;background:#d81920;color:white;padding:14px 22px;border-radius:8px;text-decoration:none;font-weight:700">
                Continue
              </a>
            </p>
            <p>You can also copy this link:</p>
            <p>${escapeHtml(absoluteUrl)}</p>
          </div>
        `;

      await sendEmail({
        to: email,
        subject,
        html,
      });

      return NextResponse.json({ ok: true });
    }

    if (body.action === "lead-notification") {
      const leadType = (body.leadType || "contact").trim().toUpperCase();
      const branch = (body.branchKey || "GENERAL").trim().toUpperCase();

      const subject = `🚨 CLIENTE CONTACTO - ${leadType} - ${branch}`;

      const rows: Array<[string, string | undefined]> = [
        ["TYPE", body.leadType],
        ["LOCATION", body.branchKey],
        ["CONTACT", body.contactName],
        ["ORGANIZATION", body.organization],
        ["EMAIL", body.email],
        ["PHONE", body.phone],
        ["EVENT TYPE", body.eventType],
        ["EVENT DATE", body.eventDate],
        ["EVENT LOCATION", body.eventLocation],
        ["EXPECTED ATTENDANCE", body.expectedAttendance],
        ["SOURCE", body.source],
      ];

      const htmlRows = rows
        .filter(([, value]) => value && value.trim())
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 10px;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 10px">${escapeHtml(value)}</td></tr>`
        )
        .join("");

      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
          <h1 style="margin-bottom:8px">CLIENTE CONTACTO</h1>
          <h2 style="margin-top:0;color:#d81920">${escapeHtml(leadType)} · ${escapeHtml(branch)}</h2>
          <table style="border-collapse:collapse">${htmlRows}</table>
          ${
            body.message?.trim()
              ? `<h3>MESSAGE</h3><div style="white-space:pre-wrap;padding:12px;background:#f6f6f6;border-radius:8px">${escapeHtml(body.message)}</div>`
              : ""
          }
        </div>
      `;

      await sendEmail({
        to: ADMIN_EMAIL,
        subject,
        html,
        replyTo:
          body.email && isValidEmail(body.email.trim())
            ? body.email.trim()
            : undefined,
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Email could not be sent." },
      { status: 500 }
    );
  }
}
