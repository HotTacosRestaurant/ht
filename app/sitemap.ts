import type { MetadataRoute } from "next";

const SITE_URL = "https://www.hottacosrestaurant.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; changeFrequency: "weekly" | "monthly"; priority: number }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/locations", changeFrequency: "monthly", priority: 0.9 },
    { path: "/locations/windsor", changeFrequency: "weekly", priority: 0.9 },
    { path: "/locations/leamington", changeFrequency: "weekly", priority: 0.9 },
    { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
    { path: "/catering", changeFrequency: "monthly", priority: 0.8 },
    { path: "/food-truck", changeFrequency: "monthly", priority: 0.8 },
    { path: "/reviews", changeFrequency: "monthly", priority: 0.6 },
    { path: "/customer-experience", changeFrequency: "monthly", priority: 0.5 },
    { path: "/opportunities", changeFrequency: "monthly", priority: 0.5 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
