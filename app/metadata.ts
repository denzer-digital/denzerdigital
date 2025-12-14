import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://denzerdigital.com.br";
const fbAppId = "658289000700758";

export function generatePageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  robots,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  robots?: Metadata["robots"];
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    robots: robots || {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Denzer Digital",
      images: [
        {
          url: `${siteUrl}/assets/denzer-logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/denzer-logo.png"],
    },
    other: {
      "fb:app_id": "658289000700758",
    },
  };
}

