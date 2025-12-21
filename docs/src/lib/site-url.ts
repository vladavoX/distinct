const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    FALLBACK_SITE_URL;

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/$/, "");
  }

  return `https://${raw.replace(/\/$/, "")}`;
}
