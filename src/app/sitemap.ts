import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aravindvijayan.in";

const categories = ["personal", "professional", "npm"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteUrl}/works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    ...categories.map((category) => ({
      url: `${siteUrl}/works/${category}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
