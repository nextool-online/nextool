import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "#fafafa",
          color: "#18181b",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800 }}>Nextool</div>

        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            fontWeight: 600,
            maxWidth: 880,
            lineHeight: 1.25,
          }}
        >
          Fast online tools and calculators
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 24,
            color: "#52525b",
          }}
        >
          nextool.online
        </div>
      </div>
    ),
    size
  );
}