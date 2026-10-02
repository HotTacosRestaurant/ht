import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/hottacosmanagement/", "/engage/"],
    },
    sitemap: "https://www.hottacosrestaurant.com/sitemap.xml",
  };
}
