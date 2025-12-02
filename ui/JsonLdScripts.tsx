"use client";

import Script from "next/script";

export default function JsonLdScripts() {
  return (
    <>
      <Script
        id="jsonld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GGfollows",
            url: "https://ggfollows.vercel.app",
            logo: "https://ggfollows.vercel.app/favicon.ico",
          }),
        }}
      />
    </>
  );
}
