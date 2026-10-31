import type { NextConfig } from "next";

// Who may run scripts, frame content or receive data on fistotex.com:
// the site itself, Google Analytics/AdSense (and its consent message), and
// Razorpay checkout for the planned payment features.
const google = "https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.gstatic.com https://*.adtrafficquality.google https://*.googleadservices.com";
const razorpay = "https://checkout.razorpay.com https://api.razorpay.com https://lumberjack.razorpay.com";
const csp = (frameAncestors: string) => [
  "default-src 'self'",
  // 'unsafe-inline': Next.js hydration, the consent/theme init scripts and JSON-LD are inline.
  `script-src 'self' 'unsafe-inline' ${google} ${razorpay}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${google} ${razorpay}`,
  `frame-src ${google} ${razorpay}`,
  `frame-ancestors ${frameAncestors}`,
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.livemint.com" },
      { protocol: "https", hostname: "images.livemint.com" },
      { protocol: "https", hostname: "www.moneycontrol.com" },
      { protocol: "https", hostname: "images.moneycontrol.com" },
      { protocol: "https", hostname: "img.moneycontrol.com" },
      { protocol: "https", hostname: "economictimes.indiatimes.com" },
      { protocol: "https", hostname: "img.etimg.com" },
      { protocol: "https", hostname: "www.business-standard.com" },
      { protocol: "https", hostname: "bsmedia.business-standard.com" },
      { protocol: "https", hostname: "www.thehindubusinessline.com" },
      { protocol: "https", hostname: "www.thehindu.com" },
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  compress: true,

  async headers() {
    const longCache = "public, max-age=3600, s-maxage=86400";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Tells browsers to reach this domain over HTTPS only, so the
          // http:// -> https:// redirect never has to run a second time.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // allow-popups keeps AdSense click-outs and a future Razorpay checkout popup working.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
      // Every page except the embeddable calculators refuses to be framed by other sites.
      // CSP is report-only first: violations show in the browser console without
      // breaking ads. Once a week of browsing shows none, rename the key to
      // Content-Security-Policy to enforce it.
      {
        source: "/:path((?!embed/).*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy-Report-Only", value: csp("'self'") },
        ],
      },
      // /embed/* is built to sit in an <iframe> on other people's sites.
      {
        source: "/embed/:path*",
        headers: [{ key: "Content-Security-Policy-Report-Only", value: csp("*") }],
      },
      { source: "/sitemap.xml", headers: [{ key: "Cache-Control", value: longCache }] },
      { source: "/robots.txt", headers: [{ key: "Cache-Control", value: longCache }] },
      { source: "/manifest.webmanifest", headers: [{ key: "Cache-Control", value: longCache }] },
    ];
  },

  async redirects() {
    /*
      Every rule below lands on its FINAL destination in one hop. Chaining
      (/calculator -> /toolkit/finance-calculator -> /calculators) would leak
      link equity at each step and slow every crawl, so the two pre-existing
      legacy prefixes were retargeted straight at /calculators rather than left
      pointing at the retired /toolkit path.

      Specific /:id rules come BEFORE the bare-path rules, or a bare rule would
      swallow them.
    */
    return [
      // Apex host -> www, one hop, path and query preserved. www is the
      // canonical host (canonicals and sitemap already use it).
      {
        source: "/:path*",
        has: [{ type: "host", value: "fistotex.com" }],
        destination: "https://www.fistotex.com/:path*",
        permanent: true,
      },
      // 2026-09 restructure: the calculators moved up from /toolkit/finance-calculator.
      {
        source: "/toolkit/finance-calculator/:id",
        destination: "/calculators/:id",
        permanent: true,
      },
      { source: "/toolkit/finance-calculator", destination: "/calculators", permanent: true },
      // /toolkit only duplicated the calculator index, so it folds into the hub.
      { source: "/toolkit", destination: "/calculators", permanent: true },

      // Legacy prefixes that predate the restructure.
      {
        source: "/finance-calculator/:id",
        destination: "/calculators/:id",
        permanent: true,
      },
      { source: "/finance-calculator", destination: "/calculators", permanent: true },
      {
        source: "/calculator/:id",
        destination: "/calculators/:id",
        permanent: true,
      },
      { source: "/calculator", destination: "/calculators", permanent: true },

      // 2026-10: the FOMC preview post was superseded by the decision post;
      // one URL per topic so the two don't compete in search.
      {
        source: "/blog/us-fed-fomc-october-2026-india",
        destination: "/blog/fed-holds-rates-october-2026-fomc-india",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

