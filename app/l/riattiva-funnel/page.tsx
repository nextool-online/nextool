import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riattiva Funnel Preview",
  description: "Internal funnel map for Riattiva IT v1.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main style={{ margin: 0, minHeight: "100vh", background: "#05060a" }}>
      <iframe
        title="Riattiva Funnel Preview"
        src="/riattiva-funnel-preview.html"
        style={{ border: 0, display: "block", width: "100%", height: "100vh", background: "#05060a" }}
        allow="clipboard-write"
      />
    </main>
  );
}
