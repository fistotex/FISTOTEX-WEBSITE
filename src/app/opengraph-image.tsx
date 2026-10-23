import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fistotex - The Indian Investor's Gazette";
export const runtime = "edge";

/** Social card: the F-ascent mark + wordmark on night ink. */
export default async function OpengraphImage() {
  let fonts: { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[] = [];
  try {
    const newsreader = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/newsreader@5.2.5/files/newsreader-latin-700-normal.woff"
    ).then((r) => r.arrayBuffer());
    fonts = [{ name: "Newsreader", data: newsreader, weight: 700, style: "normal" }];
  } catch {
    // Falls back to the default sans if the font CDN is unreachable at build.
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#12151A",
          display: "flex",
          alignItems: "center",
          padding: "72px 80px",
        }}
      >
        <svg width="210" height="210" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="12" fill="#171B21" stroke="#2A3038" strokeWidth="1.5" />
          <g transform="translate(1.88,51.2) scale(0.058)">
            <path
              d="M434.50-463.50L489-463.50L489-200L434.50-200L424-298L276-298L276-57L351.50-28.50L351.50 0L36.50 0L36.50-28.50L112-57L112-619L36.50-647.50L36.50-676L507-676L503-606.50L276-606.50L276-365.50L424-365.50L434.50-463.50Z"
              fill="#EDE8DF"
            />
          </g>
          <path d="M31.5 14 L38.5 21.5 L44 12.5 L50 19 L56 8.6" fill="none" stroke="#4FBF8B" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60.2 3.9 L61.6 11.9 L53.4 7.3 Z" fill="#4FBF8B" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 64 }}>
          <div style={{ fontFamily: "Newsreader", fontSize: 132, fontWeight: 700, color: "#EDE8DF", lineHeight: 1 }}>
            Fistotex
          </div>
          <div style={{ fontSize: 28, letterSpacing: 7, color: "#4FBF8B", marginTop: 26, textTransform: "uppercase" }}>
            The Indian Investor&apos;s Gazette
          </div>
          <div style={{ fontSize: 27, color: "#949BA5", marginTop: 30, maxWidth: 720 }}>
            Verified calculators, market calendar and results for the Indian investor.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
