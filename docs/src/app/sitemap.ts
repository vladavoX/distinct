import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { source } from "@/lib/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const params = source.generateParams();

  const docsRoutes = params.map((param) => {
    const slug = param.slug ?? [];
    const pathname = slug.length ? `/docs/${slug.join("/")}` : "/docs";

    return {
      url: `${siteUrl}${pathname}`,
      lastModified: now,
    };
  });

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
    },
    ...docsRoutes,
  ];
}
