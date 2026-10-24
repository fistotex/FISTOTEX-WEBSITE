"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function GA4() {
  const gaId = siteConfig.gaId;

  if (!gaId) return null;

  return (
    <>
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            var p = new URLSearchParams(location.search), k = new URLSearchParams();
            p.forEach(function (v, n) { if (n.indexOf('utm_') === 0) k.set(n, v); });
            var q = k.toString();
            gtag('config', '${gaId}', { send_page_view: false, page_location: location.origin + location.pathname + (q ? '?' + q : '') });
          `,
        }}
      />
      <Script
        id="ga4-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}

/**
 * Sends a GA4 page_view on every client-side route change.
 *
 * Reads the query string from window instead of useSearchParams so pages
 * are not forced into dynamic rendering — keeps everything static and fast.
 */
export function GA4PageView() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const gaId = siteConfig.gaId;
    if (!gaId) return;

    // Calculator inputs are mirrored into the address bar (for share links), so only
    // campaign (utm_) parameters are ever passed on to analytics, never the other query values.
    const keep = new URLSearchParams();
    new URLSearchParams(window.location.search).forEach((v, n) => {
      if (n.startsWith("utm_")) keep.set(n, v);
    });
    const kq = keep.toString();
    const url = pathname + (kq ? `?${kq}` : "");
    if (lastPath.current === url) return;
    lastPath.current = url;

    // gtag may not be ready on first paint; retry briefly.
    let attempts = 0;
    const send = () => {
      if (typeof window.gtag === "function") {
        window.gtag("set", { page_location: window.location.origin + url });
        window.gtag("event", "page_view", {
          page_path: url,
          page_title: document.title,
          page_location: window.location.origin + url,
        });
        return;
      }
      if (attempts++ < 20) setTimeout(send, 150);
    };
    send();
  }, [pathname]);

  return null;
}
