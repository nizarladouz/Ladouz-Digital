import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.ladouz.digital/sitemap.xml",
    host: "https://www.ladouz.digital",
  };
}
