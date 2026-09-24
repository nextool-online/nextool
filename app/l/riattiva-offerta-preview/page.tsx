import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riattiva Offer Preview",
  description: "Mobile sales-page preview for the Riattiva funnel.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main style={{ margin: 0, minHeight: "100vh", background: "#05060a" }}>
      <iframe
        title="Riattiva Offer Preview"
        src="/riattiva-offerta-preview.html"
        style={{ border: 0, display: "block", width: "100%", height: "100vh", background: "#05060a" }}
        allow="clipboard-write"
      />
    </main>
  );
}
