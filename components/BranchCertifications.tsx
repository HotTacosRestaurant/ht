"use client";
import { useLanguage } from "@/components/LanguageProvider";
import type { BranchKey } from "@/lib/site-data";
import RestaurantGuruBadge from "@/components/RestaurantGuruBadge";
// PDFs are linked on demand: none is downloaded during the page's initial render.
const CERTIFICATES = {
 leamington: [
  { name: "Sello M", file: "/certifications/leamington/sello-m.pdf", detail: "Certificado" },
  { name: "Sello M · Display", file: "/certifications/leamington/sello-m-display.pdf", detail: "Versión para exhibición" },
 ],
 windsor: [
  { name: "Sello M", file: "/certifications/windsor/sello-m-certificate.pdf", detail: "Certificado" },
  { name: "Sello M · Display", file: "/certifications/windsor/sello-m-display.pdf", detail: "Versión para exhibición" },
 ],
};
export default function BranchCertifications({ branch }: { branch: BranchKey }) {
 const {locale} = useLanguage();const es=locale === "es";
 return <section className="mt-8" aria-labelledby={`certs-${branch}`}><div className="mb-5"><p className="text-sm font-extrabold uppercase tracking-widest text-[#d81920]">{es ? "Reconocimientos" : "Recognitions"}</p><h2 className="mt-2 text-2xl font-black" id={`certs-${branch}`}>{es ? "Certificaciones y reconocimientos" : "Certifications & recognitions"}</h2><p className="mt-2 text-sm text-neutral-600">{es ? "Conoce los documentos y reconocimientos de esta sucursal." : "Explore this location's certificates and recognitions."}</p></div>
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{CERTIFICATES[branch].map((c)=> <article key={c.file} className="ht-card flex flex-col justify-between p-6"><div><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff8dd] text-2xl font-black text-[#a51c20]" aria-hidden="true">M</div><h3 className="text-xl font-black">{c.name}</h3><p className="mt-2 text-sm text-neutral-600">{es ? c.detail : c.detail === "Certificado" ? "Certificate" : "Display version"}</p></div><a href={c.file} target="_blank" rel="noopener noreferrer" className="ht-btn ht-btn-dark mt-5 self-start">{es ? "Ver documento" : "View document"} ↗</a></article>)}
  {branch === "leamington" && <article className="ht-card flex flex-col items-center justify-center p-6"><h3 className="mb-4 text-center text-lg font-black">Restaurant Guru · 2026</h3><RestaurantGuruBadge /></article>}</div>
 </section>;
}
