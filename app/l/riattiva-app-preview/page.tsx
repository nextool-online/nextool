import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodo Riattiva App Preview",
  description: "Mobile preview for the Metodo Riattiva member-area MVP.",
  robots: { index: false, follow: false },
};

export default function RiattivaAppPreviewPage() {
  return (
    <main style={{ margin: 0, minHeight: "100vh", background: "#05060a" }}>
      <iframe
        title="Metodo Riattiva App Preview"
        src="/riattiva-app-preview.html"
        style={{
          border: 0,
          display: "block",
          width: "100%",
          height: "100vh",
          background: "#05060a",
        }}
        allow="clipboard-write"
      />
    </main>
  );
}
