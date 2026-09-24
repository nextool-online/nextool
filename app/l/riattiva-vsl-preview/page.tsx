import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riattiva VSL Preview",
  description: "Timed VSL + hidden offer preview for the Riattiva funnel.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main style={{ margin: 0, minHeight: "100vh", background: "#05060a" }}>
      <iframe
        title="Riattiva VSL Preview"
        src="/riattiva-vsl-preview.html"
        style={{ border: 0, display: "block", width: "100%", height: "100vh", background: "#05060a" }}
        allow="clipboard-write; autoplay; fullscreen"
      />
    </main>
  );
}
