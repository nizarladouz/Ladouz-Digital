import type { MetadataRoute } from "next";

const SITE = "https://www.ladouz.digital";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/datenschutz`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
