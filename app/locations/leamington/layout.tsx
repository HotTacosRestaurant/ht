import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BRANCHES } from "@/lib/site-data";

const branch = BRANCHES.leamington;
const url = "https://www.hottacosrestaurant.com/locations/leamington";

export const metadata: Metadata = {
  title: "Hot Tacos Leamington | Mexican Restaurant in Leamington, Ontario",
  description: "Visit Hot Tacos in Leamington, Ontario. Explore our Mexican food menu, find our location and order online.",
  alternates: { canonical: url },
  openGraph: {
    title: "Hot Tacos Leamington | Mexican Restaurant",
    description: "Mexican food, location details and online ordering in Leamington, Ontario.",
    url,
    type: "website",
    images: [branch.imageUrl],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${url}#restaurant`,
  name: branch.name,
  url,
  image: branch.imageUrl,
  telephone: branch.phoneHref.replace(/^tel:/, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 Talbot Street E",
    addressLocality: branch.city,
    addressRegion: "ON",
    postalCode: "N8H 1L2",
    addressCountry: "CA",
  },
  servesCuisine: "Mexican",
  hasMenu: "https://www.hottacosrestaurant.com/menu",
  sameAs: [branch.facebookUrl, branch.instagramUrl],
};

export default function LocationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
