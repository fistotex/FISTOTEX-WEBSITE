import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** PNG home-screen icon for iOS (Safari ignores SVG touch icons). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12151A",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
          <g transform="translate(1.88,51.2) scale(0.058)">
            <path
              d="M434.50-463.50L489-463.50L489-200L434.50-200L424-298L276-298L276-57L351.50-28.50L351.50 0L36.50 0L36.50-28.50L112-57L112-619L36.50-647.50L36.50-676L507-676L503-606.50L276-606.50L276-365.50L424-365.50L434.50-463.50Z"
              fill="#EDE8DF"
            />
          </g>
          <path d="M31.5 14 L38.5 21.5 L44 12.5 L50 19 L56 8.6" fill="none" stroke="#4FBF8B" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60.2 3.9 L61.6 11.9 L53.4 7.3 Z" fill="#4FBF8B" />
        </svg>
      </div>
    ),
    size
  );
}
