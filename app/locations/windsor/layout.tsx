import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BRANCHES } from "@/lib/site-data";

const branch = BRANCHES.windsor;
const url = "https://www.hottacosrestaurant.com/locations/windsor";

export const metadata: Metadata = {
  title: "Hot Tacos Windsor | Mexican Restaurant in Windsor, Ontario",
  description: "Visit Hot Tacos in Windsor, Ontario. Explore our Mexican food menu, find our location and order online.",
  alternates: { canonical: url },
  openGraph: {
    title: "Hot Tacos Windsor | Mexican Restaurant",
    description: "Mexican food, location details and online ordering in Windsor, Ontario.",
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
    streetAddress: "325 Ouellette Ave",
    addressLocality: branch.city,
    addressRegion: "ON",
    postalCode: "N9A 4J1",
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
