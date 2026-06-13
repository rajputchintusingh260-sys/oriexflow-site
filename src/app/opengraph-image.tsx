import { ImageResponse } from "next/og";

export const alt = "OriexFlow — Cinematic content. Shipped in 48 hours.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0f",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "linear-gradient(135deg, #7c5cff, #22d3ee)",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>OriexFlow</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Cinematic content.</span>
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #7c5cff, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Shipped in 48 hours.
          </span>
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "#9ca3af" }}>
          Short-form · YouTube editing · Brand films · Content systems
        </div>
      </div>
    ),
    size
  );
}
