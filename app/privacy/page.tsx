"use client";

import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [locale, setLocale] = useState<"es" | "en">("es");

  // 🔥 Detecta idioma desde <html lang="">
  useEffect(() => {
    const lang = document.documentElement.lang;
    if (lang === "en") setLocale("en");
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {locale === "es" ? <PrivacyES /> : <PrivacyEN />}
    </main>
  );
}

function PrivacyES() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Política de Privacidad – Hot Tacos</h1>

      <p className="text-sm text-gray-500">Última actualización: 2026</p>

      <p>
        En Hot Tacos, valoramos tu privacidad. Esta política explica cómo
        recopilamos, usamos y protegemos tu información.
      </p>

      <section>
        <h2 className="font-semibold text-xl">1. Información que recopilamos</h2>
        <ul className="list-disc ml-6">
          <li>Nombre</li>
          <li>Teléfono</li>
          <li>Correo electrónico</li>
          <li>Mensajes enviados en formularios</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-xl">2. Uso de la información</h2>
        <ul className="list-disc ml-6">
          <li>Responder a tus solicitudes o comentarios</li>
          <li>Mejorar nuestro servicio</li>
          <li>Dar seguimiento a experiencias del cliente</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-xl">3. Almacenamiento</h2>
        <p>Los datos se almacenan de forma segura en Firebase (Google Cloud).</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">4. Compartición de datos</h2>
        <p>No vendemos ni compartimos tu información personal con terceros.</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">5. Seguridad</h2>
        <p>
          Implementamos medidas de seguridad para proteger tu información.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">6. Tus derechos</h2>
        <p>Puedes solicitar la eliminación de tus datos contactándonos.</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">7. Contacto</h2>
        <p>📧 contacto@hottacos.com</p>
      </section>
    </div>
  );
}

function PrivacyEN() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy – Hot Tacos</h1>

      <p className="text-sm text-gray-500">Last updated: 2026</p>

      <p>
        At Hot Tacos, we respect your privacy. This policy explains how we
        collect, use, and protect your information.
      </p>

      <section>
        <h2 className="font-semibold text-xl">1. Information we collect</h2>
        <ul className="list-disc ml-6">
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Messages submitted through forms</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-xl">2. How we use information</h2>
        <ul className="list-disc ml-6">
          <li>Respond to your requests or feedback</li>
          <li>Improve our service</li>
          <li>Follow up on customer experiences</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-xl">3. Storage</h2>
        <p>Data is securely stored using Firebase (Google Cloud).</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">4. Data sharing</h2>
        <p>We do not sell or share your personal data with third parties.</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">5. Security</h2>
        <p>We implement security measures to protect your information.</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">6. Your rights</h2>
        <p>You can request deletion of your data by contacting us.</p>
      </section>

      <section>
        <h2 className="font-semibold text-xl">7. Contact</h2>
        <p>📧 contacto@hottacos.com</p>
      </section>
    </div>
  );
}