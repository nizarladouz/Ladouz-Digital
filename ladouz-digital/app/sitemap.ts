import type { MetadataRoute } from "next";

const SITE = "https://www.ladouz.digital";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/ki-workshop-siegburg`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
